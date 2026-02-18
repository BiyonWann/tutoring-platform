import { Request, Response } from "express";
import * as curriculumService from "../services/curriculumService";

export class CurriculumController {
  /**
   * GET /curricula
   * Get all public and active curricula.
   * 
   * Optional query parameters include:
   *   ?level=BEGINNER (filter by skill level)
   *   ?subject=Python (filter by subject)
   */
  async getAllCurricula(req: Request, res: Response): Promise<void> {
    try {
      // type check req.query before passing to service 
      const level = typeof req.query.level === "string" ? req.query.level : undefined;
      const subject = typeof req.query.subject === "string" ? req.query.subject : undefined;

      const curricula = await curriculumService.getAllCurricula({ level, subject });

      res.status(200).json(curricula);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch curricula",
      });
    }
  }

  /**
   * GET /curricula/stats
   * Get platform stats for dashboard footer:
   *   (totalStudents, totalTutors, completionRate, averageRating)
   */
  async getPlatformStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = await curriculumService.getPlatformStats();
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch platform stats",
      });
    }
  }

  /**
   * GET /curricula/:id
   * Get a single curriculum by its ID.
   * Includes the full list of modules/lessons.
   */
  async getCurriculumById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;

      if (!id) {
        res.status(400).json({ error: "Curriculum ID is required" });
        return;
      }

      const curriculum = await curriculumService.getCurriculumById(id);

      if (!curriculum) {
        res.status(404).json({ error: "Curriculum not found" });
        return;
      }

      res.status(200).json(curriculum);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch curriculum",
      });
    }
  }
}

export default new CurriculumController();
