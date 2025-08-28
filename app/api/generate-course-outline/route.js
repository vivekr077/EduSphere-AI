import { NextResponse } from "next/server";
import { courseOutlineAIModal } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";

export async function POST(req) {
    const { courseId, topic, courseType, difficultyLevel, createdBy } = await req.json();    
    //  const { courseId, topic, courseType, difficultyLevel, createdBy } = await req.json();

     const PROMPT = 'Generate a study material  for '+topic+' for '+courseType+' and level of difficulty will be '+difficultyLevel+' with summary of course, List of Chapters (Max 7) along with summary and Emoji icon for each chapter, Topic list in each chapter, All result in JSON format'
    // Generate Course Layout 
     const aiRes = await courseOutlineAIModal.sendMessage(PROMPT);
     const aiResult =  aiRes.response.text();
     const cleanResponse = aiResult.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();
     const parsedData = JSON.parse(cleanResponse);
     
    // Save the result along with user input
    const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId: courseId,
        courseType: courseType,
        createdBy: createdBy,
        topic: topic,
        courseLayout: parsedData,
        createdAt: new Date()
    }).returning({res: STUDY_MATERIAL_TABLE})

    // Trigger the Inngest function to genetrate chapter notes
     const result = await inngest.send({
        name: 'notes.generate',
        data:{
            course: dbResult[0].res
        }
     })
    return NextResponse.json({result: dbResult[0]})     
}