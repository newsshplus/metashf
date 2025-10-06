# Instruções para Deploy Online

## Opção 1: Render.com (Recomendado - Gratuito)

1. **Crie uma conta no Render.com**
   - Acesse: https://render.com
   - Cadastre-se com GitHub

2. **Conecte seu repositório**
   - Conecte com GitHub
   - Selecione este repositório

3. **Configure o deploy**
   - Tipo: Web Service
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plano: Free

4. **Deploy automático**
   - Render fará deploy automático
   - URL será: https://metamagnet.onrender.com

## Opção 2: Vercel (Alternativa)

1. **Instale Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Faça deploy**
   ```bash
   vercel --prod
   ```

## Opção 3: Executar Localmente com URL Pública

1. **Instale ngrok**
   ```bash
   npm install -g ngrok
   ```

2. **Execute localmente e exponha**
   ```bash
   npm start
   # Em outro terminal:
   ngrok http 3000
   ```

3. **Use a URL do ngrok**
   - Será algo como: https://abcd1234.ngrok.io

## 📊 Sistema Online

Seu sistema estará disponível em:
**URL Principal**: https://metamagnet.onrender.com

**URLs das páginas**:
- Dashboard: https://metamagnet.onrender.com
- Vendedores: https://metamagnet.onrender.com/vendedores
- Vendas: https://metamagnet.onrender.com/vendas
- Metas: https://metamagnet.onrender.com/metas
- Relatórios: https://metamagnet.onrender.com/relatorios
- Análise IA: https://metamagnet.onrender.com/analiseia
- Configurações: https://metamagnet.onrender.com/configuracoes
- Importação: https://metamagnet.onrender.com/importacao

## 🔧 Monitoramento

Acesse para verificar se o sistema está online:
- https://metamagnet.onrender.com/api/health

## ⚠️ Importante

- O plano free do Render pode ter sleep após inatividade
- Primeiro acesso pode ser mais lento (cold start)
- Para produção, considere upgrade para plano pago
