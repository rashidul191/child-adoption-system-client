import { signOut } from "firebase/auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import auth from "../firebase.init";
const useAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const email = user?.email;
  if (email) {
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/user/admin/${email}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("access-token");
          Navigate("/login");
        }
        return res.json();
      })
      .then((data) => {
        setAdmin(data?.data?.admin);
      });
  }
  return [admin];
};

export default useAdmin;
