import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const userController = new UserController();

/**
 * GET /api/users/:userId
 * Get user profile by ID
 */
router.get("/:userId", (req, res) =>
  userController.getUserProfile(req, res)
);

/**
 * GET /api/users
 * Get all users
 */
router.get("/", (req, res) =>
  userController.getAllUsers(req, res)
);

/**
 * DELETE /api/users/:userId
 * Delete user by ID
 */
router.delete("/:userId", (req, res) =>
  userController.deleteUserById(req, res)
);

/**
 * DELETE /api/users
 * Delete all users
 */
router.delete("/", (req, res) =>
  userController.deleteAllUsers(req, res)
);

export default router;