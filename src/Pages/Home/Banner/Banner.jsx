import React from "react";

const Banner = () => {
  return (
    <section>
      <div
        className="hero min-h-screen"
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
            <p className="mb-5">You can change a life with your support.</p>
            <button className="btn btn-primary">Donate Now</button>
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
