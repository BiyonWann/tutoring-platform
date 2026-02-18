import prisma from "../utils/prisma";


// Filters that can be passed in from the query string
interface CurriculumFilters {
  level?: string;   // e.g. "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT"
  subject?: string; // e.g. "Python" | "Machine Learning"
}

// ─── Service Functions ───

/**
 * Get all public, active curricula.
 * Optionally filter by skill level and/or subject.
 * Used by: GET /curricula
 */
export async function getAllCurricula(filters: CurriculumFilters) {
  // Build the where clause dynamically based on what filters were provided
  const where: Record<string, unknown> = {
    isActive: true,
    isPublic: true,
  };

  if (filters.level) {
    where.level = filters.level;
  }

  if (filters.subject) {
    where.subject = filters.subject;
  }

  const curricula = await prisma.curriculum.findMany({
    where,
    select: {
      id: true,
      title: true,
      description: true,
      subject: true,
      level: true,
      estimatedHours: true,
      thumbnailUrl: true,
      tags: true,
      price: true,
      // Count how many students are enrolled so the card can show it
      _count: {
        select: { enrollments: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return curricula;
}

/**
 * Get a single curriculum by its ID.
 * Includes its modules and lessons so the detail page can render them.
 *
 * Used by: GET /curricula/:id
 */
export async function getCurriculumById(curriculumId: string) {
  const curriculum = await prisma.curriculum.findUnique({
    where: { id: curriculumId },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            select: {
              id: true,
              title: true,
              type: true,
              duration: true,
              isRequired: true,
            },
          },
        },
      },
      // Count total enrollments for this curriculum
      _count: {
        select: { enrollments: true },
      },
    },
  });

  return curriculum; // controller handles 404 
}

/**
 * Get platform-wide stats shown in the footer of the dashboard:
 *  - Total students enrolled on the platform
 *  - Total tutors on the platform
 *  - Overall course completion rate (%)
 *  - Average curriculum rating (out of 5)
 * Used by: GET /curricula/stats
 */
export async function getPlatformStats() {
  const [
    totalStudents,
    totalTutors,
    totalEnrollments,
    completedEnrollments,
    ratingAggregate,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.user.count({ where: { role: "TUTOR" } }),
    prisma.curriculumEnrollment.count(),
    prisma.curriculumEnrollment.count({ where: { status: "COMPLETED" } }),
    prisma.curriculumReview.aggregate({ _avg: { rating: true } }),
  ]);

  // Avoiding divsion by zero error when there is 0 enrollments 
  const completionRate =
    totalEnrollments > 0
      ? Math.round((completedEnrollments / totalEnrollments) * 100)
      : 0;

  // Round average rating to one decimal place 
  const averageRating = ratingAggregate._avg.rating
    ? Number(ratingAggregate._avg.rating.toFixed(1))
    : 0;

  return {
    totalStudents,
    totalTutors,
    completionRate,
    averageRating,
  };
}
