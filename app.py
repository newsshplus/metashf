import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime
import numpy as np

# Configuração da página
st.set_page_config(
    page_title="MetaMagnet - Gestão de Vendas",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# CSS personalizado
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        color: #8B5CF6;
        font-weight: bold;
        margin-bottom: 1rem;
    }
    .stat-card {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
    }
    .stat-value {
        font-size: 2rem;
        font-weight: bold;
        color: #8B5CF6;
    }
    .stat-label {
        color: #6B7280;
        font-size: 0.9rem;
    }
    .sidebar .sidebar-content {
        background: #1F2937;
    }
    .menu-item {
        padding: 0.5rem 1rem;
        margin: 0.5rem 0;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.3s;
    }
    .menu-item:hover {
        background: #374151;
    }
    .menu-item.active {
        background: #8B5CF6;
        color: white;
    }
</style>
""", unsafe_allow_html=True)

# Dados de exemplo
@st.cache_data
def carregar_dados():
    vendedores = [
        {'id': 1, 'nome': 'Laiana Costa', 'setor': 'Televendas', 'status': 'ativo', 
         'meta': 150000, 'realizado': 188520, 'performance': 125, 'comissao': 3519.17},
        {'id': 2, 'nome': 'Emanuelle Santos', 'setor': 'Social', 'status': 'ativo',
         'meta': 150000, 'realizado': 164910, 'performance': 109, 'comissao': 3078.30},
        {'id': 3, 'nome': 'Ana Silva', 'setor': 'Televendas', 'status': 'ativo',
         'meta': 100000, 'realizado': 78110, 'performance': 78, 'comissao': 1208.25}
    ]
    
    vendas = [
        {'id': 1, 'vendedor': 'Laiana Costa', 'data': '2023-07-01', 'valor': 5000, 'meta': 4000},
        {'id': 2, 'vendedor': 'Emanuelle Santos', 'data': '2023-07-01', 'valor': 4200, 'meta': 4000},
        {'id': 3, 'vendedor': 'Ana Silva', 'data': '2023-07-01', 'valor': 3100, 'meta': 4000}
    ]
    
    return pd.DataFrame(vendedores), pd.DataFrame(vendas)

def dashboard():
    st.markdown('<h1 class="main-header">📊 MetaMagnet Dashboard</h1>', unsafe_allow_html=True)
    
    # Carregar dados
    vendedores_df, vendas_df = carregar_dados()
    
    # Estatísticas
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.markdown("""
        <div class="stat-card">
            <div class="stat-value">R$ 458.759,82</div>
            <div class="stat-label">Total Vendas</div>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div class="stat-card">
            <div class="stat-value">5</div>
            <div class="stat-label">Vendedores Ativos</div>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div class="stat-card">
            <div class="stat-value">85%</div>
            <div class="stat-label">Meta Atingida</div>
        </div>
        """, unsafe_allow_html=True)
    
    with col4:
        st.markdown("""
        <div class="stat-card">
            <div class="stat-value">R$ 8.245,36</div>
            <div class="stat-label">Comissões</div>
        </div>
        """, unsafe_allow_html=True)
    
    # Gráficos
    col1, col2 = st.columns(2)
    
    with col1:
        # Performance dos vendedores
        fig_performance = px.bar(
            vendedores_df,
            x='nome',
            y='performance',
            title='Performance dos Vendedores (%)',
            color='performance',
            color_continuous_scale='Viridis'
        )
        st.plotly_chart(fig_performance, use_container_width=True)
    
    with col2:
        # Metas vs Realizado
        fig_metas = go.Figure()
        fig_metas.add_trace(go.Bar(
            x=vendedores_df['nome'],
            y=vendedores_df['meta'],
            name='Meta',
            marker_color='#E5E7EB'
        ))
        fig_metas.add_trace(go.Bar(
            x=vendedores_df['nome'],
            y=vendedores_df['realizado'],
            name='Realizado',
            marker_color='#8B5CF6'
        ))
        fig_metas.update_layout(title='Metas vs Realizado (R$)')
        st.plotly_chart(fig_metas, use_container_width=True)
    
    # Tabela de vendedores
    st.subheader("🏆 Vendedores em Destaque")
    st.dataframe(vendedores_df, use_container_width=True)

def vendedores():
    st.markdown('<h1 class="main-header">👥 Gestão de Vendedores</h1>', unsafe_allow_html=True)
    
    vendedores_df, _ = carregar_dados()
    
    # Filtros
    col1, col2 = st.columns(2)
    with col1:
        setor_filter = st.selectbox('Filtrar por Setor', ['Todos'] + list(vendedores_df['setor'].unique()))
    with col2:
        status_filter = st.selectbox('Filtrar por Status', ['Todos'] + list(vendedores_df['status'].unique()))
    
    # Aplicar filtros
    filtered_df = vendedores_df.copy()
    if setor_filter != 'Todos':
        filtered_df = filtered_df[filtered_df['setor'] == setor_filter]
    if status_filter != 'Todos':
        filtered_df = filtered_df[filtered_df['status'] == status_filter]
    
    # Métricas
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Total Vendedores", len(filtered_df))
    with col2:
        st.metric("Performance Média", f"{filtered_df['performance'].mean():.1f}%")
    with col3:
        st.metric("Comissão Total", f"R$ {filtered_df['comissao'].sum():,.2f}")
    
    # Tabela
    st.dataframe(filtered_df, use_container_width=True)
    
    # Adicionar novo vendedor
    st.subheader("➕ Novo Vendedor")
    with st.form("novo_vendedor"):
        col1, col2 = st.columns(2)
        with col1:
            nome = st.text_input("Nome")
            setor = st.selectbox("Setor", ["Televendas", "Social", "Mercado Livre"])
        with col2:
            meta = st.number_input("Meta (R$)", min_value=0, value=100000)
            status = st.selectbox("Status", ["ativo", "inativo"])
        
        if st.form_submit_button("Adicionar Vendedor"):
            st.success("Vendedor adicionado com sucesso!")

def vendas():
    st.markdown('<h1 class="main-header">💰 Gestão de Vendas</h1>', unsafe_allow_html=True)
    
    _, vendas_df = carregar_dados()
    
    # Estatísticas de vendas
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Total de Vendas", f"R$ {vendas_df['valor'].sum():,.2f}")
    with col2:
        st.metric("Vendas no Período", len(vendas_df))
    with col3:
        st.metric("Ticket Médio", f"R$ {vendas_df['valor'].mean():,.2f}")
    
    # Gráfico de vendas por vendedor
    vendas_por_vendedor = vendas_df.groupby('vendedor')['valor'].sum().reset_index()
    fig = px.pie(vendas_por_vendedor, values='valor', names='vendedor', 
                 title='Distribuição de Vendas por Vendedor')
    st.plotly_chart(fig, use_container_width=True)
    
    # Tabela de vendas
    st.dataframe(vendas_df, use_container_width=True)

def metas():
    st.markdown('<h1 class="main-header">🎯 Gestão de Metas</h1>', unsafe_allow_html=True)
    
    vendedores_df, _ = carregar_dados()
    
    # Configurações de comissão
    st.subheader("📋 Configurações de Comissão")
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.info("""
        **100%+**
        - Comissão: 2.5%
        - Bônus: R$ 500
        """)
    
    with col2:
        st.info("""
        **80-99%**
        - Comissão: 1.5%
        - Bônus: R$ 0
        """)
    
    with col3:
        st.info("""
        **60-79%**
        - Comissão: 0.8%
        - Bônus: R$ 0
        """)
    
    with col4:
        st.info("""
        **0-59%**
        - Comissão: 0%
        - Bônus: R$ 0
        """)
    
    # Performance individual
    st.subheader("📊 Performance Individual")
    for _, vendedor in vendedores_df.iterrows():
        with st.expander(f"{vendedor['nome']} - {vendedor['performance']}%"):
            col1, col2 = st.columns(2)
            with col1:
                st.metric("Meta", f"R$ {vendedor['meta']:,.2f}")
                st.metric("Realizado", f"R$ {vendedor['realizado']:,.2f}")
            with col2:
                st.metric("Performance", f"{vendedor['performance']}%")
                st.metric("Comissão", f"R$ {vendedor['comissao']:,.2f}")

def analise_ia():
    st.markdown('<h1 class="main-header">🤖 Análise com IA</h1>', unsafe_allow_html=True)
    
    st.info("""
    ### 🔮 Insights de Inteligência Artificial
    
    Nossa IA analisou os dados e identificou:
    
    **🎯 Insights Encontrados:**
    - Laiana é top performer (125% da meta)
    - Oportunidade em vendas médias
    - Recomendação: Treinamento para Ana Silva
    - Potencial de crescimento no setor Social
    
    **📈 Tendências:**
    - Crescimento de 15% nas vendas do último mês
    - Aumento de 22% na performance de televendas
    """)
    
    # Simulação de análise
    if st.button("🔄 Executar Nova Análise"):
        with st.spinner("Analisando dados com IA..."):
            import time
            time.sleep(2)
            st.success("Análise concluída! Novos insights disponíveis.")

def importacao():
    st.markdown('<h1 class="main-header">📥 Importação de Dados</h1>', unsafe_allow_html=True)
    
    st.info("""
    ### 📋 Estrutura Esperada do Google Sheets
    
    **Colunas necessárias:**
    - Data
    - Nota
    - Cliente
    - Nome
    - Status
    - Valor
    - Tipo Pagamento
    - Condição Recebimento
    - Frete
    - Valor Itens
    - Representante
    - Valor Frete
    - Valor Desconto
    - Categoria
    - Cidade
    - UF
    - Tipo
    - CNPJ/CPF
    - Empresa
    """)
    
    # Upload de arquivo
    uploaded_file = st.file_uploader("Escolha um arquivo CSV", type="csv")
    
    if uploaded_file:
        df = pd.read_csv(uploaded_file)
        st.success("Arquivo carregado com sucesso!")
        st.dataframe(df.head())
        
        if st.button("📊 Processar Dados"):
            with st.spinner("Processando dados..."):
                import time
                time.sleep(3)
                st.success("Dados processados e importados!")

# Menu de navegação
def main():
    st.sidebar.markdown("""
    <div style='text-align: center; margin-bottom: 2rem;'>
        <h1 style='color: #8B5CF6;'>⚡ MetaMagnet</h1>
    </div>
    """, unsafe_allow_html=True)
    
    menu_options = {
        "📊 Dashboard": dashboard,
        "👥 Vendedores": vendedores,
        "💰 Vendas": vendas,
        "🎯 Metas": metas,
        "🤖 Análise IA": analise_ia,
        "📥 Importação": importacao
    }
    
    selection = st.sidebar.radio("Navegação", list(menu_options.keys()))
    
    # Executar a função selecionada
    menu_options[selection]()

if __name__ == "__main__":
    main()
