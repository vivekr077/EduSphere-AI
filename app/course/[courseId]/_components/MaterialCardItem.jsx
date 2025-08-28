"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const MaterialCardItem = ({ item, studyTypeContent, course, refreshData }) => {
  // console.log("studyTypeContent is: ", studyTypeContent);
  // console.log("item.type is: ", item.type)
  const [loading, setLoading] = useState(false);
  
  const generateContent = async () => {
    toast('Generating your content...')
    setLoading(true);
    // console.log(course);
    let chapters = "";
    course?.courseLayout?.chapters.forEach((chapter) => {
      chapters = chapter?.chapter_title + "," + chapters;
    });

    const result = await axios.post("/api/generate-study-type-content", {
      courseId: course?.courseId,
      type: item?.type,
      chapters: chapters,
    });
    setLoading(false);
    // console.log("item are: ", item);
    // console.log("refresh data is: ", refreshData);
    // console.log("length is:");
    
    // console.log("length is: ", studyTypeContent?.[item.type]?.length);

    // console.log("final result : ", result);
     refreshData(true);
     toast('Your content is ready to use')
  };

  return (
    <div
      className={`border shadow-md rounded-lg p-5 flex flex-col items-center
      ${(studyTypeContent?.[item?.type]?.length==0) && "grayscale"}
      `}
    >
      {studyTypeContent?.[item.type]?.length == 0 ? (
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

      {studyTypeContent?.[item.type]?.length == 0 ? (
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
