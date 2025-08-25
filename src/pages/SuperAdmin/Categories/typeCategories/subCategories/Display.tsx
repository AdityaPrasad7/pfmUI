import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import callApi from '../../../../../util/admin_api';
import { AxiosResponse } from 'axios';
import NavigateBtn from '../../../../../components/button/NavigateBtn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


// Default image
import defaultImg from '../../../../../assets/items/chicken leg piece.png';

// Define API response type
interface ApiResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
    meta: any | null;
}

interface SubCategory {
    _id: string;
    name: string;
    img?: string;
    description?: string;
}

interface UserData {
    token?: string;
}

const SubCategoriesDisplay: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedItem, setSelectedItem] = useState<SubCategory | null>(null);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const { id: paramId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state?.id || paramId; // Fallback to default ID

    // Fetch sub categories from API
    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                setLoading(true);
                const userDataString = localStorage.getItem('superAdminUser');
                const userData: UserData = userDataString ? JSON.parse(userDataString) : {};
                const token = userData.token;

                if (!token) {
                    throw new Error('No authentication token found. Please log in.');
                }

                const response: AxiosResponse<ApiResponse<{ subCategories: SubCategory[] }>> = await callApi(
                    `/admin/sub-product-categories/${id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                if (!response.data.success || !Array.isArray(response.data.data.subCategories)) {
                    throw new Error(response.data.message || 'Invalid API response format');
                }

                setSubCategories(response.data.data.subCategories);
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : 'Failed to fetch sub categories';
                console.error('Error fetching sub categories:', errorMessage);

                toast.error(errorMessage, {
                    toastId: 'fetch-sub-categories-error',
                    position: 'top-right',
                    autoClose: 3000,
                });

                if (errorMessage.includes('token') || errorMessage.includes('Unauthorized')) {
                    localStorage.removeItem('superAdminUser');
                    navigate('/admin/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSubCategories();
    }, [navigate, id]);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, item: SubCategory) => {
        setAnchorEl(event.currentTarget);
        setSelectedItem(item);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedItem(null);
    };

    const handleEdit = () => {
        if (selectedItem) {
            navigate(`/sub/categories/edit`, {
                state: { subCategory: selectedItem, categoryId: id },
            });
        }
        handleClose();
    };

    const handleDelete = async () => {
        if (!selectedItem) return;

        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${selectedItem.name}"?`
        );

        if (!confirmDelete) return;

        try {
            const userDataString = localStorage.getItem('superAdminUser');
            const userData: UserData = userDataString ? JSON.parse(userDataString) : {};
            const token = userData.token;

            if (!token) {
                throw new Error('No authentication token found. Please log in.');
            }

            console.log(selectedItem, "selectedItem");

            const response: AxiosResponse<ApiResponse<unknown>> = await callApi(
                `/admin/sub-product-categories/${selectedItem._id}`, // ✅ using _id
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to delete sub category');
            }

            // ✅ remove deleted item from state immediately
            setSubCategories((prev) => {
                console.log("🚀 ~ handleDelete ~ prev:", prev)
                return prev.filter((item) => item._id !== selectedItem._id);
            }
            );

            toast.success('Sub category deleted successfully!', {
                toastId: 'delete-sub-category-success',
                position: 'top-right',
                autoClose: 2000,
            });

        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to delete sub category';
            console.error('Error deleting sub category:', errorMessage);

            toast.error(errorMessage, {
                toastId: 'delete-sub-category-error',
                position: 'top-right',
                autoClose: 3000,
            });

            if (errorMessage.includes('token') || errorMessage.includes('Unauthorized')) {
                localStorage.removeItem('superAdminUser');
                navigate('/admin/login');
            }
        }

        handleClose();
    };


    const getSubCategoryImage = (subCategory: SubCategory): string => {
        if (subCategory.img && typeof subCategory.img === 'string' && subCategory.img.startsWith('http')) {
            return subCategory.img;
        }
        return defaultImg;
    };

    if (loading) {
        return (
            <div className="py-6">
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row md:items-center items-end sm:justify-between gap-5">
                        <div className="w-full">
                            <h1 className="text-2xl font-bold text-gray-800">Sub Categories</h1>
                        </div>
                        <NavigateBtn
                            to={`/sub/categories/add`}
                            state={{ categoryId: id }}
                            label={
                                <span className="flex items-center gap-1 w-[12rem]">
                                    <AddIcon fontSize="small" />
                                    <span>Add New Sub Category</span>
                                </span>
                            }
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center h-64">
                    <CircularProgress sx={{ color: '#F47C7C' }} />
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
            <div className="py-6">
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row md:items-center items-end sm:justify-between gap-5">
                        <div className="flex items-center gap-4">
                            {/* <NavigateBtn
                                to="/type-categories"
                                state={{ id }}
                                label={
                                    <span className="flex items-center gap-1">
                                        <ArrowBackIcon fontSize="small" />
                                        <span>Back to Type Categories</span>
                                    </span>
                                }
                                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
                            /> */}
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Sub Categories</h1>
                                <p className="text-sm text-gray-600">Manage sub categories for your products</p>
                            </div>
                        </div>
                        <NavigateBtn
                            to={`/sub/categories/add`}
                            state={{ categoryId: id }}
                            label={
                                <span className="flex items-center gap-1 w-[12rem]">
                                    <AddIcon fontSize="small" />
                                    <span>Add New Sub Category</span>
                                </span>
                            }
                        />
                    </div>
                </div>

                {subCategories.length === 0 ? (
                    <Box className="text-center py-12">
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
                            <h3 className="mt-2 text-lg font-medium text-gray-900">No sub categories found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Get started by adding your first sub category.
                            </p>
                            <div className="mt-6">
                                <NavigateBtn
                                    to={`/sub/categories/add`}
                                    state={{ categoryId: id }}
                                    label="Add New Sub Category"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm"
                                />
                            </div>
                        </div>
                    </Box>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {subCategories.map((item) => (
                            <Card key={item._id} className="relative hover:shadow-lg transition-shadow">
                                <div className="absolute top-2 right-2">
                                    <IconButton
                                        aria-label="more"
                                        aria-controls={`menu-${item._id}`}
                                        aria-haspopup="true"
                                        onClick={(e) => handleMenuClick(e, item)}
                                        size="small"
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </div>
                                <Link to={"/sub/categories/full-details"} state={{ id: item._id }}>
                                    <CardContent className="flex flex-col items-center p-4">
                                        <div className="w-32 h-32 mb-4 flex items-center justify-center bg-gray-100 rounded-lg">
                                            <img
                                                src={getSubCategoryImage(item)}
                                                alt={item.name}
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </div>
                                        <Typography variant="h6" className="text-center font-medium">
                                            {item.name}
                                        </Typography>
                                        {item.description && (
                                            <Typography variant="body2" className="text-center text-gray-600 mt-2 line-clamp-2">
                                                {item.description}
                                            </Typography>
                                        )}
                                    </CardContent>
                                </Link>
                            </Card>
                        ))}
                    </div>
                )}

                <Menu
                    id="sub-category-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            width: '120px',
                        },
                    }}
                >
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete} className="text-red-500">
                        Delete
                    </MenuItem>
                </Menu>
            </div>
        </>
    );
};

export default SubCategoriesDisplay;