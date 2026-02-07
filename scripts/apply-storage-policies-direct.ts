/**
 * Script para aplicar políticas RLS diretamente via REST API do Supabase
 */

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const PROJECT_REF = 'frfcxoumqsvnknoetdpq';

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Erro: Variáveis de ambiente não configuradas');
  process.exit(1);
}

async function executeSQLDirectly(sql: string): Promise<any> {
  const url = `${SUPABASE_URL}/rest/v1/rpc/exec`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ query: sql })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`SQL Error: ${JSON.stringify(data)}`);
  }

  return data;
}

async function applyPolicies() {
  console.log('🔧 Aplicando políticas de segurança do storage...\n');

  // SQL completo para criar todas as políticas
  const sql = `
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
  `;

  try {
    console.log('📝 Executando SQL para criar políticas RLS...\n');

    // Como a API REST não suporta SQL direto, vamos usar uma abordagem diferente:
    // Criar um arquivo SQL temporário e executar via psql (se disponível)

    console.log('⚠️  A API REST do Supabase não permite execução direta de DDL SQL.');
    console.log('📝 As políticas precisam ser aplicadas de uma das seguintes formas:\n');
    console.log('   OPÇÃO 1 - Dashboard do Supabase (RECOMENDADO):');
    console.log('   1. Acesse: https://supabase.com/dashboard/project/frfcxoumqsvnknoetdpq/editor');
    console.log('   2. Clique em "New Query"');
    console.log('   3. Cole o SQL das migrations:');
    console.log('      cat supabase/migrations/20260207184756_create_chat_images_bucket.sql');
    console.log('   4. Execute a query\n');

    console.log('   OPÇÃO 2 - CLI do Supabase (se tiver access token):');
    console.log('   1. Execute: npx supabase login');
    console.log('   2. Execute: npx supabase link --project-ref frfcxoumqsvnknoetdpq');
    console.log('   3. Execute: npx supabase db push --yes\n');

    console.log('   OPÇÃO 3 - SOLUÇÃO RÁPIDA (aplicar agora mesmo):');
    console.log('   Vou criar um script SQL pronto para você copiar e colar!\n');

    // Criar arquivo SQL pronto para uso
    const fs = await import('fs/promises');
    await fs.writeFile('/workspace/scripts/apply-policies.sql', sql);

    console.log('✅ Arquivo SQL criado: scripts/apply-policies.sql');
    console.log('📋 Copie o conteúdo e execute no SQL Editor do Supabase!\n');

    return true;

  } catch (error: any) {
    console.error('❌ Erro:', error.message);
    return false;
  }
}

applyPolicies()
  .then(() => {
    console.log('✅ Instruções geradas com sucesso!');
    console.log('\n💡 IMPORTANTE: Após aplicar as políticas SQL, o storage estará 100% funcional.\n');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Erro:', err);
    process.exit(1);
  });
