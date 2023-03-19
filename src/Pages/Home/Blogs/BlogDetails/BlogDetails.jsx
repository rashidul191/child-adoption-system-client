import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faSquareFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { FacebookShareButton, LinkedinShareButton } from "react-share";
import CopyToClipboard from "react-copy-to-clipboard";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RelatedBlogs from "../RelatedBlogs";
import BlogCommentInput from "./BlogCommentInput";
import BlogUserComments from "./BlogUserComments";

const BlogDetails = () => {
  const { blogTitle, id } = useParams();
  const shareUrl = `https://child-adoption-system.web.app/blog/${blogTitle}/${id}`;
  const { data: blog, isLoading } = useQuery(["blogDetails"], () =>
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/blog/${id}`,
      {
        method: "GET",
      }
    ).then((res) => res.json())
  );

  // all blogs
  const { data: seeAllBlogs, isLoading2 } = useQuery(["allBlogs"], () =>
    fetch("https://child-adoption-system-server.onrender.com/api/v1/blog", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json())
  );
  if (isLoading || isLoading2) {
    return <Loading></Loading>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <section className="md:pt-16">
      <div className="card md:px-24 bg-base-100">
        <div className="card-body">
          <div>
            <img
              className="mx-auto sm:h-52 sm:w-2/3"
              src={blog?.data?.blogImg}
              alt="img-here"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="col-span-2 ">
              <h2 className="text-2xl md:text-4xl font-semibold capitalize">
                {blog?.data?.blogTitle}
              </h2>
              <div className="my-6 flex justify-between">
                <div>
                  <p className="font-semibold">{blog?.data?.displayName}</p>
                  <p className="text-[#95959F] text-sm">
                    {blog?.data?.postDate}
                  </p>
                </div>
                <div className="cursor-pointer text-xl flex items-center">
                  <span>
                    <FacebookShareButton url={shareUrl}>
                      <FontAwesomeIcon
                        icon={faSquareFacebook}
                      ></FontAwesomeIcon>
                    </FacebookShareButton>
                  </span>
                  <span className="mx-4">
                    <LinkedinShareButton url={shareUrl}>
                      <FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon>
                    </LinkedinShareButton>
                  </span>
                  <span>
                    <div className="dropdown dropdown-end text-center">
                      <label tabIndex={0}>
                        <div className="dropdown dropdown-hover">
                          <label tabIndex={0}>
                            <CopyToClipboard text={shareUrl}>
                              <FontAwesomeIcon icon={faLink}></FontAwesomeIcon>
                            </CopyToClipboard>
                          </label>
                          <ul tabIndex={0} className="dropdown-content">
                            <div className="compact dropdown-content shadow bg-[#474747] w-32 py-1">
                              <span className="text-sm text-white">
                                Copy To Clipboard
                              </span>
                            </div>
                          </ul>
                        </div>
                      </label>
                      <div
                        tabIndex={0}
                        className="compact dropdown-content shadow bg-[#474747] w-32 py-1"
                      >
                        <span className="text-sm text-white">Copied!</span>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
              <hr />
              <p className="text-justify">{blog?.data?.description}</p>

              {/* comment input here */}
              <div>
                <BlogCommentInput blog={blog}></BlogCommentInput>
              </div>
            </div>
            {/* comment here */}
            <div className="md:ml-3">
              <h2 className="text-xl font-bold">Comments are: </h2>
              <div className="border-5 border">
                <BlogUserComments blog={blog}></BlogUserComments>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-12 bg-[#F6F9FC]">
        <div>
          <h2 className="text-center text-3xl md:text-4xl font-bold text-[#2E4781] mb-10">
            Related Articles
          </h2>
        </div>
        {/* Related article here */}
        <div>
          <div className="md:hidden">
            <Slider {...settings}>
              {seeAllBlogs?.data
                ?.slice(0, 6)
                ?.reverse()
                ?.map((blog) => (
                  <RelatedBlogs key={blog._id} blog={blog}></RelatedBlogs>
                ))}
            </Slider>
          </div>
          <div className="hidden md:block">
            <Slider {...settings2}>
              {seeAllBlogs?.data
                ?.slice(0, 15)
                ?.reverse()
                ?.map((blog) => (
                  <RelatedBlogs key={blog._id} blog={blog}></RelatedBlogs>
                ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
