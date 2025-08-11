import { lazy } from 'react';
import type { AppRoute } from './types'; // ✅ Add this

const ManagerDashboard = lazy(() => import('../pages/Manager/Dashboard'));
const OrderManagement = lazy(() => import('../pages/Manager/OrderManagement'));

export const managerRoutes: AppRoute[] = [ // ✅ Add the type
  {
    path: '/manager-dashboard',
    element: <ManagerDashboard />,
    layout: 'default',
    role: 'manager',
  },
  {
    path: '/manager/order-management',
    element: <OrderManagement />,
    layout: 'default',
    role: 'manager',
  },
];
