import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItemDetails = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        setItemDetails(response.data);
      } catch (error) {
        console.error("Failed to load item:", error);
      } finally {
        setLoading(false);
      }
    };

    getItemDetails();
    window.scrollTo(0, 0);
  }, [nftId]);

  
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton width="100%" height="400px" borderRadius="12px" />
                ) : (
                  <img
                    src={itemDetails.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {loading ? (
                    <Skeleton width="60%" height="30px" />
                  ) : (
                    <h2>
                      {itemDetails.title} #{itemDetails.tag}
                    </h2>
                  )}
                  <div className="item_info_counts">
                    {loading ? (
                      <>
                        <Skeleton width="80px" height="20px" />
                        <Skeleton width="80px" height="20px" />
                      </>
                    ) : (
                      <>
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {itemDetails.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {itemDetails.likes}
                        </div>
                      </>
                    )}
                  </div>
                  {loading ? (
                    <>
                      <Skeleton width="100%" height="20px" />
                      <Skeleton width="90%" height="20px" />
                      <Skeleton width="95%" height="20px" />
                    </>
                  ) : (
                    <p>{itemDetails.description}</p>
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                          ) : (
                            <Link to={`/author/${itemDetails.ownerId}`}>
                              <img
                                className="lazy"
                                src={itemDetails.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div
                          className="author_list_info"
                          style={{ marginLeft: "10px" }}
                        >
                          {loading ? (
                            <Skeleton width="100px" height="16px" />
                          ) : (
                            <Link to={`/author/${itemDetails.ownerId}`}>
                              {itemDetails.ownerName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                          ) : (
                            <Link to={`/author/${itemDetails.creatorId}`}>
                              <img
                                className="lazy"
                                src={itemDetails.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div
                          className="author_list_info"
                          style={{ marginLeft: "10px" }}
                        >
                          {loading ? (
                            <Skeleton width="100px" height="16px" />
                          ) : (
                            <Link to={`/author/${itemDetails.creatorId}`}>
                              {itemDetails.creatorName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      {loading ? (
                        <Skeleton width="60px" height="20px" />
                      ) : (
                        <span>{itemDetails.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
