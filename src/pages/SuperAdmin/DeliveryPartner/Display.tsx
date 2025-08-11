// import React, { useMemo, useState, useEffect } from 'react';
// import {
//   useReactTable,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   flexRender,
//   createColumnHelper,
//   ColumnDef,
// } from '@tanstack/react-table';
// import NavigateBtn from '../../../components/button/NavigateBtn';
// import AddIcon from '@mui/icons-material/Add';
// import StarIcon from '@mui/icons-material/Star';
// import SearchIcon from '@mui/icons-material/Search';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import VerifiedIcon from '@mui/icons-material/Verified';
// import PendingActionsIcon from '@mui/icons-material/PendingActions';
// import Fuse from 'fuse.js';

// type Partner = {
//   id: string;
//   name: string;
//   center: string;
//   rating: number | 'N/A';
//   status: 'Verified' | 'Pending Docs';
// };

// const columnHelper = createColumnHelper<Partner>();

// const DeliveryPartnerDisplay: React.FC = () => {
//   const [data] = useState<Partner[]>([
//     { id: 'DP001', name: 'Ravi Kumar', center: 'Bangalore', rating: 4.5, status: 'Verified' },
//     { id: 'DP002', name: 'Ayesha Khan', center: 'Hyderabad', rating: 5, status: 'Pending Docs' },
//     { id: 'DP003', name: 'John Doe', center: 'Mumbai', rating: 'N/A', status: 'Verified' },
//     { id: 'DP004', name: 'Anita Singh', center: 'Delhi', rating: 3, status: 'Pending Docs' },
//     { id: 'DP005', name: 'Sanjay Patel', center: 'Ahmedabad', rating: 4.2, status: 'Verified' },
//     { id: 'DP006', name: 'Priya Sharma', center: 'Chennai', rating: 4.8, status: 'Verified' },
//     { id: 'DP007', name: 'Priya Sharma', center: 'Chennai', rating: 4.8, status: 'Verified' },
//   ]);

//   const [globalFilter, setGlobalFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 5,
//   });
//   const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([{ id: 'id', desc: false }]);
//   const PAGE_SIZES = [5, 10, 20, 30, 50];

//   // Fuzzy search implementation
//   const fuse = useMemo(
//     () =>
//       new Fuse(data, {
//         keys: ['id', 'name', 'center'],
//         threshold: 0.3,
//       }),
//     [data]
//   );

//   const filteredData = useMemo(() => {
//     let result = data;
//     if (globalFilter) {
//       result = fuse.search(globalFilter).map(result => result.item);
//     }
//     if (statusFilter) {
//       result = result.filter(item => item.status.toLowerCase() === statusFilter.toLowerCase());
//     }
//     return result;
//   }, [data, globalFilter, statusFilter]);

//   useEffect(() => {
//     setPagination((prev) => ({ ...prev, pageIndex: 0 }));
//   }, [globalFilter, statusFilter]);

