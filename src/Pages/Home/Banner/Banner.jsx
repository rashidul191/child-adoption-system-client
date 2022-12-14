import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="lg:pt-16">
      <div
        className="hero h-[500px] sm:h-[650px] 2xl:min-h-screen w-full"
        style={{
          backgroundImage: `url("https://fis-pune.com/wp-content/uploads/2022/05/istockphoto-1160932512-612x612-1.jpeg")`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className=" text-4xl font-bold">Every Child Should Get</h1>
            <h1 className="mb-5 text-3xl font-bold">
              A Quality Place and Education
            </h1>
            <p className="mb-5">You can change a life of your support.</p>
            <Link to={"/donation"}>
              <button className="btn btn-secondary rounded-none">
                Donate Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* <div>
        <div className="carousel-item">
          <img src="https://placeimg.com/400/300/arch" alt="Drink" />
        </div>
        <div className="carousel-item">
          <img src="https://placeimg.com/400/300/arch" alt="Drink" />
        </div>
        <div className="carousel-item">
          <img src="https://placeimg.com/400/300/arch" alt="Drink" />
        </div>
        <div className="carousel-item">
          <img src="https://placeimg.com/400/300/arch" alt="Drink" />
        </div>
        <div className="carousel-item">
          <img src="https://placeimg.com/400/300/arch" alt="Drink" />
        </div>
        <div className="carousel-item">
          <img src="https://placeimg.com/400/300/arch" alt="Drink" />
        </div>
      </div>
    </div> */}
    </section>
  );
};

export default Banner;
