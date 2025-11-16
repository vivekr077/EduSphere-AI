"use client"
import { Brain, Zap, Clock } from "lucide-react";
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Generation",
      desc: "Generate comprehensive study materials, quizzes, and flashcards using advanced AI technology tailored to your learning style.",
      light: "bg-blue-50 border-blue-200 hover:border-blue-400",
      dark: "dark:bg-blue-500/10 dark:border-blue-400/30 dark:hover:border-blue-400/60",
      iconBg: "bg-blue-100 dark:bg-blue-500/20",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Zap,
      title: "Instant Course Creation",
      desc: "Create complete courses in minutes. Just provide a topic and watch AI build structured lessons with assessments.",
      light: "bg-purple-50 border-purple-200 hover:border-purple-400",
      dark: "dark:bg-purple-500/10 dark:border-purple-400/30 dark:hover:border-purple-400/60",
      iconBg: "bg-purple-100 dark:bg-purple-500/20",
      iconColor: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Clock,
      title: "Save 90% Time",
      desc: "Eliminate hours of manual content creation. Focus on learning while AI handles the heavy lifting of material preparation.",
      light: "bg-green-50 border-green-200 hover:border-green-400",
      dark: "dark:bg-green-500/10 dark:border-green-400/30 dark:hover:border-green-400/60",
      iconBg: "bg-green-100 dark:bg-green-500/20",
      iconColor: "text-green-600 dark:text-green-400"
    }
  ];

  return (
    <motion.div 
      className="mt-48 w-full lg:max-w-[1200px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div 
              key={idx} 
              className="flex flex-col items-center space-y-4 text-center bg-gray-100 dark:bg-gray-800/50 p-6 rounded-xl shadow-lg shadow-gray-300 dark:shadow-gray-700 hover:scale-105 transition-transform duration-300"
            >
              <div className={`${feature.iconBg} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <Icon className={`w-10 h-10 max-lg:w-8 max-lg:h-8 ${feature.iconColor}`} />
              </div>
              <h3 className=" text-xl max-lg:text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default FeaturesSection;