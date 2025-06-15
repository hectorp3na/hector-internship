import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SkeletonCard = () => {
  const skeletonStyle = {
    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
    backgroundSize: "200% 100%",
    animation: "skeleton-shimmer 1.2s infinite linear",
  };

 
  return (
    <div className="nft__item">
      <div className="author_list_pp skeleton" style={{ ...skeletonStyle, width: 50, height: 50, borderRadius: '50%' }}></div>

      <div className="nft__item_wrap">
        <div className="skeleton" style={{ ...skeletonStyle, width: "100%", height: 200, borderRadius: 8 }}></div>
      </div>

      <div className="nft__item_info">
        <div className="skeleton" style={{ ...skeletonStyle, width: "60%", height: 20, marginBottom: 10 }}></div>
        <div className="skeleton" style={{ ...skeletonStyle, width: "40%", height: 20, marginBottom: 10 }}></div>
        <div className="skeleton" style={{ ...skeletonStyle, width: "30%", height: 20 }}></div>
      </div>
    </div>
  );
}
const AuthorItems = ({ authorId }) => {
    const [authorItems, setAuthorItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!authorId) return;

      const getAuthorItems = async () => {
        try {
          const response = await axios.get(
            `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
          );
          const itemsWithImage = response.data.nftCollection.map((item) => ({
            ...item,
            authorImage: response.data.authorImage,
          }));
          setAuthorItems(itemsWithImage);
        
        } catch (error) {
          console.error("Failed to load collection:", error);
        } finally {
          setLoading(false);
        }
      };
  
      getAuthorItems();
    }, [authorId]);
  
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">

        {loading
            ? new Array(8).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}  data-aos="fade-up"
                data-aos-delay={index * 100}>
                  <SkeletonCard />
                </div>
              )) 
         : authorItems.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}  data-aos="fade-up"
            data-aos-delay={index * 100}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="#">
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
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
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
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
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
