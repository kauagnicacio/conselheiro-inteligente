import { supabase } from './supabase';

let bucketInitialized = false;

/**
 * Função para garantir que o bucket de imagens existe
 * Cria automaticamente se não existir
 */
export async function ensureChatImagesBucket(): Promise<boolean> {
  // Se já inicializou nesta sessão, não fazer nada
  if (bucketInitialized) {
    return true;
  }

  if (!supabase) {
    console.error('[BUCKET] Supabase não configurado');
    return false;
  }

  try {
    console.log('[BUCKET] Verificando bucket "chat-images"...');

    // Tentar listar arquivos do bucket (teste de existência)
    const { error: listError } = await supabase.storage
      .from('chat-images')
      .list('', { limit: 1 });

    if (listError) {
      // Se bucket não existe (código específico), tentar criar
      if (listError.message?.includes('not found') || listError.message?.includes('does not exist')) {
        console.log('[BUCKET] Bucket não encontrado. Tentando criar...');

        // Nota: createBucket requer permissões de admin
        // Se isso falhar, o usuário precisa criar manualmente no Supabase Dashboard
        const { error: createError } = await supabase.storage.createBucket('chat-images', {
          public: true,
          fileSizeLimit: 10485760, // 10MB
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'],
        });

        if (createError) {
          console.error('[BUCKET] Erro ao criar bucket (permissão negada - criar manualmente):', createError);
          return false;
        }

        console.log('[BUCKET] ✅ Bucket criado com sucesso!');
        bucketInitialized = true;
        return true;
      }

      console.error('[BUCKET] Erro ao verificar bucket:', listError);
      return false;
    }

    console.log('[BUCKET] ✅ Bucket "chat-images" já existe');
    bucketInitialized = true;
    return true;
  } catch (error) {
    console.error('[BUCKET] Erro inesperado ao verificar bucket:', error);
    return false;
  }
}

// Inicializar bucket na primeira importação (apenas no cliente)
if (typeof window !== 'undefined') {
  ensureChatImagesBucket().catch(err => {
    console.error('[BUCKET] Falha na inicialização automática:', err);
  });
}
