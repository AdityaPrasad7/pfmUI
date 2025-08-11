import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SocketService from '../../services/socketService';

interface Order {
  id: string;
  items: number;
  total: number;
  time: string;
  status: 'new' | 'preparing' | 'awaiting-pickup' | 'picked-up';
}

const LiveOrders: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [orders, setOrders] = useState<Order[]>(() => {
    // Load orders from localStorage on component mount
    const savedOrders = localStorage.getItem('liveOrders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

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
            const order: Order = {
              id: newOrder.id,
              items: newOrder.items || 1,
              total: newOrder.total || 100,
              time: new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              }),
              status: 'new'
            };
            setOrders(prev => {
              const updatedOrders = [order, ...prev];
              // Save to localStorage
              localStorage.setItem('liveOrders', JSON.stringify(updatedOrders));
              return updatedOrders;
            });
            // Debug indicator removed
          });

          // Listen for order status changes
          socketService.onOrderStatusChange((update: any) => {
            console.log('📥 Store received status change:', update);
            setOrders(prev => {
              const updatedOrders = prev.map(order => 
                order.id === update.orderId 
                  ? { ...order, status: update.status as Order['status'] }
                  : order
              );
              // Save to localStorage
              localStorage.setItem('liveOrders', JSON.stringify(updatedOrders));
              return updatedOrders;
            });
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

    const interval = setInterval(() => {
      const random = Math.random();
      if (random < 0.3) { // 30% chance every 10 seconds for testing
        const newOrder: Order = {
          id: `PCC-${Math.floor(Math.random() * 90000) + 10000}`,
          items: Math.floor(Math.random() * 5) + 1,
          total: Math.floor(Math.random() * 1000) + 100,
          time: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          status: 'new'
        };
        
        setOrders(prev => {
          const updatedOrders = [newOrder, ...prev];
          // Save to localStorage
          localStorage.setItem('liveOrders', JSON.stringify(updatedOrders));
          return updatedOrders;
        });
        
        // Emit new order to store TV screen
        const orderData = {
          ...newOrder,
          storeId: 'indiranagar-center',
          storeName: 'Priya Chicken - Indiranagar',
          timestamp: new Date().toISOString()
        };
        
        socketService.emitNewOrder(orderData);
        console.log('📤 Manager emitted new order to store:', newOrder.id);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [isManager]);

  // Seed mock data for Store view so all three categories show items when empty
  useEffect(() => {
    if (isManager) return; // Only seed for store screen
    const saved = localStorage.getItem('liveOrders');
    const savedOrders: Order[] = saved ? JSON.parse(saved) : [];
    if (orders.length > 0 || savedOrders.length > 0) return;

    const timeNow = () => new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const mockOrders: Order[] = [
      // NEW
      { id: 'PCC-10001', items: 2, total: 250, time: timeNow(), status: 'new' },
      { id: 'PCC-10002', items: 1, total: 120, time: timeNow(), status: 'new' },
      // PREPARING
      { id: 'PCC-20001', items: 3, total: 560, time: timeNow(), status: 'preparing' },
      { id: 'PCC-20002', items: 4, total: 720, time: timeNow(), status: 'preparing' },
      // AWAITING PICKUP
      { id: 'PCC-30001', items: 2, total: 330, time: timeNow(), status: 'awaiting-pickup' },
      { id: 'PCC-30002', items: 5, total: 980, time: timeNow(), status: 'awaiting-pickup' },
    ];

    setOrders(mockOrders);
    localStorage.setItem('liveOrders', JSON.stringify(mockOrders));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isManager]);

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
    setOrders(prev => {
      const updatedOrders = prev.map(order => {
        if (order.id === orderId) {
          let newStatus = order.status;
          if (order.status === 'new') newStatus = 'preparing';
          else if (order.status === 'preparing') newStatus = 'awaiting-pickup';
          
          const updatedOrder = { ...order, status: newStatus };
          
          // Emit status change to store TV screen
          socketService.emitOrderStatusChange(orderId, newStatus);
          console.log('📤 Manager emitted status change to store:', orderId, '->', newStatus);
          
          return updatedOrder;
        }
        return order;
      });
      
      // Save to localStorage
      localStorage.setItem('liveOrders', JSON.stringify(updatedOrders));
      return updatedOrders;
    });
  };

  const showQRCode = (orderId: string) => {
    setShowQR(orderId);
  };

  const hideQRCode = () => {
    setShowQR(null);
  };

  const confirmPickup = (orderId: string) => {
    setOrders(prev => {
      const updatedOrders = prev.map(order => {
        if (order.id === orderId) {
          const updatedOrder = { ...order, status: 'picked-up' as Order['status'] };
          
          // Emit pickup confirmation to store TV screen
          socketService.emitOrderStatusChange(orderId, 'picked-up');
          console.log('📤 Manager emitted pickup confirmation to store:', orderId);
          
          return updatedOrder;
        }
        return order;
      });
      
      // Save to localStorage
      localStorage.setItem('liveOrders', JSON.stringify(updatedOrders));
      return updatedOrders;
    });
    hideQRCode();
  };



  // This function would be called when delivery boy confirms pickup via mobile app
  const handleDeliveryBoyPickup = (orderId: string) => {
    console.log('📱 Delivery boy confirmed pickup for order:', orderId);
    confirmPickup(orderId);
  };

  const generateQRCode = (orderId: string) => {
    // QR code data that delivery boy's mobile app will scan
    const qrData = {
      orderId: orderId,
      pickupCode: orderId.slice(-4),
      timestamp: new Date().toISOString(),
      store: 'Priya Chicken - Indiranagar',
      action: 'confirm-pickup',
      url: `https://priyafreshmeats.com/pickup/${orderId}`
    };
    
    return `📱 Order: ${orderId}\n🛒 Pickup Code: ${orderId.slice(-4)}\n⏰ ${new Date().toLocaleTimeString()}\n🏪 Store: Priya Chicken - Indiranagar\n🔗 Scan to confirm pickup`;
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
        {isManager && order.status === 'preparing' && (
          <div className="ml-3 flex items-center">
            <a
              href={`/${userRole}/print-qr/${order.id}`}
              target="_blank"
              rel="noreferrer"
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



          {!isManager && (
            <button
              onClick={() => {
                // Determine which user type to redirect to based on current path
                let redirectPath = '/';
                
                if (window.location.pathname.startsWith('/super-admin') || window.location.pathname.startsWith('/meet-center') || window.location.pathname.startsWith('/delivery-partner') || window.location.pathname.startsWith('/assign-orders') || window.location.pathname.startsWith('/notification') || window.location.pathname.startsWith('/categories')) {
                    redirectPath = '/admin-login';
                } else if (window.location.pathname.startsWith('/manager')) {
                    redirectPath = '/manager-login';
                } else if (window.location.pathname.startsWith('/store')) {
                    redirectPath = '/store-login';
                }
                
                // Clear all user data
                localStorage.removeItem('superAdminUser');
                localStorage.removeItem('managerUser');
                localStorage.removeItem('storeUser');
                
                // Redirect to appropriate login page
                navigate(redirectPath);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center"
              title="Logout"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          )}
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
                    <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 11h6v6H3v-6zm2 2v2h2v-2H5zm13-2h-1v2h2v-1h-1zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h-2v2h2v-2zm-2-2h-2v2h2v-2zm2-2h2v2h-2v-2zm-2-2h-2v2h2v-2zm2-2h2v2h-2v-2zm-2-2h-2v2h2v-2zm2-2h2v2h-2V9zm-2-2h-2v2h2V7zm2-2h2v2h-2V5zm-2-2h-2v2h2V3z"/>
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