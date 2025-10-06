// Sistema de importação de dados
class DataImporter {
    constructor() {
        this.importedData = [];
        this.init();
    }

    init() {
        this.loadFromLocalStorage();
    }

    async importFromGoogleSheets(apiKey) {
        try {
            const loading = navigation.showLoading('Importando dados...');
            
            // Simulação de importação (substituir pela API real)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Dados de exemplo (substituir pelos dados reais da API)
            const sampleData = this.generateSampleData();
            this.importedData = sampleData;
            
            this.saveToLocalStorage();
            navigation.hideLoading(loading);
            
            return sampleData;
            
        } catch (error) {
            navigation.hideLoading(loading);
            throw new Error('Erro na importação: ' + error.message);
        }
    }

    generateSampleData() {
        return [
            {
                Data: '01/07/2023',
                Nota: 'NF001',
                Cliente: 'João Silva',
                Nome: 'João Silva Comércio',
                Status: 'Concluído',
                Valor: 'R$ 1.200,00',
                'Tipo Pagamento': 'Cartão',
                'Condição Recebimento': 'À vista',
                Frete: 'R$ 15,00',
                'Valor Itens': 'R$ 1.185,00',
                Representante: 'Laiana Costa',
                'Valor Frete': 'R$ 15,00',
                'Valor Desconto': 'R$ 0,00',
                Categoria: 'Eletrônicos',
                Cidade: 'São Paulo',
                UF: 'SP',
                Tipo: 'Pessoa Jurídica',
                'CNPJ/CPF': '12.345.678/0001-90',
                Empresa: 'João Silva Comércio LTDA'
            },
            {
                Data: '02/07/2023',
                Nota: 'NF002',
                Cliente: 'Maria Santos',
                Nome: 'Maria Santos',
                Status: 'Concluído',
                Valor: 'R$ 850,00',
                'Tipo Pagamento': 'Pix',
                'Condição Recebimento': 'À vista',
                Frete: 'R$ 12,00',
                'Valor Itens': 'R$ 838,00',
                Representante: 'Emanuelle Santos',
                'Valor Frete': 'R$ 12,00',
                'Valor Desconto': 'R$ 0,00',
                Categoria: 'Roupas',
                Cidade: 'Rio de Janeiro',
                UF: 'RJ',
                Tipo: 'Pessoa Física',
                'CNPJ/CPF': '123.456.789-00',
                Empresa: '-'
            }
        ];
    }

    saveToLocalStorage() {
        localStorage.setItem('importedData', JSON.stringify(this.importedData));
        localStorage.setItem('lastImport', new Date().toISOString());
    }

    loadFromLocalStorage() {
        const savedData = localStorage.getItem('importedData');
        if (savedData) {
            this.importedData = JSON.parse(savedData);
        }
    }

    getData() {
        return this.importedData;
    }

    clearData() {
        this.importedData = [];
        localStorage.removeItem('importedData');
        localStorage.removeItem('lastImport');
    }
}

// Instância global do importador
window.dataImporter = new DataImporter();
