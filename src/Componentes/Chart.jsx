import React, { useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js';

function Chart() {
  useEffect(() => {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [{
          label: 'Total de Faturamento',
          data: [2569, 3236, 2890, 4022, 3688, 4277, 3902, 4590, 4782, 5120, 4899, 5300], // Substituir por seus dados reais
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        maintainAspectRatio: true,
        aspectRatio: 2 // Ajuste conforme necessário para controlar a altura do gráfico
      }
    });
  }, []);

  return (
    <section className="chart">
      <h2>Total de Faturamento</h2>
      <canvas id="revenueChart"></canvas>
    </section>
  );
}

export default Chart;
