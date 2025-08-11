import React from 'react';
import ApexCharts from 'react-apexcharts';

type SalesByCategoryChartProps = {
  isDark?: boolean;
  labels: string[];
  series: number[];
};

const SalesByCategoryChart: React.FC<SalesByCategoryChartProps> = ({
  isDark = false,
  labels,
  series,
}) => {
  const topPlaces = [
    { name: 'Kormangla', value: '32%', trend: 'up' },
    { name: 'Inderanagar', value: '28%', trend: 'up' },
    { name: 'Jayanagar', value: '22%', trend: 'down' },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      height: '100%',
      fontFamily: 'Inter, sans-serif',
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        }
      },
      sparkline: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    labels,
    colors: ['#E8A0BF', '#BA90C6', '#C0DBEA'],
    // colors: ['#61D8D9', '#F3BB8B', '#C5E3FB'],
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '13px',
      markers: {
        // radius: 2,
        // width: 10,
        // height: 10,
        offsetX: -4
      },
      itemMargin: {
        horizontal: 8,
        vertical: 4
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '15px',
              fontWeight: 600,
              color: isDark ? '#E5E7EB' : '#374151',
              offsetY: -4
            },
            value: {
              show: true,
              fontSize: '22px',
              fontWeight: 700,
              color: isDark ? '#F9FAFB' : '#111827',
              offsetY: 4,
              formatter: (val) => `${val}`
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '16px',
              fontWeight: 600,
              color: isDark ? '#9CA3AF' : '#6B7280',
              formatter: () => '100%'
            }
          }
        }
      }
    },
    states: {
      hover: {
        filter: {
          type: 'none'
        }
      }
    }
  };

  return (
    <div className={`rounded-xl shadow-sm overflow-hidden`}>
      <div className="">
        {/* Card Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            {/* <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
              Sales by Zone
            </h2> */}
            {/* <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Regional performance overview
            </p> */}
          </div>
          {/* <button className={`text-xs px-3 py-1 rounded-lg ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
            View All
          </button> */}
        </div>

        {/* Chart Container */}
        <div className="relative w-full aspect-square mb-6">
          <ApexCharts 
            options={options} 
            series={series} 
            type="donut" 
            height="100%" 
            width="100%"
          />
        </div>

        {/* Top Locations */}
        {/* <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
          <h3 className={`text-sm font-medium mb-3 flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Top Performing Locations
          </h3>
          
          <div className="grid grid-cols-3 gap-2">
            {topPlaces.map((place, index) => (
              <div 
                key={index} 
                className={`p-2 rounded-md text-center ${isDark ? 'bg-gray-600/30' : 'bg-white'}`}
              >
                <div className="flex justify-center items-center mb-1">
                  <div className={`w-2 h-2 rounded-full mr-2 ${index === 0 ? 'bg-indigo-500' : index === 1 ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                  <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {place.name}
                  </span>
                </div>
                <div className="flex justify-center items-center">
                  <span className={`text-xs font-semibold mr-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {place.value}
                  </span>
                  {place.trend === 'up' ? (
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SalesByCategoryChart;