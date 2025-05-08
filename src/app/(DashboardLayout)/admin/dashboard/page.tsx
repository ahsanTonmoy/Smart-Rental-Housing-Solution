"use client";
import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const samplePieData = [
  { name: "Sales", value: 450 },
  { name: "Returns", value: 120 },
  { name: "Orders", value: 330 },
];

const sampleLineData = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 500 },
  { name: "Apr", sales: 700 },
  { name: "May", sales: 600 },
];

const AdminDashboard: React.FC = () => {
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-12-31");

  return (
    <div className="p-4 space-y-6">
      {/* <h1 className="text-center font-bold text-2xl">Admin Dashboard</h1> */}

      {/* Date Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div>
          <label className="mr-2 font-semibold">From:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label className="mr-2 font-semibold">To:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white">
        <div className="bg-blue-500 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Total Sales</h2>
          <p className="text-xl">$12,000</p>
        </div>
        <div className="bg-green-500 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Orders</h2>
          <p className="text-xl">350</p>
        </div>
        <div className="bg-yellow-500 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Customers</h2>
          <p className="text-xl">120</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-center font-semibold mb-4">Order Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={samplePieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {samplePieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value}`} />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-center font-semibold mb-4">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampleLineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
