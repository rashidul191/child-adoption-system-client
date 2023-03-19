import { signOut } from "firebase/auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import auth from "../firebase.init";

const useEmployer = (user) => {
  const [employer, setEmployer] = useState(false);

  const email = user?.email;
  if (email) {
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/user/employer/${email}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
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
        setEmployer(data?.data?.employer);
      });
  }
  return [employer];
};

export default useEmployer;
