import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
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
    const getCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollections(response.data);
      } catch (error) {
        console.error("Failed to load collection:", error);
      } finally {
        setLoading(false);
      }
    };

    getCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            <OwlCarousel className="owl-theme" {...options}>
              {new Array(8).fill(0).map((_, index) => (
                <div className="item" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width="100%" height="200px" />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width="100px" height="20px" />
                      <br />
                      <Skeleton width="60px" height="20px" />
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <>
              <OwlCarousel className="owl-theme" {...options}>
                {collections.map((collection, index) => (
                  <div className="item" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt={`NFT: ${collection.title}`}
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${collection.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage}
                            alt={`Author: ${collection.authorId}`}
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
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

export default HotCollections;
