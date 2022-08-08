import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const ChildTypes = () => {
  return (
    <div className="my-10 md:my-28">
      <h1 className="text-center text-2xl">Child Info</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mx-auto">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src="https://placeimg.com/400/225/arch"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <p className="link link-hover text-blue-500">
              <Link to={`/childType/Infant-Child`}>
                Infant Child
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
              </Link>
            </p>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src="https://placeimg.com/400/225/arch"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <p className="link link-hover text-blue-500">
              <Link to={`/childType/Foster-Care-Child`}>
              Foster Care Child
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
              </Link>
            </p>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src="https://placeimg.com/400/225/arch"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <p className="link link-hover text-blue-500">
              <Link to={`/childType/Street-Child`}>
              Street Child
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildTypes;
