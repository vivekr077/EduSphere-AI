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

  const isNotes = item?.type === 'notes';
  const notesCount = Array.isArray(studyTypeContent?.notes) ? studyTypeContent.notes.length : 0;
  const genericArray = Array.isArray(studyTypeContent?.[item?.type]) ? studyTypeContent[item.type] : [];
  const hasReadyGeneric = Array.isArray(genericArray) && genericArray.some(r => r?.status === 'Ready' && r?.content);
  const genericCount = genericArray.length;
  const contentCount = isNotes ? notesCount : (hasReadyGeneric ? genericCount : 0);
  const totalChapters = Array.isArray(course?.courseLayout?.chapters) ? course.courseLayout.chapters.length : 0;

  // Prevent parallel generation across types
  const notesGenerating = totalChapters > 0 && notesCount < totalChapters; // includes 0
  const flashArr = Array.isArray(studyTypeContent?.Flashcard) ? studyTypeContent.Flashcard : [];
  const quizArr = Array.isArray(studyTypeContent?.Quiz) ? studyTypeContent.Quiz : [];
  const qaArr = Array.isArray(studyTypeContent?.qa) ? studyTypeContent.qa : [];
  const flashGenerating = flashArr.some(r => r?.status && r.status !== 'Ready');
  const quizGenerating = quizArr.some(r => r?.status && r.status !== 'Ready');
  const qaGenerating = qaArr.some(r => r?.status && r.status !== 'Ready');
  const anyGenerating = notesGenerating || flashGenerating || quizGenerating || qaGenerating;

  

  return (
    <div
      className={`border shadow-md rounded-lg p-5 flex flex-col items-center
      ${isNotes ? (notesCount===0 ? "grayscale" : "") : (!hasReadyGeneric ? "grayscale" : "")}
      `}
    >
      {contentCount == 0 ? (
        <h2 className="p-1 px-2 bg-gray-500 text-white rounded-full text-[10px] mb-2">
          {isNotes ? 'Generating' : 'Generate'}
        </h2>
      ) : (
        <h2 className="p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2">
          Ready
        </h2>
      )}

      <Image src={item.icon} alt={item.name} width={50} height={50} />
      <h2 className="font-medium mt-3">{item.name}</h2>
      <p className="text-gray-500 text-sm text-center">{item.desc}</p>

      {isNotes ? (
        contentCount === 0 ? (
          <div className="w-full text-center text-xs text-gray-500 mt-3">
            Notes are generating. Please check again in a minute.
          </div>
        ) : (
          <div className="w-full">
            <Link href={"/course/" + course?.courseId + item?.path}>
              <Button className="mt-3 w-full" variant="outline">
                View
              </Button>
            </Link>
            {contentCount < totalChapters && (
              <div className="w-full text-center text-xs text-gray-500 mt-2">
                More notes are generating. Please check again in about a minute for all pages.
              </div>
            )}
          </div>
        )
      ) : (
        !hasReadyGeneric ? (
          <Button
            className="mt-3 w-full"
            variant="outline"
            onClick={() => {
              if (anyGenerating) {
                toast('Please wait until the current generation finishes')
                return;
              }
              generateContent()
            }}
            disabled={anyGenerating}
            title={anyGenerating ? 'Please wait while another item is generating' : undefined}
            aria-disabled={anyGenerating}
          >
            {loading && <RefreshCcw className=" animate-spin" />}
            {anyGenerating ? 'Please wait...' : 'Generate'}
          </Button>
        ) : (
          <div className="w-full">
            <Link href={"/course/" + course?.courseId + item?.path}>
              <Button className="mt-3 w-full" variant="outline">
                View
              </Button>
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default MaterialCardItem;
