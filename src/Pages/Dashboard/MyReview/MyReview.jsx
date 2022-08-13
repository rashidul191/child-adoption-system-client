import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";

const MyReview = () => {
  const [user] = useAuthState(auth);

  const handleReviewSubmit = (event) => {
    event.preventDefault();

    const displayName = user?.displayName;
    const email = user?.email;
    const rating = event.target.rating.value;
    const comment = event.target.comment.value;
    const review = {
      displayName,
      email,
      rating,
      comment,
    };

    fetch(`http://localhost:5000/reviews/${email}`, {
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
    <div>
      <h1 className="md:text-xl font-bold uppercase">My Review</h1>
      <hr />
      <div className=" bg-base-100 ">
        <form onSubmit={handleReviewSubmit}>
          <div class="form-control w-full max-w-md">
            <label class="label">
              <span class="label-text">Name: </span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              name="displayName"
              value={user?.displayName}
              readOnly
              disabled
              class="input input-accent w-full max-w-md"
            />
          </div>

          <div class="form-control w-full max-w-md">
            <label class="label">
              <span class="label-text">Email: </span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              name="email"
              value={user?.email}
              readOnly
              disabled
              class="input input-accent w-full max-w-md"
            />
          </div>

          <div>
            <label htmlFor="rating" class="label">
              <span class="label-text">Rating: </span>
            </label>
            <select
              id="rating"
              name="rating"
              class="select select-accent w-full max-w-md"
            >
              <option selected value={5}>
                5
              </option>
              <option value={4}>4</option>
              <option value={3}>3</option>
              <option value={2}>2</option>
              <option value={1}>1</option>
            </select>
            <div class="form-control">
              <label htmlFor="comment" class="label">
                <span class="label-text">Comment: </span>
              </label>
              <textarea
                class="textarea textarea-accent h-24  w-full max-w-md"
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
    </div>
  );
};

export default MyReview;
