import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import ChildRow from "./ChildRow/ChildRow";

const ChildManage = () => {
  // react query
  const {
    data: allChild,
    isLoading,
    refetch,
  } = useQuery(["allChildManage"], () =>
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
    <section>
      <h1 className="md:text-xl font-bold uppercase">Child Manage</h1>
      <hr />

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
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
            {allChild?.map((child, index) => (
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
    </section>
  );
};

export default ChildManage;
