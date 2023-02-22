import React from "react";
import { Link } from "react-router-dom";

const DesignDonatePage = () => {
  return (
    <section className="mx-10 mb-10">
      <div className="hero bg-[#EBF1F6] md:p-10">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="https://i.ibb.co/6Y6rVBF/child.png"
            className=" rounded-lg shadow-2xl"
            alt="img"
          />

          <div className="md:ml-20">
            <h1 className="text-2xl md:text-4xl font-bold">
              Help a Child in Greatest Need
            </h1>
            <p className="py-6 text-justify font-semibold">
              Give emergency help to a child who is sick, or living in dangerous
              conditions. Your gift will provide the critical food, medical
              care, safety, and more they need when they need it the most.
            </p>
            <Link to={"/donation"}>
              <button className="btn btn-secondary font-bold">Donate</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignDonatePage;
