"use client";
import React, { useEffect, useState } from "react";
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

import { getAllListings } from "@/services/Listings";
// import { TRentalListing } from "@/types/listings";

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
  //
  const [initialListings, setInitialListings] = useState<ListingWithId[]>([]);

  // Use useEffect to fetch data on the client side
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getAllListings();
        setInitialListings(data || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setInitialListings([]);
      }
    }

    fetchData();
  }, []);
  console.log(initialListings)
  return (
    <div className="p-6 space-y-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center">Admin Dashboard 2</h1>

      {/* Date Range Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <div className="flex flex-col">
          <label htmlFor="start-date" className="font-semibold mb-1">
            From:
          </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="end-date" className="font-semibold mb-1">
            To:
          </label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-lg font-medium">Total Sales</h2>
          <p className="text-2xl font-bold mt-2">$12,000</p>
        </div>
        <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-lg font-medium">Orders</h2>
          <p className="text-2xl font-bold mt-2">350</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-lg font-medium">Customers</h2>
          <p className="text-2xl font-bold mt-2">120</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-center mb-4">
            Order Breakdown
          </h2>
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
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-center mb-4">
            Monthly Sales
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampleLineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
