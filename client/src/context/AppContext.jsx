// import { createContext, useContext, useEffect, useState } from "react"
// import axios from 'axios';
// import { useAuth, useUser } from "@clerk/clerk-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from 'react-hot-toast';

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

// export const AppContext = createContext()
// export const AppProvider = ({ children }) => {


//     const [isAdmin, setIsAdmin] = useState(false)
//     const [shows, setShows] = useState([])
//     const [favoriteMovies, setFavoriteMovies] = useState([])

//     const {user} = useUser()
//     const {getToken} = useAuth()
//     const location = useLocation()
//     const navigate = useNavigate()

//     const fetchIsAdmin = async () =>{
//         try{
//             const {data} = await axios.get('/api/admin//is-admin', {headers: {
//                     Authorization : `Bearer ${await getToken()}`
//             }})

//             setIsAdmin(data.isAdmin)

//             if(!data.isAdmin && location.pathname.startsWith('/admin')){

//                 navigate('/')
//                 toast.error('you are not authorized to access admin dashboard')
//             }

//         } catch (error){
//             console.error(error)
//         }
//     }

// const fetchShows = async () =>{
//     try{
//         const { data } = await axios.get('/api/show/all')
//         if(data.success){
//             setShows(data.shows)

//         }
//         else{
//             toast.error(data.message)
//         }
//     } catch (error){
//         console.error(error)
//     }
// }

// const fetchFavoriteMovies = async () =>{
//         try{
//             const {data} = await axios.get('/api/user/favorites',{
//                 headers: {
//                     Authorization: `Bearer ${await getToken()}`
//                 }
//             })
//                 if(data.success){
//                     setFavoriteMovies(data.movies)
//                 }
//                 else{
//                     toast.error(data.message)
//                 }
//         } catch (error){
//             console.error(error)
//         }
// }


// useEffect(()=>{
//     fetchShows()
// },[])
// useEffect(() =>{
//     if(user){
//         fetchIsAdmin()
//         fetchFavoriteMovies()
//     }
// },[user])
//   const value = {

//     axios,
//     fetchIsAdmin,
//     user, getToken, navigate, isAdmin, shows,
//     favoriteMovies, fetchFavoriteMovies

//   }
//   return (
//     <AppContext.Provider value={value}>
//       { children }
//     </AppContext.Provider>
//   )
// }
// export const useAppContext = () => useContext(AppContext)


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//edited for .admin

// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [shows, setShows] = useState([]);
//   const [favoriteMovies, setFavoriteMovies] = useState([]);

//   const { user } = useUser();
//   const { getToken } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const fetchIsAdmin = async () => {
//     try {
//       const { data } = await axios.get("/api/admin/is-admin", {
//         headers: {
//           Authorization: `Bearer ${await getToken()}`
//         }
//       });

//       console.log("Admin check result:", data);
//       setIsAdmin(data.isAdmin);

//       if (!data.isAdmin && location.pathname.startsWith("/admin")) {
//         navigate("/");
//         toast.error("You are not authorized to access the admin dashboard");
//       }
//     } catch (error) {
//       console.error("Error checking admin:", error);
//     }
//   };

//   const fetchShows = async () => {
//     try {
//       const { data } = await axios.get("/api/show/all");
//       if (data.success) {
//         setShows(data.shows);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchFavoriteMovies = async () => {
//     try {
//       const { data } = await axios.get("/api/user/favorites", {
//         headers: {
//           Authorization: `Bearer ${await getToken()}`
//         }
//       });
//       if (data.success) {
//         setFavoriteMovies(data.movies);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchShows();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchIsAdmin();
//       fetchFavoriteMovies();
//     }
//   }, [user]);

//   const value = {
//     axios,
//     fetchIsAdmin,
//     user,
//     getToken,
//     navigate,
//     isAdmin,
//     shows,
//     favoriteMovies,
//     fetchFavoriteMovies
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);


//edited for a second sna of yoyr not authoriex


import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true); // ✅ added loading
  const [shows, setShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const { user } = useUser();
  const { getToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const fetchIsAdmin = async () => {
    try {
      setAdminLoading(true); // ✅ start loading
      const { data } = await axios.get("/api/admin/is-admin", {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });

      setIsAdmin(data.isAdmin);

      if (!data.isAdmin && location.pathname.startsWith("/admin")) {
        navigate("/");
        toast.error("You are not authorized to access the admin dashboard");
      }
    } catch (error) {
      console.error("Error checking admin:", error);
      setIsAdmin(false);
    } finally {
      setAdminLoading(false); // ✅ done loading
    }
  };

  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");
      if (data.success) {
        setShows(data.shows);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFavoriteMovies = async () => {
    try {
      const { data } = await axios.get("/api/user/favorites", {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
      if (data.success) {
        setFavoriteMovies(data.movies);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  useEffect(() => {
    if (user) {
      fetchIsAdmin();
      fetchFavoriteMovies();
    }
  }, [user]);

  const value = {
    axios,
    fetchIsAdmin,
    user,
    getToken,
    navigate,
    isAdmin,
    adminLoading, // ✅ exposed
    shows,
    favoriteMovies,
    fetchFavoriteMovies,
    image_base_url
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
