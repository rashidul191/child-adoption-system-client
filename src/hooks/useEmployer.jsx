import { useState } from "react";

const useEmployer = (user) => {
  const [employer, setEmployer] = useState(false);

  const email = user?.email;
  if (email) {
    fetch(`http://localhost:5000/employer/${email}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        // authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmployer(data?.employer);
      });
  }
  return [employer];
};

export default useEmployer;
