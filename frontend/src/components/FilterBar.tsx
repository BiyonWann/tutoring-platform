import { Filter } from 'lucide-react';

interface FilterBarProps {
  selectedLevel: string;
  selectedCategory: string;
  onLevelChange: (level: string) => void;
  onCategoryChange: (category: string) => void;
}

export default function FilterBar({
  selectedLevel,
  selectedCategory,
  onLevelChange,
  onCategoryChange,
}: FilterBarProps) {
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const categories = ['All', 'Core Python', 'Data Science', 'Machine Learning', 'Web Development', 'Automation'];

  return (
    <div className="bg-gradient-to-r from-card via-primary/5 to-card rounded-xl shadow-lg p-6 mb-8 border-2 border-primary/20">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-primary/20 rounded-lg p-1.5 border border-primary/30">
          <Filter className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-foreground font-bold text-lg">Filter Courses</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Level Filter */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-2">Skill Level</label>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => onLevelChange(level)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedLevel === level
                    ? 'bg-primary text-primary-foreground shadow-md transform scale-105'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 border-2 border-border hover:border-primary/30'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border-2 border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary font-medium"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}