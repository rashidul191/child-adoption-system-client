import React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const RelatedBlogs = ({ blog }) => {
  const navigate = useNavigate();
  const { _id, blogImg, blogTitle, displayName, postDate, description } = blog;

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

  let setDescription;
  if (description?.length > 60) {
    setDescription = <p>{description.slice(0, 65)}...</p>;
  } else {
    setDescription = <p>{description}</p>;
  }
  return (
    <div className="card  w-5/6 md:w-96 bg-base-100 shadow-xl md:shadow-none md:hover:shadow-xl border rounded-none mx-auto">
      <figure>
        <img src={blogImg} alt="blog-img" />
      </figure>
      <div className="card-body">
        <h2
          onClick={() => handleBlogsDetails(_id)}
          className="card-title my-0 cursor-pointer"
        >
          <span className="hover:underline capitalize"> {blogTitle}</span>
          {toDay && <div className="badge badge-secondary">NEW</div>}
        </h2>
        <span className="my-4"> {setDescription}</span>
        <hr />
        <div className="card-actions justify-between">
          <div className=" ">
            By{" "}
            <span className="text-[#9F9F9F] font-semibold">{displayName}</span>
          </div>
          <div className="text-[#9F9F9F] font-semibold">{postDate}</div>
        </div>
      </div>
    </div>
  );
};

export default RelatedBlogs;
