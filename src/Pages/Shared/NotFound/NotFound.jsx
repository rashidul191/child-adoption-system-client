import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="pt-16">
      <div className="text-center text-error my-10 md:my-32">
        <h1 className="text-5xl font-bold">404</h1>
        <h4 className="text-xl">Error !!! Sorry Page Not Found</h4>
        <p className="text-blue-500 underline">
          <Link to="/">
            <FontAwesomeIcon icon={faArrowLeft} />
            Back To Home
          </Link>
        </p>
      </div>
    </section>
  );
};

export default NotFound;
