import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";
import Loading from "../../Shared/Loading/Loading";
import ApplicationRow from "./ApplicationRow";
import Pagination from "../../Shared/Pagination/Pagination";

const Application = () => {
  DynamicTitle("Application");
  const [count, setCount] = useState(1);
  let limit = 8;
  const skip = (count - 1) * limit;
  // react query
  const {
    data: allApplication,
    isLoading,
    refetch,
  } = useQuery(["allChildManage"], () =>
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/childApply`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    ).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section>
      <h1 className="md:text-xl font-bold uppercase">All Application</h1>
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
            {allApplication?.data
              ?.slice(skip, skip + limit)
              ?.reverse()
              ?.map((application, index) => (
                <ApplicationRow
                  key={application._id}
                  application={application}
                  index={index}
                  isLoading={isLoading}
                  refetch={refetch}
                ></ApplicationRow>
              ))}
          </tbody>
        </table>
      </div>
      {/* pagination */}
      {allApplication?.data?.length >= limit && (
        <Pagination
          dataLength={allApplication?.data?.length}
          count={count}
          setCount={setCount}
          limit={limit}
        ></Pagination>
      )}
    </section>
  );
};

export default Application;
