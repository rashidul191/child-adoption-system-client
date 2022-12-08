import React from "react";
import { useNavigate } from "react-router-dom";

const BlogsGrid = ({ blog }) => {
  // console.log(blog);

  const navigate = useNavigate();
  const { _id, blogImg, blogTitle, postDate } = blog;
  const handleBlogsDetails = (id) => {
    navigate(`/blog/${blogTitle}/${id}`);
  };

  return (
    <div onClick={() => handleBlogsDetails(_id)} className="card w-5/6 mx-auto">
      {/* <figure>
        <img
          className=" hover:scale-110 transition duration-300 ease-in-out"
          src={blogImg}
          alt="img"
        />

        <div class="relative overflow-hidden bg-no-repeat bg-cover max-w-xs">
  <img src="https://mdbcdn.b-cdn.net/img/new/fluid/city/113.webp" class="" alt="Louvre" />
</div>
      </figure>
      <div className="card-body text-center">
        <h2 className="text-2xl text-white font-semibold mt-8 md:mt-32 cursor-pointer hover:underline">
          {blogTitle}
        </h2>
        <p>{currentDate}</p>
      </div> */}

      <div className="card w-full rounded-none mx-auto ">
        <div
          style={{
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
              {/* <p>{postDate}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsGrid;
