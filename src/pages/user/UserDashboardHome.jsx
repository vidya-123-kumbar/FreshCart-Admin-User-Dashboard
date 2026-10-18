import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  IndianRupee, 
  ArrowRight, 
  ChevronRight, 
  Sparkles,
  PackageCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useWishlist } from '../../context/WishlistContext';
import { useProducts } from '../../context/ProductContext';
import { ProductCard } from '../../components/ProductCard';

export const UserDashboardHome = () => {
  const { user } = useAuth();
  const { orders } = useOrders();
  const { wishlist } = useWishlist();
  const { products } = useProducts();

  // Filter orders for current user (or show all customer orders)
  const userOrders = orders.filter(
    (o) => !user?.email || o.customer?.email === user.email || o.customer?.name === user.name
  );
  // Fallback to orders if empty
  const displayOrders = userOrders.length > 0 ? userOrders : orders;

  const totalSpent = displayOrders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
  const recentOrders = displayOrders.slice(0, 3);
  const recommendedProducts = products.slice(0, 4);

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
      
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 inline-block mb-2">
            Customer Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Welcome back, {user?.name?.split(' ')[0] || 'Rahul'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your grocery orders, saved items, and quick checkout details in one place.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            to="/shop"
            className="px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold rounded-xl shadow-md shadow-brand-700/20 transition-all flex items-center space-x-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Shop Groceries</span>
          </Link>
        </div>
      </div>

      {/* Simple Statistics - 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* Total Orders */}
        <Link
          to="/user/orders"
          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft hover:shadow-card-hover hover:border-brand-300 transition-all flex items-center space-x-4 group"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Total Orders
            </span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">
              {displayOrders.length}
            </div>
          </div>
        </Link>

        {/* Wishlist Items */}
        <Link
          to="/user/wishlist"
          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft hover:shadow-card-hover hover:border-brand-300 transition-all flex items-center space-x-4 group"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Wishlist Items
            </span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">
              {wishlist.length}
            </div>
          </div>
        </Link>

        {/* Total Spent */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Total Spent
            </span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">
              ₹{totalSpent.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 sm:p-7">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Recent Orders
            </h2>
            <p className="text-xs text-slate-500">
              Your 3 most recent grocery orders
            </p>
          </div>
          <Link
            to="/user/orders"
            className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center space-x-1 hover:underline"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <PackageCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-600">No orders placed yet</p>
            <Link
              to="/shop"
              className="mt-3 inline-block text-xs font-bold text-brand-700 hover:underline"
            >
              Start shopping fresh groceries →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase font-bold text-[11px] tracking-wider">
                  <th className="pb-3 pl-2">Order ID</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right pr-2">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-brand-900">
                      {order.id}
                    </td>
                    <td className="py-3.5 text-slate-500">
                      {order.date}
                    </td>
                    <td className="py-3.5 font-extrabold text-slate-900">
                      ₹{order.total}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right pr-2">
                      <Link
                        to={`/user/orders/${order.id.replace('FC-', '')}`}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 bg-brand-50 hover:bg-brand-700 text-brand-700 hover:text-white rounded-lg font-bold text-xs border border-brand-200 hover:border-brand-700 transition-all shadow-2xs"
                      >
                        <span>View Order</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recommended Products */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Recommended Products
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center space-x-1 hover:underline"
          >
            <span>See More</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
};
