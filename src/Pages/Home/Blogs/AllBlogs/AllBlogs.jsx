import React from "react";
import Loading from "../../../Shared/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import AllBlogGrid from "./AllBlogGrid";
import DynamicTitle from "../../../Shared/DynamicTitle/DynamicTitle";
import { useState } from "react";
import Pagination from "../../../Shared/Pagination/Pagination";
import RelatedBlogs from "../RelatedBlogs";
import FirstBlog from "./FirstBlog";
import SecondBlog from "./SecondBlog";

const AllBlogs = () => {
  DynamicTitle("Blogs");
  const [count, setCount] = useState(1);
  let limit = 9;
  const skip = (count - 1) * limit;

  // react query
  const { data: seeAllBlogs, isLoading } = useQuery(["SeeAllBlogs"], () =>
    fetch("https://child-adoption-system-server.onrender.com/api/v1/blog", {
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
    <section className="md:pt-16">
      <div className="bg-info py-10">
        <h1 className="text-center text-2xl font-bold uppercase text-white">
          Blogs
        </h1>
        <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:mx-20 my-10 items-start">
        <div className="hidden md:block">
          <p className=" font-bold text-xl">Latest Blog</p>
          {seeAllBlogs?.data
            ?.slice(seeAllBlogs?.data.length - 1, seeAllBlogs?.data.length)
            ?.reverse()
            ?.map((blog) => (
              <FirstBlog key={blog._id} blog={blog}></FirstBlog>
            ))}
          {seeAllBlogs?.data
            ?.slice(seeAllBlogs?.data.length - 3, seeAllBlogs?.data.length - 1)
            ?.reverse()
            ?.map((blog) => (
              <SecondBlog key={blog._id} blog={blog}></SecondBlog>
            ))}
        </div>
        <div className="mx-3">
          <div className="hidden sm:block">
            {seeAllBlogs?.data
              ?.slice(skip, skip + (seeAllBlogs?.data.length - 3))
              ?.reverse()
              ?.map((blog) => (
                <AllBlogGrid key={blog._id} blog={blog}></AllBlogGrid>
              ))}
          </div>
          <div className="sm:hidden">
            {seeAllBlogs?.data
              ?.slice(skip, skip + limit)
              ?.reverse()
              ?.map((blog) => (
                <RelatedBlogs key={blog._id} blog={blog}></RelatedBlogs>
              ))}
          </div>
        </div>
      </div>
      {/* pagination */}
      <div className="hidden md:block ">
        {seeAllBlogs?.data?.length >= limit - 4 && (
          <Pagination
            dataLength={seeAllBlogs?.data.length - 4}
            count={count}
            setCount={setCount}
            limit={limit - 4}
          ></Pagination>
        )}
      </div>
      <div className="block md:hidden">
        {seeAllBlogs?.data?.length >= limit && (
          <Pagination
            dataLength={seeAllBlogs?.data.length}
            count={count}
            setCount={setCount}
            limit={limit}
          ></Pagination>
        )}
      </div>
    </section>
  );
};

export default AllBlogs;
