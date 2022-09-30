import React from "react";
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

const CheckApplyResult = () => {
  const data = [
    {
      name: "Page A",
      yes: 70,
      no: -30,
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
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    // { name: "Group C", value: 300 },
    // { name: "Group D", value: 200 },
  ];

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const COLORS = [ "#00C49F", "#FF8042"];

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
        <h1 className=" md:text-xl font-bold uppercase">Check apply result</h1>
      </div>
      <hr />

      <div>
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
      </div>

      <div>
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

        <h2>Yes: 70%</h2>
        <h2>No: 30%</h2>
      </div>
    </section>
  );
};

export default CheckApplyResult;
