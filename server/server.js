
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from './routes/showRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import userRouter from './routes/userRoutes.js';
import { stripeWebhooks } from './controllers/stripeWebhooks.js';

const app = express();
const port = 3000;

//mmiddle ware
await connectDB()

//stripe webhooks route
app.use('/api/stripe', express.raw({type:'application/json'}), stripeWebhooks)

//middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())

app.get('/', (req, res) => res.send('server is Live!'))
// app.use('/api/inngest', serve({client: inngest, functions}))
app.use('/api/inngest', serve({ client: inngest, functions }));
//                         👆 fixed: added space between `client:` and `inngest`
app.use('/api/show', showRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)



app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
