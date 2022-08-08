import React from "react";
import { useParams } from "react-router-dom";

const AllChild = () => {
  const { childType } = useParams();

  return (
    <div>
      <h1>{childType}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius dolor
        cumque expedita praesentium neque sit cum at illum id. Laudantium.
      </p>
    </div>
  );
};

export default AllChild;
