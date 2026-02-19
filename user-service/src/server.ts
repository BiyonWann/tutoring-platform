import 'dotenv/config';
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import curriculumRoutes from "./routes/curriculumRoutes";
import enrollmentRoutes from "./routes/enrollmentRoutes";

const app = express();

// Allow frontend to make requests to this backend
app.use(cors());
app.use(express.json());

// Auth & Users (existing)
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Dashboard
app.use("/curricula", curriculumRoutes);
app.use("/enrollments", enrollmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Auth Service Listening on PORT ${PORT}`);
});

