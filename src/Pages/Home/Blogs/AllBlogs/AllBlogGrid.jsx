import { format } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";

const AllBlogGrid = ({ blog }) => {
  const navigate = useNavigate();
  const { _id, blogImg, blogTitle, displayName, postDate, description } = blog;

  const handleBlogsDetails = (id) => {
    // console.log(id);
    navigate(`/blog/${id}`);
  };

  const currentDate = format(new Date(), "PP");
  let toDay = false;
  if (currentDate === postDate) {
    toDay = true;
  } else {
    toDay = false;
  }

  let setDescription;
  if (description.length > 60) {
    setDescription = <p>{description.slice(0, 65)}...</p>;
  } else {
    setDescription = <p>{description}</p>;
  }

  return (
    <div
      onClick={() => handleBlogsDetails(_id)}
      className="card  w-5/6 md:w-96 bg-base-100 shadow-xl md:shadow-none  md:hover:shadow-xl border rounded-none mx-auto cursor-pointer"
    >
      <figure>
        <img src={blogImg} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title my-0">
          {blogTitle}
          {toDay && <div className="badge badge-secondary">NEW</div>}
        </h2>
        <span className="my-6"> {setDescription}</span>
        <hr />
        <div className="card-actions justify-between">
          <div className=" ">{displayName}</div>
          <div className="text-[#9F9F9F] font-semibold">{postDate}</div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogGrid;
