import React from "react";
import Loading from "../../Shared/Loading/Loading";
import BlogRow from "./BlogRow";
import { useQuery } from "@tanstack/react-query";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";
import { useState } from "react";
import Pagination from "../../Shared/Pagination/Pagination";

const BlogManage = () => {
  DynamicTitle("Blogs Manage");
  const [count, setCount] = useState(1);
  let limit = 8;
  const skip = (count - 1) * limit;
  // react query
  const {
    data: allBlogs,
    isLoading,
    refetch,
  } = useQuery(["allBlogsManage"], () =>
  //  fetch(`https://child-adoption-system-server.onrender.com/allBlogs`, {
    fetch(`http://localhost:5000/api/v1/blog`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <section>
      <h1 className="md:text-xl font-bold uppercase">Blog Manage</h1>
      <hr />

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Blog Title</th>
              <th>Blog By</th>
              <th>Post Date</th>
              <th>Delete</th>
            </tr>
          </thead>

          {allBlogs?.data?.length <= 0 ? (
            <div className="text-center text-error">
              <p>sorry have a no agency </p>
              <p>Add New Agency</p>
            </div>
          ) : (
            <tbody>
              {allBlogs?.data?.slice(skip, skip + limit)?.map((blog, index) => (
                <BlogRow
                  key={blog._id}
                  blog={blog}
                  index={index}
                  refetch={refetch}
                ></BlogRow>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* pagination */}
      {allBlogs?.data?.length >= limit && (
        <Pagination
          data={allBlogs?.data}
          count={count}
          setCount={setCount}
          limit={limit}
        ></Pagination>
      )}
    </section>
  );
};

export default BlogManage;
