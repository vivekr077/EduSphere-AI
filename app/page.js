"use client"
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import DashboardHeader from "./dashboard/_components/DashboardHeader";
import { ArrowBigRight, ArrowRight, BookKeyIcon, CreativeCommonsIcon, Pencil } from "lucide-react";
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
    <>
      <DashboardHeader />
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
    <footer className="mt-10 text-center text-slate-400 text-sm">
      © 2025 AI ExamPrep. All Rights Reserved.
    </footer>
  </div>
</div>


    </>
  );
}
