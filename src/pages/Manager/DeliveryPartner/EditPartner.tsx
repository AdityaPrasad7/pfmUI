import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface DeliveryPartner {
    id: string;
    name: string;
    initials: string;
    phoneNumber: string;
    status: 'verified' | 'pending';
}

const EditPartner: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState<DeliveryPartner>({
        id: '',
        name: '',
        initials: '',
        phoneNumber: '',
        status: 'pending'
    });

    useEffect(() => {
        if (id) {
            // Load existing partner data
            const savedData = localStorage.getItem('deliveryPartners');
            if (savedData) {
                const partners = JSON.parse(savedData);
                const partner = partners.find((p: DeliveryPartner) => p.id === id);
                if (partner) {
                    setFormData(partner);
                } else {
                    setError('Partner not found');
                }
            }
        }
    }, [id]);

    const handleInputChange = (field: keyof DeliveryPartner, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Load existing partners
            const savedData = localStorage.getItem('deliveryPartners');
            const partners = savedData ? JSON.parse(savedData) : [];

            // Find and update the partner
            const updatedPartners = partners.map((partner: DeliveryPartner) => {
                if (partner.id === id) {
                    return { ...formData };
                }
                return partner;
            });

            // Save updated data
            localStorage.setItem('deliveryPartners', JSON.stringify(updatedPartners));

            // Navigate back to list
            navigate('/manager/delivery-partner');
        } catch (err) {
            setError('Failed to update partner');
        } finally {
            setIsLoading(false);
        }
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-red-800 mb-2">Error</h3>
                            <div className="text-red-700 mb-6">{error}</div>
                            <button
                                onClick={() => navigate('/manager/delivery-partner')}
                                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                            >
                                Back to List
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                                Edit Delivery Partner
                            </h1>
                            <p className="text-gray-600 mt-1">Update partner information and status</p>
                        </div>
                        <button
                            onClick={() => navigate('/manager/delivery-partner')}
                            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to List
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                {/* Edit Form */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                        {/* Form Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 text-white">
                            <div className="flex items-center">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.586a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-1">Partner Information</h2>
                                    <p className="text-blue-100">Update delivery partner details and verification status</p>
                                </div>
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* First Row - Staff ID and Full Name */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Staff ID */}
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                            Staff ID
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.id}
                                            onChange={(e) => handleInputChange('id', e.target.value)}
                                            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 group-hover:bg-white group-hover:border-gray-300"
                                            required
                                        />
                                    </div>

                                    {/* Name */}
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-gray-50 group-hover:bg-white group-hover:border-gray-300"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Second Row - Initials and Phone Number */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Initials */}
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                            Initials
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.initials}
                                            onChange={(e) => handleInputChange('initials', e.target.value)}
                                            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-gray-50 group-hover:bg-white group-hover:border-gray-300"
                                            placeholder="e.g., JD for John Doe"
                                            required
                                        />
                                    </div>

                                    {/* Phone Number */}
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phoneNumber}
                                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 group-hover:bg-white group-hover:border-gray-300"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Third Row - Status (Full Width) */}
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                        <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                                        Verification Status
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => handleInputChange('status', e.target.value as 'verified' | 'pending')}
                                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 group-hover:bg-white group-hover:border-gray-300 appearance-none cursor-pointer"
                                    >
                                        <option value="pending">⏳ Pending Documentation</option>
                                        <option value="verified">✅ Verified & Active</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/manager/delivery-partner')}
                                        className="flex-1 px-6 py-3.5 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        Cancel Changes
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Updating Partner...
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Update Partner
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPartner;
