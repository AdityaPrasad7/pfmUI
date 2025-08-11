import React, { useMemo, useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  ColumnDef,
} from '@tanstack/react-table';
import NavigateBtn from '../../../components/button/NavigateBtn';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { toast, ToastContainer } from 'react-toastify';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

type Store = {
  id: string; // Added for unique identification
  name: string;
  location: string;
  manager: string;
  latitude: string;
  longitude: string;
  products: {
    fish: boolean;
    meat: boolean;
    chicken: boolean;
    egg: boolean;
  };
};

const columnHelper = createColumnHelper<Store>();

const MeatCenterDisplay: React.FC = () => {
  // Initialize data from localStorage or fallback to default data
  const [data, setData] = useState<Store[]>(() => {
    const savedData = localStorage.getItem('meatCenterStores');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return [
      {
        id: '1',
        name: 'Priya Fresh Meats',
        location: 'Marathahalli Bridge',
        manager: 'Sangram Bal',
        latitude: '12.9716',
        longitude: '77.5946',
        products: { fish: true, meat: true, chicken: false, egg: false },
      },
      {
        id: '2',
        name: 'Aditya Store',
        location: 'Munnekolala',
        manager: 'Aditya Rao',
        latitude: '17.3850',
        longitude: '78.4867',
        products: { fish: true, meat: false, chicken: true, egg: true },
      },
      {
        id: '3',
        name: 'Fresh Farm',
        location: 'Kundalahalli',
        manager: 'Meena Kumari',
        latitude: '19.0760',
        longitude: '72.8777',
        products: { fish: false, meat: true, chicken: true, egg: false },
      },
      {
        id: '4',
        name: 'Organic Delights',
        location: 'Doddanekundi',
        manager: 'Rahul Sharma',
        latitude: '28.7041',
        longitude: '77.1025',
        products: { fish: true, meat: true, chicken: true, egg: true },
      },
      {
        id: '5',
        name: 'City Meat Shop',
        location: 'Brookefield',
        manager: 'Priya Patel',
        latitude: '13.0827',
        longitude: '80.2707',
        products: { fish: false, meat: true, chicken: false, egg: false },
      },
    ];
  });

  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([{ id: 'name', desc: false }]);
  const PAGE_SIZES = [5, 10, 20, 30, 50];

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('meatCenterStores', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      toast.error('Failed to save data.');
    }
  }, [data]);

  // Fuzzy search implementation with enhanced keys
  const fuse = useMemo(
    () =>
      new Fuse(data, {
        keys: [
          'name',
          'location',
          'manager',
          'latitude',
          'longitude',
          { name: 'products.fish', getFn: (store) => (store.products.fish ? 'Fish' : '') },
          { name: 'products.meat', getFn: (store) => (store.products.meat ? 'Meat' : '') },
          { name: 'products.chicken', getFn: (store) => (store.products.chicken ? 'Chicken' : '') },
          { name: 'products.egg', getFn: (store) => (store.products.egg ? 'Egg' : '') },
        ],
        threshold: 0.3,
      }),
    [data]
  );

  const filteredData = useMemo(() => {
    if (!globalFilter) return data;
    return fuse.search(globalFilter).map((result) => result.item);
  }, [data, globalFilter, fuse]);

  const navigate = useNavigate();

  const handleEdit = (row: Store) => {
    try {
      console.log('Editing:', row);
      navigate(`/meat-center/edit/${row.id}`, {
        state: {
          id: row.id,
          name: row.name,
          location: row.location,
          manager: row.manager,
          latitude: row.latitude,
          longitude: row.longitude,
          products: row.products,
        },
      });
    } catch (error) {
      console.error('Error navigating to edit:', error);
      toast.error('Failed to initiate edit.');
    }
  };

  const handleDelete = (row: Store) => {
    if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
      try {
        setData((prev) => prev.filter((store) => store.id !== row.id));
        toast.success(`${row.name} deleted successfully!`);
      } catch (error) {
        console.error('Error deleting store:', error);
        toast.error('Failed to delete store.');
      }
    }
  };

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [globalFilter]);

  const columns = useMemo<ColumnDef<Store, any>[]>(
    () => [
      columnHelper.accessor('name', {
        header: 'Store Name',
        cell: (info) => (
          <div className="flex items-center">
            <div className="bg-[#FFF2F2] text-[#F47C7C] rounded-full w-8 h-8 flex items-center justify-center mr-3">
              {info.getValue().split(' ').map((n: string) => n[0]).join('')}
            </div>
            <span className="font-medium text-gray-800">{info.getValue()}</span>
          </div>
        ),
        size: 250,
        enableSorting: true,
      }),
      columnHelper.accessor('location', {
        header: 'Location',
        cell: (info) => (
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-gray-600">{info.getValue()}</span>
          </div>
        ),
        size: 180,
        enableSorting: true,
      }),
      columnHelper.accessor('manager', {
        header: 'Manager',
        cell: (info) => (
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-gray-600">{info.getValue()}</span>
          </div>
        ),
        size: 200,
        enableSorting: true,
      }),
      columnHelper.accessor('latitude', {
        header: 'Latitude',
        cell: (info) => <div className="text-gray-600">{info.getValue()}</div>,
        size: 150,
        enableSorting: true,
      }),
      columnHelper.accessor('longitude', {
        header: 'Longitude',
        cell: (info) => <div className="text-gray-600">{info.getValue()}</div>,
        size: 150,
        enableSorting: true,
      }),
      columnHelper.accessor('products', {
        header: 'Products',
        cell: (info) => {
          const products = info.getValue();
          const activeProducts = [];
          if (products.fish) activeProducts.push('Fish');
          if (products.meat) activeProducts.push('Meat');
          if (products.chicken) activeProducts.push('Chicken');
          if (products.egg) activeProducts.push('Egg');
          return (
            <div className="flex flex-wrap gap-1">
              {activeProducts.map((product, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#FFF2F2] text-[#F47C7C]"
                >
                  {product}
                </span>
              ))}
            </div>
          );
        },
        size: 200,
        enableSorting: false,
      }),
      {
        id: 'actions',
        header: () => <div className="text-center w-full">Actions</div>,
        cell: ({ row }) => (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handleEdit(row.original)}
              className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors flex items-center"
              aria-label={`Edit ${row.original.name}`}
              title="Edit"
            >
              <ModeEditIcon fontSize="small" />
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center"
              aria-label={`Delete ${row.original.name}`}
              title="Delete"
            >
              <DeleteOutlineIcon fontSize="small" />
            </button>
          </div>
        ),
        size: 150,
        enableSorting: false,
      },
    ],
    []
  );

  const table = useReactTable<Store>({
    data: filteredData,
    columns,
    state: { globalFilter, pagination, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Meat Center</h1>
            </div>
            <NavigateBtn
              to="/meat-center/add"
              label={
                <span className="flex items-center gap-1">
                  <AddIcon fontSize="small" />
                  <span>Add New Store</span>
                </span>
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
            />
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="flex flex-col sm:flex-row gap-4 p-6 border-b border-gray-100">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="text-gray-400" style={{ fontSize: '1.2rem' }} />
              </div>
              <input
                type="text"
                placeholder="Search stores by name, location, manager, or products..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-400"
              />
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        style={{ width: header.getSize() }}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && (
                            <span className="ml-1">
                              {{
                                asc: '↑',
                                desc: '↓',
                              }[header.column.getIsSorted() as string] ?? '↕'}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {table.getRowModel().rows.length === 0 && (
            <div className="p-12 text-center">
              <div className="mx-auto max-w-md">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No stores found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or add a new store.
                </p>
                <div className="mt-6">
                  <NavigateBtn
                    to="/meat-center/add"
                    label="Add New Store"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
            <div className="text-sm text-gray-500 mb-4 sm:mb-0">
              Showing{' '}
              <span className="font-medium">
                {pagination.pageIndex * pagination.pageSize + 1}-
                {Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredData.length)}
              </span>{' '}
              of <span className="font-medium">{filteredData.length}</span> stores
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3.5 py-1.5 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </button>
              <div className="flex gap-1">
                {Array.from({ length: table.getPageCount() }, (_, i) => (
                  <button
                    key={i}
                    className={`px-3.5 py-1.5 border rounded-md text-sm font-medium ${
                      pagination.pageIndex === i
                        ? 'border-[#EF9F9F] text-[#F47C7C] bg-[#FFF2F2]'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => table.setPageIndex(i)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                className="px-3.5 py-1.5 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </button>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                className="px-2 py-1.5 border border-gray-200 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-blue-500"
              >
                {PAGE_SIZES.map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeatCenterDisplay;