import { format } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";

const AllBlogGrid = ({ blog }) => {
  const navigate = useNavigate();
  const { _id, blogImg, blogTitle, displayName, postDate, description } = blog;

  const handleBlogsDetails = (id) => {
    // console.log(id);
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
  if (description?.length > 80) {
    setDescription = <p>{description.slice(0, 80)}...</p>;
  } else {
    setDescription = <p>{description}</p>;
  }

  return (
    <>
      <div
        onClick={() => handleBlogsDetails(_id)}
        className="card card-side bg-base-100 hover:shadow-xl my-5 rounded-none border-2"
      >
        <figure className="w-3/4">
          <img src={blogImg} alt="blog-img" />
        </figure>
        <div className="card-body">
          <h2 className="card-title my-0 cursor-pointer">
            <span className="hover:underline capitalize"> {blogTitle}</span>
            {toDay && <div className="badge badge-secondary">NEW</div>}
          </h2>
          <span className="my-6"> {setDescription}</span>
          <div className="card-actions justify-between">
            <div className=" ">
              By{" "}
              <span className="text-[#9F9F9F] font-semibold">
                {" "}
                {displayName}{" "}
              </span>{" "}
            </div>
            <div className="text-[#9F9F9F] font-semibold">{postDate}</div>
          </div>
        </div>
      </div>

      {/* <div className="card  w-5/6 md:w-96 bg-base-100 shadow-xl md:shadow-none md:hover:shadow-xl border rounded-none mx-auto">
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
          <span className="my-6"> {setDescription}</span>
          <hr />
          <div className="card-actions justify-between">
            <div className=" ">{displayName}</div>
            <div className="text-[#9F9F9F] font-semibold">{postDate}</div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default AllBlogGrid;
