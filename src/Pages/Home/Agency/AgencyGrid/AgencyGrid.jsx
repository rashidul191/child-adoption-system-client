import React from "react";
import { useNavigate } from "react-router-dom";

const AgencyGrid = ({ agency }) => {
  const navigate = useNavigate();
  const { _id, agencyImg, agencyName, agencyLocation, description } = agency;
  let setDescription;
  if (description.length > 50) {
    setDescription = <p>{description.slice(0, 50)}...</p>;
  } else {
    setDescription = description;
  }

  const handleAgencyLearnMore = (id) => {
    console.log(id);
    navigate(`/agency/${id}`);
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl mx-auto md:my-5">
      <figure>
        <img src={agencyImg} alt={agencyName} />
      </figure>
      <div className="card-body">
        <h2 className="text-xl font-bold uppercase">{agencyName}</h2>
        <p className="my-0">{agencyLocation}</p>
        <p className="my-0"> {setDescription}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleAgencyLearnMore(_id)}
            className="btn btn-primary text-white"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgencyGrid;
