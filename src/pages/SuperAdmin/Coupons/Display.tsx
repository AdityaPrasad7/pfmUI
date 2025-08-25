import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Chip,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Fab,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import callApi from '../../../util/admin_api';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

// Define API response type
interface ApiResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
    meta: any | null;
}

interface Coupon {
    _id: string;
    name: string;
    code: string;
    discount: number;
    expiryDate: string;
    limit: number;
    createdAt: string;
    updatedAt: string;
    isExpired?: boolean;
}

interface CouponForm {
    name: string;
    discount: number;
    expiryDate: string;
    limit: number;
}

// Utility to validate DD-MM-YYYY:HH:mm format
const isValidCustomDate = (dateString: string): boolean => {
    const regex = /^(\d{2})-(\d{2})-(\d{4}):(\d{2}):(\d{2})$/;
    if (!regex.test(dateString)) return false;
    const [_, day, month, year, hours, minutes] = dateString.match(regex)!;
    const date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00.000Z`);
    return (
        !isNaN(date.getTime()) &&
        parseInt(day) <= 31 &&
        parseInt(month) <= 12 &&
        parseInt(hours) <= 23 &&
        parseInt(minutes) <= 59
    );
};

// Utility to convert ISO 8601 to DD-MM-YYYY:HH:mm
const toCustomDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return 'Invalid Date';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year}:${hours}:${minutes}`;
};

