"use client";
import { CourseCountContext } from "@/app/_context/CourseCountContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { LayoutDashboard, Shield, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const SideBar = () => {
  const MenuList = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
    {
      name: "profile",
      icon: UserCircle,
      path: "/dashboard/profile",
    },
  ];

  const path = usePathname();
  const route = useRouter();
  const { totalCourse, setTotalCourse } = useContext(CourseCountContext);
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState();

  const handleCreateCourse = () => {
    const planType = userDetails?.planType || 'free';
    const isMonthly = userDetails?.isMember && planType === 'monthly';
    const isYearly = userDetails?.isMember && planType === 'yearly';

    // Limits
    const freeLimit = 5;
    const monthlyLimit = 100;
    const yearlyUnlimited = true;

    if (isYearly || (isMonthly && totalCourse < monthlyLimit) || (!userDetails?.isMember && totalCourse < freeLimit)) {
      route.push('/create')
    } else {
      route.push('/dashboard/upgrade')
      if (!userDetails?.isMember) {
        toast.error("Please upgrade your plan! Your Free Credit Limit reached")
      } else if (isMonthly) {
        toast.error("Monthly plan credit limit (100) reached. Upgrade to Yearly for unlimited access.")
      }
    }
  };

  useEffect(() => {
    user && GetDetails();
  }, [user]);

  const GetDetails = async () => {
    const result = await db
      .select()
      .from(USER_TABLE)
      .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

    setUserDetails(result[0]);
    console.log("hii");
    console.log("user is: ", user);

    console.log("userdetails is: ", result[0]);
  };

  return (
    <div className="h-screen shadow-md p-5">
      <div className="flex gap-2 items-center">
         <Link href="/" className="flex items-center gap-2 cursor-pointer" onClick={()=>{
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('close-mobile-drawer'))
            }
         }}>
          <Image src="/logo.svg" alt="logo" width={40} height={40} />
          <h2 className="font-bold text-lg">EduSphere-AI</h2>
        </Link>
      </div>

      <div className="mt-10">
        <Button className="w-full" onClick={handleCreateCourse}>
          + Create New
        </Button>
        <div className="mt-5">
          {MenuList.map((menu, index) => (
            <div
              key={index}
              className={`flex gap-5 items-center p-3 hover:bg-slate-200 rounded-lg cursor-pointer mt-3 ${
                path == menu.path && "bg-slate-200"
              }`}
              onClick={() => {
                route.push(menu.path);
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('close-mobile-drawer'))
                }
              }}
            >
              <menu.icon />
              <h2>{menu.name}</h2>
            </div>
          ))}
        </div>
      </div>
      {userDetails?.isMember==true ? (
        <>
          <div className="border p-3 bg-slate-100 rounded-lg absolute bottom-10 w-[85%] border-yellow-500">
            {userDetails?.planType === 'monthly' ? (
              <>
                <h2 className=" text-lg text-yellow-600 mb-2">
                  Available Credits: {Math.max(0, 100 - (totalCourse || 0))}
                </h2>
                <Progress value={Math.min(100, ((totalCourse || 0) / 100) * 100)} />
                <h2 className="text-sm text-yellow-600">{totalCourse || 0} Out of 100 Credits Used</h2>
              </>
            ) : (
              <>
                <h2 className=" text-lg text-yellow-600 mb-2">
                  Available Credits: Unlimited
                </h2>
                <h2 className="text-sm text-yellow-600">Total: {totalCourse} Course Generated</h2>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="border p-3 bg-slate-100 rounded-lg absolute bottom-10 w-[85%]">
            <h2 className="text-lg mb-2">
              Available Credits: {5 - totalCourse}
            </h2>
            <Progress value={(totalCourse / 5) * 100} />
            <h2 className="text-sm">{totalCourse} Out of 5 Credits Used</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
