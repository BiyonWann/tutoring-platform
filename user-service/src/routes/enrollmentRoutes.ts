import { Router } from "express";
import { EnrollmentController } from "../controllers/enrollmentController";
import { authMiddleware } from "../middleware/auth";

const router = Router();
const enrollmentController = new EnrollmentController();

/**
 * GET /enrollments/student/:studentId
 * Returns every enrollment for a student across all statuses:
 * (active, completed, paused, expired, cancelled).
 */
router.get("/student/:studentId", authMiddleware, (req, res) =>
  enrollmentController.getStudentEnrollments(req, res)
);

/**
 * GET /enrollments/student/:studentId/active
 * Returns only the student's current active enrollment.
 * Returns 404 if the student has no active enrollment.
 */
router.get("/student/:studentId/active", authMiddleware, (req, res) =>
  enrollmentController.getActiveEnrollment(req, res)
);

export default router;
