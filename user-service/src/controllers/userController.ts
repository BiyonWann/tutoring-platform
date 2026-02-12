import { Request, Response } from "express";
import * as userService from "../services/userService";
import { success } from "zod";

export class UserController {
  /**
   * Get user profile by ID
   */
  async getUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
      }

      const user = await userService.getUserProfile(userId as string);

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({
          error:
            error instanceof Error ? error.message : "Failed to fetch user profile",
        });
    }
  }

  /**
   * Get all users
   */
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({
          error:
            error instanceof Error ? error.message : "Failed to fetch users",
        });
    }
  }

  /**
   * Delete user by ID
   */
  async deleteUserById(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
      }

      const deletedUser = await userService.deleteUserById(userId as string);
      res
        .status(200)
        .json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
      res
        .status(500)
        .json({
          error:
            error instanceof Error ? error.message : "Failed to delete user",
        });
    }
  }

  /**
   * Delete all users
   */
  async deleteAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const result = await userService.deleteAllUsers();
        res.status(200).json({
          success:true,
        message: "All users deleted successfully",
        count: result.count,
      });
    } catch (error) {
      res
        .status(500)
          .json({
            success:false,
          errors: {"error":error instanceof Error ? error.message : "Failed to delete users"}
        });
    }
  }
}

export default new UserController();