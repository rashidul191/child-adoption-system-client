import React, { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../../../firebase.init";
import SocialLogin from "../../../Login/SocialLogin/SocialLogin";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";
import { useState } from "react";
import Swal from "sweetalert2";

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
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Comment Done",
              showConfirmButton: false,
              timer: 1500,
            });
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
              {/* The button to open modal */}
              <label
                htmlFor="my-modal-3"
                className="btn btn-primary rounded-none text-white font-bold my-5 md:w-52"
              >
                Comment
              </label>
            </div>
          )}
        </div>

        {/* login modal here */}

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold text-center mb-4">
              Please Login, Before comments !!!
            </h3>

            <div className="flex flex-col border-opacity-50">
              <button className="btn btn-success text-white font-bold w-52 ml-20 sm:ml-32">
                {" "}
                <Link to={"/login"}>Login</Link>
              </button>
              <div className="divider">OR</div>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogCommentInput;
