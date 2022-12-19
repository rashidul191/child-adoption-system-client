import React from "react";

const Pagination = ({ data, count, setCount, limit }) => {
  return (
    <div className="flex justify-center mt-10">
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
          disabled={count * limit > data.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
