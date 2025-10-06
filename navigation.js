// Sistema de navegação
class NavigationSystem {
    constructor() {
        this.pages = {
            'index.html': 'Dashboard',
            'vendedores.html': 'Vendedores',
            'vendas.html': 'Vendas',
            'metas.html': 'Metas',
            'relatorios.html': 'Relatórios',
            'analiseia.html': 'Análise IA',
            'configuracoes.html': 'Configurações',
            'importacao.html': 'Importação'
        };
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setActivePage();
    }

    setupNavigation() {
        // Adicionar event listeners para todos os links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.getAttribute('href')) {
                e.preventDefault();
                const href = link.getAttribute('href');
                this.navigateTo(href);
            }
        });
    }

    navigateTo(page) {
        console.log('Navegando para:', page);
        
        // Verificar se é uma página interna
        if (this.pages[page]) {
            window.location.href = page;
        } else if (page.startsWith('http')) {
            // Link externo - abrir em nova aba
            window.open(page, '_blank');
        }
    }

    setActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('bg-purple-600', 'text-white');
                link.classList.remove('text-gray-300', 'hover:bg-gray-700');
            } else {
                link.classList.remove('bg-purple-600', 'text-white');
                link.classList.add('text-gray-300', 'hover:bg-gray-700');
            }
        });
    }

    showLoading(message = 'Carregando...') {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-overlay';
        loadingDiv.innerHTML = `
            <div class="bg-white rounded-lg p-6 flex items-center">
                <div class="loading-spinner mr-3"></div>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(loadingDiv);
        return loadingDiv;
    }

    hideLoading(loadingElement) {
        if (loadingElement && loadingElement.parentNode) {
            loadingElement.parentNode.removeChild(loadingElement);
        }
    }
}

// Inicializar sistema de navegação
window.navigation = new NavigationSystem();
