import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Fade, Zoom } from "react-reveal";

const ChildTypesAll = () => {
  return (
    <div className=" pb-16 sm:pt-16 sm:pb-24">
      <Zoom>
        <div className="bg-info py-10">
          <h1 className="text-center text-3xl font-bold uppercase">
            Child Types
          </h1>
          <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
        </div>
      </Zoom>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        <Fade left big>
          <div className="card w-80 md:w-96 bg-base-100 shadow-md md:shadow-none md:border mx-auto">
            <Link to={`/childType/Infant-Child`}>
              <figure className="px-10 hover:px-6 pt-10 ">
                <img
                  src="https://i.ibb.co/BLTd83g/Infant-Child.png"
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center font-bold">
                <p className="link link-hover text-blue-500">
                  Infant Child
                  <FontAwesomeIcon
                    className="ml-2"
                    icon={faArrowRight}
                  ></FontAwesomeIcon>
                </p>
              </div>
            </Link>
          </div>
        </Fade>

        <Fade top>
          <div className="card w-80 md:w-96 bg-base-100 shadow-md md:shadow-none md:border mx-auto">
            <Link to={`/childType/Foster-Care-Child`}>
              <figure className="px-10 hover:px-6 pt-10">
                <img
                  src="https://i.ibb.co/z7bmSD1/Foster-Care-Child.png"
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center font-bold">
                <p className="link link-hover text-blue-500">
                  Foster Care Child
                  <FontAwesomeIcon
                    className="ml-2"
                    icon={faArrowRight}
                  ></FontAwesomeIcon>
                </p>
              </div>
            </Link>
          </div>
        </Fade>

        <Fade right big>
          <div className="card w-80 md:w-96 bg-base-100 shadow-md md:shadow-none md:border mx-auto">
            <Link to={`/childType/Street-Child`}>
              <figure className="px-10 hover:px-6 pt-10">
                <img
                  src="https://i.ibb.co/0YgbbPC/Street-Child.png"
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center font-bold">
                <p className="link link-hover text-blue-500">
                  Street Child
                  <FontAwesomeIcon
                    className="ml-2"
                    icon={faArrowRight}
                  ></FontAwesomeIcon>
                </p>
              </div>
            </Link>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default ChildTypesAll;
