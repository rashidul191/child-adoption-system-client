import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
      fetch(`http://localhost:5000/check-eligibility/?email=${user?.email}`, {
        method: "GET",
        headers: { "content-type": "application/json" },
      }).then((res) => res.json())
  );

  // console.log(eligibilityScore);

  if (isLoading) {
    return <Loading></Loading>;
  }

  // const yesScore = eligibilityScore[0].email;
  // const noScore = eligibilityScore[0].notAllowValue;

  // console.log(yesScore);
  // console.log(noScore);

  const data = [
    {
      name: "Eligibility",
      yes: eligibilityScore?.allowValue.length * 10,
      no: eligibilityScore?.notAllowValue.length * 10,
    },
    // {
    //   name: "Page B",
    //   yes: 30,
    //   no: -10,
    // },
    // {
    //   name: "Page C",
    //   yes: 20,
    //   no: -90,
    // },
    // {
    //   name: "Page D",
    //   yes: 27,
    //   no: -39,
    // },
    // {
    //   name: "Page E",
    //   yes: 48,
    //   no: -28,
    // },
    // {
    //   name: "Page F",
    //   yes: 23,
    //   no: -38,
    // },
    // {
    //   name: "Page G",
    //   yes: 34,
    //   no: -43,
    // },
  ];
  // pieChart data
  const pieChartData = [
    { name: "Yes", value: eligibilityScore?.allowValue.length * 10 },
    { name: "No", value: eligibilityScore?.notAllowValue.length * 10 },
    // { name: "Group C", value: 300 },
    // { name: "Group D", value: 200 },
  ];

  //   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
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

      {eligibilityScore ? (
        <div className="mx-4 md:mx-8">
          <div>
            <div className="flex text-center text-white text-xl md:text-3xl font-bold mt-12">
              <div
                style={{
                  width: `${eligibilityScore?.allowValue.length * 10}%`,
                }}
                className=" h-20 bg-green-600 pt-5"
              >
                {" "}
                Yes = {eligibilityScore?.allowValue.length * 10}%{" "}
              </div>
              <div
                style={{
                  width: `${eligibilityScore?.notAllowValue.length * 10}%`,
                }}
                className=" h-20 bg-red-600 pt-5"
              >
                No = {eligibilityScore?.notAllowValue.length * 10}%{" "}
              </div>
            </div>
          </div>

          {/* <div>
            <BarChart
              width={800}
              height={400}
              data={data}
              margin={{
                top: 5,
                // right: 30,
                // left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <ReferenceLine y={0} stroke="#000" />
              <Bar dataKey="no" fill="#FF0000" />
              <Bar dataKey="yes" fill="#00FF00" />
            </BarChart>
          </div> */}

          <div className="md:flex ">
            <div className="mt-20">
              <h2>Yes: {eligibilityScore?.allowValue.length * 10} %</h2>
              <h2>No: {eligibilityScore?.notAllowValue.length * 10}%</h2>
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
