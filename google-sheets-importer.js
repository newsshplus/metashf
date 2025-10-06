class GoogleSheetsImporter {
    constructor() {
        this.SPREADSHEET_ID = '1ujsUFHQ4MYS6yIcIDnxZu-jLEoqdL7zzkuIAm_XdeAI';
        this.API_KEY = null;
        this.initialized = false;
    }

    async init(apiKey) {
        this.API_KEY = apiKey;
        this.initialized = true;
        console.log('Google Sheets Importer inicializado');
    }

    async importarDados() {
        if (!this.initialized) {
            throw new Error('Importer não inicializado. Chame init() primeiro.');
        }

        try {
            const loading = showLoading('Importando dados do Google Sheets...');
            
            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${this.SPREADSHEET_ID}/values/A:Z?key=${this.API_KEY}`
            );
            
            if (!response.ok) {
                throw new Error('Erro ao acessar Google Sheets');
            }

            const data = await response.json();
            const rows = data.values;
            
            if (!rows || rows.length === 0) {
                throw new Error('Nenhum dado encontrado na planilha');
            }

            // Processar cabeçalhos e dados
            const headers = rows[0];
            const dadosProcessados = this.processarDados(rows.slice(1), headers);
            
            hideLoading(loading);
            return dadosProcessados;
            
        } catch (error) {
            console.error('Erro na importação:', error);
            hideLoading(loading);
            throw error;
        }
    }

    processarDados(rows, headers) {
        const colunasEsperadas = [
            'Data', 'Nota', 'Cliente', 'Nome', 'Status', 'Valor', 
            'Tipo Pagamento', 'Condição Recebimento', 'Frete', 
            'Valor Itens', 'Representante', 'Valor Frete', 
            'Valor Desconto', 'Categoria', 'Cidade', 'UF', 
            'Tipo', 'CNPJ/CPF', 'Empresa'
        ];

        // Verificar se todas as colunas estão presentes
        const colunasFaltantes = colunasEsperadas.filter(col => 
            !headers.includes(col)
        );

        if (colunasFaltantes.length > 0) {
            console.warn('Colunas faltantes:', colunasFaltantes);
        }

        return rows.map(row => {
            const registro = {};
            headers.forEach((header, index) => {
                if (colunasEsperadas.includes(header)) {
                    registro[header] = row[index] || '';
                }
            });
            return registro;
        });
    }

    async testarConexao() {
        try {
            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${this.SPREADSHEET_ID}?key=${this.API_KEY}`
            );
            return response.ok;
        } catch (error) {
            return false;
        }
    }
}

// Instância global do importer
window.googleSheetsImporter = new GoogleSheetsImporter();
