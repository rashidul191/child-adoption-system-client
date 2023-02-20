import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Cell, Pie, PieChart } from "recharts";
import auth from "../../../firebase.init";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";
import Loading from "../../Shared/Loading/Loading";

const CheckApplyResult = () => {
  DynamicTitle("Eligibility Score");
  const [user] = useAuthState(auth);

  // react query
  const { data: eligibilityScore, isLoading } = useQuery(
    ["eligibilityScore"],
    () =>
      fetch(
        `https://child-adoption-system-server.onrender.com/api/v1/checkEligibility/?email=${user?.email}`,
        {
          method: "GET",
          headers: { "content-type": "application/json" },
        }
      ).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  // pieChart data
  const pieChartData = [
    { name: "Yes", value: eligibilityScore?.data[0]?.allowValue?.length * 10 },
    {
      name: "No",
      value: eligibilityScore?.data[0]?.notAllowValue?.length * 10,
    },
  ];

  const COLORS = ["#00C49F", "#FF8042"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <section>
      <div className="flex justify-between">
        <h1 className=" md:text-xl font-bold uppercase">Eligibility Score</h1>
      </div>
      <hr />
      <div className="mt-5">
        {eligibilityScore?.data[0]?.allowValue?.length * 10 >= 50 ? (
          <div>
            <div className="text-center text-green-600 font-bold">
              <h2 className="text-3xl "> Congratulation </h2>
              <p className="text-xl ">You are Eligible for Child Adoption</p>
            </div>
            <h1 className="text-center font-bold text-xl my-5">
              Because your score is:{" "}
              <span className="text-green-600">
                {" "}
                Yes = {eligibilityScore?.data[0]?.allowValue?.length * 10}%
              </span>
            </h1>
          </div>
        ) : (
          <div>
            <div className="text-red-600 text-center  font-bold">
              <h1 className="text-3xl">Sorry</h1>
              <p className="text-xl">You are Not Eligibe for Child Adoption</p>
            </div>
            <h1 className="text-center font-bold text-xl my-5">
              Because your score is:{" "}
              <span className="text-red-600">
                {" "}
                No = {eligibilityScore?.data[0]?.notAllowValue?.length * 10}%
              </span>
            </h1>
          </div>
        )}
      </div>

      {eligibilityScore?.data[0] ? (
        <div className="mx-4 md:mx-8">
          <div>
            <div className="flex text-center text-white text-xl md:text-3xl font-bold">
              <div
                style={{
                  width: `${
                    eligibilityScore?.data[0]?.allowValue?.length * 10
                  }%`,
                }}
                className=" h-20 bg-green-600 pt-5"
              >
                {" "}
                Yes = {eligibilityScore?.data[0]?.allowValue?.length * 10}%{" "}
              </div>
              <div
                style={{
                  width: `${
                    eligibilityScore?.data[0]?.notAllowValue?.length * 10
                  }%`,
                }}
                className=" h-20 bg-red-600 pt-5"
              >
                No = {eligibilityScore?.data[0]?.notAllowValue?.length * 10}%{" "}
              </div>
            </div>
          </div>

          <div className="md:flex ">
            <div className="mt-20">
              <h2>
                Yes: {eligibilityScore?.data[0]?.allowValue?.length * 10} %
              </h2>
              <h2>
                No: {eligibilityScore?.data[0]?.notAllowValue?.length * 10}%
              </h2>
            </div>
            <PieChart width={300} height={250}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      ) : (
        <div className="text-center justify-center border">
          <h2 className="text-2xl font-bold text-gray-200 my-36">
            Not check for any child apply eligibility yet!
          </h2>
        </div>
      )}
    </section>
  );
};

export default CheckApplyResult;
