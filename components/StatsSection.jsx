"use client"
import { motion } from 'framer-motion';
import { Sparkles, BookMarked, Target, Lightbulb } from 'lucide-react';

const StatsSection = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: "Smart Learning",
      desc: "AI adapts to your learning pace and style for optimal comprehension",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-500/10"
    },
    {
      icon: BookMarked,
      title: "Comprehensive Content",
      desc: "Get notes, quizzes, flashcards, and exam prep all in one place",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-500/10"
    },
    {
      icon: Target,
      title: "Goal-Oriented",
      desc: "Track progress and get personalized recommendations to improve",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-500/10"
    },
    {
      icon: Lightbulb,
      title: "Always Learning",
      desc: "Access thousands of topics across all subjects instantly",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-500/10"
    }
  ];

  return (
    <motion.div 
      className="w-full mt-16 mb-20"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, idx) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              className={`${benefit.bgColor} rounded-xl p-8 border border-gray-200 dark:border-white/10 hover:shadow-lg dark:hover:shadow-lg hover:shadow-blue-200/50 dark:hover:shadow-blue-500/20 transition-all duration-300`}
            >
              <div className="flex justify-center mb-4">
                <Icon className={`w-8 h-8 ${benefit.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-slate-300 text-sm text-center">{benefit.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default StatsSection;
