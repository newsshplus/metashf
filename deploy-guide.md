# 📋 Guia de Deploy no Streamlit Cloud

## Passo a Passo para Publicação

### 1. **Preparar Repositório GitHub**
```bash
# Criar novo repositório
git init
git add .
git commit -m "Initial commit: MetaMagnet Streamlit App"
git branch -M main
```

### 2. **Fazer Upload para GitHub**
- Crie um repositório em https://github.com/new
- Siga as instruções para push:
```bash
git remote add origin https://github.com/seu-usuario/metamagnet.git
git push -u origin main
```

### 3. **Deploy no Streamlit Cloud**
1. Acesse: https://share.streamlit.io/
2. Clique em "New app"
3. Conecte com sua conta GitHub
4. Selecione o repositório: `seu-usuario/metamagnet`
5. Branch: `main`
6. Arquivo principal: `app.py`
7. Clique em "Deploy"

### 4. **Acessar Aplicação**
- URL será: `https://metamagnet.streamlit.app/`
- Ou custom: `https://seu-usuario-metamagnet.streamlit.app/`

## ⚡ URLs do Sistema Online

- **Dashboard**: https://metamagnet.streamlit.app/
- Todas as funcionalidades estarão disponíveis na navegação lateral

## 🔧 Configurações Importantes

### Variáveis de Ambiente (Opcional)
Se precisar de configurações específicas, adicione no Streamlit Cloud:
- `STREAMLIT_SERVER_HEADLESS=true`
- `STREAMLIT_SERVER_PORT=8501`

### Permissões
- Certifique-se que o repositório é público
- Ou configure acesso privado no Streamlit Cloud

## 📊 Monitoramento
- Acesse o dashboard do Streamlit Cloud
- Verifique logs em tempo real
- Monitore uso de recursos

## 🆘 Suporte
- Documentação Streamlit: https://docs.streamlit.io/
- Comunidade: https://discuss.streamlit.io/
- Issues: GitHub repository

Seu sistema MetaMagnet estará online em poucos minutos! 🎉
