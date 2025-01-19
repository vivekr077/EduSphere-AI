"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const MaterialCardItem = ({ item, studyTypeContent, course, refreshData }) => {
  const [loading, setLoading] = useState(false);
  
  const generateContent = async () => {
    setLoading(true);
    // console.log(course);
    let chapters = "";
    course?.courseLayout?.chapters.forEach((chapter) => {
      chapters = chapter?.chapter_title + "," + chapters;
    });

    const result = await axios.post("/api/generate-study-type-content", {
      courseId: course?.courseId,
      type: item?.name,
      chapters: chapters,
    });
    setLoading(false);
    // console.log("item are: ", item);
    // console.log("refresh data is: ", refreshData);
    console.log("length is:");
    
    console.log("length is: ", studyTypeContent?.[item.type]?.length);

    // console.log("final result : ", result);
    await refreshData();
  };

  return (
    <div
      className={`border shadow-md rounded-lg p-5 flex flex-col items-center
      ${studyTypeContent?.[item.type]?.length == null && "grayscale"}
      `}
    >
      {studyTypeContent?.[item.type]?.length == null ? (
        <h2 className="p-1 px-2 bg-gray-500 text-white rounded-full text-[10px] mb-2">
          Generate
        </h2>
      ) : (
        <h2 className="p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2">
          Ready
        </h2>
      )}

      <Image src={item.icon} alt={item.name} width={50} height={50} />
      <h2 className="font-medium mt-3">{item.name}</h2>
      <p className="text-gray-500 text-sm text-center">{item.desc}</p>

      {studyTypeContent?.[item.type]?.length == null ? (
        <Button
          className="mt-3 w-full"
          variant="outline"
          onClick={() => generateContent()}
        >
          {loading && <RefreshCcw className=" animate-spin" />}
          Generate
        </Button>
      ) : (
        <div className="w-full">
          <Link href={"/course/" + course?.courseId + item?.path}>
            <Button className="mt-3 w-full" variant="outline">
              View
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MaterialCardItem;
