import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MantineProvider } from "@mantine/core";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 w-[calc(100%-256px)]">
        <Header />
        <main className="flex-1 bg-gray-100 p-6  overflow-x-hidden">
          <MantineProvider>{children}</MantineProvider>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
