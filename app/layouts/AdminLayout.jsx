import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin.jsx";
import SideBarAdmin from "../components/SideBarAdmin.jsx";

const AdminLayout = () => {
  return (
    <div className="d-flex min-vh-100">
      <SideBarAdmin />

      <div className="flex-grow-1 d-flex flex-column">
        <HeaderAdmin />
        <main className="p-4 flex-grow-1 bg-body-tertiary">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
