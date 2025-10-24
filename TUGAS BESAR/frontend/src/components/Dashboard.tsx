'use client';

import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Borrower {
  name: string;
  borrow_count: number;
}

interface Category {
  category: string;
  borrow_count: number;
}

interface StatusSummary {
  status: string;
  count: number;
}

const Dashboard = () => {
  const [borrowers, setBorrowers] = useState<Borrower[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [statusSummary, setStatusSummary] = useState<StatusSummary[]>([]);
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalLoans, setTotalLoans] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalVendors, setTotalVendors] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const [borrowersRes, categoriesRes, statusRes, assetsRes, loansRes, employeesRes, vendorsRes] = await Promise.all([
          fetch('http://localhost:5000/api/analytics/most-borrowers'),
          fetch('http://localhost:5000/api/analytics/most-borrowed-categories'),
          fetch('http://localhost:5000/api/analytics/asset-status-summary'),
          fetch('http://localhost:5000/api/assets'),
          fetch('http://localhost:5000/api/transactions/loans'),
          fetch('http://localhost:5000/api/employees'),
          fetch('http://localhost:5000/api/vendors'),
        ]);

        const borrowersData = await borrowersRes.json();
        const categoriesData = await categoriesRes.json();
        const statusData = await statusRes.json();
        const assetsData = await assetsRes.json();
        const loansData = await loansRes.json();
        const employeesData = await employeesRes.json();
        const vendorsData = await vendorsRes.json();

        setBorrowers(Array.isArray(borrowersData) ? borrowersData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setStatusSummary(Array.isArray(statusData) ? statusData : []);
        setTotalAssets(assetsData.length);
        setTotalLoans(loansData.length);
        setTotalEmployees(employeesData.length);
        setTotalVendors(vendorsData.length);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const borrowersChartData = {
    labels: borrowers.map(b => b.name),
    datasets: [
      {
        label: 'Jumlah Peminjaman',
        data: borrowers.map(b => b.borrow_count),
        backgroundColor: '#ff6384',
        borderColor: '#ff6384',
        borderWidth: 1,
      },
    ],
  };

  const categoriesChartData = {
    labels: categories.map(c => c.category),
    datasets: [
      {
        label: 'Jumlah Peminjaman',
        data: categories.map(c => c.borrow_count),
        backgroundColor: '#36a2eb',
        borderColor: '#36a2eb',
        borderWidth: 1,
      },
    ],
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'Tersedia';
      case 'borrowed': return 'Dipinjam';
      case 'damaged': return 'Rusak';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#36a2eb'; // biru
      case 'borrowed': return '#ff6384'; // merah
      case 'damaged': return '#ffce56'; // kuning
      default: return '#4bc0c0';
    }
  };

  const statusChartData = {
    labels: statusSummary.map(s => getStatusLabel(s.status)),
    datasets: [
      {
        data: statusSummary.map(s => s.count),
        backgroundColor: statusSummary.map(s => getStatusColor(s.status)),
        borderColor: statusSummary.map(s => getStatusColor(s.status)),
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto mb-12">
          {/* Total Assets Card */}
            <div className="bg-white bg-opacity-20 backdrop-blur-lg border border-white/30 rounded-lg p-6 hover:bg-opacity-30 transition-colors cursor-pointer">
              <div className="flex items-center text-gray-800 mb-4">
                <div className="w-5 h-5 mr-2 bg-orange-500 rounded"></div>
                Total Aset
              </div>
              <div className="text-3xl font-bold text-gray-800">{totalAssets}</div>
              <p className="text-sm text-gray-600">Aset terdaftar</p>
            </div>

             {/* Total Loans Card */}
             <div className="bg-white bg-opacity-20 backdrop-blur-lg border border-white/30 rounded-lg p-6 hover:bg-opacity-30 transition-colors cursor-pointer">
             <div className="flex items-center text-gray-800 mb-4">
               <div className="w-5 h-5 mr-2 bg-red-500 rounded"></div>
               Total Peminjaman
             </div>
             <div className="text-3xl font-bold text-gray-800">{totalLoans}</div>
             <p className="text-sm text-gray-600">Transaksi peminjaman</p>
           </div>

           {/* Total Employees Card */}
           <div className="bg-white bg-opacity-20 backdrop-blur-lg border border-white/30 rounded-lg p-6 hover:bg-opacity-30 transition-colors cursor-pointer">
             <div className="flex items-center text-gray-800 mb-4">
               <div className="w-5 h-5 mr-2 bg-green-500 rounded"></div>
               Total Karyawan
             </div>
             <div className="text-3xl font-bold text-gray-800">{totalEmployees}</div>
             <p className="text-sm text-gray-600">Karyawan terdaftar</p>
           </div>

           {/* Total Vendors Card */}
           <div className="bg-white bg-opacity-20 backdrop-blur-lg border border-white/30 rounded-lg p-6 hover:bg-opacity-30 transition-colors cursor-pointer">
             <div className="flex items-center text-gray-800 mb-4">
               <div className="w-5 h-5 mr-2 bg-purple-500 rounded"></div>
               Total Vendor
             </div>
             <div className="text-3xl font-bold text-gray-800">{totalVendors}</div>
             <p className="text-sm text-gray-600">Vendor terdaftar</p>
           </div>
         </div>

        {/* Charts Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Analytics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg border border-white/30 rounded-lg p-6 hover:bg-opacity-30 transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Peminjam Terbanyak</h3>
              <Bar data={borrowersChartData} />
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg border border-white/30 rounded-lg p-6 hover:bg-opacity-30 transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Kategori Paling Banyak Dipinjam</h3>
              <Bar data={categoriesChartData} />
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-lg border border-white/30 rounded-lg p-6 hover:bg-opacity-30 transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Ringkasan Status Aset</h3>
              <Pie data={statusChartData} />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;