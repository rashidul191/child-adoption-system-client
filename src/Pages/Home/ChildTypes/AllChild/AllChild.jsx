import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";
import Pagination from "../../../Shared/Pagination/Pagination";
import Children from "../Children/Children";

const AllChild = () => {
  const { childType } = useParams();
  const [count, setCount] = useState(1);
  let limit = 9;
  const skip = (count - 1) * limit;

  const { data: allChildren, isLoading } = useQuery(["allChildren"], () =>
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/child/childType/${childType}`
    ).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="pt-16">
      <div className="bg-info py-5 text-white">
        <h1 className="text-center text-3xl font-bold uppercase">
          {childType}
        </h1>
        <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {allChildren?.data?.slice(skip, skip + limit)?.map((children) => (
          <Children key={children._id} children={children}></Children>
        ))}
      </div>

      {/* pagination */}
      {allChildren?.data?.length >= limit && (
        <Pagination
          data={allChildren?.data}
          count={count}
          setCount={setCount}
          limit={limit}
        ></Pagination>
      )}
    </section>
  );
};

export default AllChild;
