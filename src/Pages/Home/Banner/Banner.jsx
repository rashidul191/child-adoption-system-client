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
          <div className="max-w-md mt-36">
            <h1 className="text-3xl md:text-4xl font-bold">
              Every Child Should Get
            </h1>
            <h1 className="my-3 text-2xl md:text-3xl font-bold">
              A Quality Place and Education
            </h1>
            <p className="my-5">
              Insha Allah !! You can change a life of your support.
            </p>
            <Link to={"/donation"}>
              <button className="btn btn-secondary rounded-none font-bold">
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
