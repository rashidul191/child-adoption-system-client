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
    fetch(`http://localhost:5000/allUsersLength`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json())
  );

  const { data: allChild, isLoading2 } = useQuery(["allChild"], () =>
    fetch(`http://localhost:5000/allChildLength`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json())
  );

  const { data: allAgency, isLoading3 } = useQuery(["allAgency"], () =>
    fetch(`http://localhost:5000/allAgency`, {
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
        <div className="card-body">
          <h2 className="text-2xl font-bold uppercase">Users</h2>
          <p className="text-3xl font-bold">
            <CountUp end={users} />
          </p>
          <span className="text-5xl ">
            <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
          </span>
        </div>
      </div>
      <div className="card w-3/4 md:w-96 bg-base-100 border rounded-none mx-auto">
        <div className="card-body">
          <h2 className="text-2xl font-bold uppercase">Child</h2>
          <p className="text-3xl font-bold">
            <CountUp end={allChild} />
          </p>
          <span className="text-5xl">
            <FontAwesomeIcon icon={faChildren}></FontAwesomeIcon>
          </span>
        </div>
      </div>
      <div className="card w-3/4 md:w-96 bg-base-100 border rounded-none mx-auto">
        <div className="card-body">
          <h2 className="text-2xl font-bold uppercase">Agency</h2>
          <p className="text-3xl font-bold">
            <CountUp end={allAgency?.length} />
          </p>
          <span className="text-5xl">
            <FontAwesomeIcon icon={faHouseFlag}></FontAwesomeIcon>
          </span>
        </div>
      </div>
    </section>
  );
};

export default TotalActivity;
