// import stripe from "stripe";
// import Booking from '../module/Booking.js'

// export const stripeWebhooks = async (request, response) => {
//   const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
//   const sig = request.headers["stripe-signature"];

//   let event;

//   try {
//     event = stripeInstance.webhooks.constructEvent(
//       request.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (error) {
//     return response.status(400).send(`Webhook Error: ${error.message}`);
//   }


//   try{
//     switch (event.type){
//         case "payment_intent.succeeded":{
//             const paymentIntent = event.data.object;
//             const sessionList = await stripeInstance.checkout.sessions.list({
//                     payment_intent: paymentIntent.id
                   
//                 }
//             )
            
//                 const session = sessionList.data[0];

           
//                     const {bookingId } = session.metadata;
//                     await Booking.findByIdAndUpdate(bookingId,{
//                         isPaid: true,
//                         paymentLink: ""

//                     })

                   
    
//             break;
//     }
//         default:
//             console.log('unhandled event type:', event.type)

//     }
//     response.json({recieved: true})

//   } catch (error) {

//     console.error("webhook processing erro", error);
//     console.error(500).send("internal server error");

//   }
// }
import stripe from "stripe";
import Booking from '../module/Booking.js';

export const stripeWebhooks = async (request, response) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        const { bookingId } = session.metadata;

        if (!bookingId) {
          console.error("No bookingId in metadata");
          break;
        }

        await Booking.findByIdAndUpdate(bookingId, {
          isPaid: true,
          paymentLink: "",
        });

        console.log(`✅ Booking ${bookingId} marked as paid`);
        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
    }

    response.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    response.status(500).send("Internal server error");
  }
};