const CouponsList: React.FC = () => {
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [form, setForm] = useState<CouponForm>({
        name: '',
        discount: 0,
        expiryDate: '',
        limit: 0,
    });
    const [formLoading, setFormLoading] = useState(false);

    // Fetch coupons from API
    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        console.log("Fetching coupons...");
        try {
            setLoading(true);
            const response: AxiosResponse<ApiResponse<Coupon[]>> = await callApi({
                url: '/admin/coupons',
                method: 'GET',
            });

            if (!response.data.success || !Array.isArray(response.data.data)) {
                throw new Error(response.data.message || 'Invalid API response format');
            }

            // Add isExpired property to each coupon
            const couponsWithStatus = response.data.data.map((coupon) => ({
                ...coupon,
                isExpired: new Date(coupon.expiryDate) < new Date(),
            }));

            setCoupons(couponsWithStatus);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch coupons';
            console.error('Error fetching coupons:', errorMessage);
            toast.error(errorMessage, {
                toastId: 'fetch-coupons-error',
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

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, coupon: Coupon) => {
        setAnchorEl(event.currentTarget);
        setSelectedCoupon(coupon);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedCoupon(null);
    };

    const handleCreateClick = () => {
        setForm({
            name: '',
            discount: 0,
            expiryDate: '',
            limit: 0,
        });
        setCreateDialogOpen(true);
    };

    const handleEditClick = () => {
        if (selectedCoupon) {
            setForm({
                name: selectedCoupon.name,
                discount: selectedCoupon.discount,
                expiryDate: toCustomDate(selectedCoupon.expiryDate),
                limit: selectedCoupon.limit,
            });
            setEditDialogOpen(true);
        }
        handleClose();
    };

    const handleFormSubmit = async (isEdit: boolean = false) => {
        if (!form.name) {
            toast.error('Please enter a coupon name', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }

        if (form.discount < 0) {
            toast.error('Discount must be at least 0', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }

        if (!form.expiryDate || !isValidCustomDate(form.expiryDate)) {
            toast.error('Please enter a valid expiry date (DD-MM-YYYY:HH:mm)', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }

        if (form.limit < 1) {
            toast.error('Usage limit must be at least 1', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }

        try {
            setFormLoading(true);
            let response: AxiosResponse<ApiResponse<Coupon>>;
            const payload = {
                name: form.name,
                discount: form.discount,
                expiryDate: form.expiryDate, // Send as DD-MM-YYYY:HH:mm
                limit: form.limit,
            };

            if (isEdit && selectedCoupon) {
                // Edit existing coupon - PATCH request
                response = await callApi({
                    url: `/admin/coupons/${selectedCoupon._id}`,
                    method: 'PATCH',
                    data: payload,
                });
                console.log('🚀 ~ handleFormSubmit ~ edit response:', response);
            } else {
                // Create new coupon - POST request
                response = await callApi({
                    url: '/admin/coupons',
                    method: 'POST',
                    data: payload,
                });
                console.log('🚀 ~ handleFormSubmit ~ create response:', response);
            }

            if (!response.data.success) {
                throw new Error(response.data.message || `Failed to ${isEdit ? 'update' : 'create'} coupon`);
            }

            toast.success(`Coupon ${isEdit ? 'updated' : 'created'} successfully!`, {
                position: 'top-right',
                autoClose: 2000,
            });

            setEditDialogOpen(false);
            setCreateDialogOpen(false);
            fetchCoupons(); // Refresh the list
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : `Failed to ${isEdit ? 'update' : 'create'} coupon`;
            console.error(`Error ${isEdit ? 'updating' : 'creating'} coupon:`, errorMessage);
            toast.error(errorMessage, {
                position: 'top-right',
                autoClose: 3000,
            });
            if (errorMessage.includes('token') || errorMessage.includes('Unauthorized')) {
                localStorage.removeItem('superAdminUser');
                navigate('/admin/login');
            }
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedCoupon) return;

        const confirmDelete = window.confirm(
            `Are you sure you want to delete coupon "${selectedCoupon.name}"?`
        );

        if (!confirmDelete) return;

        try {
            const response: AxiosResponse<ApiResponse<unknown>> = await callApi({
                url: `/admin/coupons/${selectedCoupon._id}`,
                method: 'DELETE',
            });

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to delete coupon');
            }

            setCoupons(coupons.filter((coupon) => coupon._id !== selectedCoupon._id));
            toast.success('Coupon deleted successfully!', {
                position: 'top-right',
                autoClose: 2000,
            });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to delete coupon';
            console.error('Error deleting coupon:', errorMessage);
            toast.error(errorMessage, {
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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <CircularProgress />
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

            {/* Create/Edit Coupon Dialog */}
            <Dialog
                open={editDialogOpen || createDialogOpen}
                onClose={() => {
                    setEditDialogOpen(false);
                    setCreateDialogOpen(false);
                }}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>{editDialogOpen ? 'Edit Coupon' : 'Create New Coupon'}</DialogTitle>
                <DialogContent>
                    <div className="space-y-4 mt-4">
                        <TextField
                            label="Coupon Name"
                            fullWidth
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />
                        <TextField
                            label="Discount (%)"
                            type="number"
                            fullWidth
                            value={form.discount}
                            onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })}
                            inputProps={{ min: 0, max: 100 }}
                            required
                        />
                        <TextField
                            label="Expiry Date (DD-MM-YYYY:HH:mm)"
                            type="text"
                            fullWidth
                            value={form.expiryDate}
                            onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                            placeholder="31-12-2025:23:59"
                            required
                        />
                        <TextField
                            label="Usage Limit"
                            type="number"
                            fullWidth
                            value={form.limit}
                            onChange={(e) => setForm({ ...form, limit: Number(e.target.value) })}
                            inputProps={{ min: 1 }}
                            required
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setEditDialogOpen(false);
                            setCreateDialogOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleFormSubmit(editDialogOpen)}
                        variant="contained"
                        disabled={formLoading}
                    >
                        {formLoading ? 'Processing...' : editDialogOpen ? 'Update Coupon' : 'Create Coupon'}
                    </Button>
                </DialogActions>
            </Dialog>

            <div className="max-w-6xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Coupons List</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                            {coupons.length} coupon{coupons.length !== 1 ? 's' : ''} found
                        </span>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleCreateClick}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Create Coupon
                        </Button>
                    </div>
                </div>

                {coupons.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <LocalOfferIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No coupons found</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating your first coupon.</p>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleCreateClick}
                            className="mt-4 bg-blue-600 hover:bg-blue-700"
                        >
                            Create Your First Coupon
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {coupons.map((coupon) => (
                            <Card
                                key={coupon._id}
                                className={`relative h-full transition-all hover:shadow-lg ${coupon.isExpired ? 'opacity-70 bg-gray-50' : 'bg-white'}`}
                            >
                                {/* Action Menu */}
                                <div className="absolute top-2 right-2">
                                    <IconButton
                                        aria-label="more"
                                        aria-controls={`menu-${coupon._id}`}
                                        aria-haspopup="true"
                                        onClick={(e) => handleMenuClick(e, coupon)}
                                        size="small"
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </div>

                                <CardContent className="p-4">
                                    {/* Coupon Header */}
                                    <div className="flex justify-between items-start mb-3">
                                        <Typography variant="h6" className="font-bold text-gray-800">
                                            {coupon.name}
                                        </Typography>
                                        {coupon.isExpired && (
                                            <Chip label="Expired" color="error" size="small" />
                                        )}
                                    </div>

                                    {/* Coupon Code */}
                                    {coupon.code && (
                                        <div className="bg-blue-50 p-3 rounded-lg mb-3">
                                            <Typography variant="body2" className="text-blue-600 font-semibold text-center">
                                                {coupon.code}
                                            </Typography>
                                        </div>
                                    )}

                                    {/* Discount */}
                                    <div className="flex items-center justify-center mb-4">
                                        <Typography variant="h4" className="font-bold text-green-600">
                                            {coupon.discount}% OFF
                                        </Typography>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-2">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <EventIcon className="mr-2 text-gray-500" fontSize="small" />
                                            <span>Expires: {toCustomDate(coupon.expiryDate)}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <PeopleIcon className="mr-2 text-gray-500" fontSize="small" />
                                            <span>Usage limit: {coupon.limit}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <span>Created: {toCustomDate(coupon.createdAt)}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                <Menu
                    id="coupon-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            width: '140px',
                        },
                    }}
                >
                    <MenuItem onClick={handleEditClick}>
                        <EditIcon fontSize="small" className="mr-2" />
                        Edit
                    </MenuItem>

                    <MenuItem onClick={handleDelete} className="text-red-500">
                        <DeleteIcon fontSize="small" className="mr-2" />
                        Delete
                    </MenuItem>
                </Menu>

                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={handleCreateClick}
                    className="fixed bottom-8 right-8 md:hidden bg-blue-600"
                >
                    <AddIcon />
                </Fab>
            </div>
        </>
    );
};

export default CouponsList;