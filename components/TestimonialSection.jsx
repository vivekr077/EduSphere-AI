import { Star } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'

const TestimonialSection = () => {
  const testimonials = [
    {
      stars: 5,
      text: "I went from struggling with Data Structures to scoring 92 on my final exam. EduSphere's adaptive study materials made complex topics finally click!",
      initials: "AK",
      name: "Aditya Kumar",
      role: "Computer Science Student",
      light: "bg-blue-50 border-blue-200 hover:border-blue-400",
      dark: "dark:bg-blue-500/10 dark:border-blue-400/30 dark:hover:border-blue-400/60",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-600"
    },
    {
      stars: 5,
      text: "Used EduSphere to prep for my MBA entrance exam in just 3 weeks. Scored in 98th percentile. The AI-generated mock tests were incredibly accurate!",
      initials: "PR",
      name: "Priya Rajpurohit",
      role: "MBA Aspirant",
      light: "bg-purple-50 border-purple-200 hover:border-purple-400",
      dark: "dark:bg-purple-500/10 dark:border-purple-400/30 dark:hover:border-purple-400/60",
      gradientFrom: "from-purple-500",
      gradientTo: "to-purple-600"
    },
    {
      stars: 5,
      text: "As a teacher with 200+ students, EduSphere saves me 15 hours per week on content creation. My students love the personalized study paths!",
      initials: "VJ",
      name: "Vikram Joshi",
      role: "Physics Teacher",
      light: "bg-green-50 border-green-200 hover:border-green-400",
      dark: "dark:bg-green-500/10 dark:border-green-400/30 dark:hover:border-green-400/60",
      gradientFrom: "from-green-500",
      gradientTo: "to-green-600"
    }
  ];

  return (
    <motion.div 
      className="mt-40 mb-20 w-full lg:max-w-[1200px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.3 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">What Students Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, idx) => (
          <motion.div 
            key={idx} 
            className="flex flex-col bg-gray-100 dark:bg-gray-800/50 rounded-xl p-6 shadow-lg shadow-gray-300 dark:shadow-gray-700 hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div className="flex mb-4 gap-1">
              {[...Array(testimonial.stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 dark:text-slate-300 mb-6 leading-relaxed text-sm italic flex-grow">"{testimonial.text}"</p>
            <div className="flex items-center">
              <div className={`bg-gradient-to-r ${testimonial.gradientFrom} ${testimonial.gradientTo} w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>
                <span className="text-white font-semibold text-sm">{testimonial.initials}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{testimonial.name}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TestimonialSection;