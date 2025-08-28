-- Add timestamp field to studyMaterial table
ALTER TABLE "studyMaterial" ADD COLUMN "createdAt" timestamp DEFAULT now();
