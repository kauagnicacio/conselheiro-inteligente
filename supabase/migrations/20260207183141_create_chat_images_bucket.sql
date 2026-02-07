-- Criar bucket para imagens do chat
INSERT INTO storage.buckets (id, name, public)
VALUES ('chat-images', 'chat-images', true)
ON CONFLICT (id) DO NOTHING;

-- Permitir que usuários autenticados façam upload de imagens
CREATE POLICY "Usuários autenticados podem fazer upload de imagens"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'chat-images' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Permitir que usuários autenticados vejam suas próprias imagens
CREATE POLICY "Usuários podem ver suas próprias imagens"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'chat-images' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Permitir que usuários deletem suas próprias imagens
CREATE POLICY "Usuários podem deletar suas próprias imagens"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'chat-images' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Permitir acesso público de leitura (para a IA acessar as imagens)
CREATE POLICY "Acesso público de leitura"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'chat-images');
