
    -- Remover políticas antigas se existirem
    DROP POLICY IF EXISTS "Users can upload images to their own folder" ON storage.objects;
    DROP POLICY IF EXISTS "Public read access for chat images" ON storage.objects;
    DROP POLICY IF EXISTS "Users can delete their own images" ON storage.objects;
    DROP POLICY IF EXISTS "Users can update their own images" ON storage.objects;

    -- Política 1: Upload para pasta própria
    CREATE POLICY "Users can upload images to their own folder"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
      bucket_id = 'chat-images' AND
      (storage.foldername(name))[1] = auth.uid()::text
    );

    -- Política 2: Leitura pública (para IA)
    CREATE POLICY "Public read access for chat images"
    ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'chat-images');

    -- Política 3: Deletar próprias imagens
    CREATE POLICY "Users can delete their own images"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (
      bucket_id = 'chat-images' AND
      (storage.foldername(name))[1] = auth.uid()::text
    );

    -- Política 4: Atualizar próprias imagens
    CREATE POLICY "Users can update their own images"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (
      bucket_id = 'chat-images' AND
      (storage.foldername(name))[1] = auth.uid()::text
    );
  