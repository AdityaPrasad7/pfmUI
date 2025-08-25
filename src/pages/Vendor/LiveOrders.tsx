import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SocketService from '../../services/socketService';
import { API_CONFIG } from '../../config/api.config';

interface Order {
  id: string;
  items: number;
  total: number;
  time: string;
  status: 'new' | 'preparing' | 'awaiting-pickup' | 'picked-up';
  orderDetails?: Array<{
    _id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

const LiveOrders: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Removed UI indicators for connection/debug; keep connection under the hood
  const [showQR, setShowQR] = useState<string | null>(null);

  const socketService = SocketService.getInstance();
  
  // Determine if this is manager or store based on URL
  const isManager = window.location.pathname.includes('/manager/');
  const userRole = isManager ? 'manager' : 'store';
  const userId = isManager ? 'manager-tv-screen' : 'store-tv-screen';

  // Connect to socket when component mounts
  useEffect(() => {
    const connectSocket = () => {
      try {
        socketService.connect(userRole, userId);
        
        // Connection status UI removed

        // Listen for new orders (for store)
        if (!isManager) {
          socketService.onNewOrder((newOrder: any) => {
            console.log('📥 Store received new order:', newOrder);
            // Fetch fresh data from backend instead of using socket data
            fetchLiveOrders();
          });

          // Listen for order status changes
          socketService.onOrderStatusChange((update: any) => {
            console.log('📥 Store received status change:', update);
            // Fetch fresh data from backend instead of using socket data
            fetchLiveOrders();
          });
        }

      } catch (error) {
        console.error(`Failed to connect ${userRole} socket:`, error);
      }
    };

    connectSocket();

    return () => {
      if (!isManager) {
        socketService.offNewOrder();
        socketService.offOrderStatusChange();
      }
      socketService.disconnect();
    };
  }, [userRole, userId, isManager]);

  // Simulate new orders coming in (only for manager)
  useEffect(() => {
    if (!isManager) return; // Only manager creates orders

    // Remove mock order generation - only use real backend data
    console.log('Manager view: Using real backend data only');
  }, [isManager]);

  // Seed mock data for Store view so all three categories show items when empty
  useEffect(() => {
    if (isManager) return; // Only seed for store screen
    
    // Remove mock data seeding - store should only show real orders from backend
    console.log('Store view: Using real backend data only');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isManager]);

  // Check authentication and redirect if needed
  useEffect(() => {
    console.log('🔍 LiveOrders: Checking authentication...');
    const managerUser = localStorage.getItem('managerUser');
    const storeUser = localStorage.getItem('storeUser');
    const accessToken = localStorage.getItem('accessToken'); // Get token from separate storage
    
    // Check if we have a valid token
    const token = accessToken || (managerUser ? JSON.parse(managerUser).accessToken : null) || 
                 (storeUser ? JSON.parse(storeUser).accessToken : null);
    
    console.log('🔍 LiveOrders: Auth check results:', {
      managerUser: !!managerUser,
      storeUser: !!storeUser,
      accessToken: !!accessToken,
      hasToken: !!token,
      isManager,
      currentPath: window.location.pathname
    });
    
    if (!token) {
      console.log('❌ LiveOrders: No auth token found, redirecting to login...');
      setIsAuthenticated(false);
      setIsLoading(false);
      // Redirect to appropriate login page based on current path
      if (isManager) {
        console.log('🔄 LiveOrders: Redirecting manager to /manager-login');
        navigate('/manager-login');
      } else {
        console.log('🔄 LiveOrders: Redirecting store to /store-login');
        navigate('/store-login');
      }
      return;
    }
    
    // If we have a token, set authenticated and fetch orders
    console.log('✅ LiveOrders: Authentication successful, fetching orders...');
    setIsAuthenticated(true);
    fetchLiveOrders();
  }, [isManager, navigate]);

  // Fetch live orders from backend API
  const fetchLiveOrders = useCallback(async () => {
    try {
      console.log('🚀 LiveOrders: Starting fetchLiveOrders...');
      setIsLoading(true);
      setError(null);
      
      // Get the auth token from localStorage (check both locations)
      const managerUser = localStorage.getItem('managerUser');
      const storeUser = localStorage.getItem('storeUser');
      const accessToken = localStorage.getItem('accessToken'); // Get token from separate storage
      
      // Check if we have a valid token
      const token = accessToken || (managerUser ? JSON.parse(managerUser).accessToken : null) || 
                   (storeUser ? JSON.parse(storeUser).accessToken : null);
      
      console.log('🔑 LiveOrders: Token check in fetchLiveOrders:', {
        hasToken: !!token,
        tokenLength: token ? token.length : 0,
        isManager,
        tokenSource: accessToken ? 'accessToken' : (managerUser ? 'managerUser.accessToken' : 'storeUser.accessToken')
      });
      
      if (!token) {
        console.log('❌ LiveOrders: No auth token found, cannot fetch live orders');
        setError('Authentication required. Please log in.');
        setOrders([]);
        setIsLoading(false);
        return;
      }

      // Use appropriate endpoint based on user role
      const endpoint = isManager ? 
        API_CONFIG.ENDPOINTS.MANAGER.LIVE_ORDERS : 
        API_CONFIG.ENDPOINTS.STORE.ORDERS;
      
      const fullUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
      console.log('🌐 LiveOrders: Making API call to:', fullUrl);
      console.log('🔑 LiveOrders: Using token:', token.substring(0, 20) + '...');

      const response = await fetch(fullUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📡 LiveOrders: API response status:', response.status);
      console.log('📡 LiveOrders: API response headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        const data = await response.json();
        console.log('📥 LiveOrders: API response data:', data);
        
        if (data.success && data.data.orders) {
          // Transform backend data to match frontend Order interface
          const transformedOrders: Order[] = data.data.orders.map((order: any) => ({
            id: order._id,
            items: order.orderDetails?.length || 0,
            total: order.amount || 0,
            time: new Date(order.createdAt).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            }),
            status: mapBackendStatusToFrontend(order.status),
            orderDetails: order.orderDetails || []
          }));
          
          setOrders(transformedOrders);
          console.log('✅ LiveOrders: Successfully transformed and set orders:', transformedOrders);
        } else {
          console.log('⚠️ LiveOrders: No orders found in backend response');
          setOrders([]);
        }
      } else {
        const errorText = await response.text();
        console.log('❌ LiveOrders: Failed to fetch live orders from backend');
        console.log('❌ LiveOrders: Error response:', errorText);
        setError('Failed to fetch orders from server');
        setOrders([]);
      }
    } catch (error) {
      console.error('💥 LiveOrders: Error fetching live orders:', error);
      setError('Network error. Please check your connection.');
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, [isManager]);

  // Map backend status to frontend status
  const mapBackendStatusToFrontend = (backendStatus: string): Order['status'] => {
    switch (backendStatus) {
      case 'pending':
      case 'confirmed':
        return 'new';
      case 'preparing':
        return 'preparing';
      case 'ready':
        return 'awaiting-pickup';
      case 'picked_up':
      case 'in_transit':
        return 'picked-up';
      default:
        return 'new';
    }
  };

  // Fetch orders when component mounts (for both manager and store)
  useEffect(() => {
    // Set up interval to refresh orders (only if authenticated)
    const interval = setInterval(() => {
      const managerUser = localStorage.getItem('managerUser');
      const storeUser = localStorage.getItem('storeUser');
      const accessToken = localStorage.getItem('accessToken'); // Get token from separate storage
      
      // Check if we have a valid token
      const token = accessToken || (managerUser ? JSON.parse(managerUser).accessToken : null) || 
                   (storeUser ? JSON.parse(storeUser).accessToken : null);
      
      if (token) {
        fetchLiveOrders();
      }
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [isManager, fetchLiveOrders]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcuts for TV screen
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'F11') {
        // Toggle fullscreen
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const getOrdersByStatus = (status: Order['status']) => {
    return orders.filter(order => order.status === status);
  };

  const moveOrderToNextStage = (orderId: string) => {
    // For now, just emit the status change and let the backend handle it
    // The next fetchLiveOrders call will get the updated status
    socketService.emitOrderStatusChange(orderId, 'preparing');
    console.log('📤 Manager emitted status change to store:', orderId, '->', 'preparing');
    
    // Refresh data from backend to get updated status
    setTimeout(() => fetchLiveOrders(), 1000);
  };

  const showQRCode = (orderId: string) => {
    setShowQR(orderId);
  };

  const hideQRCode = () => {
    setShowQR(null);
  };

  const confirmPickup = (orderId: string) => {
    // For now, just emit the pickup confirmation and let the backend handle it
    socketService.emitOrderStatusChange(orderId, 'picked-up');
    console.log('📤 Manager emitted pickup confirmation to store:', orderId);
    
    // Refresh data from backend to get updated status
    setTimeout(() => fetchLiveOrders(), 1000);
    hideQRCode();
  };



  // This function would be called when delivery boy confirms pickup via mobile app
  const handleDeliveryBoyPickup = (orderId: string) => {
    console.log('📱 Delivery boy confirmed pickup for order:', orderId);
    confirmPickup(orderId);
  };

  const generateQRCode = (orderId: string) => {
    // Find the order to get its details
    const order = orders.find(o => o.id === orderId);
    const orderDetails = order?.orderDetails || [];
    
    // QR code data that delivery boy's mobile app will scan
    const qrData = {
      orderId: orderId,
      pickupCode: orderId.slice(-4),
      timestamp: new Date().toISOString(),
      store: 'Priya Chicken - Indiranagar',
      action: 'confirm-pickup',
      url: `https://priyafreshmeats.com/pickup/${orderId}`,
      productIds: orderDetails.map((item: any) => ({
        id: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };
    
    // Create a human-readable summary
    const productSummary = orderDetails.length > 0 
      ? `\n📦 Products: ${orderDetails.map((item: any) => `${item.name} (${item.quantity})`).join(', ')}`
      : '';
    
    return `📱 Order: ${orderId}\n🛒 Pickup Code: ${orderId.slice(-4)}\n⏰ ${new Date().toLocaleTimeString()}\n🏪 Store: Priya Chicken - Indiranagar${productSummary}\n🔗 Scan to confirm pickup`;
  };





  const OrderCard: React.FC<{ order: Order; isHighlighted?: boolean }> = ({ order, isHighlighted = false }) => (
    <div 
      className={`p-4 rounded-lg mb-3 transition-all duration-300 ${
        isHighlighted 
          ? 'bg-red-600 shadow-lg scale-105' 
          : 'bg-gray-700'
      } ${isManager ? 'cursor-pointer hover:bg-gray-600' : ''}`}
      onClick={() => isManager && order.status !== 'awaiting-pickup' && moveOrderToNextStage(order.id)}
      title={isManager && order.status !== 'awaiting-pickup' ? "Click to move to next stage" : ""}
    >
      <div className="text-white flex justify-between items-center">
        <div className="flex-1">
          <div className="text-lg font-semibold">#{order.id}</div>
          <div className="text-sm opacity-90">{order.items} items, ₹{order.total}</div>
          <div className="text-xs opacity-75">{order.time}</div>
          {isManager && order.status !== 'awaiting-pickup' && order.status !== 'picked-up' && (
            <div className="text-xs text-yellow-300 mt-2">
              Click to move to next stage
            </div>
          )}
          {order.status === 'picked-up' && (
            <div className="text-xs text-green-300 mt-2">
              ✅ Picked up
            </div>
          )}
        </div>
        {isManager && order.status === 'awaiting-pickup' && (
          <div className="ml-3 flex items-center">
            <a
              href={`/${userRole}/print-qr/${order.id}?orderDetails=${encodeURIComponent(JSON.stringify(order.orderDetails || []))}`}
              target="_blank"
              rel="no-referrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 8H5a3 3 0 00-3 3v4h4v4h12v-4h4v-4a3 3 0 00-3-3zM7 17h10v2H7v-2zm13-2H4v-4a1 1 0 011-1h14a1 1 0 011 1v4zM17 3H7v3h10V3z" />
              </svg>
              Print QR
            </a>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 px-8 py-4 flex justify-between items-center border-b border-gray-700">
        <div className="text-xl font-semibold">
          Priya Chicken - Indiranagar | Live Orders {isManager ? '(Manager)' : '(Store)'}
          <div className="text-sm text-green-400 font-normal mt-1">
            {isAuthenticated ? '📡 Connected to Backend - Real-time Data' : '🔐 Please log in to access live orders'}
          </div>
          {/* Debug Info - Only show in development */}
          {import.meta.env.DEV && (
            <div className="text-xs text-yellow-400 font-normal mt-1">
              🔍 Debug: {isManager ? 'Manager' : 'Store'} | Auth: {isAuthenticated ? 'Yes' : 'No'} | 
              Token: {localStorage.getItem('managerUser') || localStorage.getItem('storeUser') ? 'Present' : 'Missing'}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {isManager && (
            <button
              onClick={() => navigate('/manager-dashboard')}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center"
              title="Back to Dashboard"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          )}
          {/* Connection indicator removed */}
          <div className="text-lg font-mono">
            {currentTime}
          </div>

          {/* Debug Button - Only show in development */}
          {import.meta.env.DEV && (
            <button
              onClick={() => {
                const managerUser = localStorage.getItem('managerUser');
                const storeUser = localStorage.getItem('storeUser');
                const accessToken = localStorage.getItem('accessToken');
                console.log('🔍 Debug: Authentication Status Check');
                console.log('🔍 Debug: Manager User:', managerUser);
                console.log('🔍 Debug: Store User:', storeUser);
                console.log('🔍 Debug: Access Token:', accessToken ? 'Present' : 'Missing');
                console.log('🔍 Debug: Current Path:', window.location.pathname);
                console.log('🔍 Debug: Is Manager:', isManager);
                console.log('🔍 Debug: Is Authenticated:', isAuthenticated);
                
                if (managerUser) {
                  try {
                    const parsed = JSON.parse(managerUser);
                    console.log('🔍 Debug: Parsed Manager User:', parsed);
                    console.log('🔍 Debug: Manager Token in user object:', parsed.accessToken ? 'Present' : 'Missing');
                  } catch (e) {
                    console.log('🔍 Debug: Error parsing manager user:', e);
                  }
                }
                
                if (storeUser) {
                  try {
                    const parsed = JSON.parse(storeUser);
                    console.log('🔍 Debug: Parsed Store User:', parsed);
                    console.log('🔍 Debug: Store Token in user object:', parsed.accessToken ? 'Present' : 'Missing');
                  } catch (e) {
                    console.log('🔍 Debug: Error parsing store user:', e);
                  }
                }
                
                // Check final token resolution
                const finalToken = accessToken || (managerUser ? JSON.parse(managerUser).accessToken : null) || 
                                 (storeUser ? JSON.parse(storeUser).accessToken : null);
                console.log('🔍 Debug: Final Token Resolution:', finalToken ? 'Present' : 'Missing');
                console.log('🔍 Debug: Token Source:', accessToken ? 'accessToken' : (managerUser ? 'managerUser.accessToken' : 'storeUser.accessToken'));
              }}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
              title="Debug Authentication"
            >
              🔍 Debug
            </button>
          )}

          {/* Refresh Button - Only show when authenticated */}
          {isAuthenticated && (
            <button
              onClick={fetchLiveOrders}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center"
              title="Refresh Orders"
            >
              <svg className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
          )}

          {/* Logout Button - Show for all users */}
          <button
            onClick={() => {
              // Clear all user data
              localStorage.removeItem('superAdminUser');
              localStorage.removeItem('managerUser');
              localStorage.removeItem('storeUser');
              
              // Reset authentication state
              setIsAuthenticated(false);
              setOrders([]);
              
              // Redirect to appropriate login page
              if (isManager) {
                navigate('/manager-login');
              } else {
                navigate('/store-login');
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center"
            title="Logout"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Debug info removed */}

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">QR Code for Pickup</h3>
              <div className="bg-gray-100 p-6 rounded-lg mb-4">
                <div className="flex justify-center mb-4">
                  <svg className="w-24 h-24 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 11h6v6H3v-6zm2 2v2h2v-2H5zm13-2H4v-4a1 1 0 011-1h14a1 1 0 011 1v4zM17 3H7v3h10V3z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-600 font-mono whitespace-pre-line">
                  {generateQRCode(showQR)}
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-4">
                Delivery boy should scan this QR code on their mobile device
              </div>
              <button
                onClick={hideQRCode}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex h-screen">
        {/* Not Authenticated State */}
        {!isAuthenticated && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 text-xl mb-4">🔐 Authentication Required</div>
              <div className="text-gray-500 text-sm mb-6">Please log in to view live orders</div>
              <button 
                onClick={() => {
                  if (isManager) {
                    navigate('/manager-login');
                  } else {
                    navigate('/store-login');
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium transition-colors"
              >
                Go to Login
              </button>
            </div>
          </div>
        )}

        {/* Authenticated Content */}
        {isAuthenticated && (
          <>
            {/* Loading State */}
            {isLoading && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <div className="text-xl text-gray-300">Loading orders...</div>
                </div>
              </div>
            )}

            {/* Error State */}
            {!isLoading && error && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
                  <button 
                    onClick={fetchLiveOrders}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* No Orders State */}
            {!isLoading && !error && orders.length === 0 && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-400 text-xl mb-4">📭 No orders available</div>
                  <div className="text-gray-500 text-sm">Orders will appear here when they are created</div>
                </div>
              </div>
            )}

            {/* Orders Display - Only show when there are orders */}
            {!isLoading && !error && orders.length > 0 && (
              <>
                {/* New Orders Column */}
                <div className="flex-1 p-6 border-r border-gray-700 flex flex-col">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-yellow-400">
                      NEW ORDERS
                      <span className="text-white ml-2">({getOrdersByStatus('new').length})</span>
                    </h2>
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="space-y-3 pr-2">
                      {getOrdersByStatus('new').map((order, index) => (
                        <OrderCard 
                          key={order.id} 
                          order={order} 
                          isHighlighted={index === 0}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Preparing Orders Column */}
                <div className="flex-1 p-6 border-r border-gray-700 flex flex-col">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-blue-400">
                      PREPARING
                      <span className="text-white ml-2">({getOrdersByStatus('preparing').length})</span>
                    </h2>
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="space-y-3 pr-2">
                      {getOrdersByStatus('preparing').map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Awaiting Pickup Column */}
                <div className="flex-1 p-6 flex flex-col">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-green-400">
                      AWAITING PICKUP
                      <span className="text-white ml-2">({getOrdersByStatus('awaiting-pickup').length})</span>
                    </h2>
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="space-y-3 pr-2">
                      {getOrdersByStatus('awaiting-pickup').map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(55, 65, 81, 0.3);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3B82F6, #1D4ED8);
          border-radius: 4px;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #2563EB, #1E40AF);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background: linear-gradient(180deg, #1D4ED8, #1E3A8A);
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #3B82F6 rgba(55, 65, 81, 0.3);
        }
      `}</style>
    </div>
  );
};

export default LiveOrders; 