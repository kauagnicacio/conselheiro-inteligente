#!/bin/bash

# Script de sincronização Git automática e robusta
# Garante que o repositório sempre esteja na branch main e sincronizado

set -e  # Parar em caso de erro

echo "🔄 Iniciando sincronização Git..."

# 1. Verificar se está em detached HEAD e corrigir
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "HEAD")

if [ "$CURRENT_BRANCH" = "HEAD" ]; then
  echo "⚠️  Repositório em detached HEAD. Corrigindo..."
  git checkout -B main
  git fetch origin
  git branch --set-upstream-to=origin/main main
  echo "✅ Branch main restaurada"
fi

# 2. Garantir que estamos na branch main
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "⚠️  Branch atual: $CURRENT_BRANCH. Mudando para main..."
  git checkout main || git checkout -B main
fi

# 3. Verificar se há mudanças locais
if ! git diff-index --quiet HEAD --; then
  echo "📝 Há mudanças locais. Criando commit..."
  git add -A
  git commit -m "Sync from Lasy - $(date '+%d/%m/%Y, %H:%M:%S')" || true
fi

# 4. Buscar atualizações do remoto
echo "📡 Buscando atualizações do GitHub..."
git fetch origin

# 5. Configurar tracking se necessário
git branch --set-upstream-to=origin/main main 2>/dev/null || true

# 6. Sincronizar com rebase para manter histórico linear
echo "🔀 Sincronizando com o remoto..."
if git pull --rebase origin main; then
  echo "✅ Pull com rebase concluído"
else
  echo "⚠️  Conflito detectado durante rebase. Tentando resolver..."
  # Se falhar, abortar rebase e fazer merge
  git rebase --abort 2>/dev/null || true
  git pull origin main --no-rebase
fi

# 7. Enviar commits locais para o remoto
echo "📤 Enviando commits para o GitHub..."
if git push origin main; then
  echo "✅ Push concluído com sucesso"
else
  echo "⚠️  Push rejeitado. Tentando com force-with-lease..."
  # force-with-lease é mais seguro que force puro
  git push origin main --force-with-lease
fi

# 8. Verificar status final
echo ""
echo "📊 Status final:"
git status

echo ""
echo "✅ Sincronização completa! Seu repositório está atualizado."
