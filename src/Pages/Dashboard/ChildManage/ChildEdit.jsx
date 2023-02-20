import React from "react";

const ChildEdit = ({ childWithId }) => {
  console.log(childWithId);
  const {
    _id,
    img,
    name,
    age,
    childType,
    city,
    description,
    disabilities,
    location,
    gender,
    religion,
  } = childWithId;
  return (
    <div>
      <h1>Coming soon</h1>
    </div>
  );
};

export default ChildEdit;
