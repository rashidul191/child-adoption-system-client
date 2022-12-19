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
import AllBlogGrid from "../AllBlogs/AllBlogGrid";

const BlogDetails = () => {
  const { blogTitle, id } = useParams();
  const shareUrl = `https://child-adoption-system.web.app/blog/${blogTitle}/${id}`;
  const { data: blog, isLoading } = useQuery(["blogDetails"], () =>
    fetch(`https://child-adoption-system-server.onrender.com/blog/${id}`, {
      method: "GET",
    }).then((res) => res.json())
  );

  // all blogs
  const { data: seeAllBlogs, isLoading2 } = useQuery(["allBlogs"], () =>
    fetch("https://child-adoption-system-server.onrender.com/allBlogs", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json())
  );
  if (isLoading || isLoading2) {
    return <Loading></Loading>;
  }

  // console.log(seeAllBlogs);

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
    <section className="pt-16">
      <div className="card md:w-3/5 mx-auto bg-base-100">
        <div className="card-body">
          <img
            className="mx-auto"
            width={300}
            src={blog?.blogImg}
            alt={blog?.blogTitle}
          />

          <h2 className="text-2xl md:text-5xl font-semibold">
            {blog?.blogTitle}
          </h2>
          <div className="my-10 flex justify-between">
            <div>
              <p>{blog?.displayName}</p>
              <p className="text-[#95959F] text-sm">{blog?.postDate}</p>
            </div>
            <div className="cursor-pointer text-xl flex items-center">
              <span>
                <FacebookShareButton url={shareUrl}>
                  <FontAwesomeIcon icon={faSquareFacebook}></FontAwesomeIcon>
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
          <p className="text-justify">{blog?.description}</p>
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
              {seeAllBlogs
                ?.slice(0, 6)
                ?.reverse()
                ?.map((blog) => (
                  <AllBlogGrid key={blog._id} blog={blog}></AllBlogGrid>
                ))}
            </Slider>
          </div>
          <div className="hidden md:block">
            <Slider {...settings2}>
              {seeAllBlogs
                ?.slice(0, 15)
                ?.reverse()
                ?.map((blog) => (
                  <AllBlogGrid key={blog._id} blog={blog}></AllBlogGrid>
                ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
