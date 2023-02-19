import React, { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../../../firebase.init";
import SocialLogin from "../../../Login/SocialLogin/SocialLogin";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";
import { useState } from "react";

const BlogCommentInput = ({ blog }) => {
  const [error, setError] = useState(false);
  const { _id } = blog?.data;
  const userComment = useRef("");
  const [user] = useAuthState(auth);

  const { data: blogWithId, isLoading } = useQuery(["blogWithId"], () =>
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/blog/${_id}`,
      {
        method: "GET",
      }
    ).then((res) => res.json())
  );
  if (isLoading) {
    <Loading></Loading>;
  }

  const handleUserComment = (event) => {
    event.preventDefault();
    const userCommentText = userComment.current.value.length;
    if (userCommentText >= 201) {
      setError(true);
    } else {
      setError(false);
      const userCommentInfo = {
        userName: user?.displayName,
        userEmail: user?.email,
        userImg: user?.photoURL,
        userComment: userComment.current.value,
        blogData: blogWithId?.data,
      };
      fetch(
        `https://child-adoption-system-server.onrender.com/api/v1/userComment`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(userCommentInfo),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.data?.insertedId) {
            toast.success("comments done");
          }
          window.location.reload();
        });
    }
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleUserComment}>
        <div className="form-control">
          <label id="comment" className="label">
            <p className="text-xl font-bold">Say Something! :</p>
          </label>
          <textarea
            ref={userComment}
            required
            id="comment"
            className="textarea textarea-bordered h-28 w-full"
            placeholder="Write a comment..."
          ></textarea>
        </div>
        {error ? (
          <>
            <span className="bg-red-500 text-sm text-white px-2 rounded-md">
              The comment is long. comment maximum 200 characters
            </span>
          </>
        ) : (
          ""
        )}
        <div>
          {user?.email ? (
            <input
              className={`btn btn-primary rounded-none text-white font-bold mt-5 md:w-52`}
              type="submit"
              value="Comment"
            />
          ) : (
            <div>
              <button className="btn btn-primary rounded-none text-white font-bold my-5 md:w-52">
                <Link to={"/login"}>Comment</Link>
              </button>
              <SocialLogin></SocialLogin>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default BlogCommentInput;
