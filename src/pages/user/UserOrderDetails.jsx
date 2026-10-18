import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  CreditCard, 
  ShoppingBag, 
  ChevronRight,
  Package,
  XCircle,
  Truck
} from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { fallbackImage } from '../../data/products';

export const UserOrderDetails = () => {
  const { id } = useParams();
  const { getOrderById } = useOrders();

  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-soft">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-3">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Order Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 mb-6">
          We couldn't find an order with reference ID "{id}".
        </p>
        <Link
          to="/user/orders"
          className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all inline-block"
        >
          Back to My Orders
        </Link>
      </div>
    );
  }

  // Simple order status steps
  // 1: Order Placed
  // 2: Confirmed
  // 3: Delivered
  const isCancelled = order.status === 'Cancelled';
  let currentStep = 1; // Pending
  if (order.status === 'Confirmed') currentStep = 2;
  if (order.status === 'Delivered') currentStep = 3;

  return (
    <div className="space-y-6">
      
      {/* Top Bar: Back & ID */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to="/user/orders"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-brand-700 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Orders</span>
          </Link>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Order {order.id}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                order.status === 'Delivered'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : order.status === 'Confirmed'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : order.status === 'Pending'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              {order.status}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Placed on {order.date}</p>
        </div>

        <Link
          to="/shop"
          className="px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold rounded-xl shadow-md shadow-brand-700/20 transition-all flex items-center justify-center space-x-2"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      {/* Simple Order Status Tracker */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft">
        <h2 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-6">
          Order Status Tracker
        </h2>

        {isCancelled ? (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center space-x-3 text-rose-700">
            <XCircle className="w-6 h-6 flex-shrink-0" />
            <div>
              <div className="font-bold text-sm">Order Cancelled</div>
              <div className="text-xs text-rose-600">
                This order was cancelled. Any debited amount will be refunded within 3-5 business days.
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between relative gap-6 sm:gap-2">
            
            {/* Step 1: Order Placed */}
            <div className="flex items-center space-x-3 sm:flex-col sm:space-x-0 sm:text-center z-10">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="sm:mt-2">
                <div className="text-xs font-bold text-slate-900">Order Placed</div>
                <div className="text-[11px] text-slate-400">Order received</div>
              </div>
            </div>

            {/* Connecting Line 1 */}
            <div
              className={`hidden sm:block flex-1 h-1 mx-2 rounded ${
                currentStep >= 2 ? 'bg-emerald-600' : 'bg-slate-200'
              }`}
            />

            {/* Step 2: Confirmed */}
            <div className="flex items-center space-x-3 sm:flex-col sm:space-x-0 sm:text-center z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= 2
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-100 text-slate-400 border border-slate-300'
                }`}
              >
                {currentStep >= 2 ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <span className="text-xs">2</span>
                )}
              </div>
              <div className="sm:mt-2">
                <div className="text-xs font-bold text-slate-900">Confirmed</div>
                <div className="text-[11px] text-slate-400">Packed & ready</div>
              </div>
            </div>

            {/* Connecting Line 2 */}
            <div
              className={`hidden sm:block flex-1 h-1 mx-2 rounded ${
                currentStep >= 3 ? 'bg-emerald-600' : 'bg-slate-200'
              }`}
            />

            {/* Step 3: Delivered */}
            <div className="flex items-center space-x-3 sm:flex-col sm:space-x-0 sm:text-center z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= 3
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-100 text-slate-400 border border-slate-300'
                }`}
              >
                {currentStep >= 3 ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Truck className="w-5 h-5" />
                )}
              </div>
              <div className="sm:mt-2">
                <div className="text-xs font-bold text-slate-900">Delivered</div>
                <div className="text-[11px] text-slate-400">Handed to customer</div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Grid: Products List + Order Summary & Address */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Ordered Products (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft">
          <h2 className="text-base font-black text-slate-900 mb-4 flex items-center justify-between">
            <span>Products in Order</span>
            <span className="text-xs font-bold text-slate-400">
              {order.items?.length || 1} {(order.items?.length || 1) === 1 ? 'item' : 'items'}
            </span>
          </h2>

          <div className="divide-y divide-slate-100">
            {order.items && order.items.length > 0 ? (
              order.items.map((item, idx) => (
                <div key={item.id || idx} className="py-4 flex items-center space-x-4">
                  <img
                    src={item.image || fallbackImage}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = fallbackImage;
                    }}
                    className="w-16 h-16 rounded-xl object-contain bg-slate-50 border border-slate-200/80 p-1 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-slate-800 line-clamp-2">
                      {item.name}
                    </h3>
                    <div className="text-xs text-slate-500 mt-1">
                      Qty: <span className="font-bold text-slate-700">{item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-slate-900">
                      ₹{item.price * item.quantity}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      ₹{item.price} each
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 py-4">No product details recorded.</p>
            )}
          </div>
        </div>

        {/* Order Details & Delivery Address (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Order Details Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-3.5">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-400">
              Order Details
            </h2>

            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Order ID</span>
              <span className="font-extrabold text-slate-800">{order.id}</span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Date</span>
              <span className="font-semibold text-slate-700">{order.date}</span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Status</span>
              <span className="font-bold text-brand-700">{order.status}</span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Payment Method</span>
              <span className="font-semibold text-slate-700">{order.paymentMethod}</span>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-600">Total</span>
              <span className="text-xl font-black text-slate-900">₹{order.total}</span>
            </div>
          </div>

          {/* Delivery Address Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-brand-600" />
              <span>Delivery Address</span>
            </h2>

            {order.address ? (
              <div className="text-xs space-y-1 text-slate-600">
                <div className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-[10px] uppercase mb-1">
                  {order.address.tag || 'Home'}
                </div>
                <div className="font-extrabold text-slate-900">
                  {order.address.name}
                </div>
                <div>{order.address.addressLine}</div>
                <div>
                  {order.address.city}, {order.address.state || 'Karnataka'} - {order.address.pincode}
                </div>
                <div className="text-slate-500 pt-1">
                  Phone: <span className="font-semibold text-slate-700">{order.address.phone}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Default delivery address used.</p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
