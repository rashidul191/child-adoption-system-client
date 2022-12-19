import React from "react";
import Loading from "../../../Shared/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import AllBlogGrid from "./AllBlogGrid";
import DynamicTitle from "../../../Shared/DynamicTitle/DynamicTitle";
import { useState } from "react";
import Pagination from "../../../Shared/Pagination/Pagination";

const AllBlogs = () => {
  DynamicTitle("Blogs");
  const [count, setCount] = useState(1);
  let limit = 9;
  const skip = (count - 1) * limit;
  // react query
  const { data: seeAllBlogs, isLoading } = useQuery(["SeeAllBlogs"], () =>
    fetch("https://child-adoption-system-server.onrender.com/allBlogs", {
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
    <section className="pt-16">
      <div className="bg-info py-10">
        <h1 className="text-center text-2xl font-bold uppercase text-white">
          All Blog
        </h1>
        <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-10 items-start">
        {seeAllBlogs
          ?.slice(skip, skip + limit)
          ?.reverse()
          ?.map((blog) => (
            <AllBlogGrid key={blog._id} blog={blog}></AllBlogGrid>
          ))}
      </div>

      {/* pagination */}
      {seeAllBlogs.length >= limit && (
        <Pagination
          data={seeAllBlogs}
          count={count}
          setCount={setCount}
          limit={limit}
        ></Pagination>
      )}
    </section>
  );
};

export default AllBlogs;
