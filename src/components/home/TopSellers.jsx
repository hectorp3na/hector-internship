import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";


const TopSellers = () => {
const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTopSellers = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setTopSellers(response.data);
      } catch (error) {
        console.error("Failed to load collection:", error);
      } finally {
        setLoading(false);
      }
    };

    getTopSellers();
  }, []);

  const skeletonArray = new Array(12).fill(null);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
            {loading
                ? skeletonArray.map((_, index) => (
                  <li key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="author_list_info">
                      <Skeleton width="100px" height="16px" borderRadius="4px" />
                      <Skeleton width="60px" height="12px" borderRadius="4px" style={{ marginTop: "6px" }} />
                    </div>
                  </li>
                ))
                : 
              topSellers.map((seller, index) => (
                <li key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
