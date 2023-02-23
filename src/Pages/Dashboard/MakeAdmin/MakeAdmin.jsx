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
  const [userRoles, setUserRoles] = useState([]);
  const [count, setCount] = useState(1);
  let limit = 9;
  const skip = (count - 1) * limit;
  // query
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery(["usersAllMakeAdmin"], () =>
    fetch(`https://child-adoption-system-server.onrender.com/api/v1/user`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("access-token");
        navigate("/login");
      }
      return res.json();
    })
  );

  const handleChildList = (event) => {
    const userRole = event.target.value;
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/user/userRole/?userRole=${userRole}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUserRoles(data);
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section>
      <div className="md:flex justify-between">
        {" "}
        <h1 className="md:text-xl font-bold uppercase">User Manage</h1>
        <div>
          <span className="font-semibold">
            sort user list:
            <select
              onChange={handleChildList}
              className="input input-bordered input-sm w-56 max-w-xs ml-2"
            >
              <option selected value={`admin`}>
                Admin
              </option>
              <option value={`employer`}>Employer</option>
              {/* <option value={`only-user`}>Only-User</option> */}
            </select>
          </span>
        </div>
      </div>
      <hr />
      <div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                {/* <th>S.N</th> */}
                <th>Email</th>
                <th>Make Admin</th>
                <th>Make Employer</th>
                <th>Delete User</th>
              </tr>
            </thead>
            <tbody className={userRoles?.data && "hidden"}>
              {users?.data
                ?.slice(skip, skip + limit)
                ?.reverse()
                ?.map((user, index) => (
                  <MakeAdminRow
                    key={user._id}
                    user={user}
                    index={index}
                    refetch={refetch}
                  ></MakeAdminRow>
                ))}
            </tbody>

            <tbody>
              {userRoles?.data
                ?.slice(skip, skip + limit)
                ?.reverse()
                ?.map((user, index) => (
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
      <span className={userRoles?.data && "hidden"}>
        {users?.data?.length >= limit && (
          <Pagination
            dataLength={users?.data?.length}
            count={count}
            setCount={setCount}
            limit={limit}
          ></Pagination>
        )}
      </span>
      <span>
        {userRoles?.data?.length >= limit && (
          <Pagination
            dataLength={users?.data?.length}
            count={count}
            setCount={setCount}
            limit={limit}
          ></Pagination>
        )}
      </span>
    </section>
  );
};

export default MakeAdmin;
