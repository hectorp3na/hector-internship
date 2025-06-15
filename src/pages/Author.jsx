import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import AOS from 'aos';
import 'aos/dist/aos.css';

const skeletonStyle = {
  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
  backgroundSize: "200% 100%",
  animation: "skeleton-loading 1.2s infinite linear",
};

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false)

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        setAuthor(response.data);
      } catch (error) {
        console.error("Failed to load collection:", error);
      } finally {
        setLoading(false);
      }
    };

    getAuthor();
  }, [id]);

  const handleFollowClick = () => {
    setFollowed(!followed);
  };


  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12" data-aos="fade-up">
                {loading ? (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div
                        style={{
                          ...skeletonStyle,
                          width: 150,
                          height: 150,
                          borderRadius: "50%",
                          marginBottom: 20,
                        }}
                      ></div>
                      <div className="profile_name">
                        <div
                          style={{
                            ...skeletonStyle,
                            width: 200,
                            height: 24,
                            marginBottom: 10,
                            borderRadius: 4,
                          }}
                        ></div>
                        <div
                          style={{
                            ...skeletonStyle,
                            width: 150,
                            height: 16,
                            marginBottom: 10,
                            borderRadius: 4,
                          }}
                        ></div>
                        <div
                          style={{
                            ...skeletonStyle,
                            width: 250,
                            height: 16,
                            borderRadius: 4,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div
                          style={{
                            ...skeletonStyle,
                            width: 100,
                            height: 20,
                            marginBottom: 10,
                            borderRadius: 4,
                          }}
                        ></div>
                        <div
                          style={{
                            ...skeletonStyle,
                            width: 80,
                            height: 30,
                            borderRadius: 8,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {author.followers + (followed ? 1 : 0)} followers
                        </div>
                        <button onClick={handleFollowClick} className="btn-main">
                        {followed ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12" data-aos="fade-up" data-aos-delay="200">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={id} />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <style>
          {`
          @keyframes skeleton-loading {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}
        </style>
      </div>
    </div>
  );
};

export default Author;
