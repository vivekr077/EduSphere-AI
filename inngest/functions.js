import { db } from "@/configs/db";
import { inngest } from "./client";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { generateNotesAIModal, GenerateStudyTypeContentAiModel } from "@/configs/AiModel";


export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const { user } = event.data;
    // Get Event Data
    const result = await step.run(
      "Check User and create if Not in DB",
      async () => {
        // check is user already exists
        const result = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

        console.log(result);
        if (result?.length == 0) {
          // if not, then add to DB
          const userRes = await db
            .insert(USER_TABLE)
            .values({
              name: user?.fullName,
              email: user?.primaryEmailAddress?.emailAddress,
            }).returning({ id: USER_TABLE.id });
            return userRes;
        }
        return result;
      }
    );
    return "Success";

    // Step to send welcome email notification

    // step to send email notification after 3 days once per join it
  }
);

export const GenerateNotes = inngest.createFunction(
   {id: 'generate-course'},
   {event: 'notes.generate'},
   async({event, step})=>{
        
       const { course } = event.data;  // All Record info

       // Generate the notes by using ai
       const notesResult = await step.run('Generate Chapter Notes', async () => {
           const Chapters = course?.courseLayout?.chapters;
           let index = 0;
           Chapters.forEach(async(chapter)=>{
              console.log("chapter is: ", chapter);
              
              const PROMPT = 'Generate exam material detail content or each chapter , Make sure to includes all topic point in the content, make sure to give content in HTML format (Do not Add HTML , Head, Body, title tag), The chapters :'+JSON.stringify(chapter);
              const result = await generateNotesAIModal.sendMessage(PROMPT);
              const aiRes = result.response.text();

              await db.insert(CHAPTER_NOTES_TABLE).values({
                  chapterId: index,
                  courseId: course?.courseId, 
                  notes: aiRes     
              })
              index = index+1;
           })
           return 'completed'
       })

       // update status to 'Ready'
       const updateCourseStatusResult = await step.run('Update course Status to Ready', async()=>{
            const result = await db.update(STUDY_MATERIAL_TABLE).set({
              status: 'Ready'
            }).where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId))
            return 'Success'
       })
   }
)


// used to generate FlashCard, Quiz, qa
export const GenerateStudyTypeContent = inngest.createFunction (
  {id: 'Generate Study Type Content'},
  {event: 'StudyType.content'},

  async({event, step})=>{
      const {studyType, prompt, courseId} =  event.data;

      let obj = [
        {
          "hey" : "bhai"
        }
      ]
      
      const FlashCardAiResult = await step.run('Generating Flashcard using AI', async()=>{
          //  const result = await GenerateStudyTypeContentAiModel.sendMessage(prompt);
          //  const aiResult = result.response.text();
          //  const cleanResponse = aiResult.replace(/```json\n|\n```/g, "").trim();
          //  const parsedData = JSON.parse(cleanResponse);

           await db.update(STUDY_TYPE_CONTENT_TABLE)
           .set({
             content: obj
           }).where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId))
           .where(eq(STUDY_TYPE_CONTENT_TABLE.type, studyType))
           
           return 'Data Inserted'
      })
      return("success")
  }
)