import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import BlogsGrid from "./BlogsGrid/BlogsGrid";

const Blogs = () => {
  // react query
  const { data: allBlogs, isLoading } = useQuery(["seeAllBlogs"], () =>
    fetch(`https://child-adoption-system-server.onrender.com/api/v1/blog`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <section className="my-10 py-5">
      <div>
        <h1 className="text-center text-3xl font-bold uppercase">
          Read Articles
        </h1>
        <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2 my-10 md:mx-24">
        {allBlogs?.data
          ?.slice(0, 4)
          .reverse()
          ?.map((blog) => (
            <BlogsGrid key={blog._id} blog={blog}></BlogsGrid>
          ))}
      </div>
      <div className="text-center ">
        <Link to={`/all-blogs`}>
          <button className="btn btn-primary rounded-none w-60 text-white font-bold ">
            See More
            <FontAwesomeIcon
              className="ml-4"
              icon={faArrowRight}
            ></FontAwesomeIcon>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Blogs;
