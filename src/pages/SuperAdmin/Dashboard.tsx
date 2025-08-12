
import React, { useState } from 'react';
import CustomPieChart from '../../components/pieChart/CustomPieChart';
import PlaceWiseSalesBarChart from '../../components/pieChart/PlaceWiseSalesBarChart';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Define interfaces for type safety
interface CardValues {
  totalRevenue: string;
  totalOrders: string;
  activePartners: string;
  newCustomers: string;
}

interface PlaceData {
  place: string;
  total: number;
}

interface CardData {
  title: string;
  valueKey: keyof CardValues;
  color: string;
  bgColor: string;
  icon: JSX.Element;
  trend?: 'up' | 'down';
  trendValue?: string;
}

interface ChartData {
  labels: string[];
  series: number[];
}

const SuperAdminDashboard: React.FC = () => {
  const [cardValues] = useState<CardValues>({
    totalRevenue: '₹12,345',
    totalOrders: '1,234',
    activePartners: '56',
    newCustomers: '78',
  });

  const placeData: PlaceData[] = [
    { place: 'R R Nagar', total: 35000 },
    { place: 'Vijaynagar', total: 25000 },
    { place: 'K G Layout', total: 12000 },
    { place: 'Hebbal', total: 6000 },
    { place: 'Marathalli', total: 4000 },
  ];

  const chartData: ChartData = {
    series: [985, 737, 270],
    labels: ['Fish', 'Chicken', 'Egg'],
  };

  const pieColors: string[] = ['#4e79a7', '#f28e2b', '#e15759'];

  const cardData: CardData[] = [
    {
      title: 'Total Revenue',
      valueKey: 'totalRevenue',
      color: 'text-white',
      bgColor: 'bg-gradient-to-r from-[#898AC4] to-[#9CB4CC] shadow-lg shadow-[#9CB4CC]/50',
      // bgColor: 'bg-gradient-to-r from-[#CADCAE] to-[#E1E9C9] shadow-lg shadow-gray-400/50',
      icon: (
    <CreditCardIcon sx={{color: "white"}}/>
      ),
      trend: 'up',
      trendValue: '12.5%',
    },
    {
      title: 'Total Orders',
      valueKey: 'totalOrders',
      color: 'text-white',
      bgColor: 'bg-gradient-to-r from-[#B3A492] to-[#BFB29E] shadow-lg shadow-[#FAEED1]/40',
      icon: (
     <ShoppingCartIcon sx={{
      color :"white"
     }} />
      ),
      trend: 'up',
      trendValue: '8.3%',
    },
    {
      title: 'Active Partners',
      valueKey: 'activePartners',
      color: 'text-white',
      bgColor: 'bg-gradient-to-r from-[#AAB99A] to-[#AAB99A] shadow-lg shadow-[#AAB99A]/40',
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      trend: 'down',
      trendValue: '2.1%',
    },
    {
      title: 'New Customers',
      valueKey: 'newCustomers',
      color: 'text-white',
      bgColor: 'bg-gradient-to-r from-[#A0937D] to-[#E7D4B5] shadow-lg shadow-[#E7D4B5]/40',
      icon: (
      <PersonAddIcon sx={{
        color:"white"
      }} />
      ),
      trend: 'up',
      trendValue: '15.7%',
    },
  ];

  const isDark = false;

  return (
    <div className="min-h-screen px-0 py-6 sm:px-6 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1
            className="text-2xl font-bold text-gray-800 mt-2"
            role="heading"
            aria-level={1}
          >
            Super Admin Dashboard
          </h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              className={`rounded-lg p-4 sm:p-5 shadow-md ${card.bgColor}`}
              role="region"
              aria-label={card.title}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-white/80 font-medium uppercase tracking-wide">
                    {card.title}
                  </p>
                  <h2
                    className={`text-xl sm:text-2xl font-semibold mt-1 sm:mt-2 ${card.color}`}
                  >
                    {cardValues[card.valueKey] ?? '--'}
                  </h2>
                  {card.trend && card.trendValue && (
                    <div className="flex items-center gap-1 mt-1">
                      <span
                        className={`text-sm font-medium ${
                          card.trend === 'up' ? 'text-green-100' : 'text-red-100'
                        }`}
                      >
                        {card.trend === 'up' ? '▲' : '▼'} {card.trendValue}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-md h-12 w-12 flex items-center justify-center">
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 ">
          {/* Pie Chart - Sales by Category */}
          <div className="p-4 sm:p-6 rounded-xl border border-gray-200 bg-white  lg:col-span-1 shadow-lg min-h-[27rem]">
            <h2
              className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight mb-4"
              role="heading"
              aria-level={2}
            >
              Sales by Category
            </h2>
            <div className="h-64">
              <CustomPieChart
                isDark={isDark}
                labels={chartData.labels}
                series={chartData.series}
                // colors={pieColors}
              />
            </div>
          </div>

          {/* Bar Chart - Place-wise Sales */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight"
                role="heading"
                aria-level={2}
              >
                Place-wise Total Orders
              </h2>
            </div>
            <div className="h-96">
              <PlaceWiseSalesBarChart data={placeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;