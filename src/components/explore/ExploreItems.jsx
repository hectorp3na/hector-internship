import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Skeleton = ({ width = "100%", height = "200px" }) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#ddd",
        borderRadius: "8px",
        animation: "pulse 1.5s infinite",
        marginBottom: "10px",
      }}
    />
  );
};

function Countdown({ expiryDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [expiryDate]);

  function calculateTimeLeft() {
    const difference = +new Date(expiryDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  }
  return (
    <span>
      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  );
}

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const getExploreItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        setExploreItems(response.data);
      } catch (error) {
        console.error("Failed to load collection:", error);
      } finally {
        setLoading(false);
      }
    };

    getExploreItems();
  }, []);

  const handleLoadMore = (e) => {
    e.preventDefault();
    setVisibleCount((prev) => prev + 4);
  };

  const filteredItems = [...exploreItems].sort((a, b) => {
    if (filter === "price_low_to_high") return a.price - b.price;
    if (filter === "price_high_to_low") return b.price - a.price;
    if (filter === "likes_high_to_low") return b.likes - a.likes;
    return 0;
  });

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {(loading
        ? new Array(8).fill({})
        : filteredItems.slice(0, visibleCount)
      ).map((item, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              {loading ? (
                <Skeleton width="50px" height="50px" />
              ) : (
                <Link
                  to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              )}
            </div>

            {item.expiryDate && !loading && (
              <div className="de_countdown">
                <Countdown expiryDate={item.expiryDate} />
              </div>
            )}

            <div className="nft__item_wrap">
              {loading ? (
                <Skeleton height="200px" />
              ) : (
                <Link to={`/item-details/${item.nftId}`}>
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              )}
            </div>
            {!loading && (
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            )}

            <div className="nft__item_info">
              {loading ? (
                <>
                  <Skeleton width="80%" height="20px" />
                  <Skeleton width="40%" height="20px" />
                </>
              ) : (
                <>
                  <Link to="/item-details">
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}

      {!loading && visibleCount < exploreItems.length && (
        <div className="col-md-12 text-center">
          <a
            id="loadmore"
            className="btn-main lead"
            href="/explore"
            style={{ visibility: "visible" }}
            onClick={handleLoadMore}
          >
            Load more
          </a>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
