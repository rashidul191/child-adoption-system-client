import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import DynamicTitle from "../../../Shared/DynamicTitle/DynamicTitle";

const Children = (props) => {
  DynamicTitle("Children");
  const { img, name, age, location, _id } = props.children;

  return (
    <div className="card md:w-60  lg:w-96 bg-base-100 shadow-md mx-auto my-3">
      <figure className="px-10 pt-10">
        <img width={180} src={img} alt={name} className="rounded-xl" />
      </figure>
      <div className="card-body text-center">
        <h2>
          Name: <span className="text-xl font-bold"> {name}</span>
        </h2>
        <p>
          Age: <span className="font-bold"> {age}</span>
        </p>
        <p>
          Location: <span className="font-bold"> {location}</span>
        </p>
        <div className="card-actions justify-center md:justify-end">
          <Link to={`/child/${_id}`}>
            {" "}
            <button className="btn btn-info btn-sm text-white">
              More Details
              <FontAwesomeIcon
                className="ml-2"
                icon={faArrowRight}
              ></FontAwesomeIcon>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Children;
