import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2'; 
import 'chart.js/auto'; 
import './Analytics.css';

const Analytics = () => {
  const [userStats, setUserStats] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5000/api/analytics', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch analytics data');
        }

        const data = await response.json();
        console.log('Analytics Data:', data);
        setUserStats(data.userStats);
        setMonthlyData(data.monthlyData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <p>Loading analytics...</p>;
  }

  const chartData = {
    labels: monthlyData.map((item) => item.month),
    datasets: [
      {
        label: 'User Registrations',
        data: monthlyData.map((item) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Activity',
        data: monthlyData.map((item) => item.activity),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="analytics-page">
      <h2>Analytics Dashboard</h2>

      {/* User Stats Section */}
      <div className="summary-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>{userStats.totalUsers}</p>
        </div>
        <div className="card">
          <h3>Active Users</h3>
          <p>{userStats.activeUsers}</p>
        </div>
        <div className="card">
          <h3>New Users This Month</h3>
          <p>{userStats.newUsersThisMonth}</p>
        </div>
      </div>

      {/* Monthly Data Chart */}
      <div className="monthly-data">
        <h3>Monthly User Data</h3>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Analytics;
