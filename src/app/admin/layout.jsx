import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MantineProvider } from "@mantine/core";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-100 h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1  overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <MantineProvider>{children}</MantineProvider>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
