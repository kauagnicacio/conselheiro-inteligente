"use client";

import { useState } from 'react';
import { uploadImageToStorage } from '@/lib/image-upload';
import { Button } from '@/components/ui/button';

export default function TestUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadResult, setUploadResult] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadResult('Fazendo upload...');

    try {
      const result = await uploadImageToStorage(file, 'test-user-id');

      if (result?.error) {
        setUploadResult(`❌ Erro: ${result.error}`);
      } else if (result?.url) {
        setUploadResult(`✅ Upload bem-sucedido!\n\nURL: ${result.url}\nPath: ${result.path}`);
      } else {
        setUploadResult('❌ Erro desconhecido');
      }
    } catch (error: any) {
      setUploadResult(`❌ Exceção: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Teste de Upload de Imagem</h1>

        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Selecione uma imagem
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-500 file:text-white
                hover:file:bg-purple-600"
            />
          </div>

          {preview && (
            <div>
              <p className="text-sm font-medium mb-2">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="max-w-full h-auto rounded-lg border border-gray-700"
              />
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="w-full bg-purple-500 hover:bg-purple-600"
          >
            {isUploading ? 'Fazendo upload...' : 'Fazer Upload'}
          </Button>

          {uploadResult && (
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-sm whitespace-pre-wrap">{uploadResult}</pre>
            </div>
          )}
        </div>

        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">📋 Informações do Sistema</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Supabase URL:</strong> {process.env.VITE_SUPABASE_URL ? '✅ Configurado' : '❌ Não configurado'}</p>
            <p><strong>Supabase Key:</strong> {process.env.VITE_SUPABASE_ANON_KEY ? '✅ Configurado' : '❌ Não configurado'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
