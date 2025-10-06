from data_processor import ComissaoCalculator
from api_grok import GrokAnalyser
from datetime import datetime

def main():
    # Configurações
    csv_path = 'vendas.csv'
    grok_token = input("Insira seu token Grok: ")
    
    # Processamento
    calculator = ComissaoCalculator(csv_path)
    periodo_inicio = datetime(2024, 1, 1)
    periodo_fim = datetime(2024, 12, 31)
    
    resultados = calculator.calcular_comissao(periodo_inicio, periodo_fim, 'modelo_padrao')
    
    # Análise Grok
    analisador = GrokAnalyser(grok_token)
    analise = analisador.analisar_dados(resultados)
    
    # Gerar relatório
    with open('relatorio.html', 'w', encoding='utf-8') as f:
        f.write(generate_html_report(resultados, analise))

def generate_html_report(data, analysis):
    html = open('relatorio.html').read()
    # Implementar lógica de preenchimento dos dados
    return html

if __name__ == "__main__":
    main()
