import React from "react";

const UserCommentAre = ({ userBlogComment }) => {
  const { userImg, userName, userComment } = userBlogComment;
  return (
    <div className="my-3">
      <div className="flex justify-start items-start">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={userImg} alt="img-here" />
          </div>
        </div>

        <div className="bg-[#F0F2F5] p-2 rounded-lg text-sm">
          <p>
            <span className="font-semibold">{userName}</span>
          </p>
          <p className="">{userComment} </p>
        </div>
      </div>
    </div>
  );
};

export default UserCommentAre;
