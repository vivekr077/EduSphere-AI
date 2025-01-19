import { GenerateStudyTypeContentAiModel } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
      const {chapters, courseId , type} = await req.json();
      const PROMPT = 'Generate the flashcard on topic : '+chapters+' Fundamentals, User Interface (UI) Development,Basic App Navigation in JSON format with front back content, Maximum 15'
      // console.log("hii");
      // console.log("chapters is: ", chapters);
      // console.log("courseId is: ", courseId);
      // console.log("type is: ", type);
      // console.log("prompt is: ", PROMPT);
       
      // insert Record to DB, update status to Generating...
      const result = await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
          courseId: courseId,
          type: type,  
      }).returning({id: STUDY_TYPE_CONTENT_TABLE.id});
      console.log("db inserted", result);
      
      // Trigger Inngest Function
      // inngest.send({
      //   name: 'StudyType.content',
      //   data: {
      //       studyType: type,
      //       prompt: PROMPT,
      //       courseId: courseId,
      //       recordId: result[0].id
      //   }
      // })
      const result1 = await GenerateStudyTypeContentAiModel.sendMessage(PROMPT);
      console.log("hiiii");
      const aiResult = result1?.response?.text(); 
      console.log("aiResult is: ", aiResult);
           
      const cleanResponse = aiResult?.replace(/```json\n|\n```/g, "").trim();
      console.log("cleanResponse is: ", cleanResponse);
      
      const parsedData = JSON.parse(cleanResponse);
      console.log("parsedData is: ", parsedData);
      
      await db.update(STUDY_TYPE_CONTENT_TABLE)
      .set({
        content: parsedData,
        status: "Ready"
      }).where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId))
      .where(eq(STUDY_TYPE_CONTENT_TABLE.type, type))      
      
      return NextResponse.json(result[0].id)
}