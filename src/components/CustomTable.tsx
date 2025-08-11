import React, { useMemo, useState } from 'react';

interface Column {
    accessor: string;
    title: string;
    sortable?: boolean;
    hidden?: boolean;
    render?: (row: any, index: number) => React.ReactNode;
}

interface CustomTableProps {
    pageHeader: string;
    data: any[];
    columns: Column[];
    defaultSort?: { columnAccessor: string; direction: 'asc' | 'desc' };
    pageSizeOptions?: number[];
    isRtl?: boolean;
    onSearchChange?: (search: string) => void;
    onColumnVisibilityChange?: (hiddenColumns: string[]) => void;
}

const PAGE_SIZES = [10, 20, 30, 50, 100];

const CustomTable = ({ 
    pageHeader, 
    data, 
    columns, 
    defaultSort = { columnAccessor: 'id', direction: 'desc' }, 
    pageSizeOptions = PAGE_SIZES, 
    isRtl = false,
    onSearchChange,
    onColumnVisibilityChange
}: CustomTableProps) => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
    const [sortStatus, setSortStatus] = useState(defaultSort);
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);

    const toggleColumnVisibility = (col: string) => {
        const newHiddenColumns = hiddenColumns.includes(col) 
            ? hiddenColumns.filter((c) => c !== col) 
            : [...hiddenColumns, col];
        setHiddenColumns(newHiddenColumns);
        onColumnVisibilityChange?.(newHiddenColumns);
    };

    const handleSearchChange = (value: string) => {
        setSearch(value);
        onSearchChange?.(value);
    };

    const slNoColumn: Column = {
        accessor: 'slno',
        title: 'Sl. No.',
        sortable: false,
        render: (_row: any, index: number) => <div>{(page - 1) * pageSize + index + 1}</div>,
    };

    const visibleColumns = useMemo(() => {
        const userDefinedColumns = columns.filter((col) => !hiddenColumns.includes(col.accessor));
        return [slNoColumn, ...userDefinedColumns];
    }, [columns, hiddenColumns, page, pageSize]);

    const filteredAndSortedData = useMemo(() => {
        let filtered = [...data];

        if (search.trim()) {
            const keyword = search.toLowerCase();
            filtered = filtered.filter((item) =>
                columns.some((col) => {
                    if (col.accessor.includes('.')) {
                        const value = col.accessor.split('.').reduce((acc, key) => acc?.[key], item);
                        return value?.toString().toLowerCase().includes(keyword);
                    }
                    return item[col.accessor]?.toString().toLowerCase().includes(keyword);
                })
            );
        }

        // Simple sorting implementation
        filtered.sort((a, b) => {
            const aValue = a[sortStatus.columnAccessor];
            const bValue = b[sortStatus.columnAccessor];
            
            if (aValue < bValue) return sortStatus.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortStatus.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [data, search, sortStatus, columns]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredAndSortedData.slice(start, start + pageSize);
    }, [filteredAndSortedData, page, pageSize]);

    const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);

    const handleSort = (columnAccessor: string) => {
        setSortStatus(prev => ({
            columnAccessor,
            direction: prev.columnAccessor === columnAccessor && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {visibleColumns.map((column, index) => (
                                <th 
                                    key={index}
                                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                                        column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                                    }`}
                                    onClick={() => column.sortable && handleSort(column.accessor)}
                                >
                                    <div className="flex items-center">
                                        {column.title}
                                        {column.sortable && (
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                            </svg>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedData.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                {visibleColumns.map((column, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {column.render ? column.render(row, index) : row[column.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Beautiful Pagination */}
            <div className="flex items-center justify-between mt-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 border border-red-100">
                <div className="text-sm text-gray-700 font-medium">
                    Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, filteredAndSortedData.length)} of {filteredAndSortedData.length} results
                </div>
                
                <div className="flex items-center space-x-2">
                    {/* Page Size Selector */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-700">Show:</span>
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setPage(1);
                            }}
                            className="border border-red-200 rounded-md px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            {pageSizeOptions.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                        <span className="text-sm text-gray-700">entries</span>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={() => setPage(1)}
                            disabled={page === 1}
                            className="p-2 rounded-md border border-red-200 bg-white text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                        </button>
                        
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="p-2 rounded-md border border-red-200 bg-white text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum: number;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (page <= 3) {
                                pageNum = i + 1;
                            } else if (page >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = page - 2 + i;
                            }

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setPage(pageNum)}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                                        page === pageNum
                                            ? 'bg-red-600 text-white border border-red-600'
                                            : 'border border-red-200 bg-white text-red-600 hover:bg-red-50'
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            className="p-2 rounded-md border border-red-200 bg-white text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        
                        <button
                            onClick={() => setPage(totalPages)}
                            disabled={page === totalPages}
                            className="p-2 rounded-md border border-red-200 bg-white text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomTable;
