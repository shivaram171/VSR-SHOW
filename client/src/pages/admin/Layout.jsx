// import React, { useEffect } from 'react'
// import AdminNavbar from '../../components/admin/AdminNavbar'
// import { Outlet } from 'react-router-dom'
// import AdminSidebar from '../../components/admin/AdminSidebar'
// import { useAppContext } from '../../context/AppContext'
// import Loading from '../../components/Loading'

// const Layout = () => {

//   const { isAdmin, fetchIsAdmin} = useAppContext()
  
//   useEffect(()=>{
//     fetchIsAdmin()
//   },[])
  
//   return isAdmin ? (
//     <>
//       <AdminNavbar/>
//       <div className='flex'>
//         <AdminSidebar/>
//         {/* The Outlet must be inside the main content area */}
//         <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto'>
//           <Outlet/>
//         </div>
//       </div>
//     </>
//   ) : <Loading/>
// }

// export default Layout
import React from 'react';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useAppContext } from '../../context/AppContext';
import Loading from '../../components/Loading';

const Layout = () => {
  const { isAdmin, adminLoading } = useAppContext();

  if (adminLoading) return <Loading />; // show spinner until admin check done

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-xl">
        You are not authorized to view this page.
      </div>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
