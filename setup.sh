#!/bin/bash

# Script de setup para Streamlit Cloud
echo "🚀 Configurando MetaMagnet para Streamlit Cloud..."

# Criar diretório de dados se não existir
mkdir -p .streamlit

# Criar configuração do Streamlit
cat > .streamlit/config.toml << EOF
[server]
headless = true
enableCORS = false
port = 8501

[browser]
gatherUsageStats = false
EOF

echo "✅ Configuração concluída!"
echo "📋 Para executar localmente:"
echo "   streamlit run app.py"
echo ""
echo "🌐 Para deploy no Streamlit Cloud:"
echo "   1. Faça upload dos arquivos para o GitHub"
echo "   2. Acesse: https://streamlit.io/cloud"
echo "   3. Conecte seu repositório"
echo "   4. Deploy automático!"
