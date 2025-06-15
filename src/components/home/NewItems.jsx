import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  useEffect(() => {
    const getNewItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewItems(response.data);
      } catch (error) {
        console.error("Failed to load collection:", error);
      } finally {
        setLoading(false);
      }
    };

    getNewItems();
  }, []);



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

return (
<section id="section-items" className="no-bottom">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="text-center">
          <h2>New Items</h2>
          <div className="small-border bg-color-2"></div>
        </div>
      </div>

      {loading ? (
        <OwlCarousel className="owl-theme" {...options}>
          {new Array(4).fill(0).map((_, index) => (
            <div className="item" key={index}>
              <Skeleton width="100%" height="300px" />
            </div>
          ))}
        </OwlCarousel>
      ) : (
        <>
  <OwlCarousel className="owl-theme" {...options}>
    {newItems.map((item, index) => (
      <div className="item" key={item.nftId}>
        <div className="nft__item">
          <div className="author_list_pp">
            <Link
              to={`/author/${item.authorId}`}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={`Creator: ${item.authorName || "Unknown"}`}
            >
              <img
                className="lazy"
                src={item.authorImage}
                alt="Author"
              />
              <i className="fa fa-check"></i>
            </Link>
          </div>

          <div className="de_countdown">
            <Countdown expiryDate={item.expiryDate} />
          </div>

          <div className="nft__item_wrap">
            <div className="nft__item_extra">
              <div className="nft__item_buttons">
                <button>Buy Now</button>
                <div className="nft__item_share">
                  <h4>Share</h4>
                  <a href="#" target="_blank" rel="noreferrer">
                    <i className="fa fa-facebook fa-lg"></i>
                  </a>
                  <a href="#" target="_blank" rel="noreferrer">
                    <i className="fa fa-twitter fa-lg"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-envelope fa-lg"></i>
                  </a>
                </div>
              </div>
            </div>
            <Link to={`/item-details/${item.nftId}`}>
              <img
                src={item.nftImage}
                className="lazy nft__item_preview"
                alt={item.title}
              />
            </Link>
          </div>

          <div className="nft__item_info">
            <Link to={`/item-details/${item.nftId}`}>
              <h4>{item.title || "Untitled"}</h4>
            </Link>
            <div className="nft__item_price">{item.price} ETH</div>
            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>{item.likes}</span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </OwlCarousel>
      </>
    )}
  </div>
</div>
</section>
);
};

export default NewItems;
