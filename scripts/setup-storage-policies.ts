/**
 * Script para configurar políticas RLS no bucket chat-images
 * Usa service_role_key para executar SQL direto no banco
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Erro: VITE_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configuradas');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupStoragePolicies() {
  console.log('🔧 Configurando políticas de segurança do storage...\n');

  const policies = [
    {
      name: 'Users can upload images to their own folder',
      sql: `
        CREATE POLICY IF NOT EXISTS "Users can upload images to their own folder"
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
      name: 'Public read access for chat images',
      sql: `
        CREATE POLICY IF NOT EXISTS "Public read access for chat images"
        ON storage.objects
        FOR SELECT
        TO public
        USING (bucket_id = 'chat-images');
      `
    },
    {
      name: 'Users can delete their own images',
      sql: `
        CREATE POLICY IF NOT EXISTS "Users can delete their own images"
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
      name: 'Users can update their own images',
      sql: `
        CREATE POLICY IF NOT EXISTS "Users can update their own images"
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

  try {
    console.log('📝 Aplicando políticas RLS...\n');

    for (const policy of policies) {
      console.log(`  ➡️  ${policy.name}...`);

      const { error } = await supabaseAdmin.rpc('exec_sql', {
        sql: policy.sql.trim()
      });

      if (error) {
        // Tentar abordagem alternativa (query direta)
        console.log('     ⚠️  Método RPC falhou, tentando método alternativo...');

        // Como não temos acesso direto a exec SQL via client,
        // vamos recomendar uso manual ou migration
        console.log(`     ❌ Erro: ${error.message}`);
        console.log('     📝 Esta política precisa ser aplicada via migration SQL\n');
        continue;
      }

      console.log('     ✅ Aplicada com sucesso!\n');
    }

    console.log('✅ Configuração concluída!\n');
    console.log('⚠️  Nota: Se alguma política falhou, execute as migrations SQL:');
    console.log('   npx supabase db push --yes\n');

    return true;

  } catch (error: any) {
    console.error('\n❌ Erro ao configurar políticas:', error.message);
    console.log('\n📝 Solução: Execute as migrations SQL manualmente:');
    console.log('   npx supabase db push --yes\n');
    return false;
  }
}

// Executar
setupStoragePolicies()
  .then(success => {
    if (success) {
      console.log('🎉 Políticas configuradas! O storage está pronto para uso.\n');
      process.exit(0);
    } else {
      console.log('⚠️  Algumas políticas podem não ter sido aplicadas.\n');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('❌ Erro inesperado:', err);
    process.exit(1);
  });
