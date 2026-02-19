import { Router } from "express";
import { CurriculumController } from "../controllers/curriculumController";
import { authMiddleware } from "../middleware/auth";

const router = Router();
const curriculumController = new CurriculumController();

/**
 * GET /curricula
 * Returns all public, active curricula.
 */
router.get("/", authMiddleware, (req, res) =>
  curriculumController.getAllCurricula(req, res)
);

/**
 * GET /curricula/stats
 * Returns platform wide stats (students, tutors, completion rate, avg rating).
 */
router.get("/stats", authMiddleware, (req, res) =>
  curriculumController.getPlatformStats(req, res)
);

/**
 * GET /curricula/:id
 * Returns a single curriculum by ID, including its modules and lessons.
 */
router.get("/:id", authMiddleware, (req, res) =>
  curriculumController.getCurriculumById(req, res)
);

export default router;
