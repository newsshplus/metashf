// Funções compartilhadas entre todas as páginas
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar navegação ativa
    const currentPage = window.location.pathname.split('/').pop();
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

    // Inicializar feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});

// Função para mostrar loading
function showLoading(message = 'Carregando...') {
    const loading = document.createElement('div');
    loading.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    loading.innerHTML = `
        <div class="bg-white rounded-lg p-6 flex items-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mr-3"></div>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(loading);
    return loading;
}

// Função para esconder loading
function hideLoading(loadingElement) {
    if (loadingElement && loadingElement.parentNode) {
        loadingElement.parentNode.removeChild(loadingElement);
    }
}
