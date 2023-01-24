import React from 'react';
import AdminNavbar from '../../components/admin-dashboard/admin-navbar/AdminNavbar';
import AdminSideBar from '../../components/admin-dashboard/admin-sidebar/AdminSideBar';
import AdminPageContent from '../../components/admin-dashboard/AdminPageContent';

const Admin = () => {
  return (
    <>
      <AdminNavbar />
      <div
        style={{
          display: 'flex',
        }}
      >
        <AdminSideBar />
        <AdminPageContent />
      </div>
    </>
  );
};

export default Admin;
