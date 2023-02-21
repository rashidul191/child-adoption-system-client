import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Swal from "sweetalert2";
import auth from "../../../../firebase.init";

const UserCommentAre = ({ userBlogComment }) => {
  const [user] = useAuthState(auth);
  const [deleteComment, setDeleteComment] = useState(false);
  const { _id, userImg, userName, userComment } = userBlogComment;

  const handleDeleteComment = (id) => {
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/userComment/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data?.data);
        if (data?.data?.deletedCount > 0) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Delete Comment",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload();
        }
      });
  };

  // console.log(userBlogComment);
  return (
    <div className="my-3">
      <div className="flex justify-start items-start">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={userImg} alt="img-here" />
          </div>
        </div>

        <div className="bg-[#F0F2F5] p-2 rounded-lg text-sm">
          <div className="flex justify-start items-start">
            <div>
              <p>
                <span className="font-semibold">{userName}</span>
              </p>
              <p className="">{userComment} </p>
            </div>
            {user?.email === userBlogComment?.userEmail && (
              <button
                onClick={() => setDeleteComment(!deleteComment)}
                className="text-xl font-bold rotate-90 ml-3"
              >
                ...
              </button>
            )}
          </div>
        </div>
      </div>
      {/* comment delete btn */}
      <div>
        {deleteComment && (
          <button
            onClick={() => handleDeleteComment(_id)}
            className="btn btn-error btn-sm text-white text-xs ml-56"
          >
            <FontAwesomeIcon icon={faTrashCan} /> Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCommentAre;
