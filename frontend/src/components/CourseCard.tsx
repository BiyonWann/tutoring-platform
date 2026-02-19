import { Clock, BookOpen, UserPlus } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modules: number;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const levelColors = {
    Beginner: 'bg-[#005757]/10 text-[#005757] border-[#005757]/20',
    Intermediate: 'bg-[#2FA4D7]/10 text-[#2FA4D7] border-[#2FA4D7]/20',
    Advanced: 'bg-[#DABF54]/10 text-[#DABF54] border-[#DABF54]/20',
  };

  const Icon = course.icon;

  return (
    <div className="mb-6 bg-card rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-1 border border-border">
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${levelColors[course.level]}`}>
            {course.level}
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-primary/20 rounded-lg p-2 mt-1 border-2 border-primary/30">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-foreground font-bold text-lg mb-2">{course.title}</h3>
            <p className="text-secondary text-sm font-medium mb-2">{course.category}</p>
          </div>
        </div>

        <p className="text-muted-foreground mb-5 flex-1 leading-relaxed text-sm">{course.description}</p>

        {/* Course Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5 pt-4 border-t border-border">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span className="font-medium">{course.modules} modules</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
          <UserPlus className="w-5 h-5" />
          Find Tutor
        </button>
      </div>
    </div>
  );
}