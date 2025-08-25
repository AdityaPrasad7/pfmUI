import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    Box,
    Typography,
    Chip,
    Card,
    CardContent,
    CircularProgress,
    IconButton,
    Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ScaleIcon from '@mui/icons-material/Scale';
import EggIcon from '@mui/icons-material/Egg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import callApi from '../../../../../util/admin_api';
import { AxiosResponse } from 'axios';

// Define API response type
interface ApiResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
    meta: any | null;
}

interface ProductDetails {
    bestSellers: boolean;
    _id: string;
    name: string;
    type: string[];
    quality: string;
    description: string;
    weight: string;
    pieces: string;
    serves: number;
    totalEnergy: number;
    carbohydrate: number;
    fat: number;
    protein: number;
    price: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    img: string;
}

interface UserData {
    token?: string;
}

const FullDetails: React.FC = () => {
    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [loading, setLoading] = useState(true);
    // const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    console.log("🚀 ~ FullDetails ~ location:", location.state.id)
    const id = location.state.id;
    // Fetch product details from API
    useEffect(() => {
        const fetchProductDetails = async () => {


            try {
                setLoading(true);
                const userDataString = localStorage.getItem('superAdminUser');
                const userData: UserData = userDataString ? JSON.parse(userDataString) : {};
                const token = userData.token;

                if (!token) {
                    throw new Error('No authentication token found. Please log in.');
                }

                const response: AxiosResponse<ApiResponse<ProductDetails>> = await callApi({
                    url: `/admin/sub-product-categories-details/${id}`,
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("🚀 ~ fetchProductDetails ~ response:", response)

                if (!response.data.success) {
                    throw new Error(response.data.message || 'Failed to fetch product details');
                }

                setProduct(response.data.data);
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product details';
                console.error('Error fetching product details:', errorMessage);

                toast.error(errorMessage, {
                    toastId: 'fetch-product-error',
                    position: 'top-right',
                    autoClose: 3000,
                });


            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [navigate, id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <CircularProgress />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-12">
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
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Product not found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        The product you're looking for doesn't exist.
                    </p>
                    <div className="mt-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ zIndex: 9999 }}
            />

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header with back button */}
                <div className="flex items-center mb-6">
                    <IconButton
                        onClick={() => navigate(-1)}
                        className="mr-2 bg-gray-100 hover:bg-gray-200"
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" className="font-bold text-gray-800">
                        Product Details
                    </Typography>
                </div>

                <Card className="shadow-lg rounded-xl overflow-hidden">
                    <CardContent className="p-6">
                        {/* Product Header */}
                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                            {/* Product Image */}
                            <div className="flex-shrink-0">
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="w-64 h-64 object-contain rounded-lg border"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex-grow">
                                <div className="flex items-start justify-between mb-4">
                                    <Typography variant="h4" className="font-bold text-gray-800">
                                        {product.name}
                                    </Typography>

                                    {product.bestSellers && (
                                        <Chip
                                            icon={<StarIcon />}
                                            label="Best Seller"
                                            color="warning"
                                            variant="filled"
                                            className="ml-2"
                                        />
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {product.type.map((type) => (
                                        <Chip
                                            key={type}
                                            label={type}
                                            variant="outlined"
                                            color="primary"
                                        />
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <Chip
                                        icon={<EggIcon />}
                                        label={product.quality}
                                        color="success"
                                        variant="outlined"
                                    />
                                    <Typography variant="h5" className="text-green-600 font-bold">
                                        ₹{product.price}
                                    </Typography>
                                </div>

                                <Typography variant="body1" className="text-gray-600 mb-4">
                                    {product.description}
                                </Typography>

                                {/* Product Specifications */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center gap-2">
                                        <ScaleIcon className="text-gray-500" />
                                        <Typography variant="body2">
                                            <span className="font-semibold">Weight:</span> {product.weight}
                                        </Typography>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <RestaurantIcon className="text-gray-500" />
                                        <Typography variant="body2">
                                            <span className="font-semibold">Pieces:</span> {product.pieces}
                                        </Typography>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FitnessCenterIcon className="text-gray-500" />
                                        <Typography variant="body2">
                                            <span className="font-semibold">Serves:</span> {product.serves} people
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Divider className="my-6" />

                        {/* Nutrition Information */}
                        <div className="mb-6">
                            <Typography variant="h5" className="font-bold mb-4 flex items-center gap-2">
                                <LocalFireDepartmentIcon className="text-orange-500" />
                                Nutrition Information
                            </Typography>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg text-center">
                                    <Typography variant="h6" className="font-bold text-blue-700">
                                        {product.totalEnergy}kcal
                                    </Typography>
                                    <Typography variant="body2" className="text-blue-600">
                                        Total Energy
                                    </Typography>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg text-center">
                                    <Typography variant="h6" className="font-bold text-green-700">
                                        {product.carbohydrate}g
                                    </Typography>
                                    <Typography variant="body2" className="text-green-600">
                                        Carbohydrates
                                    </Typography>
                                </div>

                                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                                    <Typography variant="h6" className="font-bold text-yellow-700">
                                        {product.fat}g
                                    </Typography>
                                    <Typography variant="body2" className="text-yellow-600">
                                        Fat
                                    </Typography>
                                </div>

                                <div className="bg-purple-50 p-4 rounded-lg text-center">
                                    <Typography variant="h6" className="font-bold text-purple-700">
                                        {product.protein}g
                                    </Typography>
                                    <Typography variant="body2" className="text-purple-600">
                                        Protein
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        <Divider className="my-6" />

                        {/* Additional Information */}
                        <div>
                            <Typography variant="h5" className="font-bold mb-4">
                                Additional Information
                            </Typography>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
                                {/* <div>
                                    <Typography variant="body2" className="text-gray-600">
                                        <span className="font-semibold">Product ID:</span> {product._id}
                                    </Typography>
                                </div> */}

                                <div>
                                    <Typography variant="body2" className="text-gray-600">
                                        <span className="font-semibold">Created:</span> {new Date(product.createdAt).toLocaleDateString()}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography variant="body2" className="text-gray-600">
                                        <span className="font-semibold">Last Updated:</span> {new Date(product.updatedAt).toLocaleDateString()}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default FullDetails;