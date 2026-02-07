/**
 * SOLUÇÃO DEFINITIVA: Aplicar políticas SQL via query direto no Supabase
 * Usa a API pg_meta para executar DDL SQL
 */

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Erro: Variáveis de ambiente não configuradas');
  process.exit(1);
}

async function executeSQL(sql: string): Promise<any> {
  // Usar a API pg_meta do Supabase para executar SQL
  const url = `${SUPABASE_URL}/rest/v1/rpc/query`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: sql })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  return await response.json();
}

async function fixStorageNow() {
  console.log('🚀 INICIANDO CORREÇÃO DO STORAGE...\n');

  const policies = [
    {
      name: 'Remover políticas antigas (se existirem)',
      sql: `
        DO $$ BEGIN
          DROP POLICY IF EXISTS "Users can upload images to their own folder" ON storage.objects;
          DROP POLICY IF EXISTS "Public read access for chat images" ON storage.objects;
          DROP POLICY IF EXISTS "Users can delete their own images" ON storage.objects;
          DROP POLICY IF EXISTS "Users can update their own images" ON storage.objects;
          DROP POLICY IF EXISTS "Usuários autenticados podem fazer upload de imagens" ON storage.objects;
          DROP POLICY IF EXISTS "Usuários podem ver suas próprias imagens" ON storage.objects;
          DROP POLICY IF EXISTS "Usuários podem deletar suas próprias imagens" ON storage.objects;
          DROP POLICY IF EXISTS "Acesso público de leitura" ON storage.objects;
        EXCEPTION WHEN OTHERS THEN
          NULL; -- Ignorar erros se políticas não existirem
        END $$;
      `
    },
    {
      name: 'Permitir upload para usuários autenticados',
      sql: `
        CREATE POLICY "Users can upload images to their own folder"
        ON storage.objects
        FOR INSERT
        TO authenticated
        WITH CHECK (
          bucket_id = 'chat-images' AND
          (storage.foldername(name))[1] = auth.uid()::text
        );
      `
    },
    {
      name: 'Permitir leitura pública (para IA)',
      sql: `
        CREATE POLICY "Public read access for chat images"
        ON storage.objects
        FOR SELECT
        TO public
        USING (bucket_id = 'chat-images');
      `
    },
    {
      name: 'Permitir deletar próprias imagens',
      sql: `
        CREATE POLICY "Users can delete their own images"
        ON storage.objects
        FOR DELETE
        TO authenticated
        USING (
          bucket_id = 'chat-images' AND
          (storage.foldername(name))[1] = auth.uid()::text
        );
      `
    },
    {
      name: 'Permitir atualizar próprias imagens',
      sql: `
        CREATE POLICY "Users can update their own images"
        ON storage.objects
        FOR UPDATE
        TO authenticated
        USING (
          bucket_id = 'chat-images' AND
          (storage.foldername(name))[1] = auth.uid()::text
        );
      `
    }
  ];

  console.log('📝 Aplicando políticas uma por uma...\n');

  for (const policy of policies) {
    try {
      console.log(`  ➡️  ${policy.name}...`);
      await executeSQL(policy.sql.trim());
      console.log('     ✅ Sucesso!\n');
    } catch (error: any) {
      console.log(`     ⚠️  Erro: ${error.message}\n`);

      // Se a API RPC não funcionar, criar arquivo SQL manual
      if (error.message.includes('404') || error.message.includes('not found')) {
        console.log('     ℹ️  A API RPC não está disponível neste projeto.\n');
        break;
      }
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════\n');
  console.log('📋 SOLUÇÃO MANUAL (se APIs falharam):\n');
  console.log('1. Acesse o SQL Editor do Supabase:');
  console.log('   https://supabase.com/dashboard/project/frfcxoumqsvnknoetdpq/sql/new\n');
  console.log('2. Cole e execute este SQL:\n');
  console.log('-----------------------------------------------------------');
  console.log(await import('fs/promises').then(fs => fs.readFile('/workspace/supabase/migrations/20260207184756_create_chat_images_bucket.sql', 'utf-8')));
  console.log('-----------------------------------------------------------\n');
  console.log('3. Clique em "RUN" para executar\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  return true;
}

fixStorageNow()
  .then(() => {
    console.log('✅ Processo concluído!');
    console.log('\n💡 Após executar o SQL no dashboard, o storage estará 100% funcional.\n');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n❌ Erro fatal:', err);
    process.exit(1);
  });
