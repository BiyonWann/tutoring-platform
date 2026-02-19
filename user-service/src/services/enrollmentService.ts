import prisma from "../utils/prisma";

// ─── Service Functions ────────────────────────────────────────────────────────

/**
 * Get ALL enrollments for a student (active, completed, paused, etc.).
 * Each enrollment includes basic curriculum info so the frontend
 * can display the course title, subject, and thumbnail.
 *
 * Used by: GET /enrollments/student/:studentId
 */
export async function getStudentEnrollments(studentId: string) {
  const enrollments = await prisma.curriculumEnrollment.findMany({
    where: { studentId },
    include: {
      curriculum: {
        select: {
          id: true,
          title: true,
          subject: true,
          level: true,
          thumbnailUrl: true,
          estimatedHours: true,
        },
      },
    },
    // Show most recently accessed courses first
    orderBy: { lastAccessedAt: "desc" },
  });

  return enrollments;
}

/**
 * Get student's single currently active enrollment.
 * Returns null if the student has no active enrollment.
 *
 * Used by: GET /enrollments/student/:studentId/active
 */
export async function getActiveEnrollment(studentId: string) {
  const enrollment = await prisma.curriculumEnrollment.findFirst({
    where: {
      studentId,
      status: "ACTIVE",
    },
    include: {
      curriculum: {
        select: {
          id: true,
          title: true,
          subject: true,
          level: true,
          thumbnailUrl: true,
        },
      },
    },
    // If a student has multiple active courses, show the most recently accessed one
    orderBy: { lastAccessedAt: "desc" },
  });

  return enrollment; // null if none found — controller handles the 404
}
