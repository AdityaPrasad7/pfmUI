import { lazy } from 'react';
import type { AppRoute } from './types'; // ✅ Add this

const ManagerDashboard = lazy(() => import('../pages/Manager/Dashboard'));
const OrderManagement = lazy(() => import('../pages/Manager/OrderManagement'));
const DeliveryPartnerList = lazy(() => import('../pages/Manager/DeliveryPartner'));
const AddPartner = lazy(() => import('../pages/Manager/DeliveryPartner/AddPartner'));
const EditPartner = lazy(() => import('../pages/Manager/DeliveryPartner/EditPartner'));
const PartnerDetails = lazy(() => import('../pages/Manager/DeliveryPartner/PartnerDetails'));

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
  {
    path: '/manager/delivery-partner',
    element: <DeliveryPartnerList />,
    layout: 'default',
    role: 'manager',
  },
  {
    path: '/manager/delivery-partner/add',
    element: <AddPartner />,
    layout: 'default',
    role: 'manager',
  },
  {
    path: '/manager/delivery-partner/edit/:id',
    element: <EditPartner />,
    layout: 'default',
    role: 'manager',
  },
  {
    path: '/manager/delivery-partner/details/:id',
    element: <PartnerDetails />,
    layout: 'default',
    role: 'manager',
  },
];