//   const columns = useMemo<ColumnDef<Partner, any>[]>(
//     () => [
//       // {
//       //   id: 'sno',
//       //   header: 'S.No.',
//       //   cell: ({ row }) => (
//       //     <span className="text-gray-500 font-medium">{row.index + 1}</span>
//       //   ),
//       //   size: 80,
//       //   enableSorting: false,
//       // },
//       columnHelper.accessor('id', {
//         header: 'Partner ID',
//         cell: (info) => (
//           <span className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
//             {info.getValue()}
//           </span>
//         ),
//         size: 120,
//         enableSorting: true,
//       }),
//       columnHelper.accessor('name', {
//         header: 'Name',
//         cell: (info) => (
//           <div className="flex items-center">
//             <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">
//               {info.getValue().split(' ').map((n: string) => n[0]).join('')}
//             </div>
//             <span className="font-medium text-gray-800">{info.getValue()}</span>
//           </div>
//         ),
//         size: 200,
//         enableSorting: true,
//       }),
//       columnHelper.accessor('center', {
//         header: 'Center',
//         cell: (info) => (
//           <div className="flex items-center">
//             <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//             <span className="text-gray-600">{info.getValue()}</span>
//           </div>
//         ),
//         size: 150,
//         enableSorting: true,
//       }),
//       columnHelper.accessor('rating', {
//         header: 'Rating',
//         cell: (info) =>
//           info.getValue() !== 'N/A' ? (
//             <div className="flex items-center">
//               <span className="font-medium mr-1">{info.getValue()}</span>
//               <StarIcon className="text-yellow-500" style={{ fontSize: '1rem' }} />
//             </div>
//           ) : (
//             <span className="text-gray-400">N/A</span>
//           ),
//         size: 100,
//         enableSorting: true,
//         sortUndefined: 1, // Place 'N/A' at the end when sorting
//         sortingFn: (rowA, rowB, columnId) => {
//           const a = rowA.getValue(columnId) as number | 'N/A';
//           const b = rowB.getValue(columnId) as number | 'N/A';
//           if (a === 'N/A' && b === 'N/A') return 0;
//           if (a === 'N/A') return 1;
//           if (b === 'N/A') return -1;
//           return a > b ? 1 : a < b ? -1 : 0;
//         },
//       }),
//       columnHelper.accessor('status', {
//         header: 'Status',
//         cell: (info) => {
//           const value = info.getValue();
//           const isVerified = value === 'Verified';
//           return (
//             <div
//               className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center ${
//                 isVerified ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
//               }`}
//             >
//               {isVerified ? (
//                 <VerifiedIcon className="w-3 h-3 mr-1" />
//               ) : (
//                 <PendingActionsIcon className="w-3 h-3 mr-1" />
//               )}
//               {value}
//             </div>
//           );
//         },
//         size: 120,
//         enableSorting: true,
//       }),
//     ],
//     []
//   );

//   const table = useReactTable({
//     data: filteredData,
//     columns,
//     state: {
//       globalFilter,
//       pagination,
//       sorting,
//     },
//     onGlobalFilterChange: setGlobalFilter,
//     onPaginationChange: setPagination,
//     onSortingChange: setSorting,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     globalFilterFn: (row, columnId, filterValue) => {
//       const value = row.getValue(columnId);
//       return String(value).toLowerCase().includes(filterValue.toLowerCase());
//     },
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//          <div className="mb-8">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
//             <div>
//             <h2 className="text-2xl font-bold text-gray-800">Delivery Partners</h2>
//             {/* <p className="text-sm text-gray-500 mt-1">Manage your delivery partner network</p> */}
//           </div>
//           <NavigateBtn
//             to="/delivery-partner/add"
//             label={
//                <span className="flex items-center gap-1">
//                  <AddIcon fontSize="small" />
//                 <span>Add New Partner</span>
//               </span>
//             }
//              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
//          />
//         </div>
//         </div>

