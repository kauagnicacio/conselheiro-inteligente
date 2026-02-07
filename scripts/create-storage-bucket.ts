/**
 * Script para criar o bucket chat-images no Supabase Storage
 * Usa service_role_key para ter permissões administrativas
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

async function createChatImagesBucket() {
  console.log('🔧 Iniciando criação do bucket chat-images...\n');

  try {
    // 1. Verificar se bucket já existe
    console.log('1️⃣ Verificando se bucket já existe...');
    const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();

    if (listError) {
      console.error('❌ Erro ao listar buckets:', listError.message);
      throw listError;
    }

    const bucketExists = buckets?.some(b => b.id === 'chat-images');

    if (bucketExists) {
      console.log('✅ Bucket "chat-images" já existe!\n');

      // Verificar permissões
      console.log('2️⃣ Verificando permissões do bucket...');
      const { data, error: testError } = await supabaseAdmin.storage
        .from('chat-images')
        .list('', { limit: 1 });

      if (testError) {
        console.error('❌ Erro ao testar bucket:', testError.message);
        console.log('\n⚠️  O bucket existe mas há problemas de permissão.');
        console.log('📝 Solução: Acesse o Supabase Dashboard e configure as políticas RLS.');
        return false;
      }

      console.log('✅ Bucket funcionando corretamente!\n');
      return true;
    }

    // 2. Criar bucket
    console.log('2️⃣ Criando bucket "chat-images"...');
    const { data: newBucket, error: createError } = await supabaseAdmin.storage.createBucket('chat-images', {
      public: true,
      fileSizeLimit: 10485760, // 10MB
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
    });

    if (createError) {
      console.error('❌ Erro ao criar bucket:', createError.message);

      // Se erro for de permissão, dar instruções
      if (createError.message?.includes('permission') || createError.message?.includes('policy')) {
        console.log('\n⚠️  Permissão negada para criar bucket via API.');
        console.log('📝 Solução manual:');
        console.log('   1. Acesse: https://supabase.com/dashboard/project/frfcxoumqsvnknoetdpq/storage/buckets');
        console.log('   2. Clique em "New bucket"');
        console.log('   3. Nome: chat-images');
        console.log('   4. Marque "Public bucket"');
        console.log('   5. File size limit: 10 MB');
        console.log('   6. Allowed MIME types: image/png, image/jpeg, image/jpg, image/webp, image/gif');
        console.log('   7. Clique em "Save"\n');
      }

      throw createError;
    }

    console.log('✅ Bucket criado com sucesso!\n');

    // 3. Configurar políticas RLS (via SQL)
    console.log('3️⃣ Configurando políticas de segurança...');
    console.log('⚠️  Políticas RLS devem ser configuradas via SQL migrations');
    console.log('📝 Execute: npx supabase db push --yes\n');

    return true;

  } catch (error: any) {
    console.error('\n❌ Erro fatal:', error.message);
    console.log('\n📝 Solução recomendada:');
    console.log('   1. Acesse o Supabase Dashboard manualmente');
    console.log('   2. Crie o bucket "chat-images" com as configurações acima');
    console.log('   3. Execute as migrations SQL para configurar as políticas\n');
    return false;
  }
}

// Executar
createChatImagesBucket()
  .then(success => {
    if (success) {
      console.log('🎉 Setup completo! O storage está configurado e pronto para uso.\n');
      process.exit(0);
    } else {
      console.log('⚠️  Setup incompleto. Siga as instruções acima.\n');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('❌ Erro inesperado:', err);
    process.exit(1);
  });
