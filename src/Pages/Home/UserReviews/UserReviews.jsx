import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import UserReview from "./UserReview";

const UserReviews = () => {
  const { data: reviews, isLoading } = useQuery(["review"], () =>
    fetch("https://child-adoption-system-server.onrender.com/reviews", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  const settings2 = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <section className="my-10 py-10 bg-[#EBF1F6]">
      <div>
        <h1 className="text-center text-2xl font-bold uppercase">
          User Reviews
        </h1>
        <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
      </div>
      <div className="md:hidden">
        <Slider {...settings}>
          {reviews
            ?.slice(0, 12)
            ?.reverse()
            ?.map((review) => (
              <UserReview key={review._id} review={review}></UserReview>
            ))}
        </Slider>
      </div>
      <div className="hidden md:block">
        <Slider {...settings2}>
          {reviews
            ?.slice(0, 12)
            ?.reverse()
            ?.map((review) => (
              <UserReview key={review._id} review={review}></UserReview>
            ))}
        </Slider>
      </div>
    </section>
  );
};

export default UserReviews;
