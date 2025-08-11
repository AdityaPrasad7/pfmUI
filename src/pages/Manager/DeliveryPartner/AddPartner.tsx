import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconX from '../../../components/Icon/IconX';

interface DeliveryPartner {
    id: string;
    name: string;
    initials: string;
    phoneNumber: string;
    status: 'verified' | 'pending';
}

const AddPartner: React.FC = () => {
    const navigate = useNavigate();
    const [newPartner, setNewPartner] = useState({
        name: '',
        phoneNumber: '',
        status: 'pending' as 'verified' | 'pending'
    });

    const getInitials = (name: string) => {
        return name.split(' ').map(word => word[0]).join('').toUpperCase();
    };

    const generateId = () => {
        const savedData = localStorage.getItem('deliveryPartners');
        const deliveryPartners: DeliveryPartner[] = savedData ? JSON.parse(savedData) : [];
        
        if (deliveryPartners.length === 0) {
            return 'ST001';
        }
        const lastId = deliveryPartners[deliveryPartners.length - 1]?.id || 'ST000';
        const lastNumber = parseInt(lastId.slice(2));
        return `ST${String(lastNumber + 1).padStart(3, '0')}`;
    };

    const handleCreatePartner = () => {
        if (!newPartner.name || !newPartner.phoneNumber) {
            alert('Please fill in all required fields');
            return;
        }

        const partner: DeliveryPartner = {
            id: generateId(),
            name: newPartner.name,
            initials: getInitials(newPartner.name),
            phoneNumber: newPartner.phoneNumber,
            status: newPartner.status
        };

        const savedData = localStorage.getItem('deliveryPartners');
        const deliveryPartners: DeliveryPartner[] = savedData ? JSON.parse(savedData) : [];
        const updatedPartners = [...deliveryPartners, partner];
        
        localStorage.setItem('deliveryPartners', JSON.stringify(updatedPartners));
        
        // Navigate back to the list page
        navigate('/manager/delivery-partner');
    };

    const handleInputChange = (field: string, value: string) => {
        setNewPartner(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Add New Delivery Partner</h1>
                <button
                    onClick={() => navigate('/manager/delivery-partner')}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <IconX className="w-5 h-5" />
                </button>
            </div>

            {/* Form */}
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <form onSubmit={(e) => { e.preventDefault(); handleCreatePartner(); }}>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={newPartner.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter full name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    value={newPartner.phoneNumber}
                                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="+91 98765 43210"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    value={newPartner.status}
                                    onChange={(e) => handleInputChange('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="pending">Pending Docs</option>
                                    <option value="verified">Verified</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                type="button"
                                onClick={() => navigate('/manager/delivery-partner')}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Create Partner
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPartner;
