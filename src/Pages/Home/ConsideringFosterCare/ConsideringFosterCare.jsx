import {
  faBookOpenReader,
  faChalkboardUser,
  faFileLines,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Zoom, LightSpeed, Bounce } from "react-reveal";

const ConsideringFosterCare = () => {
  return (
    <section className="pt-10 md:pt-5">
      <Zoom>
        <div>
          <h1 className="text-center text-3xl font-bold uppercase">
            Considering Foster Care or Adoption?
          </h1>
          <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
        </div>
      </Zoom>

      <div className="card lg:card-side bg-base-100 rounded-none mt-10">
        <LightSpeed left>
          <figure className="">
            <img
              width={550}
              className="hidden md:block"
              src="https://i.ibb.co/7Y8ZxBt/child-pic.jpg"
              alt="img-here"
            />
          </figure>
        </LightSpeed>
        <div className="card-body grid grid-cols-1 md:grid-cols-2 gap-10 text-center">
          <Bounce top>
            <div className="box">
              <FontAwesomeIcon
                className="text-8xl mr-4 text-[#CCD47E]"
                icon={faFileLines}
              ></FontAwesomeIcon>
              <h2 className="text-2xl font-bold">Apply Online</h2>
              <p className="font-sans">
                You can submit Application with no obligation and no fee.
              </p>
            </div>
          </Bounce>
          <Bounce top>
            <div className="box">
              <FontAwesomeIcon
                className="text-8xl mr-4  text-[#BDCDE6]"
                icon={faBookOpenReader}
              ></FontAwesomeIcon>
              <h2 className="text-2xl font-bold">Adoption Funding Options</h2>
              <p className="font-sans">
                Apply for our Adoption Support Fund and additional resources.
              </p>
            </div>
          </Bounce>

          <Bounce bottom>
            <div className="box">
              <Link to={"/contact-us"}>
                {" "}
                <FontAwesomeIcon
                  className="text-8xl mr-4  text-[#f2c821]"
                  icon={faUsers}
                ></FontAwesomeIcon>
                <h2 className="text-2xl font-bold">Contact Us</h2>
                <p className="font-sans">
                  Our staff are here to answer all of your adoption and foster
                  care questions.
                </p>
              </Link>
            </div>
          </Bounce>
          <Bounce bottom>
            <div className="box">
              <FontAwesomeIcon
                className="text-8xl mr-4  text-[#eca76b]"
                icon={faChalkboardUser}
              ></FontAwesomeIcon>
              <h2 className="text-2xl font-bold">Informational Meeting</h2>
              <p className="font-sans">
                In-person and online webinars on our foster care and adoption
                programs.
              </p>
            </div>
          </Bounce>
        </div>
      </div>
    </section>
  );
};

export default ConsideringFosterCare;
