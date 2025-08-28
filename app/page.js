"use client"
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import DashboardHeader from "./dashboard/_components/DashboardHeader";
import SideBar from "./dashboard/_components/SideBar";
import { CourseCountContext } from "./_context/CourseCountContext";
import { ArrowBigRight, ArrowRight, BookKeyIcon, CreativeCommonsIcon, Pencil, Brain, Zap, Clock, BookOpen, Users, Trophy, Star, CheckCircle, Play, Download, Share2 } from "lucide-react";
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState('');
  const fullText = 'Together!';
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const typingSpeed = 150; // Speed of typing (ms per letter)
  const deletingSpeed = 100; // Speed of deleting (ms per letter)
  const pause = 1000; // Pause before deleting (ms)

  // Mobile drawer + sidebar context for home page
  const [mobileOpen, setMobileOpen] = useState(false);
  const [totalCourse, setTotalCourse] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing logic
        if (index < fullText.length) {
          setText((prev) => prev + fullText[index]);
          setIndex((prev) => prev + 1);
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        // Deleting logic
        if (index > 0) {
          setText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index]);

  return (
    <CourseCountContext.Provider value={{ totalCourse, setTotalCourse }}>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={()=>setMobileOpen(false)}></div>
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg">
            <SideBar />
          </div>
        </div>
      )}
      <DashboardHeader onMenuClick={()=>setMobileOpen(true)} />
      {/* main content */}
      <div className="flex justify-center bg-gradient min-h-full mt-10">
        <div className="flex flex-col items-center w-full p-6 md:p-14 lg:max-w-[1024px]">
          <div className="flex w-full justify-between items-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <Image src={'/knowledge.png'} alt="knowledge" width={60} height={60} className="hidden md:block -rotate-12 shadow-lg" />
            </motion.div>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl lg:text-5xl font-bold">
                AI-Powered{' '}
                <motion.span className="text-blue-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
                  ExamPrep
                </motion.span>
              </h1>
              <h1 className="text-4xl lg:text-5xl font-bold">Material Generator</h1>
              <p className="mt-3 text-slate-400">
                Your AI Exam Prep Companion: Effortless Study Material at Your Fingertips
              </p>
              <Button
                className="mt-5 w-40 bg-blue-500 text-white rounded-lg py-3 px-6 transition-all duration-300 hover:bg-blue-600 shadow-lg transform hover:scale-105"
                onClick={() => router.push('/dashboard')}
              >
                Get Started <ArrowRight />
              </Button>
              <h1 className="text-4xl font-bold mt-8">
                Let's Learn{' '}
                <span className="text-blue-500">
                  {text}
                  <span className="animate-blink">|</span>
                </span>
              </h1>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <Image src={'/code.png'} alt="code" width={60} height={60} className="hidden md:block rotate-12 shadow-lg" />
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div 
            className="mt-20 w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Edusphere-AI?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300">
                <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Generation</h3>
                <p className="text-slate-400">Generate comprehensive study materials, quizzes, and flashcards using advanced AI technology tailored to your learning style.</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300">
                <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Instant Course Creation</h3>
                <p className="text-slate-400">Create complete courses in minutes. Just provide a topic and watch AI build structured lessons with assessments.</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-green-400/50 transition-all duration-300">
                <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Save 90% Time</h3>
                <p className="text-slate-400">Eliminate hours of manual content creation. Focus on learning while AI handles the heavy lifting of material preparation.</p>
              </div>
            </div>
          </motion.div>

          {/* How It Works Section */}
          <motion.div 
            className="mt-20 w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">1. Choose Topic</h3>
                <p className="text-slate-400">Select your subject or enter a custom topic you want to learn</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">2. AI Generates</h3>
                <p className="text-slate-400">Our AI creates comprehensive course materials instantly</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-pink-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">3. Start Learning</h3>
                <p className="text-slate-400">Access your personalized course with videos, notes, and quizzes</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-red-500 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">4. Track Progress</h3>
                <p className="text-slate-400">Monitor your learning journey and achieve your goals</p>
              </div>
            </div>
          </motion.div>

          {/* Statistics Section */}
          <motion.div 
            className="mt-20 w-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-3xl font-bold text-blue-400">10K+</h3>
                <p className="text-slate-400">Courses Generated</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-purple-400">50K+</h3>
                <p className="text-slate-400">Happy Students</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-green-400">98%</h3>
                <p className="text-slate-400">Success Rate</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-pink-400">24/7</h3>
                <p className="text-slate-400">AI Support</p>
              </div>
            </div>
          </motion.div>

          {/* Course Types Section */}
          <motion.div 
            className="mt-20 w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Generate Any Type of Course</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
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
              ].map((subject, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="text-2xl mb-2">{subject.icon}</div>
                  <p className="text-sm font-medium">{subject.name}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Testimonials Section */}
          <motion.div 
            className="mt-20 w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">What Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-4">"Edusphere-AI transformed my learning experience. Created a complete React course in minutes!"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">SJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-slate-400">Software Developer</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-4">"The AI-generated quizzes helped me ace my certification exam. Highly recommended!"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">MR</span>
                  </div>
                  <div>
                    <p className="font-semibold">Mike Rodriguez</p>
                    <p className="text-sm text-slate-400">Data Analyst</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-4">"As a teacher, this saves me hours of prep time. The content quality is outstanding."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">AL</span>
                  </div>
                  <div>
                    <p className="font-semibold">Anna Lee</p>
                    <p className="text-sm text-slate-400">High School Teacher</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="mt-20 w-full text-center bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-sm rounded-2xl p-12 border border-white/20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
            <p className="text-xl text-slate-500 mb-8">Join thousands of students already using AI to accelerate their education</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Button
                className="w-48 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg py-4 px-8 transition-all duration-300 hover:from-blue-600 hover:to-purple-700 shadow-lg transform hover:scale-105"
                onClick={() => router.push('/dashboard')}
              >
                Start Learning Free <ArrowRight className="ml-2" />
              </Button>
              <Button
                variant="outline"
                className="w-48 border-white/30 text-white rounded-lg py-4 px-8 transition-all duration-300 bg-white/10"
              >
                Watch Demo <Play className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          <footer className="mt-16 text-center text-slate-400 text-sm border-t border-white/10 pt-8">
            <p>© 2025 Edusphere-AI. All Rights Reserved. | Empowering Education Through AI</p>
            <div className="flex justify-center space-x-6 mt-4">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a>
            </div>
          </footer>
        </div>
      </div>
    </CourseCountContext.Provider>
  );
}