"use client"
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import DashboardHeader from "./dashboard/_components/DashboardHeader";
import SideBar from "./dashboard/_components/SideBar";
import { CourseCountContext } from "./_context/CourseCountContext";
import { ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import WorkSection from "@/components/WorkSection";
import CourseTypeSection from "@/components/CourseTypeSection";
import TestimonialSection from "@/components/TestimonialSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

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
      {/* Fixed Grid Background */}
      
      <div className="fixed inset-0 -z-50 pointer-events-none dark:hidden">
        {/* Large grid */}
        <div className="bg-[linear-gradient(to_right,rgb(229,231,235)_1px,transparent_1px),linear-gradient(to_bottom,rgb(229,231,235)_1px,transparent_1px)] bg-[size:60px_60px] absolute inset-0" />
        
        {/* Small grid overlay */}
        <div className="bg-[linear-gradient(to_right,rgb(243,244,246)_0.5px,transparent_0.5px),linear-gradient(to_bottom,rgb(243,244,246)_0.5px,transparent_0.5px)] bg-[size:30px_30px] absolute inset-0" />
      </div>
      
      <DashboardHeader onMenuClick={()=>setMobileOpen(true)}/>
      {/* main content */}
      <div className="flex justify-center bg-gradient dark:bg-gray-900 min-h-full pt-20 relative">
        <div className="flex flex-col items-center w-full p-6 md:p-14  relative z-10">
          <div className="flex w-full justify-between items-center lg:max-w-[1000px]">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <Image src={'/knowledge.png'} alt="knowledge" width={60} height={60} className="hidden md:block -rotate-12 shadow-lg" />
            </motion.div>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl lg:text-5xl font-bold dark:text-white">
                AI-Powered{' '}
                <motion.span className="text-blue-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
                  ExamPrep
                </motion.span>
              </h1>
              <h1 className="text-4xl lg:text-5xl font-bold dark:text-white">Material Generator</h1>
              <p className="mt-3 text-slate-400 dark:text-slate-300">
                Your AI Exam Prep Companion: Effortless Study Material at Your Fingertips
              </p>
              <Button
                className="mt-8 w-40 bg-blue-500 text-white rounded-lg py-3 px-6 transition-all duration-300 hover:bg-blue-600 shadow-lg transform hover:scale-105"
                onClick={() => router.push('/dashboard')}
              >
                Get Started <ArrowRight />
              </Button>
              <h1 className="text-4xl font-bold mt-8 dark:text-white">
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

          {/* Stats Section */}
          {/* <StatsSection /> */}

          {/* Features Section */}
          <FeaturesSection />

          {/* How It Works Section */}
          <WorkSection />

          {/* Course Types Section */}
          <CourseTypeSection />

          {/* Testimonials Section */}
          <TestimonialSection />

          {/* CTA Section */}
          <CTASection />

        </div>
      </div>
      { /**Footer */}
           <Footer />
    </CourseCountContext.Provider>
  );
}