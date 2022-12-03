import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");
  const email = user?.user?.email;
  useEffect(() => {
    if (email) {
      fetch(`https://child-adoption-system-server.onrender.com/users/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data?.token;
          localStorage.setItem("access-token", accessToken);
          setToken(accessToken);
        });
    }
  }, [email]);
  return [token];
};

export default useToken;
