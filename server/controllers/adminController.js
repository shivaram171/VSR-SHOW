// // api check if user is admin

// // import { User } from "@clerk/express";

// import Booking from "../module/Booking.js";
// import Show from "../module/Show.js";
// import User from "../module/User.js";



// export const isAdmin = async(req, res) =>{
//     res.json({success: true, isAdmin: true})
// }

// //api to get dashboard data


// export const getDashboardData =  async(req, res) =>{
//     try {
//   const bookings = await Booking.find({ isPaid: true });
//   const activeShows = await Show.find({ showDateTime: { $gte: new Date() } }).populate('movie');
//   const totalUser = await User.countDocuments();
//   const dashboardData = {
//     totalBookings: bookings.length,
//     totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
//     activeShows,
//     totalUser
//   };
//   res.json({success: true, dashboardData});
// } catch (error)
// {

// console.error(error);
// res.json({success: false, message: error.message})
// }
// }

// // API to get all shows

// export const getAllShows = async (req, res) => {
//   try {
//     const shows = await Show.find({ showDateTime: { $gte: new Date() } })
//       .populate('movie')
//       .sort({ showDateTime: 1 });
//     res.json({ success: true, shows });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };


// // API to get all bookings

// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({})
//       .populate('user')
//       .populate({
//         path: "show",
//         populate: { path: "movie" }
//       })
//       .sort({ createdAt: -1 });
//     res.json({ success: true, bookings });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };
import { getAuth } from "@clerk/express";
import { clerkClient } from "@clerk/clerk-sdk-node";
import Booking from "../module/Booking.js";
import Show from "../module/Show.js";
import User from "../module/User.js";

// ✅ Check if the current user is an admin
export const isAdmin = async (req, res) => {
  try {
    const { userId } = getAuth(req);
    console.log("Auth User ID:", userId);

    if (!userId) {
      return res.status(401).json({ success: false, message: "not authorized" });
    }

    const user = await clerkClient.users.getUser(userId);
    console.log("Private Metadata:", user.privateMetadata);

    const role = user.privateMetadata?.role;

    if (role === "admin") {
      return res.json({ success: true, isAdmin: true });
    } else {
      return res.status(403).json({ success: false, message: "not authorized" });
    }
  } catch (error) {
    console.error("Error in isAdmin:", error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

// ✅ Get dashboard data (admin-only)
export const getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true });
    const activeShows = await Show.find({ showDateTime: { $gte: new Date() } }).populate("movie");
    const totalUser = await User.countDocuments();

    const dashboardData = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
      activeShows,
      totalUser
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get all shows (admin-only)
export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });

    res.json({ success: true, shows });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get all bookings (admin-only)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user")
      .populate({
        path: "show",
        populate: { path: "movie" }
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
