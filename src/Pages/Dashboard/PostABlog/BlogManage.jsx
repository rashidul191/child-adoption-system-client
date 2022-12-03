import React from "react";
import Loading from "../../Shared/Loading/Loading";
import BlogRow from "./BlogRow";
import { useQuery } from "@tanstack/react-query";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";

const BlogManage = () => {
  DynamicTitle("Blogs Manage");
  // react query
  const {
    data: allBlogs,
    isLoading,
    refetch,
  } = useQuery(["allBlogsManage"], () =>
    fetch(`https://child-adoption-system-server.onrender.com/allBlogs`, {
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
              <th>Post Date</th>
              <th>Delete Agency</th>
            </tr>
          </thead>

          {allBlogs.length <= 0 ? (
            <div className="text-center text-error">
              <p>sorry have a no agency </p>
              <p>Add New Agency</p>
            </div>
          ) : (
            <tbody>
              {allBlogs?.map((blog, index) => (
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
    </section>
  );
};

export default BlogManage;
