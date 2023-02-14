import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../Loading/Loading";
import Employer from "./Employer";
import Admin from "./Admin";

const Members = () => {
  const { data: user, isLoading } = useQuery(["memberAllUsers"], () =>
    //fetch(`https://child-adoption-system-server.onrender.com/allMember`, {
    fetch(`http://localhost:5000/api/v1/user`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  // console.log(user);

  return (
    <section className="pt-16">
      <div className="bg-info py-10">
        <h1 className="text-center text-2xl font-bold uppercase text-white">
          Management
        </h1>
        <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
      </div>

      <div className="">
        <h2 className="text-center text-3xl text-[#8EA246] uppercase mt-10 mb-5 font-bold">
          Admins
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
          {user?.data?.map((user) => (
            <Admin key={user?.id} user={user}></Admin>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-center text-3xl text-[#8EA246] uppercase mt-10 mb-5 font-bold">
          Employers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mx-auto ">
          {user?.data?.map((user) => (
            <Employer key={user?.id} user={user}></Employer>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Members;
