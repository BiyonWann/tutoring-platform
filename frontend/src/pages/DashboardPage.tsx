import { useState } from 'react';
import CourseCard  from '../components/CourseCard';
import FilterBar from '../components/FilterBar';
import { BookOpen, Code, Database, Brain, TrendingUp } from 'lucide-react';

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

const courses: Course[] = [
  {
    id: 1,
    title: 'Python Fundamentals',
    description: 'Start your Python journey with the basics. Learn syntax, data types, control structures, and functions.',
    level: 'Beginner',
    duration: '4 weeks',
    modules: 12,
    category: 'Core Python',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1667372531881-6f975b1c86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxweXRob24lMjBwcm9ncmFtbWluZyUyMGNvZGV8ZW58MXx8fHwxNzcwOTM4OTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    title: 'Object-Oriented Programming',
    description: 'Master OOP concepts in Python including classes, inheritance, polymorphism, and design patterns.',
    level: 'Intermediate',
    duration: '6 weeks',
    modules: 15,
    category: 'Core Python',
    icon: Code,
    image: 'https://images.unsplash.com/photo-1629360021730-3d258452c425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwY29tcHV0ZXJ8ZW58MXx8fHwxNzcwODczMzkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    title: 'Data Science with Python',
    description: 'Dive into data analysis and visualization using NumPy, Pandas, and Matplotlib.',
    level: 'Intermediate',
    duration: '8 weeks',
    modules: 20,
    category: 'Data Science',
    icon: Database,
    image: 'https://images.unsplash.com/photo-1653133224274-502be21976e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzA5Mzg5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    title: 'Machine Learning Fundamentals',
    description: 'Learn machine learning algorithms and implement them using scikit-learn and TensorFlow.',
    level: 'Advanced',
    duration: '10 weeks',
    modules: 25,
    category: 'Machine Learning',
    icon: Brain,
    image: 'https://images.unsplash.com/photo-1653133224274-502be21976e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzA5Mzg5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 5,
    title: 'Web Development with Django',
    description: 'Build full-stack web applications using Django framework, databases, and RESTful APIs.',
    level: 'Intermediate',
    duration: '8 weeks',
    modules: 18,
    category: 'Web Development',
    icon: Code,
    image: 'https://images.unsplash.com/photo-1667372531881-6f975b1c86db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxweXRob24lMjBwcm9ncmFtbWluZyUyMGNvZGV8ZW58MXx8fHwxNzcwOTM4OTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 6,
    title: 'Python for Automation',
    description: 'Automate everyday tasks with Python scripts, file handling, and web scraping.',
    level: 'Beginner',
    duration: '5 weeks',
    modules: 14,
    category: 'Automation',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1629360021730-3d258452c425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwY29tcHV0ZXJ8ZW58MXx8fHwxNzcwODczMzkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export default function DashboardPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredCourses = courses.filter((course) => {
    const levelMatch = selectedLevel === 'All' || course.level === selectedLevel;
    const categoryMatch = selectedCategory === 'All' || course.category === selectedCategory;
    return levelMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-background bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] bg-fixed">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-4">Choose Your Learning Path</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From beginner to advanced, our experienced tutors provide personalized instruction to help you master Python.
              Select a course that matches your skill level and interests.
            </p>
          </div>
          
          {/* Current Course Banner */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-xl p-6 max-w-3xl mx-auto shadow-lg mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary rounded-lg p-3 shadow-md">
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Currently Enrolled</p>
                  <h3 className="text-xl font-bold text-foreground">Object-Oriented Programming</h3>
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-48 bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-sm text-muted-foreground font-medium">60% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-semibold">
                View Progress
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar
          selectedLevel={selectedLevel}
          selectedCategory={selectedCategory}
          onLevelChange={setSelectedLevel}
          onCategoryChange={setSelectedCategory}
        />

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No courses match your selected filters.</p>
          </div>
        )}

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-secondary/20 via-card to-accent/10 rounded-2xl shadow-xl p-10 mt-12 border-2 border-secondary/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-accent font-medium">Students Enrolled</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">50+</div>
              <p className="text-accent font-medium">Expert Tutors</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <p className="text-accent font-medium">Completion Rate</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">4.8/5</div>
              <p className="text-accent font-medium">Average Rating</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}