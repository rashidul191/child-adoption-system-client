import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import ChildRow from "./ChildRow/ChildRow";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";
import { useState } from "react";
import Pagination from "../../Shared/Pagination/Pagination";

const ChildManage = () => {
  DynamicTitle("Child Manage");
  const [allTypeChild, setAllTypeChild] = useState([]);
  const [count, setCount] = useState(1);

  let limit = 9;
  const skip = (count - 1) * limit;

  // react query
  const {
    data: allChild,
    isLoading,
    refetch,
  } = useQuery(["allChildManage"], () =>
    fetch(`https://child-adoption-system-server.onrender.com/api/v1/child`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => res.json())
  );

  const handleChildList = (event) => {
    const childType = event.target.value || "All-Child";
    if (childType === "All-Child") {
      fetch(`https://child-adoption-system-server.onrender.com/api/v1/child`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAllTypeChild(data);
        });
    } else {
      fetch(
        `https://child-adoption-system-server.onrender.com/api/v1/child/childType/${childType}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setAllTypeChild(data);
        });
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section>
      <div className="md:flex justify-between">
        <h1 className="md:text-xl font-bold uppercase">Child Manage</h1>
        <div>
          <span className="font-semibold">
            sort child list:
            <select
              onChange={handleChildList}
              className="input input-bordered input-sm w-56 max-w-xs ml-2"
            >
              <option selected value={`All-Child`}>
                All-Child
              </option>
              <option value={`Infant-Child`}>Infant-Child</option>
              <option value={`Foster-Care-Child`}>Foster-Care-Child</option>
              <option value={`Street-Child`}>Street-Child</option>
            </select>
          </span>
        </div>
      </div>
      <hr />
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              {/* <th>S/N</th> */}
              <th>Name Info</th>
              <th>Child Type</th>
              <th>Edit Child </th>
              <th>Delete Child</th>
            </tr>
          </thead>

          <tbody className={allTypeChild?.data && "hidden"}>
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

          <tbody>
            {allTypeChild?.data
              ?.slice(skip, skip + limit)
              ?.reverse()
              ?.map((child, index) => (
                <ChildRow
                  key={child._id}
                  child={child}
                  index={index}
                  // refetch={refetch}
                ></ChildRow>
              ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <span className={allTypeChild?.data && "hidden"}>
        {allChild?.data?.length >= limit && (
          <Pagination
            dataLength={allChild?.data?.length}
            count={count}
            setCount={setCount}
            limit={limit}
          ></Pagination>
        )}
      </span>
      <span>
        {allTypeChild?.data?.length >= limit && (
          <Pagination
            dataLength={allTypeChild?.data?.length}
            count={count}
            setCount={setCount}
            limit={limit}
          ></Pagination>
        )}
      </span>
    </section>
  );
};

export default ChildManage;
