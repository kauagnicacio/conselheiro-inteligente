-- Migration: Create chat-images storage bucket for user uploaded images
-- This bucket stores images sent by users in chat conversations

-- Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'chat-images',
  'chat-images',
  true, -- Public access for images to be viewable by OpenAI Vision API
  10485760, -- 10MB limit
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Set up Row Level Security (RLS) policies for the bucket

-- Policy 1: Allow authenticated users to upload images to their own folder
CREATE POLICY "Users can upload images to their own folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'chat-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 2: Allow public read access (needed for OpenAI Vision API)
CREATE POLICY "Public read access for chat images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'chat-images');

-- Policy 3: Allow users to delete their own images
CREATE POLICY "Users can delete their own images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'chat-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 4: Allow users to update their own images
CREATE POLICY "Users can update their own images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'chat-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
