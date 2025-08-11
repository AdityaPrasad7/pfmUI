// import React, { useState } from 'react';
// import CustomPieChart from '../../components/pieChart/CustomPieChart';
// import PlaceWiseSalesBarChart from '../../components/pieChart/PlaceWiseSalesBarChart';
// import SalesByCategoryChart from '../../components/pieChart/CustomPieChart';

// // Define interfaces for type safety
// interface CardValues {
//   totalRevenue: string;
//   totalOrders: string;
//   activePartners: string;
//   newCustomers: string;
// }

// interface DailyCenterData {
//   day: string;
//   'Center A': number;
//   'Center B': number;
//   'Center C': number;
// }

// interface SampleData {
//   name: string;
//   value: number;
// }

// interface PlaceData {
//   place: string;
//   total: number;
// }

// interface CardData {
//   title: string;
//   valueKey: keyof CardValues;
//   color: string;
//   bgColor: string;
//   icon: JSX.Element;
// }

// const SuperAdminDashboard: React.FC = () => {
//   const [cardValues] = useState<CardValues>({
//     totalRevenue: "₹12,345",
//     totalOrders: "1,234",
//     activePartners: "56",
//     newCustomers: "78",
//   });

//   const dailyCenterData: DailyCenterData[] = [
//     { day: 'Mon', 'Center A': 5000, 'Center B': 6000, 'Center C': 7000 },
//     { day: 'Tue', 'Center A': 7000, 'Center B': 8000, 'Center C': 6500 },
//     { day: 'Wed', 'Center A': 8000, 'Center B': 7500, 'Center C': 7200 },
//     { day: 'Thu', 'Center A': 6000, 'Center B': 9000, 'Center C': 8000 },
//     { day: 'Fri', 'Center A': 8500, 'Center B': 9500, 'Center C': 8700 },
//     { day: 'Sat', 'Center A': 9200, 'Center B': 9800, 'Center C': 9100 },
//     { day: 'Sun', 'Center A': 7500, 'Center B': 8800, 'Center C': 8900 },
//   ];

//   const sampleData: SampleData[] = [
//     { name: 'North Zone', value: 400 },
//     { name: 'South Zone', value: 300 },
//     { name: 'East Zone', value: 200 },
//     { name: 'West Zone', value: 100 },
//   ];

//   const pieColors: string[] = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2'];

//   const placeData: PlaceData[] = [
//     { place: 'Bangalore', total: 35000 },
//     { place: 'Mysore', total: 25000 },
//     { place: 'Cuttack', total: 12000 },
//     { place: 'Bhadrak', total: 6000 },
//     { place: 'Balasore', total: 4000 },
//   ];

//    const cardData: CardData[] = [
//   {
//     title: 'Total Revenue',
//     valueKey: 'totalRevenue',
//     color: 'text-white',
//     // bgColor: 'bg-gradient-to-r from-[#07B7D5] to-[#22D3EE] shadow-lg shadow-cyan-300/50',
//     bgColor: 'bg-gradient-to-r from-[#A31D1D] to-[#D84040] shadow-lg shadow-red-400/50',
//  icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//     ),
//     trend: 'up',
//     trendValue: '12.5%'
//   },
//   {
//     title: 'Total Orders',
//     valueKey: 'totalOrders',
//     color: 'text-white',
//     // bgColor: 'bg-gradient-to-r from-[#8C5DF6] to-[#A78AFA] shadow-lg shadow-purple-300/50',
// bgColor: 'bg-gradient-to-r from-[#1C352D] to-[#8C9D72] shadow-lg shadow-green-300/40',

//     icon: (
//       <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h6a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2z" />
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10h1.5a.5.5 0 01.5.5v1a.5.5 0 01-.5.5H13v1.5a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5V12H9.5a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5H11v-1.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5V10z" />
//       </svg>
//     ),
//     trend: 'up',
//     trendValue: '8.3%'
//   },
//   {
//     title: 'Active Partners',
//     valueKey: 'activePartners',
//     color: 'text-white',
//     //  bgColor: 'bg-gradient-to-r from-[#3B82F6] to-[#5FA4FA] shadow-lg shadow-blue-300/50',
//    bgColor: 'bg-gradient-to-r from-[#932F67] to-[#D92C54] shadow-lg shadow-pink-400/40',

