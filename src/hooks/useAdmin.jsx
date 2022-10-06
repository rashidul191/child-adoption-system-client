import { useState } from "react";
const useAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const email = user?.email;
  if (email) {
    fetch(`http://localhost:5000/admin/${email}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAdmin(data?.admin);
      });
  }
  return [admin];
};

export default useAdmin;
