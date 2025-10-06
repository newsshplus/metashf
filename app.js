// Aplicação principal MetaMagnet
class MetaMagnetApp {
    constructor() {
        this.vendedores = [];
        this.vendas = [];
        this.metas = [];
        this.importedData = [];
        this.init();
    }

    async init() {
        console.log('🚀 MetaMagnet iniciado');
        await this.carregarDadosIniciais();
        this.setupEventListeners();
        this.updateDashboard();
    }

    async carregarDadosIniciais() {
        try {
            // Tentar carregar da API
            await this.carregarDaAPI();
            console.log('✅ Dados carregados da API');
        } catch (error) {
            // Fallback para dados locais
            console.log('⚠️ Usando dados locais');
            await this.carregarSampleData();
        }
    }

    async carregarDaAPI() {
        try {
            const response = await fetch('/api/dashboard/stats');
            if (!response.ok) {
                throw new Error('Erro na API');
            }

            const stats = await response.json();
            this.atualizarStats(stats);

        } catch (error) {
            throw error;
        }
    }

    async carregarSampleData() {
        // Dados de exemplo
        const stats = {
            totalVendas: 458759.82,
            vendedoresAtivos: 3,
            metaAtingida: 85,
            comissoes: 7805.72
        };

        this.atualizarStats(stats);
    }

    atualizarStats(stats) {
        const elements = {
            totalVendas: document.querySelector('[data-stat="total-vendas"]'),
            vendedoresAtivos: document.querySelector('[data-stat="vendedores-ativos"]'),
            metaAtingida: document.querySelector('[data-stat="meta-atingida"]'),
            comissoes: document.querySelector('[data-stat="comissoes"]')
        };

        if (elements.totalVendas) {
            elements.totalVendas.textContent = `R$ ${stats.totalVendas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
        if (elements.vendedoresAtivos) {
            elements.vendedoresAtivos.textContent = stats.vendedoresAtivos;
        }
        if (elements.metaAtingida) {
            elements.metaAtingida.textContent = `${stats.metaAtingida}%`;
        }
        if (elements.comissoes) {
            elements.comissoes.textContent = `R$ ${stats.comissoes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }

        // Atualizar timestamp
        const timestampEl = document.getElementById('ultima-atualizacao');
        if (timestampEl) {
            timestampEl.textContent = `Última atualização: ${new Date().toLocaleString('pt-BR')}`;
        }
    }

    setupEventListeners() {
        // Navegação
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href) {
                const url = new URL(link.href);
                if (url.pathname !== window.location.pathname) {
                    e.preventDefault();
                    window.location.href = url.pathname;
                }
            }
        });

        // Botões de ação
        const botoesAcao = document.querySelectorAll('button');
        botoesAcao.forEach(botao => {
            botao.addEventListener('click', (e) => {
                const texto = botao.textContent.trim();
                
                if (texto.includes('Importar')) {
                    this.iniciarImportacao();
                } else if (texto.includes('Vendedor')) {
                    this.adicionarVendedor();
                } else if (texto.includes('Meta')) {
                    this.definirMeta();
                } else if (texto.includes('Relatório')) {
                    this.gerarRelatorio();
                }
            });
        });
    }

    async iniciarImportacao() {
        console.log('Iniciando importação...');
        alert('Funcionalidade de importação será implementada em breve!');
    }

    adicionarVendedor() {
        console.log('Adicionando novo vendedor...');
        alert('Funcionalidade de adicionar vendedor será implementada em breve!');
    }

    definirMeta() {
        console.log('Definindo nova meta...');
        alert('Funcionalidade de definir meta será implementada em breve!');
    }

    gerarRelatorio() {
        console.log('Gerando relatório...');
        alert('Funcionalidade de gerar relatório será implementada em breve!');
    }

    updateDashboard() {
        console.log('Dashboard atualizado com sucesso!');
    }
}

// Inicializar aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se feather existe
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    window.metaMagnetApp = new MetaMagnetApp();
});

// Funções globais para tratamento de erro
window.handleApiError = (error) => {
    console.error('Erro na API:', error);
    alert('Erro ao carregar dados. Usando dados de exemplo.');
};
