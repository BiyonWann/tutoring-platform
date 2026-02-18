/**
 *  Test data for database to test API 
 *  Makes tutor, student, 3 courses, active enrollment, 1 review on a course 
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create tutor 
  const hashedPassword = await bcrypt.hash("Password123", 10);

  const tutor = await prisma.user.upsert({
    where: { email: "tutor@rainfall.com" },
    update: {},
    create: {
      email: "tutor@rainfall.com",
      password: hashedPassword,
      firstName: "Alice",
      lastName: "Chen",
      role: "TUTOR",
      bio: "Senior Python developer with 10 years of experience.",
      hourlyRate: 75,
      teachingAreas: ["Python", "Machine Learning", "Data Science"],
    },
  });
  console.log("Tutor created:", tutor.email);

  // Create student 
  const student = await prisma.user.upsert({
    where: { email: "student@rainfall.com" },
    update: {},
    create: {
      email: "student@rainfall.com",
      password: hashedPassword,
      firstName: "John",
      lastName: "Smith",
      role: "STUDENT",
      studentLevel: "INTERMEDIATE",
    },
  });
  console.log("Student created:", student.email);

  // Create curricula
  const oopCourse = await prisma.curriculum.upsert({
    where: { id: "curriculum-oop-001" },
    update: {},
    create: {
      id: "curriculum-oop-001",
      title: "Object-Oriented Programming",
      description: "Master OOP principles and design patterns in Python. Build real-world applications using classes, inheritance, and polymorphism.",
      subject: "Python",
      level: "INTERMEDIATE",
      tags: ["python", "oop", "design-patterns"],
      objectives: ["Understand classes and objects", "Apply inheritance and polymorphism", "Use design patterns"],
      prerequisites: ["Basic Python syntax", "Functions and loops"],
      estimatedHours: 40,
      isPublic: true,
      isActive: true,
      createdBy: tutor.id,
      thumbnailUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400",
    },
  });

  const mlCourse = await prisma.curriculum.upsert({
    where: { id: "curriculum-ml-001" },
    update: {},
    create: {
      id: "curriculum-ml-001",
      title: "Machine Learning Fundamentals",
      description: "Learn machine learning algorithms and implement them using scikit-learn and TensorFlow.",
      subject: "Machine Learning",
      level: "ADVANCED",
      tags: ["machine-learning", "scikit-learn", "tensorflow", "python"],
      objectives: ["Understand supervised and unsupervised learning", "Build ML models with scikit-learn", "Intro to neural networks"],
      prerequisites: ["Python intermediate", "Basic statistics", "Linear algebra basics"],
      estimatedHours: 60,
      isPublic: true,
      isActive: true,
      createdBy: tutor.id,
      thumbnailUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
    },
  });

  const beginnerCourse = await prisma.curriculum.upsert({
    where: { id: "curriculum-py-001" },
    update: {},
    create: {
      id: "curriculum-py-001",
      title: "Python for Beginners",
      description: "Start your Python journey from zero. Learn variables, loops, functions, and build your first programs.",
      subject: "Python",
      level: "BEGINNER",
      tags: ["python", "beginner", "programming-basics"],
      objectives: ["Write basic Python programs", "Understand variables and data types", "Use loops and functions"],
      prerequisites: ["No experience needed"],
      estimatedHours: 20,
      isPublic: true,
      isActive: true,
      createdBy: tutor.id,
      thumbnailUrl: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400",
    },
  });

  console.log("✅ 3 curricula created");

  // Enroll student in the OOP course (60% complete)
  await prisma.curriculumEnrollment.upsert({
    where: {
      studentId_curriculumId: {
        studentId: student.id,
        curriculumId: oopCourse.id,
      },
    },
    update: {},
    create: {
      studentId: student.id,
      curriculumId: oopCourse.id,
      status: "ACTIVE",
      progressPercentage: 60,
      lastAccessedAt: new Date(),
    },
  });
  console.log("✅ Enrollment created: John enrolled in OOP course at 60%");

  // Add review on the ML course 
  await prisma.curriculumReview.upsert({
    where: {
      userId_curriculumId: {
        userId: student.id,
        curriculumId: mlCourse.id,
      },
    },
    update: {},
    create: {
      userId: student.id,
      curriculumId: mlCourse.id,
      rating: 5,
      title: "Excellent course!",
      comment: "Really well structured. The TensorFlow section was especially helpful.",
      isVerified: true,
    },
  });
  console.log("Review created on ML course");

  console.log("\n Seeding complete!");
  console.log("──────────────────────────────────────");
  console.log("Student login -> email: student@rainfall.com | password: Password123");
  console.log("Tutor login -> email: tutor@rainfall.com   | password: Password123");
  console.log("Student ID -> ", student.id);
  console.log("──────────────────────────────────────");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
