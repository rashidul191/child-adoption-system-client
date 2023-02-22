import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import AgencyRow from "./AgencyRow/AgencyRow";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";
import { useState } from "react";
import Pagination from "../../Shared/Pagination/Pagination";

const AgencyManage = () => {
  DynamicTitle("Agency Manage");
  const [count, setCount] = useState(1);
  let limit = 8;
  const skip = (count - 1) * limit;
  // react query
  const {
    data: allAgency,
    isLoading,
    refetch,
  } = useQuery(["allAgency"], () =>
    fetch(`https://child-adoption-system-server.onrender.com/api/v1/agency`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <section>
      <h1 className="md:text-xl font-bold uppercase">Agency Manage</h1>
      <hr />
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Agency Name</th>
              <th>Agency Director Name</th>
              <th>Edit Agency Info </th>
              <th>Delete Agency</th>
            </tr>
          </thead>
          {allAgency?.data?.length <= 0 ? (
            <div className="text-center text-error">
              <p>sorry have a no agency </p>
              <p>Add New Agency</p>
            </div>
          ) : (
            <tbody>
              {allAgency?.data
                ?.slice(skip, skip + limit)
                ?.reverse()
                ?.map((agency, index) => (
                  <AgencyRow
                    key={agency._id}
                    agency={agency}
                    index={index}
                    refetch={refetch}
                  ></AgencyRow>
                ))}
            </tbody>
          )}
        </table>
      </div>

      {/* pagination */}
      {allAgency?.data?.length >= limit && (
        <Pagination
          dataLength={allAgency?.data?.length}
          count={count}
          setCount={setCount}
          limit={limit}
        ></Pagination>
      )}
    </section>
  );
};

export default AgencyManage;
