import React from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { ArrowRight, Play } from 'lucide-react'
import { useRouter } from 'next/navigation'

const CTASection = () => {
  const router = useRouter();

  return (
    <motion.div 
      className="mt-20 w-full max-w-[1200px] text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10 border border-blue-200 dark:border-blue-400/30 rounded-2xl p-12 shadow-lg dark:shadow-lg dark:shadow-blue-500/10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">Ready to Transform Your Learning?</h2>
      <p className="text-lg text-gray-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">Join thousands of students already using AI to accelerate their education</p>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <Button
          className="w-full md:w-48 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white rounded-lg py-3 px-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/50 dark:hover:shadow-blue-500/30 font-semibold hover:scale-105 transform"
          onClick={() => router.push('/dashboard')}
        >
          Start Learning Free <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          className="w-full md:w-48 border-blue-300 dark:border-blue-400/50 text-blue-600 dark:text-blue-400 bg-white dark:bg-white/10 rounded-lg py-3 px-6 transition-all duration-300 hover:bg-blue-50 dark:hover:bg-white/20 font-semibold"
        >
          Watch Demo <Play className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default CTASection;