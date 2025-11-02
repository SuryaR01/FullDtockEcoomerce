
import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  BarChart3,
  ShoppingBag,
  Users,
  DollarSign,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "../components/ui/button";

const AdminLayout = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar - fixed, non-scrollable */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between fixed left-0 top-0 bottom-0">
        <div className="flex flex-col h-full justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600 mb-8">Admin Panel</h1>
            <nav className="space-y-4 text-gray-700">
              <Link
                to="/admin"
                className="flex items-center gap-3 hover:text-blue-600 transition"
              >
                <BarChart3 className="w-5 h-5" /> Dashboard
              </Link>
              <Link
                to="/admin/products"
                className="flex items-center gap-3 hover:text-blue-600 transition"
              >
                <ShoppingBag className="w-5 h-5" /> Products
              </Link>
              <Link
                to="/admin/users"
                className="flex items-center gap-3 hover:text-blue-600 transition"
              >
                <Users className="w-5 h-5" /> Users
              </Link>
              <Link
                to="/admin/sales"
                className="flex items-center gap-3 hover:text-blue-600 transition"
              >
                <DollarSign className="w-5 h-5" /> Sales
              </Link>
              <Link
                to="/admin/setting"
                className="flex items-center gap-3 hover:text-blue-600 transition"
              >
                <Settings className="w-5 h-5" /> Settings
              </Link>
            </nav>
          </div>

          <Button
            variant="destructive"
            className="flex items-center gap-2 mt-auto"
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content - scrollable */}
      <main className="flex-1 ml-64 overflow-y-auto p-8 h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
