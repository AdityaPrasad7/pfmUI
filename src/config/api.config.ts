// API Configuration
export const API_CONFIG = {
  // Backend API Base URL
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  
  // Socket Server URL
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001',
  
  // API Endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout',
    },
    ADMIN: {
      PROFILE: '/admin/profile',
      USERS: '/admin/users',
      CATEGORIES: '/admin/categories',
      PRODUCTS: '/admin/products',
      ORDERS: '/admin/orders',
      DELIVERY_PARTNERS: '/admin/delivery-partners',
      MEAT_CENTERS: '/admin/meat-centers',
      NOTIFICATIONS: '/admin/notifications',
    },
    MANAGER: {
      PROFILE: '/manager/profile',
      ORDERS: '/manager/orders',
      LIVE_ORDERS: '/manager/live-orders',
    },
    STORE: {
      PROFILE: '/store/profile',
      ORDERS: '/store/orders',
      PRODUCTS: '/store/products',
    },
    CUSTOMER: {
      PROFILE: '/customer/profile',
      CART: '/customer/cart',
      ORDERS: '/customer/orders',
      CATEGORIES: '/customer/categories',
    },
    DELIVERY_PARTNER: {
      PROFILE: '/deliveryPartner/profile',
      ORDERS: '/deliveryPartner/orders',
    },
  },
  
  // Request Configuration
  REQUEST_CONFIG: {
    TIMEOUT: 10000, // 10 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // 1 second
  },
};

// Environment check
export const checkEnvironment = () => {
  console.log('🔧 Environment Configuration:');
  console.log('📡 API Base URL:', API_CONFIG.BASE_URL);
  console.log('🔌 Socket URL:', API_CONFIG.SOCKET_URL);
  console.log('🌍 Environment:', import.meta.env.MODE);
  
  if (!import.meta.env.VITE_API_BASE_URL) {
    console.warn('⚠️  VITE_API_BASE_URL not set, using default: http://localhost:8000');
  }
  
  if (!import.meta.env.VITE_SOCKET_URL) {
    console.warn('⚠️  VITE_SOCKET_URL not set, using default: http://localhost:3001');
  }
};

export default API_CONFIG;
