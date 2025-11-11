

import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { MdDelete } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button"; // ✅ ShadCN Button

ModuleRegistry.registerModules([AllCommunityModule]);

const UserList = () => {
  const gridRef = useRef();
  const [users, setUsers] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/auth/users");
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.users || [];
      setUsers(data);
    } catch (err) {
      console.error("❌ Fetch users failed:", err);
      toast.error("Failed to fetch users!");
      setUsers([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/auth/users/${id}`);
      toast.success("User deleted successfully!");
      fetchUsers();
      setConfirmDelete(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user!");
    }
  };

  const confirmDeleteUser = (user) => {
    setSelectedUser(user);
    setConfirmDelete(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const myTheme = themeQuartz.withParams({
    spacing: 5,
    foregroundColor: "rgb(12, 140, 116)",
    headerBackgroundColor: "rgb(99, 239, 227)",
    backgroundColor: "rgb(211, 246, 239)",
    rowHoverColor: "lightblue",
    textColor: "black",
    fontSize: 16,
  });

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Name",
        field: "userName",
        sortable: true,
        filter: "agTextColumnFilter",
        floatingFilter: true,
        flex: 1,
        cellStyle: { textTransform: "capitalize" },
      },
      {
        headerName: "Email",
        field: "userEmail",
        sortable: true,
        filter: "agTextColumnFilter",
        floatingFilter: true,
        flex: 1.5,
      },
      {
        headerName: "User_ID",
        field: "_id",
        sortable: true,
        filter: "agTextColumnFilter",
        floatingFilter: true,
        flex: 1.5,
      },
      {
        headerName: "Action",
        field: "actions",
        cellRenderer: (params) => (
          <Button
            variant="outline"
            className="text-red-500 hover:bg-red-50"
            onClick={() => confirmDeleteUser(params.data)}
          >
            <MdDelete />
          </Button>
        ),
        width: 120,
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
    }),
    []
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl uppercase text-cyan-600 font-bold mb-4 flex items-center gap-2">
        <FaUser className="text-cyan-500" /> Users List
      </h2>

      <div
        ref={gridRef}
        className="ag-theme-quartz m-10 rounded-2xl shadow-lg"
        style={{ height: "500px", width: "90%" }}
        theme={myTheme}
      >
        <AgGridReact
          rowData={users}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          pagination={true}
          paginationPageSize={20}
          rowSelection="multiple"
        />
      </div>

      {/* ✅ Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-50 z-50 transition-all">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96 text-center space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Confirm Delete
            </h3>
            <p className="text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-medium text-red-500">
                {selectedUser?.userName}
              </span>
              ?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                variant="outline"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={() => handleDelete(selectedUser?._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
