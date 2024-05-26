import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUsers, faTasks, faClock } from '@fortawesome/free-solid-svg-icons';
import styles from './DashBoard.module.css';

// Registrar os componentes do Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
    const chartRef = useRef(null);

    const data = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        datasets: [
            {
                label: 'Tarefas Concluídas',
                data: [30, 45, 60, 40, 70, 50, 80, 90, 100, 110, 95, 85],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Horas Trabalhadas',
                data: [120, 150, 180, 140, 200, 160, 220, 240, 260, 280, 250, 230],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Produtividade do Mês</h1>
            </header>
            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <FontAwesomeIcon icon={faTasks} className={styles.icon} />
                    <div className={styles.details}>
                        <h2>300</h2>
                        <p>Tarefas Concluídas</p>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <FontAwesomeIcon icon={faClock} className={styles.icon} />
                    <div className={styles.details}>
                        <h2>700</h2>
                        <p>Horas Trabalhadas</p>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <FontAwesomeIcon icon={faUsers} className={styles.icon} />
                    <div className={styles.details}>
                        <h2>50</h2>
                        <p>Colaboradores</p>
                    </div>
                </div>
            </div>
            <div className={styles.chartContainer}>
                <Bar ref={chartRef} data={data} options={options} />
            </div>
        </div>
    );
}

export default Dashboard;
