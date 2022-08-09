import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Children from "../Children/Children";

const AllChild = () => {
  const { childType } = useParams();

  const [childrens, setChildrens] = useState([]);
  useEffect(() => {
    const url = `http://localhost:5000/childs/${childType}`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setChildrens(data);
      });
  }, [childType]);

  return (
    <div>
      <h1 className="text-2xl text-center font-bold uppercase">{childType}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {childrens?.map((children) => (
          <Children key={children._id} children={children}></Children>
        ))}
      </div>
    </div>
  );
};

export default AllChild;
