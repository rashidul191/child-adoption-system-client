import React from "react";

const UserReview = ({ review }) => {
  // console.log(review);
  const { displayName, comment, rating } = review;
  let commentText;
  if (comment.length > 150) {
    commentText = <p>{comment.slice(0, 150)}....</p>;
  } else {
    commentText = <p>{comment}</p>;
  }
  return (
    <div className="card h-[300px] w-4/5 bg-base-100 rounded-none mx-auto my-5">
      {/* <figure className="px-10 pt-10">
        <img
          src="https://placeimg.com/400/225/arch"
          alt="Shoes"
          className="rounded-xl"
        />
      </figure> */}
      <div className="avatar">
        <div className="w-24 mx-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img
            src="https://i.ibb.co/tmprR1w/profile-icon.webp"
            alt="user-image"
          />
        </div>
      </div>
      <div className="card-body items-center text-center">
        <h2 className="text-2xl font-bold">{displayName}</h2>
        <div className="card-actions">
          <p className="font-bold text-secondary">Rating: {rating}</p>
        </div>
        <span>{commentText}</span>
      </div>
    </div>
  );
};

export default UserReview;
