import React from "react";
import { Fade } from "react-reveal";
import { useNavigate } from "react-router-dom";

const BlogsGrid = ({ blog }) => {
  const navigate = useNavigate();
  const { _id, blogImg, blogTitle } = blog;
  const handleBlogsDetails = (id) => {
    navigate(`/blog/${blogTitle}/${id}`);
  };

  return (
    <Fade right>
      <div
        onClick={() => handleBlogsDetails(_id)}
        className="card w-5/6 mx-auto"
      >
        <div className="card w-full bg-base-100 shadow-xl image-full hover:scale-110 transition duration-300 ease-in-out">
          <figure>
            <img src={blogImg} alt="blog-img" />
          </figure>
          <div className="card-body flex justify-center items-center">
            <h2 className="text-2xl font-semibold hover:underline cursor-pointer ">
              {blogTitle.length >= 30 ? blogTitle?.slice(0, 30) : blogTitle}{" "}
              {blogTitle.length >= 30 && `....`}
            </h2>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default BlogsGrid;
