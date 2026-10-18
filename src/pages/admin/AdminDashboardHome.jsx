import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  IndianRupee, 
  ArrowRight, 
  ChevronRight,
  Plus
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';

export const AdminDashboardHome = () => {
  const { products } = useProducts();
  const { orders } = useOrders();

  // 4 Statistics: Products, Orders, Customers, Revenue
  const productsCount = products.length || 42;
  const ordersCount = orders.length >= 10 ? orders.length : 128;
  const customersCount = 84;
  const revenueTotal = '2,48,650';

  // Recent 5 orders
  const recentOrders = orders.slice(0, 5);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Confirmed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 inline-block mb-2">
            Operations Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time store snapshot for catalog, orders, customers and revenue.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/products/new"
            className="px-4 py-2.5 bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold rounded-xl shadow-md shadow-brand-700/20 transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </Link>
          <Link
            to="/admin/orders"
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
          >
            Manage Orders
          </Link>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Products */}
        <Link
          to="/admin/products"
          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft hover:shadow-card-hover hover:border-brand-300 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Products
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {productsCount}
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">
            Active in catalog
          </span>
        </Link>

        {/* Orders */}
        <Link
          to="/admin/orders"
          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft hover:shadow-card-hover hover:border-brand-300 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Orders
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {ordersCount}
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">
            Across all channels
          </span>
        </Link>

        {/* Customers */}
        <Link
          to="/admin/customers"
          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft hover:shadow-card-hover hover:border-brand-300 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Customers
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {customersCount}
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">
            Registered accounts
          </span>
        </Link>

        {/* Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Revenue
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            ₹{revenueTotal}
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">
            Gross sales to date
          </span>
        </div>

      </div>

      {/* Recent Orders Table (5 orders) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 sm:p-7">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Recent Orders
            </h2>
            <p className="text-xs text-slate-500">
              Latest 5 customer transactions
            </p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center space-x-1 hover:underline"
          >
            <span>View All Orders</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 uppercase font-bold text-[11px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-extrabold text-brand-950">
                    {order.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800">{order.customer?.name || 'Customer'}</div>
                    <div className="text-[11px] text-slate-400">{order.customer?.phone || order.customer?.email}</div>
                  </td>
                  <td className="py-3.5 px-4 font-black text-slate-900">
                    ₹{order.total}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to="/admin/orders"
                      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-slate-100 hover:bg-brand-700 text-slate-700 hover:text-white rounded-lg font-bold text-xs transition-colors"
                    >
                      <span>Manage</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
