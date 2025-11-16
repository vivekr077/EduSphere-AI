import React from 'react'
import { motion } from 'framer-motion'
import { Brain, BookOpen, Trophy, Play } from "lucide-react";

const WorkSection = () => {
  const steps = [
    {
      num: "1",
      icon: BookOpen,
      title: "Choose Topic",
      desc: "Select your subject or enter a custom topic you want to learn",
      gradient: "from-blue-500 to-blue-600",
      textGradient: "from-blue-400 to-blue-500"
    },
    {
      num: "2",
      icon: Brain,
      title: "AI Generates",
      desc: "Our AI creates comprehensive course materials instantly",
      gradient: "from-purple-500 to-purple-600",
      textGradient: "from-purple-400 to-purple-500"
    },
    {
      num: "3",
      icon: Play,
      title: "Start Learning",
      desc: "Access your personalized course with videos, notes, and quizzes",
      gradient: "from-pink-500 to-pink-600",
      textGradient: "from-pink-400 to-pink-500"
    },
    {
      num: "4",
      icon: Trophy,
      title: "Track Progress",
      desc: "Monitor your learning journey and achieve your goals",
      gradient: "from-orange-500 to-orange-600",
      textGradient: "from-orange-400 to-orange-500"
    }
  ];

  return (
    <motion.div 
      className="mt-40 max-w-[1080px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left side - Title with gradient */}
        <motion.div 
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="mt-6 text-gray-600 dark:text-slate-400 text-lg leading-relaxed">
            Our AI-powered platform makes learning seamless and personalized. Follow these simple steps to get started on your learning journey.
          </p>
        </motion.div>

        {/* Right side - Steps vertically */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={idx} 
                className="flex gap-4 items-start"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 + idx * 0.1 }}
              >
                {/* Icon circle */}
                <div className={`bg-gradient-to-r ${step.gradient} w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                {/* Text content */}
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {step.num}. {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WorkSection;