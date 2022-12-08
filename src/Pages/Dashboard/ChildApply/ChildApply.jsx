import React from "react";
import { useQuery } from "@tanstack/react-query";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";
import { signOut } from "firebase/auth";
import auth from "../../../firebase.init";
import { Navigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import ChildApplyDetails from "./ChildApplyDetails";

const ChildApply = () => {
  DynamicTitle("Child Apply");
  const [user] = useAuthState(auth);
  const { data: childApplyAll, isLoading } = useQuery(["childApply"], () =>
    fetch(
      `https://child-adoption-system-server.onrender.com/child-apply?email=${user?.email}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("access-token");
        Navigate("/login");
      }
      return res.json();
    })
  );

  // console.log(childApplyAll);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section>
      <div className="">
        <h1 className=" md:text-xl font-bold uppercase">Child Apply</h1>
      </div>
      <hr />
      {childApplyAll.length > 0 ? (
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Child Info</th>
                <th>Action</th>
                <th>Apply form Download</th>
              </tr>
            </thead>
            <tbody>
              {childApplyAll?.map((childApply) => (
                <ChildApplyDetails
                  key={childApply._id}
                  childApply={childApply}
                ></ChildApplyDetails>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center justify-center border">
          <h2 className="text-2xl font-bold text-gray-200 my-36">
            Not applied for any child yet!
          </h2>
        </div>
      )}
    </section>
  );
};

export default ChildApply;
