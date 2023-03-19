import React from "react";
import { Link } from "react-router-dom";
import bannerPic1 from "../../../images/banner-pic-1.jpg";
import bannerPic2 from "../../../images/banner-pic-2.jpg";
import bannerPic3 from "../../../images/banner-pic-3.jpg";
import Slider from "react-slick";

const Banner = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  return (
    <section className="lg:pt-16 text-center">
      <Slider {...settings}>
        <div>
          <div className="card rounded-none image-full">
            <figure>
              <img src={bannerPic1} alt="image1" />
            </figure>
            <div className="card-body justify-end items-center mt-16">
              <h2 className="text-2xl md:text-5xl font-bold">
                Tell us what you think!
              </h2>
              <h4 className="text-xs sm:text-xl">
                Complete our quick survey about Post Adoption Services. <br />{" "}
                Your feedback is important as we look to refresh our services.
              </h4>
            </div>
          </div>
        </div>
        <div>
          <div className="card rounded-none image-full ">
            <figure>
              <img src={bannerPic2} alt="image2" />
            </figure>
            <div className="card-body justify-end items-center mt-6">
              <h1 className="text-xl md:text-5xl font-bold">
                Every Child Should Get
              </h1>
              <h1 className="text-xl md:text-4xl font-bold">
                A Quality Place and Education
              </h1>
              <h5 className="text-xs sm:text-xl"> Insha Allah !! You can change a life of your support.</h5>
              <Link to={"/donation"}>
                <button className="btn btn-secondary btn-sm text-xs sm:btn-lg sm:text-xl rounded-none font-bold">
                  Donate Now
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="card rounded-none image-full">
            <figure>
              <img src={bannerPic3} alt="image3" />
            </figure>
            <div className="card-body justify-end items-center mt-7">
              <h2 className="text-xl md:text-5xl font-bold">
                Our staff are here to answer
                <br />
                all of your adoption and foster care questions.
              </h2>
              <Link to={"/contact-us"}>
                <button className="btn btn-primary btn-sm text-xs sm:btn-lg sm:text-xl rounded-none font-bold">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default Banner;
