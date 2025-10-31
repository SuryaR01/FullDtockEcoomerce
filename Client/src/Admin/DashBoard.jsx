

import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  ShoppingBag,
  Users,
  DollarSign,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card"; // adjust path
import { Button } from "../components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4780 },
  { name: "May", sales: 5890 },
  { name: "Jun", sales: 4390 },
];

const DashBoard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">     

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h2>
          <Button className="flex items-center gap-2">
            <Bell className="w-4 h-4" /> Notifications
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Sales", value: "$24,560", color: "text-green-500", icon: <DollarSign /> },
            { title: "New Users", value: "1,245", color: "text-blue-500", icon: <Users /> },
            { title: "Orders", value: "320", color: "text-yellow-500", icon: <ShoppingBag /> },
            { title: "Revenue", value: "$9,850", color: "text-purple-500", icon: <BarChart3 /> },
          ].map((stat, i) => (
            <Card key={i} className="shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500">{stat.title}</span>
                  <span className={stat.color}>{stat.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                <p className={`text-sm ${stat.color}`}>+10% growth</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sales Chart */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Sales Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DashBoard;