//         {/* Card Container */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//           {/* Filters Section */}
//           <div className="flex flex-col sm:flex-row gap-4 p-6 border-b border-gray-100">
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <SearchIcon className="text-gray-400" style={{ fontSize: '1.2rem' }} />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search partners by ID, name or center..."
//                 value={globalFilter}
//                 onChange={(e) => setGlobalFilter(e.target.value)}
//                 className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-400"
//               />
//             </div>
//             <div className="relative w-full sm:w-48">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FilterListIcon className="text-gray-400" style={{ fontSize: '1.2rem' }} />
//               </div>
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="pl-10 pr-8 py-2.5 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none outline-none transition bg-white"
//               >
//                 <option value="">All Statuses</option>
//                 <option value="Verified">Verified</option>
//                 <option value="Pending Docs">Pending Docs</option>
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                 <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                   <path
//                     fillRule="evenodd"
//                     d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Table Section */}
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 {table.getHeaderGroups().map((headerGroup) => (
//                   <tr key={headerGroup.id}>
//                     {headerGroup.headers.map((header) => (
//                       <th
//                         key={header.id}
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
//                         style={{ width: header.getSize() }}
//                         onClick={header.column.getToggleSortingHandler()}
//                       >
//                         <div className="flex items-center">
//                           {flexRender(header.column.columnDef.header, header.getContext())}
//                           {header.column.getCanSort() && (
//                             <span className="ml-1">
//                               {{
//                                 asc: '↑',
//                                 desc: '↓',
//                               }[header.column.getIsSorted() as string] ?? '↕'}
//                             </span>
//                           )}
//                         </div>
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-100">
//                 {table.getRowModel().rows.map((row) => (
//                   <tr key={row.id} className="hover:bg-gray-50 transition-colors">
//                     {row.getVisibleCells().map((cell) => (
//                       <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//                 {table.getRowModel().rows.length === 0 && (
//                   <tr>
//                     <td colSpan={columns.length} className="px-6 py-12 text-center">
//                       <div className="flex flex-col items-center justify-center">
//                         <svg
//                           className="w-16 h-16 text-gray-300 mb-4"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={1}
//                             d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                           />
//                         </svg>
//                         <h3 className="text-lg font-medium text-gray-700 mb-1">No partners found</h3>
//                         <p className="text-sm text-gray-500 max-w-md">
//                           Try adjusting your search or filter criteria. If you're expecting partners to appear,
//                           make sure they meet your criteria.
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Footer Section */}
//           <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
//             <div className="text-sm text-gray-500 mb-4 sm:mb-0">
//               Showing{' '}
//               <span className="font-medium">
//                 {pagination.pageIndex * pagination.pageSize + 1}-
//                 {Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredData.length)}
//               </span>{' '}
//               of <span className="font-medium">{filteredData.length}</span> partners
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 className="px-3.5 py-1.5 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
//                 onClick={() => table.previousPage()}
//                 disabled={!table.getCanPreviousPage()}
//               >
//                 Previous
//               </button>
//               <div className="flex gap-1">
//                 {Array.from({ length: table.getPageCount() }, (_, i) => (
//                   <button
//                     key={i}
//                     className={`px-3.5 py-1.5 border rounded-md text-sm font-medium ${
//                       pagination.pageIndex === i
//                         ? 'border-blue-200 text-blue-600 bg-blue-50'
//                         : 'border-gray-200 text-gray-700 hover:bg-gray-50'
//                     }`}
//                     onClick={() => table.setPageIndex(i)}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//               </div>
//               <button
//                 className="px-3.5 py-1.5 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
//                 onClick={() => table.nextPage()}
//                 disabled={!table.getCanNextPage()}
//               >
//                 Next
//               </button>
//               <select
//                 value={table.getState().pagination.pageSize}
//                 onChange={(e) => {
//                   table.setPageSize(Number(e.target.value));
//                 }}
//                 className="px-2 py-1.5 border border-gray-200 rounded-md text-sm text-gray-700 focus:ring-2 focus:ring-blue-500"
//               >
//                 {PAGE_SIZES.map((pageSize) => (
//                   <option key={pageSize} value={pageSize}>
//                     Show {pageSize}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeliveryPartnerDisplay;

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
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VerifiedIcon from '@mui/icons-material/Verified';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import Fuse from 'fuse.js';

type Staff = {
  id: string;
  name: string;
  store: string;
  status: 'Verified' | 'Pending Docs';
};

const columnHelper = createColumnHelper<Staff>();

const StoreStaffDisplay: React.FC = () => {
  const [data] = useState<Staff[]>([
    { id: 'ST001', name: 'Ravi Kumar', store: 'Fresh Meat Mart', status: 'Verified' },
    { id: 'ST002', name: 'Ayesha Khan', store: 'Bangalore Meat Shop', status: 'Pending Docs' },
    { id: 'ST003', name: 'John Doe', store: 'City Meat Center', status: 'Verified' },
    { id: 'ST004', name: 'Anita Singh', store: 'Premium Meat Store', status: 'Pending Docs' },
    { id: 'ST005', name: 'Sanjay Patel', store: 'Meat King', status: 'Verified' },
    { id: 'ST006', name: 'Priya Sharma', store: 'Quality Meat Shop', status: 'Verified' },
    { id: 'ST007', name: 'Rajesh Kumar', store: 'Family Meat Center', status: 'Verified' },
  ]);

  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([{ id: 'id', desc: false }]);
  const PAGE_SIZES = [5, 10, 20, 30, 50];

  // Fuzzy search implementation
  const fuse = useMemo(
    () =>
      new Fuse(data, {
        keys: ['id', 'name', 'store'],
        threshold: 0.3,
      }),
    [data]
  );

  const filteredData = useMemo(() => {
    let result = data;
    if (globalFilter) {
      result = fuse.search(globalFilter).map((result: any) => result.item);
    }
    if (statusFilter) {
      result = result.filter(item => item.status.toLowerCase() === statusFilter.toLowerCase());
    }
    return result;
  }, [data, globalFilter, statusFilter]);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [globalFilter, statusFilter]);

  const columns = useMemo<ColumnDef<Staff, any>[]>(
    () => [
      columnHelper.accessor('id', {
        header: 'Staff ID',
        cell: (info) => (
          <span className="font-medium text-[#EF9F9F] hover:text-[#F47C7C] cursor-pointer">
            {info.getValue()}
          </span>
        ),
        size: 120,
        enableSorting: true,
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => (
          <div className="flex items-center">
            <div className="bg-[#FFF2F2] text-[#F47C7C] rounded-full w-8 h-8 flex items-center justify-center mr-3">
              {info.getValue().split(' ').map((n: string) => n[0]).join('')}
            </div>
            <span className="font-medium text-gray-800">{info.getValue()}</span>
          </div>
        ),
        size: 200,
        enableSorting: true,
      }),
      columnHelper.accessor('store', {
        header: 'Store Name',
        cell: (info) => (
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-gray-600">{info.getValue()}</span>
          </div>
        ),
        size: 200,
        enableSorting: true,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const value = info.getValue();
          const isVerified = value === 'Verified';
          return (
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center ${
                isVerified ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
              }`}
            >
              {isVerified ? (
                <VerifiedIcon className="w-3 h-3 mr-1" />
              ) : (
                <PendingActionsIcon className="w-3 h-3 mr-1" />
              )}
              {value}
            </div>
          );
        },
        size: 120,
        enableSorting: true,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter,
      pagination,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      return String(value).toLowerCase().includes(filterValue.toLowerCase());
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
         <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
            <h2 className="text-2xl font-bold text-gray-800">Delivery Partner</h2>
          </div>
          <NavigateBtn
            to="/delivery-partner/add"
            label={
               <span className="flex items-center gap-1">
                 <AddIcon fontSize="small" />
                <span>Add New Staff</span>
              </span>
            }
             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
         />
        </div>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Filters Section */}
          <div className="flex flex-col sm:flex-row gap-4 p-6 border-b border-gray-100">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="text-gray-400" style={{ fontSize: '1.2rem' }} />
              </div>
              <input
                type="text"
                placeholder="Search staff by ID, name or store..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-400"
              />
            </div>
            <div className="relative w-full sm:w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FilterListIcon className="text-gray-400" style={{ fontSize: '1.2rem' }} />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2.5 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none outline-none transition bg-white"
              >
                <option value="">All Statuses</option>
                <option value="Verified">Verified</option>
                <option value="Pending Docs">Pending Docs</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
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
                      <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
                {table.getRowModel().rows.length === 0 && (
                  <tr>
                    <td colSpan={columns.length} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          className="w-16 h-16 text-gray-300 mb-4"
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
                        <h3 className="text-lg font-medium text-gray-700 mb-1">No staff members found</h3>
                        <p className="text-sm text-gray-500 max-w-md">
                          Try adjusting your search or filter criteria.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
            <div className="text-sm text-gray-500 mb-4 sm:mb-0">
              Showing{' '}
              <span className="font-medium">
                {pagination.pageIndex * pagination.pageSize + 1}-
                {Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredData.length)}
              </span>{' '}
              of <span className="font-medium">{filteredData.length}</span> staff members
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

export default StoreStaffDisplay;