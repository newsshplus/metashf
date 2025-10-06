import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'online', 
    message: 'MetaMagnet API está funcionando perfeitamente',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/api/dashboard/stats', (req, res) => {
  const stats = {
    totalVendas: 458759.82,
    vendedoresAtivos: 5,
    metaAtingida: 85,
    comissoes: 8245.36,
    ultimaAtualizacao: new Date().toISOString()
  };
  res.json(stats);
});

app.get('/api/vendedores', (req, res) => {
  const vendedores = [
    {
      id: 1,
      nome: 'Laiana Costa',
      setor: 'Televendas',
      status: 'ativo',
      meta: 150000,
      realizado: 188520,
      performance: 125,
      comissao: 3519.17
    },
    {
      id: 2,
      nome: 'Emanuelle Santos',
      setor: 'Social',
      status: 'ativo',
      meta: 150000,
      realizado: 164910,
      performance: 109,
      comissao: 3078.30
    },
    {
      id: 3,
      nome: 'Ana Silva',
      setor: 'Televendas',
      status: 'ativo',
      meta: 100000,
      realizado: 78110,
      performance: 78,
      comissao: 1208.25
    }
  ];
  res.json(vendedores);
});

// Servir páginas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/vendedores', (req, res) => {
  res.sendFile(path.join(__dirname, 'vendedores.html'));
});

app.get('/vendas', (req, res) => {
  res.sendFile(path.join(__dirname, 'vendas.html'));
});

app.get('/metas', (req, res) => {
  res.sendFile(path.join(__dirname, 'metas.html'));
});

app.get('/relatorios', (req, res) => {
  res.sendFile(path.join(__dirname, 'relatorios.html'));
});

app.get('/analiseia', (req, res) => {
  res.sendFile(path.join(__dirname, 'analiseia.html'));
});

app.get('/configuracoes', (req, res) => {
  res.sendFile(path.join(__dirname, 'configuracoes.html'));
});

app.get('/importacao', (req, res) => {
  res.sendFile(path.join(__dirname, 'importacao.html'));
});

// Servir arquivos estáticos
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/js', express.static(path.join(__dirname)));
app.use('/css', express.static(path.join(__dirname)));

// Rota para servir app.js corretamente
app.get('/app.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'app.js'));
});

// Rota para servir shared.css corretamente
app.get('/shared.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, 'shared.css'));
});

// Rota catch-all para evitar erros 404
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ error: 'Endpoint não encontrado' });
  } else {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor MetaMagnet Online`);
  console.log(`📍 Porta: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
  console.log(`🔧 API Health: http://localhost:${PORT}/api/health`);
  
  // Testar rotas da API
  console.log(`📈 API Stats: http://localhost:${PORT}/api/dashboard/stats`);
  console.log(`👥 API Vendedores: http://localhost:${PORT}/api/vendedores`);
});
