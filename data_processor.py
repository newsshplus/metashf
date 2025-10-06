import csv
from datetime import datetime

class ComissaoCalculator:
    def __init__(self, csv_path):
        self.vendas = self.carregar_dados(csv_path)
        
    def carregar_dados(self, caminho):
        with open(caminho, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile, delimiter='\t')
            return [row for row in reader]

    def calcular_comissao(self, inicio, fim, modelo):
        periodo = self.filtrar_periodo(inicio, fim)
        resultados = []
        
        for venda in periodo:
            valor_venda = float(venda['Valor'].replace('R$', '').replace('.', '').replace(',', '.'))
            meta = float(venda['Meta'].replace('R$', '').replace('.', '').replace(',', '.'))
            
            perc_alcancado = (valor_venda / meta) * 100 if meta != 0 else 0
            
            if perc_alcancado >= 100:
                taxa = float(venda['100%'])
            elif perc_alcancado >= 80:
                taxa = float(venda['80%'])
            elif perc_alcancado >= 60:
                taxa = float(venda['60%'])
            else:
                taxa = 0
                
            comissao = valor_venda * taxa
            resultados.append({
                'vendedor': venda['VENDEDOR'],
                'valor_venda': valor_venda,
                'comissao': comissao,
                'meta_alcancada': f"{perc_alcancado:.2f}%"
            })
        
        return resultados

    def filtrar_periodo(self, data_inicio, data_fim):
        formato = '%d/%m/%Y'
        return [v for v in self.vendas 
                if datetime.strptime(v['Data'], formato) >= data_inicio
                and datetime.strptime(v['Data'], formato) <= data_fim]
