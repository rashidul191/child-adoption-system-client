import React from "react";
import { useQuery } from "@tanstack/react-query";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";
import Loading from "../../Shared/Loading/Loading";
import ApplicationRow from "./ApplicationRow";

const Application = () => {

    DynamicTitle("Application");
  // react query
  const {
    data: allApplication,
    isLoading,
    refetch,
  } = useQuery(["allChildManage"], () =>
    fetch(`https://child-adoption-system-server.onrender.com/application`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  // console.log(allApplication)
  return (
    <section>
      <h1 className="md:text-xl font-bold uppercase">Add Child</h1>
      <hr />
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Parent Info</th>
              <th>Child Info</th>
              <th>Action</th>
              <th>Delete Child</th>
            </tr>
          </thead>
          <tbody>
          {allApplication?.slice(0).reverse()?.map((application, index) => (
              <ApplicationRow
                key={application._id}
                application={application}
                index={index}
                refetch={refetch}
              ></ApplicationRow>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Application;
