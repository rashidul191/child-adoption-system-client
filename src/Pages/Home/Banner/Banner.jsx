import React from "react";
import { Link } from "react-router-dom";
import bannerPic1 from "../../../images/banner-pic-1.jpg";
import bannerPic2 from "../../../images/banner-pic-2.jpg";
import bannerPic3 from "../../../images/banner-pic-3.jpg";
import Slider from "react-slick";
import { LightSpeed } from "react-reveal";

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
        <LightSpeed left>
          <div className="card rounded-none image-full">
            <figure className="rounded-none">
              <img src={bannerPic1} alt="image1" />
            </figure>
            <div className="card-body justify-end items-center mt-16">
              <h2 className="text-2xl md:text-5xl font-bold">
                STREET IS NO HOME
              </h2>
              <h4 className="text-xs sm:text-xl">
                We are trying to help the most vulnerable street children in
                Bangladesh.
              </h4>
              <Link to={"/donation"}>
                <button className="btn btn-primary btn-sm text-xs sm:btn-md rounded-none font-bold text-white">
                  Donate Now
                </button>
              </Link>
            </div>
          </div>
        </LightSpeed>

        <div>
          <div className="card rounded-none image-full ">
            <figure className="rounded-none">
              <img src={bannerPic2} alt="image2" />
            </figure>
            <div className="card-body justify-end items-center mt-12">
              <h1 className="text-xl md:text-5xl font-bold">
                Every Child Should Get
              </h1>
              <h1 className="text-xl md:text-4xl font-bold">
                A Quality Place and Education
              </h1>
              <h5 className="text-xs sm:text-xl">
                Insha Allah !! You can change a life of your support.
              </h5>
              <Link to={"/donation"}>
                <button className="btn btn-secondary btn-sm text-xs sm:btn-md rounded-none font-bold">
                  Donate Now
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="card rounded-none image-full">
            <figure className="rounded-none">
              <img src={bannerPic3} alt="image3" />
            </figure>
            <div className="card-body justify-end items-center mt-[85px]">
              <h2 className="text-xl md:text-5xl font-bold">
                Our staff are here to answer
              </h2>
              <h4 className="text-xs sm:text-xl">
                all of your adoption and foster care questions.
              </h4>
              <Link to={"/contact-us"}>
                <button className="btn btn-primary btn-sm text-xs sm:btn-md rounded-none font-bold text-white">
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
