

import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from "ag-grid-community";
import { MdDelete } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';


const UserList = () => {
  const gridRef = useRef();
  const [users, setUsers] = useState([]);
  ModuleRegistry.registerModules([ AllCommunityModule ]);

  // GET all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/userReg/registerAll");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users!");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:8000/userReg/deleteRegister/${id}`);
      toast.success("User deleted successfully!");
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user!");
    }
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

  // Columns setup
  const columnDefs = useMemo(
    () => [
      {
        headerName: "Name",
        field: "name",
        sortable: true,
        filter: "agTextColumnFilter",
        floatingFilter: true,
        flex: 1,
        cellStyle: { textTransform: "capitalize" },
      },
      {
        headerName: "Email",
        field: "email",
        sortable: true,
        filter: "agTextColumnFilter",
        floatingFilter: true,
        flex: 1.5,
      },
      {
        headerName: "PassWord",
        field: "password",
        sortable: true,
        filter: "agTextColumnFilter",
        floatingFilter: true,
        flex: 1.5,
      },
      {
        headerName: "Action",
        field: "actions",
        cellRenderer: (params) => (
          <button
            onClick={() => handleDelete(params.data._id)}
            className="border p-2 rounded-md text-red-500 hover:bg-red-50"
          >
            <MdDelete />
          </button>
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
          paginationPageSize={10}
          rowSelection="multiple"
        />
      </div>
    </div>
  );
};

export default UserList;
