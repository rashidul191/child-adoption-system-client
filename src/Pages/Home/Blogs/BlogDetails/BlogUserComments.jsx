import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";
import UserCommentAre from "./UserCommentAre";

const BlogUserComments = ({ blog }) => {
  const { data: blogWithComment, isLoading } = useQuery(
    ["blogWithComment"],
    () =>
      fetch(
        `https://child-adoption-system-server.onrender.com/api/v1/userComment`,
        {
          method: "GET",
        }
      ).then((res) => res.json())
  );
  if (isLoading) {
    <Loading></Loading>;
  }

  const commentBlog = blogWithComment?.data?.filter(
    (blogComment) => blogComment?.blogData?._id === blog?.data?._id
  );
  return (
    <div>
      {commentBlog
        ?.slice(0, 9)
        ?.reverse()
        ?.map((userBlogComment) => (
          <UserCommentAre userBlogComment={userBlogComment}></UserCommentAre>
        ))}
    </div>
  );
};

export default BlogUserComments;
