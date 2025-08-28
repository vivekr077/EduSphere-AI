import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { CreateNewUser, GenerateNotes, GenerateStudyTypeContent } from "@/inngest/functions";
export const runtimr = 'edge';

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client:inngest,
  streaming:'allow',
  functions: [
    /* your functions will be passed here later! */
    CreateNewUser,
    GenerateNotes,
    GenerateStudyTypeContent
  ],
});
  
 