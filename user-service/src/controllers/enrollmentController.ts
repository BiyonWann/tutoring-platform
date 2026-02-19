import { Request, Response } from "express";
import * as enrollmentService from "../services/enrollmentService";

export class EnrollmentController {
  /**
   * GET /enrollments/student/:studentId
   * Get all enrollments for a student (every status: active, completed, paused…)
   */
  async getStudentEnrollments(req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.params.studentId as string;

      if (!studentId) {
        res.status(400).json({ error: "Student ID is required" });
        return;
      }

      const enrollments =
        await enrollmentService.getStudentEnrollments(studentId);

      res.status(200).json(enrollments);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch enrollments",
      });
    }
  }

  /**
   * GET /enrollments/student/:studentId/active
   * Get the student's single currently active enrollment.
   */
  async getActiveEnrollment(req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.params.studentId as string;

      if (!studentId) {
        res.status(400).json({ error: "Student ID is required" });
        return;
      }

      const enrollment =
        await enrollmentService.getActiveEnrollment(studentId);

      // It's valid for a student to have no active enrollment yet
      if (!enrollment) {
        res.status(404).json({ error: "No active enrollment found" });
        return;
      }

      res.status(200).json(enrollment);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch active enrollment",
      });
    }
  }
}

export default new EnrollmentController();
