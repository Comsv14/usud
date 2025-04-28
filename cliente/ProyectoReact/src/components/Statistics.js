import React, { useEffect, useState } from 'react';
import { getStatistics } from '../api/api';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStatistics("2023-05"); 
        setStats(data);
        
        setChartData({
          labels: data.evolucion.map(item => item.dia),
          datasets: [
            {
              label: "Evolución LENTA",
              data: data.evolucion.map(item => item.valor),
              fill: false,
              borderWidth: 2
            }
          ]
        });
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div>Cargando estadísticas...</div>;

  return (
    <div>
      <h2>Estadísticas del Indicador LENTA</h2>
      <p>Valor medio: {stats.media}</p>
      <p>Valor mínimo: {stats.min}</p>
      <p>Valor máximo: {stats.max}</p>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Statistics;
