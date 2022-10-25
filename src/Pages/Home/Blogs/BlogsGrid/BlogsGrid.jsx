import React from "react";
import { useNavigate } from "react-router-dom";

const BlogsGrid = ({ blog }) => {
  const navigate = useNavigate();
  const { _id, blogImg, blogTitle, currentDate } = blog;

  const handleBlogsDetails = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div
      onClick={() => handleBlogsDetails(_id)}
      className="card w-5/6 rounded-none image-full mx-auto"
    >
      <figure>
        <img src={blogImg} alt="img" />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-2xl text-white font-semibold mt-8 md:mt-32 cursor-pointer hover:underline">
          {blogTitle}
        </h2>
        <p>{currentDate}</p>
      </div>
    </div>
  );
};

export default BlogsGrid;
