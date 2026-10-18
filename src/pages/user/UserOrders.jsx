import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Package, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';

export const UserOrders = () => {
  const { user } = useAuth();
  const { orders } = useOrders();
  const [filterStatus, setFilterStatus] = useState('All');

  // Filter orders for current user or all customer orders
  const userOrders = orders.filter(
    (o) => !user?.email || o.customer?.email === user.email || o.customer?.name === user.name
  );
  const displayOrders = userOrders.length > 0 ? userOrders : orders;

  const filteredOrders =
    filterStatus === 'All'
      ? displayOrders
      : displayOrders.filter((o) => o.status.toLowerCase() === filterStatus.toLowerCase());

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
    <div className="space-y-6">
      
      {/* Header & Filter Tabs */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            My Orders
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Check the status of your past and ongoing grocery deliveries
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
          {['All', 'Pending', 'Confirmed', 'Delivered', 'Cancelled'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === status
                  ? 'bg-brand-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List / Table */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-soft">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-3">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No orders found</h3>
          <p className="text-xs text-slate-400 mt-1 mb-5">
            {filterStatus === 'All'
              ? "You haven't placed any grocery orders yet."
              : `No orders with status "${filterStatus}".`}
          </p>
          <Link
            to="/shop"
            className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
          >
            Explore Groceries
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 uppercase font-bold text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-5">Order ID</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Items</th>
                  <th className="py-3.5 px-4">Total</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-5 text-right">View Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-extrabold text-brand-950">{order.id}</div>
                      <div className="text-[11px] text-slate-400">{order.paymentMethod}</div>
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {order.date}
                    </td>
                    <td className="py-4 px-4 text-slate-700">
                      <span className="font-semibold">{order.items?.length || order.itemsCount || 1}</span>{' '}
                      <span className="text-slate-400">
                        {(order.items?.length || order.itemsCount || 1) === 1 ? 'item' : 'items'}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-black text-slate-900 text-sm">
                      ₹{order.total}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <Link
                        to={`/user/orders/${order.id.replace('FC-', '')}`}
                        className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-brand-50 hover:bg-brand-700 text-brand-700 hover:text-white rounded-xl font-bold text-xs border border-brand-200 hover:border-brand-700 transition-all shadow-2xs"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
