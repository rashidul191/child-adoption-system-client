import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import DynamicTitle from "../../../Shared/DynamicTitle/DynamicTitle";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";

const Children = (props) => {
  DynamicTitle("Children");
  const { _id, img, name, ageYear, ageMonth, location, addChildYear } =
    props?.children;
  let currentYear = new Date().getFullYear();
  let childDifferentAge = currentYear - parseInt(addChildYear);
  let updateChildAge = parseInt(ageYear) + childDifferentAge;

  // react query
  // child application approved information
  const { data: childApplyAll, isLoading } = useQuery(["childApply"], () =>
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/childApply/child-approved `,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    ).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="card md:w-60  lg:w-96 bg-base-100 shadow-md mx-auto my-3">
      <div className="pt-5">
        {childApplyAll?.data?.map(
          (childId) =>
            _id === childId?.child?._id && (
              <p className="text-error text-center text-xl font-bold">
                Child Already Adopted
              </p>
            )
        )}
        <figure className="px-10">
          <img width={180} src={img} alt={name} className="rounded-xl h-32" />
        </figure>
        <div className="card-body text-center">
          <h2>
            Name: <span className="text-xl font-bold"> {name}</span>
          </h2>
          <p>
            Age:{" "}
            <span className="font-bold">
              {updateChildAge} year , {ageMonth} month
            </span>
          </p>
          <p>
            Location: <span className="font-bold"> {location}</span>
          </p>
          <div className="card-actions justify-center md:justify-end">
            <Link to={`/child/${_id}`}>
              {" "}
              <button className="btn btn-info btn-sm text-white">
                More Details
                <FontAwesomeIcon
                  className="ml-2"
                  icon={faArrowRight}
                ></FontAwesomeIcon>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Children;
