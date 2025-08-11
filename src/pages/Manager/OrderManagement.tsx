import React, { useState, useMemo } from 'react';
import CustomTable from '../../components/CustomTable';

interface OrderData {
  id: string;
  clientName: string;
  location: string;
  orderName: string;
  pickedUpBy: string;
  status: string;
  amount: number;
  date: string;
  phone: string;
}

const OrderManagement: React.FC = () => {
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Mock data for orders
  const mockOrders: OrderData[] = [
    {
      id: 'ORD001',
      clientName: 'Rahul Sharma',
      location: 'Indiranagar, Bangalore',
      orderName: 'Chicken Biryani + Mutton Curry',
      pickedUpBy: 'Rajesh Kumar',
      status: 'Delivered',
      amount: 450,
      date: '2024-01-15',
      phone: '+91 98765 43210'
    },
    {
      id: 'ORD002',
      clientName: 'Priya Patel',
      location: 'Koramangala, Bangalore',
      orderName: 'Fish Curry + Rice',
      pickedUpBy: 'Amit Singh',
      status: 'In Transit',
      amount: 380,
      date: '2024-01-15',
      phone: '+91 98765 43211'
    },
    {
      id: 'ORD003',
      clientName: 'Vikram Malhotra',
      location: 'HSR Layout, Bangalore',
      orderName: 'Chicken Tikka + Naan',
      pickedUpBy: 'Suresh Kumar',
      status: 'Delivered',
      amount: 520,
      date: '2024-01-15',
      phone: '+91 98765 43212'
    },
    {
      id: 'ORD004',
      clientName: 'Anjali Desai',
      location: 'Whitefield, Bangalore',
      orderName: 'Mutton Biryani + Raita',
      pickedUpBy: 'Mohan Reddy',
      status: 'Picked Up',
      amount: 480,
      date: '2024-01-15',
      phone: '+91 98765 43213'
    },
    {
      id: 'ORD005',
      clientName: 'Arjun Kapoor',
      location: 'Electronic City, Bangalore',
      orderName: 'Chicken Curry + Roti',
      pickedUpBy: 'Krishna Rao',
      status: 'Delivered',
      amount: 320,
      date: '2024-01-15',
      phone: '+91 98765 43214'
    },
    {
      id: 'ORD006',
      clientName: 'Meera Iyer',
      location: 'JP Nagar, Bangalore',
      orderName: 'Fish Fry + Rice',
      pickedUpBy: 'Lakshmi Devi',
      status: 'In Transit',
      amount: 420,
      date: '2024-01-15',
      phone: '+91 98765 43215'
    },
    {
      id: 'ORD007',
      clientName: 'Siddharth Gupta',
      location: 'Bannerghatta Road, Bangalore',
      orderName: 'Chicken Biryani + Curry',
      pickedUpBy: 'Ramesh Kumar',
      status: 'Delivered',
      amount: 550,
      date: '2024-01-15',
      phone: '+91 98765 43216'
    },
    {
      id: 'ORD008',
      clientName: 'Kavya Reddy',
      location: 'Marathahalli, Bangalore',
      orderName: 'Mutton Curry + Rice',
      pickedUpBy: 'Venkatesh Prasad',
      status: 'Picked Up',
      amount: 390,
      date: '2024-01-15',
      phone: '+91 98765 43217'
    },
    {
      id: 'ORD009',
      clientName: 'Aditya Verma',
      location: 'Bellandur, Bangalore',
      orderName: 'Chicken Tikka + Naan',
      pickedUpBy: 'Ganesh Kumar',
      status: 'Delivered',
      amount: 480,
      date: '2024-01-15',
      phone: '+91 98765 43218'
    },
    {
      id: 'ORD010',
      clientName: 'Zara Khan',
      location: 'Sarjapur Road, Bangalore',
      orderName: 'Fish Curry + Roti',
      pickedUpBy: 'Abdul Rahman',
      status: 'In Transit',
      amount: 360,
      date: '2024-01-15',
      phone: '+91 98765 43219'
    },
    {
      id: 'ORD011',
      clientName: 'Rohan Mehta',
      location: 'Hebbal, Bangalore',
      orderName: 'Chicken Biryani + Raita',
      pickedUpBy: 'Prakash Singh',
      status: 'Delivered',
      amount: 520,
      date: '2024-01-15',
      phone: '+91 98765 43220'
    },
    {
      id: 'ORD012',
      clientName: 'Ishita Joshi',
      location: 'Yelahanka, Bangalore',
      orderName: 'Mutton Tikka + Naan',
      pickedUpBy: 'Srinivas Rao',
      status: 'Picked Up',
      amount: 580,
      date: '2024-01-15',
      phone: '+91 98765 43221'
    }
  ];

  // Filter orders based on search term and status filter
  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => {
      const matchesSearch = searchTerm === '' || 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.pickedUpBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === '' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const columns = [
    {
      accessor: 'id',
      title: 'Order ID',
      sortable: true
    },
    {
      accessor: 'clientName',
      title: 'Client Name',
      sortable: true
    },
    {
      accessor: 'location',
      title: 'Location',
      sortable: true
    },
    {
      accessor: 'orderName',
      title: 'Order Details',
      sortable: true
    },
    {
      accessor: 'pickedUpBy',
      title: 'Picked Up By',
      sortable: true
    },
    {
      accessor: 'status',
      title: 'Status',
      sortable: true,
      render: (row: OrderData) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.status === 'Delivered' ? 'bg-green-100 text-green-800' :
          row.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
          row.status === 'Picked Up' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      accessor: 'amount',
      title: 'Amount (₹)',
      sortable: true,
      render: (row: OrderData) => (
        <span className="font-semibold">₹{row.amount}</span>
      )
    },
    {
      accessor: 'date',
      title: 'Date',
      sortable: true,
      render: (row: OrderData) => (
        <span>{new Date(row.date).toLocaleDateString('en-IN')}</span>
      )
    },
    {
      accessor: 'phone',
      title: 'Phone',
      sortable: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Order Management
            </h1>
            <p className="text-gray-600">
              Manage and track all customer orders with delivery details
            </p>
          </div>
          
          {/* Search and Filter Section */}
          <div className="flex items-center space-x-4">
            {/* Search Box */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Status</option>
                <option value="Delivered">Delivered</option>
                <option value="In Transit">In Transit</option>
                <option value="Picked Up">Picked Up</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {/* Total Orders Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-4 border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Total Orders</p>
                  <p className="text-xl font-bold text-blue-900">{mockOrders.length}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Delivered Card */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md p-4 border border-green-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">Delivered</p>
                  <p className="text-xl font-bold text-green-900">
                    {mockOrders.filter(order => order.status === 'Delivered').length}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* In Transit Card */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-md p-4 border border-amber-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">In Transit</p>
                  <p className="text-xl font-bold text-amber-900">
                    {mockOrders.filter(order => order.status === 'In Transit').length}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Picked Up Card */}
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl shadow-md p-4 border border-teal-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide">Picked Up</p>
                  <p className="text-xl font-bold text-teal-900">
                    {mockOrders.filter(order => order.status === 'Picked Up').length}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Total Revenue Card */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md p-4 border border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide">Total Revenue</p>
                  <p className="text-xl font-bold text-purple-900">
                    ₹{mockOrders.reduce((sum, order) => sum + order.amount, 0).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Table */}
        <CustomTable
          pageHeader="Order Management"
          data={filteredOrders}
          columns={columns}
          defaultSort={{ columnAccessor: 'id', direction: 'desc' }}
        />
      </div>
    </div>
  );
};

export default OrderManagement;
