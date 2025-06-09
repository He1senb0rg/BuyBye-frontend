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
        backgroundColor: '#38bdf8',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#fff' } },
      title: { display: true, text: `Vendas - ${selectedYear}`, color: '#fff' },
    },
    scales: {
      x: { ticks: { color: '#ccc' }, grid: { color: '#444' } },
      y: { ticks: { color: '#ccc' }, grid: { color: '#444' } },
    },
  };

  const availableYears = [2024, 2025, 2026];

  return (
    <div className="card mb-3 min-h-screen bg-gray-900 text-white p-8">
      <div className="card-header text-xl font-bold border-b border-gray-700 pb-2">Dashboard</div>
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Items Vendidos por Mês</h2>
          <select
            value={selectedYear}
            onChange={e => setSelectedYear(Number(e.target.value))}
            className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-1"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="bg-gray-800 rounded-2xl px-6 pt-6 pb-2 border border-gray-700 max-w-3xl mx-auto">
          <Bar data={chartData} options={chartOptions} height={100} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 flex flex-col justify-between h-40">
          <p className="text-gray-400 text-sm">Vendas</p>
          <p className="text-2xl font-semibold text-white">{summary.totalItemsSold}</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 flex flex-col justify-between h-40">
          <p className="text-gray-400 text-sm">Lucro</p>
          <p className="text-2xl font-semibold text-white">${summary.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 flex flex-col justify-between h-40">
          <p className="text-gray-400 text-sm">Total Users</p>
          <p className="text-2xl font-semibold text-white">{totalUsers}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
