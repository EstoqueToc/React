import React, { useEffect, useState, useRef } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PieController, ArcElement, DoughnutController } from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesStacked, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import styles from './DashBoard.module.css';
import api from '../../api';

// Registrar os componentes do Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PieController, ArcElement, DoughnutController);

function Dashboard() {
    const chartRef = useRef(null);

    const [totalProductsLost, setTotalProductsLost] = useState(0);
    const [currentMonthRevenue, setCurrentMonthRevenue] = useState(0);
    const [previousMonthRevenue, setPreviousMonthRevenue] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const [stockEntry, setStockEntry] = useState(0);
    const [stockExit, setStockExit] = useState(0);
    const [previousStockEntry, setPreviousStockEntry] = useState(0);
    const [previousStockExit, setPreviousStockExit] = useState(0);

    // Função para formatar valor como moeda (R$)
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    // Função para ordenar os dados de monthlyRevenue por mês crescente
    const sortMonthlyRevenueByMonth = (data) => {
        return data.sort((a, b) => {
            return new Date(a.mesAno) - new Date(b.mesAno);
        });
    };

    // Função para converter YYYY-MM em nome do mês
    const convertMonthFormat = (yyyyMM) => {
        if (!yyyyMM) return '';

        const [year, month] = yyyyMM.split('-');
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril',
            'Maio', 'Junho', 'Julho', 'Agosto',
            'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return `${monthNames[parseInt(month) - 1]} de ${year}`;
    };

    // Função para preparar os dados para o gráfico de faturamento mensal
    const prepareChartData = () => {
        // Ordena os dados por mês crescente
        const sortedData = sortMonthlyRevenueByMonth(monthlyRevenue);

        // Filtra apenas os últimos 12 meses
        const last12MonthsData = sortedData.slice(-12);

        const labels = last12MonthsData.map(item => convertMonthFormat(item.mesAno));
        const data = last12MonthsData.map(item => item.valorVendaMensal);

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Faturamento por Mês',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }
            ],
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            const empresaId = sessionStorage.getItem('ID_EMPRESA');

            try {
                // Buscar dados do mês atual
                const currentMonthRevenueResponse = await api.get('/estoque/faturamento/atual', {
                    params: { empresaId }
                });
                setCurrentMonthRevenue(formatCurrency(currentMonthRevenueResponse.data));

                // Buscar dados do mês anterior
                const previousMonthRevenueResponse = await api.get('/estoque/faturamento/anterior', {
                    params: { empresaId }
                });
                setPreviousMonthRevenue(formatCurrency(previousMonthRevenueResponse.data));

                // Buscar total de produtos perdidos
                const totalProductsLostResponse = await api.get('/estoque/perdidos', {
                    params: { empresaId }
                });
                setTotalProductsLost(totalProductsLostResponse.data);

                // Buscar dados de faturamento mensal
                const monthlyRevenueResponse = await api.get('/estoque/faturamento/mensal', {
                    params: { empresaId }
                });
                setMonthlyRevenue(monthlyRevenueResponse.data);

                // Buscar dados de entrada e saída do estoque do mês atual
                const stockEntryResponse = await api.get('/estoque/entrada-mes-atual', {
                    params: { empresaId }
                });
                setStockEntry(stockEntryResponse.data);

                const stockExitResponse = await api.get('/estoque/saida-mes-atual', {
                    params: { empresaId }
                });
                setStockExit(stockExitResponse.data);

                // Buscar dados de entrada e saída do estoque do mês passado
                const previousStockEntryResponse = await api.get('/estoque/entrada-mes-passado', {
                    params: { empresaId }
                });
                setPreviousStockEntry(previousStockEntryResponse.data);

                const previousStockExitResponse = await api.get('/estoque/saida-mes-passado', {
                    params: { empresaId }
                });
                setPreviousStockExit(previousStockExitResponse.data);

            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
                // Tratamento de erro
                // alert("Erro ao buscar os dados. Verifique o console para mais informações.");
            }
        };

        fetchData();
    }, []);

    const data = prepareChartData();

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return formatCurrency(value);
                    }
                }
            },
        },
        maintainAspectRatio: false,
    };

    // Dados para o gráfico de pizza de entrada e saída do estoque do mês atual
    const currentStockData = {
        labels: ['Entrada', 'Saída'],
        datasets: [
            {
                label: 'Valores do Estoque',
                data: [stockEntry, stockExit],
                backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            }
        ],
    };

    // Dados para o gráfico de pizza de entrada e saída do estoque do mês passado
    const previousStockData = {
        labels: ['Entrada', 'Saída'],
        datasets: [
            {
                label: 'Valores do Estoque',
                data: [previousStockEntry, previousStockExit],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 159, 64, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],
                borderWidth: 1,
            }
        ],
    };

    const stockOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Valores de Entrada e Saída do Estoque no Mês Atual',
            },
        },
    };

    const previousStockOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Valores de Entrada e Saída do Estoque no Mês Passado',
            },
        },
    };

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Faturamento do Mês</h1>
            </header>
            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <FontAwesomeIcon icon={faSackDollar} className={styles.icon} />
                    <div className={styles.details}>
                        <h2>{previousMonthRevenue}</h2>
                        <p>Faturamento Mês Anterior</p>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <FontAwesomeIcon icon={faSackDollar} className={styles.icon} />
                    <div className={styles.details}>
                        <h2>{currentMonthRevenue}</h2>
                        <p>Faturamento do Mês Atual</p>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <FontAwesomeIcon icon={faBoxesStacked} className={styles.icon} />
                    <div className={styles.details}>
                        <h2>{totalProductsLost}</h2>
                        <p>Total de Produtos Perdidos</p>
                    </div>
                </div>
            </div>
            <div className={styles.chartContainer}>
                <Bar ref={chartRef} data={data} options={options} />
            </div>
            <div className={styles.pieChartsContainer}>
                <div className={styles.pieChart}>
                    <Pie data={previousStockData} options={previousStockOptions} />
                </div>
                <div className={styles.pieChart}>
                    <Pie data={currentStockData} options={stockOptions} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
