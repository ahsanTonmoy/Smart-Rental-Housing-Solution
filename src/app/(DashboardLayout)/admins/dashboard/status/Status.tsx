"use client";

import { useEffect, useState } from "react";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableHead,
//   TableCell,
// } from "@/components/ui/table";

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { getAllUsers } from "@/services/Admin"; // Adjust import path as needed
// import { blockUser, activateUser } from "@/services/Users"; // Adjust import path as needed
import { toast } from "sonner";
// import { Loader2, Lock, Unlock } from "lucide-react";

// Define interface for user data
export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  isBlocked: boolean;
}

const Status = () => {
  const [users, setUsers] = useState<User[]>([]);
  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      //   setLoading(true);
      try {
        const response = await getAllUsers();
        console.log("response", response);
        if (response.success) {
          setUsers(response.data || []);
        } else {
          toast.error(response.message || "Failed to fetch users");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("An error occurred while fetching users");
      } finally {
        // setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        User Management
      </h2>

      {/*  */}
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-lg font-medium">Total Sales</h2>
          <p className="text-2xl font-bold mt-2">{users.length}</p>
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
    </div>
  );
};

export default Status;
