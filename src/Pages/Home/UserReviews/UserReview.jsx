import React from "react";

const UserReview = ({ review }) => {
  const { displayName, comment, rating, photoURL, img } = review;
  return (
    <div className="card h-[300px] w-11/12 bg-base-100 rounded-none mx-auto mb-5">
      <div className="avatar">
        <div className="w-20 mx-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img
            src={
              img || photoURL || "https://i.ibb.co/tmprR1w/profile-icon.webp"
            }
            alt="user-image"
          />
        </div>
      </div>
      <div className="items-center text-center m-4">
        <h2 className="text-2xl font-bold">{displayName}</h2>
        <div className="">
          <p className="font-bold text-secondary">Rating:{rating}</p>
        </div>
        <span>{`${
          comment.length > 120 ? `${comment.slice(0, 120)} ....` : comment
        }`}</span>
      </div>
    </div>
  );
};

export default UserReview;
