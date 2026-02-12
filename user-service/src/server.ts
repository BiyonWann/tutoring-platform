import 'dotenv/config';
import express from "express";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes"
import { authMiddleware } from './middleware/auth';

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users",userRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Auth Service Listening on PORT ${PORT}`);
});

