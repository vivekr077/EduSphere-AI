import React from 'react'
import { motion } from 'framer-motion'

const CourseTypeSection = () => {
  const subjects = [
    { name: "Programming", icon: "💻" },
    { name: "Mathematics", icon: "📊" },
    { name: "Science", icon: "🔬" },
    { name: "Languages", icon: "🗣️" },
    { name: "Business", icon: "💼" },
    { name: "Arts", icon: "🎨" },
    { name: "History", icon: "📚" },
    { name: "Medicine", icon: "🏥" },
    { name: "Engineering", icon: "⚙️" },
    { name: "Marketing", icon: "📈" },
    { name: "Design", icon: "✨" },
    { name: "Music", icon: "🎵" }
  ];

  return (
    <motion.div 
      className="mt-40 max-w-[1080px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.1 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Generate Any Type of Course</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {subjects.map((subject, index) => (
          <motion.div 
            key={index} 
            className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800/50 rounded-xl p-6 shadow-lg shadow-gray-300 dark:shadow-gray-700 hover:scale-105 transition-transform duration-300 cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{subject.icon}</div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white text-center leading-tight">{subject.name}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CourseTypeSection;