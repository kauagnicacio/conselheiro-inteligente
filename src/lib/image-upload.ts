import { supabase } from './supabase';

// Função para comprimir/redimensionar imagem antes do upload
export async function compressImage(file: File, maxWidth: number = 1280): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        // Calcular novas dimensões mantendo aspect ratio
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        // Criar canvas para redimensionar
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Não foi possível criar contexto do canvas'));
          return;
        }

        // Desenhar imagem redimensionada
        ctx.drawImage(img, 0, 0, width, height);

        // Converter para blob com qualidade 0.85
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Erro ao comprimir imagem'));
              return;
            }

            // Inferir tipo se necessário (iOS Safari pode ter file.type vazio)
            let mimeType = file.type;
            if (!mimeType) {
              // Inferir do nome do arquivo
              const extension = file.name.toLowerCase().split('.').pop();
              if (extension === 'png') {
                mimeType = 'image/png';
              } else if (extension === 'jpg' || extension === 'jpeg') {
                mimeType = 'image/jpeg';
              } else if (extension === 'webp') {
                mimeType = 'image/webp';
              } else {
                mimeType = 'image/jpeg'; // fallback
              }
            }

            // Criar novo arquivo com imagem comprimida
            const compressedFile = new File([blob], file.name, {
              type: mimeType,
              lastModified: Date.now(),
            });

            console.log('[COMPRESSÃO] Imagem comprimida:', {
              original: `${(file.size / 1024).toFixed(2)} KB`,
              compressed: `${(compressedFile.size / 1024).toFixed(2)} KB`,
              dimensions: `${width}x${height}`,
              type: mimeType,
            });

            resolve(compressedFile);
          },
          file.type || 'image/jpeg',
          0.85
        );
      };

      img.onerror = () => {
        reject(new Error('Erro ao carregar imagem'));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Erro ao ler arquivo'));
    };

    reader.readAsDataURL(file);
  });
}

// Função para fazer upload da imagem para Supabase Storage
export async function uploadImageToStorage(
  file: File,
  userId: string
): Promise<{ url: string; path: string } | null> {
  if (!supabase) {
    console.error('[UPLOAD] Supabase não configurado');
    return null;
  }

  try {
    // Logs de diagnóstico
    console.log('[UPLOAD - DIAGNÓSTICO MOBILE]', {
      fileName: file.name,
      fileType: file.type || 'VAZIO (será inferido)',
      fileSize: `${(file.size / 1024).toFixed(2)} KB`,
      timestamp: new Date().toISOString(),
    });

    // Comprimir imagem antes do upload (principalmente para mobile)
    let fileToUpload = file;
    if (file.size > 200 * 1024) {
      // Se maior que 200KB, comprimir
      console.log('[UPLOAD] Comprimindo imagem...');
      fileToUpload = await compressImage(file, 1280);
    }

    // Gerar nome único para o arquivo
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const extension = fileToUpload.name.split('.').pop() || 'jpg';
    const fileName = `${userId}/${timestamp}-${randomString}.${extension}`;

    console.log('[UPLOAD] Iniciando upload:', fileName);

    // Upload para Supabase Storage
    const { data, error } = await supabase.storage
      .from('chat-images')
      .upload(fileName, fileToUpload, {
        contentType: fileToUpload.type || 'image/jpeg',
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('[UPLOAD] Erro ao fazer upload:', error);
      return null;
    }

    console.log('[UPLOAD] Upload concluído:', data.path);

    // Obter URL pública da imagem
    const { data: publicUrlData } = supabase.storage
      .from('chat-images')
      .getPublicUrl(data.path);

    const publicUrl = publicUrlData.publicUrl;

    // VALIDAÇÃO CRÍTICA: Verificar se a URL é válida antes de retornar
    if (!publicUrl || !publicUrl.startsWith('http')) {
      console.error('[UPLOAD] ❌ URL pública inválida:', publicUrl);
      // Tentar deletar arquivo inválido
      await supabase.storage.from('chat-images').remove([data.path]);
      return null;
    }

    console.log('[UPLOAD] ✅ URL pública válida gerada:', publicUrl);

    // VALIDAÇÃO ADICIONAL: Testar se a URL é acessível (HEAD request)
    try {
      const headResponse = await fetch(publicUrl, { method: 'HEAD' });
      if (!headResponse.ok) {
        console.error('[UPLOAD] ❌ URL não acessível. Status:', headResponse.status);
        return null;
      }
      console.log('[UPLOAD] ✅ URL acessível confirmada');
    } catch (fetchError) {
      console.error('[UPLOAD] ❌ Erro ao validar URL:', fetchError);
      // Não retornar null aqui - pode ser problema temporário de rede
    }

    return {
      url: publicUrl,
      path: data.path,
    };
  } catch (error: any) {
    console.error('[UPLOAD] Erro inesperado:', error);
    return null;
  }
}

// Função para deletar imagem do Storage (opcional, para limpeza)
export async function deleteImageFromStorage(path: string): Promise<boolean> {
  if (!supabase) {
    console.error('[DELETE] Supabase não configurado');
    return false;
  }

  try {
    const { error } = await supabase.storage.from('chat-images').remove([path]);

    if (error) {
      console.error('[DELETE] Erro ao deletar imagem:', error);
      return false;
    }

    console.log('[DELETE] Imagem deletada:', path);
    return true;
  } catch (error) {
    console.error('[DELETE] Erro inesperado:', error);
    return false;
  }
}
