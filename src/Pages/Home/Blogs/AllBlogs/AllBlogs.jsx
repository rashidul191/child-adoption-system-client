import React from "react";
import Loading from "../../../Shared/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import AllBlogGrid from "./AllBlogGrid";

const AllBlogs = () => {
  // react query
  const { data: SeeAllBlogs, isLoading } = useQuery(["SeeAllBlogs"], () =>
    fetch("http://localhost:5000/allBlogs", {
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
    <section>
      <div className="bg-info py-10">
        <h1 className="text-center text-2xl font-bold uppercase text-white">
          All Blog
        </h1>
        <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: " row-reverse",
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-10 items-start"
      >
        {SeeAllBlogs?.map((blog) => (
          <AllBlogGrid key={blog._id} blog={blog}></AllBlogGrid>
        ))}
      </div>
    </section>
  );
};

export default AllBlogs;
