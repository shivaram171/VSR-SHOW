// // import { User } from "@clerk/express";
// import { Inngest } from "inngest";
// import User from "../module/User.js";


// export const inngest = new Inngest({ id: "movie-ticket-booking" });
// //ingest functions to save user data to databaase


// const syncUserCreation = inngest.createFunction(
//     {id: 'sync-user-from-clerk'},
//     {event: 'clerk/user.created'},
//     async ({event}) =>{
//         const {id, first_name, last_name, email_addresses, image_url} = event.data
//         const userData ={
//             _id: id,
//             email: email_addresses[0].email_address,
//             name: first_name + ' ' + last_name,
//             image: image_url
//         }
//         await User.create(userData)
//     }
// )

// //inggest function to delete userfrom database

// const syncUserDeletion = inngest.createFunction(
//     {id: 'delete-user-from-clerk'},
//     {event: 'clerk/user.deleted'},
//     async ({event}) =>{
       
//         const {id} = event.data
//         await User.findByIdAndDelete(id)
//     }
// )

// //inggest function to update user data in databse

// const syncUserUpdation = inngest.createFunction(
//     {id: 'update-user-from-clerk'},
//     {event: 'clerk/user.updated'},
//     async ({event}) =>{
//        const {id, first_name, last_name, email_addresses, image_url} = event.data
//        const userData ={
//             _id: id,
//             email: email_addresses[0].email_address,
//             name: first_name + ' ' + last_name,
//             image: image_url
//         }
//         await User.findByIdAndUpdate(id, userData)
//     }
// )





// export const functions = [
//     syncUserCreation, 
//     syncUserDeletion,
//     syncUserUpdation];
import 'dotenv/config';

import { Inngest } from "inngest";
import User from "../module/User.js";
import Booking from '../module/Booking.js';
import Show from '../module/Show.js';
import sendEmail from '../configs/nodeMailer.js';

export const inngest = new Inngest({
  id: "movie-ticket-booking",
  signingKey: process.env.INNGEST_SIGNING_KEY, // ✅ Don't forget this
});

// Inngest function to save user data to database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await User.create(userData);
  }
);

// Inngest function to delete user from database
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

// Inngest function to update user data in database
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url
    };
    await User.findByIdAndUpdate(id, userData);
  }
)


//ingest function to cancel bookings and release seats of show after 10 minutres of booking created  if payment is not made

const releaseSeatsAndDeleteBooking = inngest.createFunction(
  {
    id: 'release-seats-delete-booking'
  },
  {
    event: "app/checkpayment"
  },
  async({ event, step }) => {
    const tenMinutesLater = new Date(Date.now()+ 10 * 60 * 1000);
    await step.sleepUntil('wait-for-10-minutes', tenMinutesLater);
    await step.run('check-payment-status', async () => {
      const bookingId = event.data.bookingId;
      const booking = await Booking.findById(bookingId)

      if(!booking.isPaid){
        const show = await Show.findById(booking.show);
        booking.bookedSeats.forEach((seat) => {
          delete show.occupiedSeats[seat]
        });
        show.markModified("occupiedSeats")
        await show.save()
        await Booking.findByIdAndDelete(booking._id)
      }

    })
  }
)
// inngest function to send email


const sendBookingConfirmationEmail = inngest.createFunction
(
  {id: "send-booking-confirmation-email"},
  {event: "app/show.booked"},
  async ({ event, step}) =>{
    const { bookingId } =  event.data;

    const booking = await Booking.findById(bookingId).populate({
      path: 'show',
      populate: {path: "movie", model:"Movie"}


    }).populate('user');

    await sendEmail({

      to: booking.user.email,
      subject: `payment confirmation: "${booking.show.movie.title}" booked!`,
      body: `<div style="font-family: Arial, sans-serif; line-height: 1.5;">
    <h2>Hi ${booking.user.name},</h2>
    <p>Your booking for <strong style="color: #F84565;">${booking.show.movie.title}</strong> is confirmed.</p>
    <p>
      <strong>Date:</strong> ${new Date(booking.show.showDateTime).toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata' })}<br/>
      <strong>Time:</strong> ${new Date(booking.show.showDateTime).toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' })}
    </p>
    <p>Enjoy the show! 🍿</p>
    <p>Thanks for booking with us!<br/>— QuickShow Team</p>
  </div>
`
    })


  }
)



export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation, releaseSeatsAndDeleteBooking,sendBookingConfirmationEmail];
