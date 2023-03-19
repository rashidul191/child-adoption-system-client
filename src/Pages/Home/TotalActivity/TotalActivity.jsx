import {
  faChildren,
  faHouseFlag,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CountUp from "react-countup";
import { Bounce, Zoom } from "react-reveal";
import Loading from "../../Shared/Loading/Loading";

const TotalActivity = () => {
  const { data: users, isLoading } = useQuery(["users"], () =>
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/user/allUsersLength`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((res) => res.json())
  );

  const { data: allChild, isLoading2 } = useQuery(["allChild"], () =>
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/child/childLength`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((res) => res.json())
  );

  const { data: allAgency, isLoading3 } = useQuery(["allAgency"], () =>
    fetch(`https://child-adoption-system-server.onrender.com/api/v1/agency`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json())
  );

  if (isLoading || isLoading2 || isLoading3) {
    return <Loading></Loading>;
  }

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-3 my-16 text-center">
      <Bounce left>
        <div className="card w-3/4 md:w-96 bg-base-100 border rounded-none mx-auto ">
          <div className="card-body transition ease-in delay-150 hover:bg-[#3F434D] hover:text-white duration-100">
            <span className="text-5xl ">
              <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
            </span>
            <p className="text-4xl font-bold">
              <CountUp end={users?.data} />
            </p>
            <h2 className="text-2xl uppercase font-semibold">Users</h2>
          </div>
        </div>
      </Bounce>

      <Zoom>
        <div className="card w-3/4 md:w-96 bg-base-100 border rounded-none mx-auto">
          <div className="card-body  transition ease-in delay-150 hover:bg-[#3F434D] hover:text-white duration-100">
            <span className="text-5xl">
              <FontAwesomeIcon icon={faChildren}></FontAwesomeIcon>
            </span>
            <p className="text-4xl font-bold">
              <CountUp end={allChild?.data} />
            </p>
            <h2 className="text-2xl uppercase font-semibold">Child</h2>
          </div>
        </div>
      </Zoom>

      <Bounce right>
        <div className="card w-3/4 md:w-96 bg-base-100 border rounded-none mx-auto">
          <div className="card-body  transition ease-in delay-150 hover:bg-[#3F434D] hover:text-white duration-100">
            <span className="text-5xl">
              <FontAwesomeIcon icon={faHouseFlag}></FontAwesomeIcon>
            </span>
            <p className="text-4xl font-bold">
              <CountUp end={allAgency?.data?.length} />
            </p>
            <h2 className="text-2xl uppercase font-semibold">Agency</h2>
          </div>
        </div>
      </Bounce>
    </section>
  );
};

export default TotalActivity;
