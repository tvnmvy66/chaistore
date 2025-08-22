import express from 'express';
import rateLimit from "express-rate-limit";
import dotenv from 'dotenv';
import cors from 'cors';
import ProductRoutes from './routes/product.js'; 
import AuthRoutes from './routes/auth.js';
import connectDB from './utils/db.js';
import OrdersRoutes from './routes/orders.js'
import UsersRoutes from './routes/user.js'
import { authMiddleware } from './middleware/authMiddleware.js'

dotenv.config();
connectDB();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, chill out 😅" },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(limiter)

app.get('/', (req, res) => {
    res.send('Express server is running!');
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: "ok", uptime: process.uptime() });
});

app.use('/api/products', ProductRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/orders', authMiddleware , OrdersRoutes);
app.use('/api/myaccount', authMiddleware, UsersRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});