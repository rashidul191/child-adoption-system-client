import React from "react";
import { useNavigate } from "react-router-dom";

const BlogsGrid = ({ blog }) => {
  const navigate = useNavigate();
  const { _id, blogImg, blogTitle, postDate } = blog;
  const handleBlogsDetails = (id) => {
    navigate(`/blog/${blogTitle}/${id}`);
  };

  return (
    <div onClick={() => handleBlogsDetails(_id)} className="card w-5/6 mx-auto">
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

      {/* <div className="card w-full rounded-none mx-auto ">
        <div
          style={{
            width:`auto`,
            backgroundImage: `url(${blogImg})`,
            backgroundRepeat: "no-repeat",
          }}
          className="card-body hover:scale-110 transition duration-300 ease-in-out text-white text-center hover:underline"
        >
          <div className="bg-gray-500 bg-opacity-50">
            <div className="my-24">
              <h2 className="text-2xl  font-semibold  cursor-pointer ">
                {blogTitle}
              </h2>
             
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BlogsGrid;
