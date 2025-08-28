import React, { useEffect, useState, useMemo } from 'react';
import { callApi } from '../../util/admin_api';

// ------------------- TYPES -------------------
interface GeoLocation {
    type: string;
    coordinates: [number, number];
}

interface SubCategory {
    _id: string;
    name: string;
    img?: string;
    price?: number;
    discount?: number;
    discountPrice?: number;
    description?: string;
    weight?: string;
}

interface OrderItem {
    subCategory: SubCategory | string;
    count: number;
    _id: string;
    orderedAt: string;
}

interface Address {
    houseNo: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    type: string;
    latitude: number;
    longitude: number;
    _id: string;
}

interface Customer {
    _id: string;
    name: string;
    phone: string;
    wallet: number;
    refreshToken: string;
    isActive: boolean;
    notifications: string[];
    Coupons: string[];
    fcToken: string[];
    lastLogin: string;
    address: Address[];
    orders: OrderItem[];
    orderHistory: Array<{
        order: string;
        orderedAt: string;
        _id: string;
    }>;
}

interface Order {
    _id: string;
    geoLocation?: GeoLocation;
    customer?: Partial<Customer>;
    orders: OrderItem[];
    status?: string;
    amount?: number;
    createdAt?: string;
    updatedAt?: string;
}

interface ApiResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: {
        orders?: Order[];
        [key: string]: any;
    };
    orders?: Order[];
}

// Define possible status values
type Status =
    | 'pending'
    | 'confirmed'
    | 'preparing'
    | 'ready'
    | 'picked_up'
    | 'in_transit'
    | 'delivered'
    | 'cancelled';

