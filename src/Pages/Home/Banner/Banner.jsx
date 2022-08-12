import React from "react";

const Banner = () => {
  return (
    <div>
      <div className="carousel carousel-end">
        <div className="carousel-item">
          <div
            class="hero min-h-screen"
            style={{
              backgroundImage: `url("https://placeimg.com/1000/800/arch")`,
            }}
          >
            <div class="hero-overlay bg-opacity-60"></div>
            <div class="hero-content text-center text-neutral-content">
              <div class="max-w-md">
                <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
                <p class="mb-5">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button class="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
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
        <div className="carousel-item">
          <img src="https://placeimg.com/400/300/arch" alt="Drink" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
