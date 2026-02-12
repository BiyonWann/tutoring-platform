import 'dotenv/config';
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes"

const app = express();

// Allow frontend to make requests to this backend
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users",userRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Auth Service Listening on PORT ${PORT}`);
});

