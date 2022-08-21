import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import ChildRow from "./ChildRow/ChildRow";

const ChildManage = () => {
  // react query
  const {
    data: allChilds,
    isLoading,
    refetch,
  } = useQuery(["allChilds"], () =>
    fetch(`http://localhost:5000/allChilds`, {
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
    <div>
      <h1 className="md:text-xl font-bold uppercase">User Manage</h1>
      <hr />

      <div class="overflow-x-auto w-full">
        <table class="table w-full">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Child Type</th>
              <th>Edit Child Info </th>
              <th>Delete Child</th>
            </tr>
          </thead>
          <tbody>
            {allChilds?.map((child, index) => (
              <ChildRow
                key={child._id}
                child={child}
                index={index}
                refetch={refetch}
              ></ChildRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChildManage;