//     icon: (
//       <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//       </svg>
//     ),
//     trend: 'down',
//     trendValue: '2.1%'
//   },
//   {
//     title: 'New Customers',
//     valueKey: 'newCustomers',
//     color: 'text-white',
//     // bgColor: 'bg-gradient-to-r from-[#BC3ECF] to-[#E776F8] shadow-lg shadow-pink-300/50',
// bgColor: 'bg-gradient-to-r from-[#3A0519] to-[#A53860] shadow-lg shadow-[#3A0519]/40',

//     icon: (
//       <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
//       </svg>
//     ),
//     trend: 'up',
//     trendValue: '15.7%'
//   },
// ];
//   const isDark = false;

//   const chartData = {
//     series: [985, 737, 270],
//     labels: ['Apparel', 'Sports', 'Others'],
//   };

//   return (
//     <div className="min-h-screen px-4 py-6 sm:px-6 md:px-8 lg:px-10 ">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6 sm:mb-8">
//           <h1
//            className="font-semibold text-xl"
//             role="heading"
//             aria-level={1}
//           >
//             Super Admin Dashboard
//           </h1>
//         </div>

//         {/* Stats Cards */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
//   {cardData.map((card, idx) => (
//     <div
//       key={idx}
//       className={`rounded-lg p-4 sm:p-5 shadow-md ${card.bgColor}`}
//       role="region"
//       aria-label={card.title}
//     >
//       <div className="flex justify-between items-center">
//         <div>
//           <p className="text-sm text-white/80 font-medium uppercase tracking-wide">
//             {card.title}
//           </p>

//           <h2
//             className={`text-xl sm:text-2xl font-semibold mt-1 sm:mt-2 ${card.color}`}
//           >
//             {cardValues[card.valueKey] ?? '--'}
//           </h2>

//           {card.trend && card.trendValue && (
//             <div className="flex items-center gap-1 mt-1">
//               <span
//                 className={`text-sm font-medium ${
//                   card.trend === 'up'
//                     ? 'text-green-100'
//                     : 'text-red-100'
//                 }`}
//               >
//                 {card.trend === 'up' ? '▲' : '▼'} {card.trendValue}
//               </span>
//             </div>
//           )}
//         </div>

//         {/* <div className="p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-md h-12 w-12 flex items-center justify-center">
//           {card.icon}
//         </div> */}
//       </div>
//     </div>
//   ))}
// </div>



//         {/* Main Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
//           {/* Pie Chart - Sales by Zone */}
//           <div className="p-4 sm:p-6 rounded-xl border border-gray-200 bg-white lg:col-span-1 shadow-lg ">
          
//             {/* <div className="h-56 sm:h-64 flex items-center justify-center "> */}
//               <SalesByCategoryChart
//                 isDark={isDark}
//                 labels={chartData.labels}
//                 series={chartData.series}
//               />
//             {/* </div> */}
//           </div>

//           {/* Bar Chart - Place-wise Sales */}
//           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg lg:col-span-2 ">
//             <div className="flex items-center justify-between mb-6">
//               <h2
//                 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight"
//                 role="heading"
//                 aria-level={2}
//               >
//                 Place-wise Total Orders
//               </h2>
//             </div>

//             <div className="h-64 sm:h-96 mt-16">
//               <PlaceWiseSalesBarChart data={placeData} />
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuperAdminDashboard;

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
    <div className="min-h-screen px-4 py-6 sm:px-6 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1
            className="font-semibold text-xl text-gray-800"
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {/* Pie Chart - Sales by Category */}
          <div className="p-4 sm:p-6 rounded-xl border border-gray-200 bg-white lg:col-span-1 shadow-lg">
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