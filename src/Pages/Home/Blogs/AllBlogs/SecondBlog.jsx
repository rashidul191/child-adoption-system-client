import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const SecondBlog = ({ blog }) => {
  const navigate = useNavigate();
  const { blogTitle, description, _id, postDate } = blog;
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
    <div className="my-5 px-5 py-8 border border-5 border-black">
      <h2
        onClick={() => handleBlogsDetails(_id)}
        className="text-xl font-bold my-0 cursor-pointer mb-2"
      >
        <span className="hover:underline capitalize">
          {" "}
          {blogTitle.length > 40 ? `${blogTitle.slice(0, 38)} ...` : blogTitle}
        </span>
        {toDay && <div className="badge badge-secondary">NEW</div>}
      </h2>
      <p className="mt-5">
        {" "}
        {description?.length > 100
          ? `${description.slice(0, 105)} ...`
          : description}{" "}
        <button
          onClick={() => handleBlogsDetails(_id)}
          className="btn btn-primary btn-xs text-white"
        >
          read more
        </button>
      </p>
    </div>
  );
};

export default SecondBlog;
