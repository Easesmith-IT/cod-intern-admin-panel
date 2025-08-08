import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import React from 'react'

const AdminLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 h-screen overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout