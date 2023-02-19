import { format } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";

const AllBlogGrid = ({ blog }) => {
  const navigate = useNavigate();
  const { _id, blogImg, blogTitle, postDate, description } = blog;

  const handleBlogsDetails = (id) => {
    navigate(`/blog/${blogTitle}/${id}`);
    window.location.reload();
  };

  const currentDate = format(new Date(), "PP");
  let toDay = false;
  if (currentDate === postDate) {
    toDay = true;
  } else {
    toDay = false;
  }

  return (
    <>
      <div className="card card-side bg-base-100 hover:shadow-xl mb-4 rounded-none border-2">
        <figure onClick={() => handleBlogsDetails(_id)} className="w-1/2">
          <img src={blogImg} alt="blog-img" />
        </figure>
        <div className="mx-5">
          <h2
            onClick={() => handleBlogsDetails(_id)}
            className="font-bold my-0 cursor-pointer mb-2"
          >
            <span className="hover:underline capitalize">
              {blogTitle.length > 40
                ? `${blogTitle.slice(0, 38)} ...`
                : blogTitle}
            </span>
            {toDay && <div className="badge badge-secondary">NEW</div>}
          </h2>
          <span className="text-sm">
            {description?.length > 80
              ? `${description.slice(0, 80)} ...`
              : description}
            <button
              onClick={() => handleBlogsDetails(_id)}
              className="btn btn-primary btn-xs text-white mb-2"
            >
              read more
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default AllBlogGrid;
