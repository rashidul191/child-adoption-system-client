import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";
import Loading from "../../Shared/Loading/Loading";

const MyReview = () => {
  DynamicTitle("Add Review");
  const [user] = useAuthState(auth);
  const { data: userInfo, isLoading } = useQuery(["userDB"], () =>
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/user/email/?email=${user?.email}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    ).then((res) => res.json())
  );

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    const review = {
      displayName: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
      img: userInfo?.data?.img,
      rating: event.target.rating.value,
      comment: event.target.comment.value,
    };

    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/review/${user?.email}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify(review),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.acknowledged) {
          toast.success("Thanks your comment / feedback");
          event.target.reset();
        } else {
          toast.error("Error! Try Again");
          event.target.reset();
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <section>
      <h1 className="md:text-xl font-bold uppercase">My Review</h1>
      <hr />
      <div className=" bg-base-100 ">
        <form onSubmit={handleReviewSubmit}>
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Name: </span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              name="displayName"
              value={user?.displayName}
              readOnly
              disabled
              className="input input-accent w-full max-w-md"
            />
          </div>

          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Email: </span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              name="email"
              value={user?.email}
              readOnly
              disabled
              className="input input-accent w-full max-w-md"
            />
          </div>

          <div>
            <label htmlFor="rating" className="label">
              <span className="label-text">Rating: </span>
            </label>
            <select
              id="rating"
              name="rating"
              className="select select-accent w-full max-w-md"
            >
              <option selected value={5}>
                5
              </option>
              <option value={4}>4</option>
              <option value={3}>3</option>
              <option value={2}>2</option>
              <option value={1}>1</option>
            </select>
            <div className="form-control">
              <label htmlFor="comment" className="label">
                <span className="label-text">Comment: </span>
              </label>
              <textarea
                className="textarea textarea-accent h-24  w-full max-w-md"
                id="comment"
                name="comment"
                placeholder="any comment and feedback here"
              ></textarea>
            </div>
          </div>
          <input
            className="btn btn-primary w-full max-w-md text-white mt-5"
            type="submit"
            value="Review"
          />
        </form>
      </div>
    </section>
  );
};

export default MyReview;
