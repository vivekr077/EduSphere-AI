import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
     url: 'postgresql://edusphere-ai-db_owner:XHG3Mq9LKjtg@ep-noisy-frost-a5728luk.us-east-2.aws.neon.tech/edusphere-ai-db?sslmode=require'
  }
});
