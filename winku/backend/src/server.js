import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { connection } from './lib/db.js';
import { errorMiddleware } from './middleware/error.js';
import authRoutes from "./routes/auth.route.js"
import {removeUnverifiedAccounts} from "./automation/removeUnverifiedAccount.js"

export const app = express();
config({ path: "./config.env" });

// Middleware setup
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use('/api/auth', authRoutes);




app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})

removeUnverifiedAccounts();
connection();
app.use(errorMiddleware)