// ------------------- COMPONENT -------------------
const OrderDisplay: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError(null);

                const response: ApiResponse = await callApi({
                    endpoint: '/admin/display-order',
                    method: 'GET',
                });

                // Simplify order extraction logic
                const ordersData: Order[] =
                    response.data?.orders ??
                    response.orders ??
                    (Array.isArray(response.data) ? response.data : []) ??
                    [];

                setOrders(ordersData);
            } catch (err: any) {
                const errorMessage =
                    err.response?.data?.message || 'Failed to fetch orders. Please try again later.';
                setError(errorMessage);
                console.error('Error fetching orders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Memoize status colors with proper typing
    const statusColors = useMemo<Record<Status, string>>(
        () => ({
            pending: '#ff9800',
            confirmed: '#2196f3',
            preparing: '#673ab7',
            ready: '#4caf50',
            picked_up: '#607d8b',
            in_transit: '#ffeb3b',
            delivered: '#8bc34a',
            cancelled: '#f44336',
        }),
        []
    );

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    };

    const getStatusColor = (status: string = 'pending') => {
        return statusColors[status.toLowerCase() as Status] || '#9e9e9e';
    };

    // Debounced refresh handler
    const handleRefresh = () => {
        window.location.reload();
    };

    if (loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                    fontSize: '1.2rem',
                    color: '#666',
                }}
                role="status"
                aria-live="polite"
            >
                <div>
                    <div
                        style={{
                            textAlign: 'center',
                            marginBottom: '15px',
                        }}
                    >
                        <div
                            style={{
                                width: '50px',
                                height: '50px',
                                border: '5px solid #f3f3f3',
                                borderTop: '5px solid #4CAF50',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                                margin: '0 auto',
                            }}
                        ></div>
                    </div>
                    Loading orders...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                style={{
                    padding: '20px',
                    backgroundColor: '#ffebee',
                    color: '#c62828',
                    borderRadius: '8px',
                    margin: '20px',
                    textAlign: 'center',
                }}
                role="alert"
            >
                <h3>Error Loading Orders</h3>
                <p>{error}</p>
                <button
                    onClick={handleRefresh}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#c62828',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '10px',
                    }}
                    aria-label="Retry loading orders"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div
            style={{
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <h1
                    style={{
                        color: '#333',
                        borderBottom: '2px solid #4CAF50',
                        paddingBottom: '10px',
                        marginBottom: '30px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    Order Management
                    <span style={{ fontSize: '1rem', color: '#666', fontWeight: 'normal' }}>
                        {orders.length} order{orders.length !== 1 ? 's' : ''} found
                    </span>
                </h1>

                {!orders.length ? (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '60px',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        }}
                    >
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📦</div>
                        <h2 style={{ color: '#555' }}>No Orders Found</h2>
                        <p style={{ color: '#777', marginBottom: '30px' }}>
                            There are no orders to display at this time.
                        </p>
                        <button
                            onClick={handleRefresh}
                            style={{
                                padding: '10px 25px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                            }}
                            aria-label="Refresh orders"
                        >
                            Refresh
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        {/* Order List */}
                        <div style={{ flex: '1', minWidth: '300px' }}>
                            <h2 style={{ color: '#555', marginBottom: '15px', paddingLeft: '10px' }}>
                                All Orders
                            </h2>
                            <div style={{ maxHeight: '80vh', overflowY: 'auto', paddingRight: '10px' }}>
                                {orders.map((order) => (
                                    <div
                                        key={order._id}
                                        style={{
                                            backgroundColor: selectedOrder?._id === order._id ? '#e8f5e9' : 'white',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '8px',
                                            padding: '15px',
                                            marginBottom: '15px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                        }}
                                        onClick={() => setSelectedOrder(order)}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                setSelectedOrder(order);
                                            }
                                        }}
                                        aria-label={`Select order ${order._id.slice(-6).toUpperCase()}`}
                                    >
                                        <div
                                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                        >
                                            <h3 style={{ margin: '0', color: '#333', fontSize: '1.1rem' }}>
                                                Order #{order._id.slice(-6).toUpperCase()}
                                            </h3>
                                            <span
                                                style={{
                                                    backgroundColor: getStatusColor(order.status),
                                                    color: 'white',
                                                    padding: '4px 8px',
                                                    borderRadius: '12px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {order.status || 'Pending'}
                                            </span>
                                        </div>
                                        <p style={{ margin: '8px 0', color: '#666' }}>
                                            <strong>Customer:</strong> {order.customer?.name ?? 'N/A'}
                                        </p>
                                        <p style={{ margin: '8px 0', color: '#666' }}>
                                            <strong>Phone:</strong> {order.customer?.phone ?? 'N/A'}
                                        </p>
                                        <p style={{ margin: '8px 0', color: '#666' }}>
                                            <strong>Items:</strong> {order.orders?.length ?? 0} item(s)
                                        </p>
                                        <p style={{ margin: '8px 0', color: '#666', fontSize: '0.9rem' }}>
                                            <strong>Created:</strong> {formatDate(order.createdAt)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Details */}
                        <div style={{ flex: '2', minWidth: '400px' }}>
                            <h2 style={{ color: '#555', marginBottom: '15px', paddingLeft: '10px' }}>
                                Order Details
                            </h2>
                            {selectedOrder ? (
                                <div
                                    style={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '8px',
                                        padding: '25px',
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                        position: 'sticky',
                                        top: '20px',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '20px',
                                            paddingBottom: '15px',
                                            borderBottom: '1px solid #eee',
                                        }}
                                    >
                                        <h2 style={{ margin: '0', color: '#333' }}>
                                            Order #{selectedOrder._id.slice(-6).toUpperCase()}
                                        </h2>
                                        <span
                                            style={{
                                                backgroundColor: getStatusColor(selectedOrder.status),
                                                color: 'white',
                                                padding: '6px 12px',
                                                borderRadius: '16px',
                                                fontSize: '0.9rem',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {selectedOrder.status || 'Pending'}
                                        </span>
                                    </div>

                                    <div
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                            gap: '20px',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        <div>
                                            <h3
                                                style={{
                                                    color: '#555',
                                                    borderBottom: '1px solid #eee',
                                                    paddingBottom: '5px',
                                                }}
                                            >
                                                Customer Information
                                            </h3>
                                            <p>
                                                <strong>Name:</strong> {selectedOrder.customer?.name ?? 'N/A'}
                                            </p>
                                            <p>
                                                <strong>Phone:</strong> {selectedOrder.customer?.phone ?? 'N/A'}
                                            </p>
                                            <p>
                                                <strong>Wallet Balance:</strong> ₹
                                                {selectedOrder.customer?.wallet?.toFixed(2) ?? '0.00'}
                                            </p>
                                            <p>
                                                <strong>Status:</strong>{' '}
                                                {selectedOrder.customer?.isActive ? 'Active' : 'Inactive'}
                                            </p>
                                            {selectedOrder.customer?.address?.[0] && (
                                                <div style={{ marginTop: '10px' }}>
                                                    <p>
                                                        <strong>Address:</strong>
                                                    </p>
                                                    <p>
                                                        {selectedOrder.customer.address[0].houseNo},{' '}
                                                        {selectedOrder.customer.address[0].street}
                                                        <br />
                                                        {selectedOrder.customer.address[0].city},{' '}
                                                        {selectedOrder.customer.address[0].state} -{' '}
                                                        {selectedOrder.customer.address[0].pincode}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <h3
                                                style={{
                                                    color: '#555',
                                                    borderBottom: '1px solid #eee',
                                                    paddingBottom: '5px',
                                                }}
                                            >
                                                Order Items
                                            </h3>
                                            {selectedOrder.orders?.length ? (
                                                <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                                                    {selectedOrder.orders.map((item, index) => {
                                                        const subCatName =
                                                            typeof item.subCategory === 'string'
                                                                ? item.subCategory
                                                                : item.subCategory?.name ?? 'Unknown Item';

                                                        return (
                                                            <li
                                                                key={index}
                                                                style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}
                                                            >
                                                                <div
                                                                    style={{ display: 'flex', justifyContent: 'space-between' }}
                                                                >
                                                                    <span>{subCatName}</span>
                                                                    <span>
                                                                        <strong>{item.count}x</strong>
                                                                    </span>
                                                                </div>
                                                                <div style={{ fontSize: '0.8rem', color: '#888' }}>
                                                                    {formatDate(item.orderedAt)}
                                                                </div>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            ) : (
                                                <p>No items in this order</p>
                                            )}
                                        </div>
                                    </div>

                                    {selectedOrder.geoLocation && (
                                        <div>
                                            <h3
                                                style={{
                                                    color: '#555',
                                                    borderBottom: '1px solid #eee',
                                                    paddingBottom: '5px',
                                                }}
                                            >
                                                Location Details
                                            </h3>
                                            <p>
                                                <strong>Coordinates:</strong>{' '}
                                                {selectedOrder.geoLocation.coordinates.join(', ') ?? 'N/A'}
                                            </p>
                                            <p>
                                                <strong>Type:</strong> {selectedOrder.geoLocation.type ?? 'N/A'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div
                                    style={{
                                        textAlign: 'center',
                                        padding: '40px',
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                        color: '#666',
                                        border: '1px solid #e0e0e0',
                                    }}
                                >
                                    <div style={{ fontSize: '3rem', marginBottom: '15px' }}>👆</div>
                                    <p>Select an order from the list to view details</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <style>
                {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    );
};

export default OrderDisplay;