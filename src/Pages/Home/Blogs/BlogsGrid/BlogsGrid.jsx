import React from "react";

const BlogsGrid = ({ blog }) => {
  console.log(blog);
  const { _id, blogImg, blogTitle, currentDate } = blog;

  const handleBlogsDetails = (id) => {
    console.log(id);
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
        <h2 className="text-2xl mt-32 cursor-pointer hover:underline">
          {blogTitle}
        </h2>
        <p>{currentDate}</p>
      </div>
    </div>
  );
};

export default BlogsGrid;
