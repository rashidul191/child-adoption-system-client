import React from "react";

const Pagination = ({ dataLength, count, setCount, limit }) => {
  console.log("Data Length Pagination: ", dataLength);
  return (
    <div className="flex justify-center my-10">
      <div className="btn-group ">
        <button
          onClick={() => setCount(count - 1)}
          className="btn btn-outline"
          disabled={count <= 1}
        >
          Previous
        </button>

        <button
          onClick={() => setCount(count + 1)}
          className="btn btn-outline"
          disabled={count * limit > dataLength - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
