import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import IconSquareCheck from '../../../components/Icon/IconSquareCheck';
import IconTxtFile from '../../../components/Icon/IconTxtFile';

interface DeliveryPartner {
    id: string;
    name: string;
    initials: string;
    phoneNumber: string;
    status: 'verified' | 'pending';
}

const PartnerDetails: React.FC = () => {
    const navigate = useNavigate();
    const { partnerId } = useParams<{ partnerId: string }>();
    const [partner, setPartner] = useState<DeliveryPartner | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (partnerId) {
            const savedData = localStorage.getItem('deliveryPartners');
            const deliveryPartners: DeliveryPartner[] = savedData ? JSON.parse(savedData) : [];
            const foundPartner = deliveryPartners.find(p => p.id === partnerId);
            
            if (foundPartner) {
                setPartner(foundPartner);
            } else {
                alert('Partner not found');
                navigate('/manager/delivery-partner');
            }
            setLoading(false);
        }
    }, [partnerId, navigate]);

    const getStatusIcon = (status: string) => {
        if (status === 'verified') {
            return <IconSquareCheck className="w-6 h-6 text-green-500" />;
        }
        return <IconTxtFile className="w-6 h-6 text-yellow-500" />;
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

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg text-gray-600">Loading...</div>
                </div>
            </div>
        );
    }

    if (!partner) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg text-gray-600">Partner not found</div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center gap-4">
                <button
                    onClick={() => navigate('/manager/delivery-partner')}
                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                    title="Back to List"
                >
                    <IconArrowBackward className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">Partner Details</h1>
            </div>

            {/* Partner Details Card */}
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-8">
                    {/* Partner Header */}
                    <div className="flex items-center mb-8">
                        <div className={`flex-shrink-0 h-16 w-16 rounded-full flex items-center justify-center text-white text-xl font-bold ${getInitialsColor(partner.initials)}`}>
                            {partner.initials}
                        </div>
                        <div className="ml-6">
                            <h2 className="text-2xl font-bold text-gray-900">{partner.name}</h2>
                            <p className="text-gray-600">Staff ID: {partner.id}</p>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                                Contact Information
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                    <p className="text-lg text-gray-900">{partner.phoneNumber}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                                Status Information
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Verification Status</label>
                                    <div className="flex items-center mt-1">
                                        {getStatusIcon(partner.status)}
                                        <span className={`ml-2 text-lg font-medium ${getStatusColor(partner.status)}`}>
                                            {getStatusText(partner.status)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                            Additional Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Staff ID</label>
                                <p className="text-gray-900 font-mono">{partner.id}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Initials</label>
                                <p className="text-gray-900">{partner.initials}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
                        <button
                            onClick={() => navigate('/manager/delivery-partner')}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            Back to List
                        </button>
                        <button
                            onClick={() => navigate(`/manager/delivery-partner/edit/${partner.id}`)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Edit Partner
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerDetails;
