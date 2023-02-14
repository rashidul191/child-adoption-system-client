import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import ChildRow from "./ChildRow/ChildRow";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";
import { useState } from "react";
import Pagination from "../../Shared/Pagination/Pagination";

const ChildManage = () => {
  DynamicTitle("Child Manage");
  const [count, setCount] = useState(1);
  let limit = 8;
  const skip = (count - 1) * limit;
  // react query
  const {
    data: allChild,
    isLoading,
    refetch,
  } = useQuery(["allChildManage"], () =>
    //fetch(`https://child-adoption-system-server.onrender.com/allChilds`, {
    fetch(`http://localhost:5000/api/v1/child`, {
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
            {allChild?.data
              ?.slice(skip, skip + limit)
              ?.reverse()
              ?.map((child, index) => (
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

      {/* pagination */}
      {allChild?.data.length >= limit && (
        <Pagination
          data={allChild.data}
          count={count}
          setCount={setCount}
          limit={limit}
        ></Pagination>
      )}
    </section>
  );
};

export default ChildManage;
