import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import MakeAdminRow from "./MakeAdminRow/MakeAdminRow";

import { signOut } from "firebase/auth";
import auth from "../../../firebase.init";

const MakeAdmin = () => {
  const navigate = useNavigate();
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery(["users"], () =>
    fetch(`http://localhost:5000/allUsers`, {
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

  // console.log(users)

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 className="md:text-xl font-bold uppercase">Make Admin</h1>
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
              {users?.map((user, index) => (
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
    </div>
  );
};

export default MakeAdmin;
