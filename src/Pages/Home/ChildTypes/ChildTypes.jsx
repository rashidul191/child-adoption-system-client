import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const ChildTypes = () => {
  return (
    <div className="my-10 md:my-16">
      <div>
        <h1 className="text-center text-2xl font-bold uppercase">Child Type</h1>
        <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <div className="card w-80 md:w-96 bg-base-100 shadow-xl mx-auto">
          <figure className="px-10 pt-10 ">
            <img
              src="https://i.ibb.co/BLTd83g/Infant-Child.png"
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
        <div className="card w-80 md:w-96 bg-base-100 shadow-xl mx-auto">
          <figure className="px-10 pt-10">
            <img
              src="https://i.ibb.co/z7bmSD1/Foster-Care-Child.png"
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
        <div className="card w-80 md:w-96 bg-base-100 shadow-xl mx-auto">
          <figure className="px-10 pt-10">
            <img
              src="https://i.ibb.co/0YgbbPC/Street-Child.png"
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
