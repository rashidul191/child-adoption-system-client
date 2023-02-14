import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import MakeAdminRow from "./MakeAdminRow/MakeAdminRow";
import { signOut } from "firebase/auth";
import auth from "../../../firebase.init";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";
import { useState } from "react";
import Pagination from "../../Shared/Pagination/Pagination";

const MakeAdmin = () => {
  DynamicTitle("User Manage");
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  let limit = 8;
  const skip = (count - 1) * limit;
  // query
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery(["users"], () =>
    //fetch(`https://child-adoption-system-server.onrender.com/allUsers`, {
    fetch(`http://localhost:5000/api/v1/user`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      // console.log(res);
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("access-token");
        navigate("/login");
      }
      return res.json();
    })
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section>
      <h1 className="md:text-xl font-bold uppercase">User Manage</h1>
      <hr />
      <div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Email</th>
                <th>Make Admin</th>
                <th>Make Employer</th>
                <th>Delete User</th>
              </tr>
            </thead>
            <tbody>
              {users?.data?.slice(skip, skip + limit)?.map((user, index) => (
                <MakeAdminRow
                  key={user._id}
                  user={user}
                  index={index}
                  refetch={refetch}
                ></MakeAdminRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* pagination */}
      {users?.data?.length >= limit && (
        <Pagination
          data={users?.data}
          count={count}
          setCount={setCount}
          limit={limit}
        ></Pagination>
      )}
    </section>
  );
};

export default MakeAdmin;
