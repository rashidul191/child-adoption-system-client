import React from "react";
import { useNavigate } from "react-router-dom";

const AgencyGrid = ({ agency }) => {
  const navigate = useNavigate();
  const { _id, agencyImg, agencyName, agencyLocation, description } = agency;
  let setDescription;
  if (description.length > 50) {
    setDescription = <p>{description.slice(0, 50)}...</p>;
  } else {
    setDescription = <p>{description}</p>;
  }

  const handleAgencyLearnMore = (id) => {
    navigate(`/agency/${id}`);
  };
  return (
    <div className="card w-5/6 bg-base-100 shadow-xl mx-auto md:my-5">
      <figure>
        <img src={agencyImg} alt={agencyName} />
      </figure>
      <div className="card-body">
        <h2 className="text-xl font-bold uppercase">{agencyName}</h2>
        <span className="my-0">{agencyLocation}</span>
        <span className="my-0"> {setDescription}</span>
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
