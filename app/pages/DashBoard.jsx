import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { getDashboardSummary, getUsers } from "../services/api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const Dashboard = () => {
  const [summary, setSummary] = useState({ totalItemsSold: 0, totalRevenue: 0 });
  const [totalUsers, setTotalUsers] = useState(0);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartDataValues, setChartDataValues] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [monthlyData, usersRes] = await Promise.all([
          getDashboardSummary(),
          getUsers(1, 1, 'mais_recente', '')
        ]);
        
        const filteredData = monthlyData.filter(item => item.year === selectedYear);
    
        const labels = MONTH_NAMES.map((name) => `${name} ${selectedYear}`);
        const values = new Array(12).fill(0);
    
        const totals = { totalItemsSold: 0, totalRevenue: 0 };
    
        filteredData.forEach(item => {
          const index = item.month - 1;
          values[index] = item.totalItemsSold || 0;
          totals.totalItemsSold += item.totalItemsSold || 0;
          totals.totalRevenue += item.totalRevenue || 0;
        });
    
        setSummary(totals);
        setTotalUsers(usersRes.totalUsers);
        setChartLabels(labels);
        setChartDataValues(values);
      } catch (err) {
        console.error('Dashboard load error:', err);
      }
    };
    

      fetchData();
  }, [selectedYear]);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Vendas',
        data: chartDataValues,
        backgroundColor: '#00adef'
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#fff' } },
      title: { display: true, text: `Vendas`, color: '#fff',font: { size: 20, family: 'Arial, sans-serif'} },
    },
    scales: {
      x: { ticks: { color: '#ccc' }, grid: { color: '#444' } },
      y: { ticks: { color: '#ccc' }, grid: { color: '#444' } },
    },
  };

  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

  return (
    <main>
      <section className="container py-4">
        <p className="h1 mb-3 ms-3">Dashboard</p>
        <div className="card-body bg-dark border rounded">
          <h2 className="ms-3">
            Items Vendidos por Mês
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(Number(e.target.value))}
              className="form-select d-inline-block w-auto ms-3 mt-2"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </h2>

          <div className="bg-dark p-2 rounded border mx-2 p-4">
              <Bar data={chartData} options={chartOptions} height={100} />
            </div>

          <div className="d-flex flex-wrap gap-3 mx-3 my-4">
          <div className="card text-white bg-dark border border-secondary p-3 flex-fill">
              <p className="text-muted small mb-1">Total de Vendas</p>
              <p className="h3 fw-bold">{summary.totalItemsSold}</p>
            </div>

            <div className="card text-white bg-dark border border-secondary p-3 flex-fill">
              <p className="text-muted small mb-1">Lucro</p>
              <p className="h3 fw-bold text-success">
                {summary.totalRevenue.toFixed(2)}€
              </p>
            </div>

            <div className="card text-white bg-dark border border-secondary p-3 flex-fill">
              <p className="text-muted small mb-1">Total Users</p>
              <p className="h3 fw-bold text-info">{totalUsers}</p>
            </div>
          </div>
        </div>
      </section>
</main>
   
      
  );
};

export default Dashboard;
