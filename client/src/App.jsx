// // import React from 'react'
// import Navbar from './components/Navbar'
// import { Route, Routes, useLocation } from 'react-router-dom'
// import Home from './pages/Home'
// import Movies from './pages/Movies'
// import MovieDetails from './pages/MovieDetails'
// import SeatLayout from './pages/SeatLayout'
// import MyBookings from './pages/MyBookings'
// import Favorite from './pages/Favorite'
// import { Toaster } from 'react-hot-toast'
// import Footer from './components/Footer'

// import Dashboard from './pages/admin/Dashboard'
// import AddShows from './pages/admin/AddShows'
// import ListShows from './pages/admin/ListShows'
// import ListBookings from './pages/admin/ListBookings'
// import Layout from './pages/admin/Layout'
// import { useAppContext } from './context/AppContext'
// import { SignIn } from '@clerk/clerk-react'

// // const { user, isAdmin } = useAppContext()


// const App = () => {

//   const isAdminRoute = useLocation().pathname.startsWith('/admin')
// const { user } = useAppContext()
//   return (
//     <>
//       <Toaster />
//       {!isAdminRoute && <Navbar/>}
//       <Routes>
//       <Route path='/' element={<Home/>}/>
//       <Route path='/movies' element={<Movies/>}/>
//       <Route path='/movies/:id' element={<MovieDetails/>}/>
//       <Route path='/movies/:id/:date' element={<SeatLayout/>}/>
//        <Route path='/my-bookings' element={<MyBookings/>}/>
//        <Route path='/favorite' element={<Favorite/>}/>

//         <Route path='/admin/' element={user ? <Layout/> : (
//                 <div className='min-h-screen flex justify-center items-center'>
//                         <SignIn fallbackRedirectUrl={'/admin'}/>
//                 </div>
//         )}>
//         <Route index element={<Dashboard/>}/>
//         <Route path='add-shows' element={<AddShows/>}/>
//         <Route path='list-shows' element={<ListShows/>}/>
//         <Route path="list-bookings" element={<ListBookings/>}/>
//         </Route>
//     </Routes>
//     {!isAdminRoute && <Footer/>}
//     </>
//   )
// }

// export default App




import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import SeatLayout from './pages/SeatLayout';
import MyBookings from './pages/MyBookings';
import Favorite from './pages/Favorite';

import Dashboard from './pages/admin/Dashboard';
import AddShows from './pages/admin/AddShows';
import ListShows from './pages/admin/ListShows';
import ListBookings from './pages/admin/ListBookings';
import Layout from './pages/admin/Layout';

import { useAppContext } from './context/AppContext';
import { SignIn } from '@clerk/clerk-react';
import Loading from './components/Loading';

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');
  const { user, isAdmin } = useAppContext();

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/loading/:nextUrl" element={<Loading />} />
        <Route path="/favorite" element={<Favorite />} />

        {/* Admin routes with role check */}
        <Route
          path="/admin/"
          element={
            !user ? (
              <div className="min-h-screen flex justify-center items-center">
                <SignIn fallbackRedirectUrl="/admin" />
              </div>
            ) : !isAdmin ? (
              <div className="min-h-screen flex justify-center items-center">
                <p className="text-red-500 text-xl">
                  You are not authorized to access the admin dashboard.
                </p>
              </div>
            ) : (
              <Layout />
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
