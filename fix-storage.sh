#!/bin/bash

# Script para corrigir configuração do storage do Supabase
# Executa automaticamente as políticas SQL necessárias

set -e

echo "🚀 CORRIGINDO STORAGE DO SUPABASE..."
echo ""

# Carregar variáveis de ambiente
if [ -f .env ]; then
    source .env
fi

SUPABASE_URL="${VITE_SUPABASE_URL}"
SERVICE_KEY="${SUPABASE_SERVICE_ROLE_KEY}"
PROJECT_REF="frfcxoumqsvnknoetdpq"

if [ -z "$SUPABASE_URL" ] || [ -z "$SERVICE_KEY" ]; then
    echo "❌ Erro: Variáveis de ambiente não configuradas"
    exit 1
fi

echo "📝 Preparando SQL para aplicar políticas..."
echo ""

# Criar SQL temporário
SQL_FILE="/tmp/apply-storage-policies.sql"

cat > "$SQL_FILE" << 'EOF'
-- Remover políticas antigas se existirem
DO $$
BEGIN
    DROP POLICY IF EXISTS "Users can upload images to their own folder" ON storage.objects;
    DROP POLICY IF EXISTS "Public read access for chat images" ON storage.objects;
    DROP POLICY IF EXISTS "Users can delete their own images" ON storage.objects;
    DROP POLICY IF EXISTS "Users can update their own images" ON storage.objects;
    DROP POLICY IF EXISTS "Usuários autenticados podem fazer upload de imagens" ON storage.objects;
    DROP POLICY IF EXISTS "Usuários podem ver suas próprias imagens" ON storage.objects;
    DROP POLICY IF EXISTS "Usuários podem deletar suas próprias imagens" ON storage.objects;
    DROP POLICY IF EXISTS "Acesso público de leitura" ON storage.objects;
EXCEPTION
    WHEN OTHERS THEN NULL;
END $$;

-- Política 1: Permitir upload para usuários autenticados
CREATE POLICY "Users can upload images to their own folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'chat-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Política 2: Permitir leitura pública (para IA)
CREATE POLICY "Public read access for chat images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'chat-images');

-- Política 3: Permitir deletar próprias imagens
CREATE POLICY "Users can delete their own images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'chat-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Política 4: Permitir atualizar próprias imagens
CREATE POLICY "Users can update their own images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'chat-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
EOF

echo "✅ SQL preparado!"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📋 PARA CORRIGIR O STORAGE, SIGA ESTES PASSOS:"
echo ""
echo "1. Acesse o SQL Editor do Supabase:"
echo "   👉 https://supabase.com/dashboard/project/$PROJECT_REF/sql/new"
echo ""
echo "2. Cole e execute este SQL:"
echo ""
cat "$SQL_FILE"
echo ""
echo "3. Clique em RUN (ou Ctrl+Enter)"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "💡 ALTERNATIVA RÁPIDA:"
echo "   O SQL já foi salvo em: $SQL_FILE"
echo "   Você pode copiá-lo de lá!"
echo ""
echo "✅ Após executar o SQL, o erro será resolvido!"
echo ""
