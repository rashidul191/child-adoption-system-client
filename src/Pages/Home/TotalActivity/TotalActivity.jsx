import {
  faChildren,
  faHouseFlag,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CountUp from "react-countup";
import Loading from "../../Shared/Loading/Loading";

const TotalActivity = () => {
  const { data: users, isLoading } = useQuery(["users"], () =>
    fetch(`https://child-adoption-system-server.onrender.com/allUsersLength`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json())
  );

  const { data: allChild, isLoading2 } = useQuery(["allChild"], () =>
    fetch(`https://child-adoption-system-server.onrender.com/allChildLength`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json())
  );

  const { data: allAgency, isLoading3 } = useQuery(["allAgency"], () =>
    fetch(`https://child-adoption-system-server.onrender.com/allAgency`, {
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
      <div className="card w-3/4 md:w-96 bg-base-100 border rounded-none mx-auto ">
        <div className="card-body hover:bg-[#3F434D] hover:text-white">
          <span className="text-5xl ">
            <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
          </span>
          <p className="text-4xl font-bold">
            <CountUp end={users} />
          </p>
          <h2 className="text-2xl uppercase">Users</h2>
        </div>
      </div>
      <div className="card w-3/4 md:w-96 bg-base-100 border rounded-none mx-auto">
        <div className="card-body hover:bg-[#3F434D] hover:text-white">
          <span className="text-5xl">
            <FontAwesomeIcon icon={faChildren}></FontAwesomeIcon>
          </span>
          <p className="text-4xl font-bold">
            <CountUp end={allChild} />
          </p>
          <h2 className="text-2xl uppercase">Child</h2>
        </div>
      </div>
      <div className="card w-3/4 md:w-96 bg-base-100 border rounded-none mx-auto">
        <div className="card-body hover:bg-[#3F434D] hover:text-white">
          <span className="text-5xl">
            <FontAwesomeIcon icon={faHouseFlag}></FontAwesomeIcon>
          </span>
          <p className="text-4xl font-bold">
            <CountUp end={allAgency?.length} />
          </p>
          <h2 className="text-2xl uppercase">Agency</h2>
        </div>
      </div>
    </section>
  );
};

export default TotalActivity;
