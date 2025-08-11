import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import IconPlus from '../../../components/Icon/IconPlus';
import IconEye from '../../../components/Icon/IconEye';
import IconTrash from '../../../components/Icon/IconTrash';
import IconSquareCheck from '../../../components/Icon/IconSquareCheck';
import IconTxtFile from '../../../components/Icon/IconTxtFile';
import CustomTable from '../../../components/CustomTable';

interface DeliveryPartner {
    id: string;
    name: string;
    initials: string;
    phoneNumber: string;
    status: 'verified' | 'pending';
}

const DeliveryPartnerList: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Load data from localStorage or use empty array
    const [deliveryPartners, setDeliveryPartners] = useState<DeliveryPartner[]>(() => {
        const savedData = localStorage.getItem('deliveryPartners');
        return savedData ? JSON.parse(savedData) : [];
    });

    const filteredPartners = deliveryPartners.filter(partner => {
        const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            partner.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            partner.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || partner.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const getStatusIcon = (status: string) => {
        if (status === 'verified') {
            return <IconSquareCheck className="w-4 h-4 text-green-500" />;
        }
        return <IconTxtFile className="w-4 h-4 text-yellow-500" />;
    };

    const getStatusText = (status: string) => {
        return status === 'verified' ? 'Verified' : 'Pending Docs';
    };

    const getStatusColor = (status: string) => {
        return status === 'verified' ? 'text-green-600' : 'text-yellow-600';
    };

    const getInitialsColor = (initials: string) => {
        const colors = [
            'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
            'bg-pink-500', 'bg-indigo-500', 'bg-red-500'
        ];
        const index = initials.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const handleDeletePartner = (partnerId: string) => {
        if (window.confirm('Are you sure you want to delete this delivery partner?')) {
            const updatedPartners = deliveryPartners.filter(partner => partner.id !== partnerId);
            setDeliveryPartners(updatedPartners);
            localStorage.setItem('deliveryPartners', JSON.stringify(updatedPartners));
        }
    };

    const handleViewPartner = (partner: DeliveryPartner) => {
        navigate(`/manager/delivery-partner/details/${partner.id}`);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Delivery Partner</h1>
                <button
                    onClick={() => navigate('/manager/delivery-partner/add')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <IconPlus className="w-4 h-4" />
                    Add New Partner
                </button>
            </div>

            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Search Bar */}
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Search staff by ID, name or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                {/* Status Filter */}
                <div className="relative">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
                    >
                        <option value="all">All Statuses</option>
                        <option value="verified">Verified</option>
                        <option value="pending">Pending Docs</option>
                    </select>
                </div>
            </div>

            {/* CustomTable */}
            <CustomTable
                pageHeader="Delivery Partners"
                data={filteredPartners}
                columns={[
                    {
                        accessor: 'id',
                        title: 'STAFF ID',
                        sortable: true
                    },
                    {
                        accessor: 'name',
                        title: 'NAME',
                        sortable: true,
                        render: (partner) => (
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${getInitialsColor(partner.initials)}`}>
                                    {partner.initials}
                                </div>
                                <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-900">
                                        {partner.name}
                                    </div>
                                </div>
                            </div>
                        )
                    },
                    {
                        accessor: 'phoneNumber',
                        title: 'PHONE NUMBER',
                        sortable: true
                    },
                    {
                        accessor: 'status',
                        title: 'STATUS',
                        sortable: true,
                        render: (partner) => (
                            <div className="flex items-center">
                                {getStatusIcon(partner.status)}
                                <span className={`ml-2 text-sm font-medium ${getStatusColor(partner.status)}`}>
                                    {getStatusText(partner.status)}
                                </span>
                            </div>
                        )
                    },
                    {
                        accessor: 'actions',
                        title: 'ACTIONS',
                        sortable: false,
                        render: (partner) => (
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleViewPartner(partner)}
                                    className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                    title="View Details"
                                >
                                    <IconEye className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDeletePartner(partner.id)}
                                    className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                                    title="Delete Partner"
                                >
                                    <IconTrash className="w-4 h-4" />
                                </button>
                            </div>
                        )
                    }
                ]}
                pageSizeOptions={[5, 10, 20]}
            />
        </div>
    );
};

export default DeliveryPartnerList;
