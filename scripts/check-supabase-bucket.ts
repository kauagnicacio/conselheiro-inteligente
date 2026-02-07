// Script para verificar e criar bucket de imagens no Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente do Supabase não configuradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function checkAndCreateBucket() {
  try {
    console.log('🔍 Verificando bucket "chat-images"...');

    // Verificar se o bucket existe
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      console.error('❌ Erro ao listar buckets:', listError);
      return;
    }

    const bucketExists = buckets?.some(b => b.name === 'chat-images');

    if (bucketExists) {
      console.log('✅ Bucket "chat-images" já existe');

      // Verificar permissões do bucket
      const { data: bucket } = await supabase.storage.getBucket('chat-images');
      console.log('📋 Configurações do bucket:', {
        public: bucket?.public,
        fileSizeLimit: bucket?.file_size_limit,
        allowedMimeTypes: bucket?.allowed_mime_types,
      });
    } else {
      console.log('⚠️ Bucket "chat-images" não existe. Criando...');

      // Criar bucket público
      const { data, error } = await supabase.storage.createBucket('chat-images', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'],
      });

      if (error) {
        console.error('❌ Erro ao criar bucket:', error);
        return;
      }

      console.log('✅ Bucket "chat-images" criado com sucesso!');
    }

    // Testar upload
    console.log('\n🧪 Testando upload...');
    const testFile = new Blob(['teste'], { type: 'text/plain' });
    const testFileName = `test-${Date.now()}.txt`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('chat-images')
      .upload(testFileName, testFile);

    if (uploadError) {
      console.error('❌ Erro no teste de upload:', uploadError);
      return;
    }

    console.log('✅ Teste de upload bem-sucedido');

    // Obter URL pública
    const { data: urlData } = supabase.storage
      .from('chat-images')
      .getPublicUrl(testFileName);

    console.log('🔗 URL pública:', urlData.publicUrl);

    // Limpar arquivo de teste
    await supabase.storage.from('chat-images').remove([testFileName]);
    console.log('🧹 Arquivo de teste removido');

    console.log('\n✅ Tudo funcionando corretamente!');
  } catch (error) {
    console.error('❌ Erro inesperado:', error);
  }
}

checkAndCreateBucket();
