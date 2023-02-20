import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const FirstBlog = ({ blog }) => {
  const navigate = useNavigate();
  const { _id, blogTitle, blogImg, postDate } = blog;
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
    <div
      onClick={() => handleBlogsDetails(_id)}
      className="hero h-96"
      style={{ backgroundImage: `url(${blogImg})` }}
    >
      <div className="hero-overlay bg-opacity-20"></div>
      <div className="hero-content text-white">
        <div className="max-w-lg">
          <div className="bg-black bg-opacity-60">
            <h1 className="mt-52 p-5 text-2xl font-bold hover:underline cursor-pointer">
              <span>
                {" "}
                {blogTitle.length > 30
                  ? `${blogTitle.slice(0, 30)} ...`
                  : blogTitle}
              </span>
              {toDay && <div className="badge badge-secondary">NEW</div>}
            </h1>
            <p className="text-sm px-5">{postDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstBlog;
