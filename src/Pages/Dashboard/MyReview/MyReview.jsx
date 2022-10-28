import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";

const MyReview = () => {
  DynamicTitle("Add Review");
  const [user] = useAuthState(auth);

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    // const displayName = user?.displayName;
    // const email = user?.email;
    // const rating = event.target.rating.value;
    // const comment = event.target.comment.value;
    const review = {
      displayName: user?.displayName,
      email: user?.email,
      rating: event.target.rating.value,
      comment: event.target.comment.value,
    };

    fetch(`http://localhost:5000/reviews/${user?.email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.acknowledged) {
          toast.success("Thanks your comment/ feedback");
          event.target.reset();
        } else {
          toast.error("Error! Try Again");
          event.target.reset();
        }
      });
  };

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
