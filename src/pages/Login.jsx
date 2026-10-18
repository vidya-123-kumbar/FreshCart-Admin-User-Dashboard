import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, ArrowRight, User, Phone, CheckCircle2, Lock, Shield, UserCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useCart();
  const { user, loginAs, logout } = useAuth();

  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [step, setStep] = useState('input'); // 'input' | 'otp'
  const [otp, setOtp] = useState(['5', '4', '8', '2']);

  const handleQuickLogin = (role) => {
    if (role === 'customer') {
      loginAs('customer', {
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        phone: '9876543210',
      });
      showToast('Logged in as Customer');
      navigate('/user');
    } else {
      loginAs('admin', {
        name: 'Store Admin',
        email: 'admin@freshcart.com',
        phone: '9800012345',
      });
      showToast('Logged in as Admin');
      navigate('/admin/dashboard');
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phoneOrEmail.trim()) {
      showToast('Please enter your mobile number or email', 'info');
      return;
    }
    setStep('otp');
    showToast('Demo OTP is: 5482', 'info');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const newUser = loginAs('customer', {
      name: phoneOrEmail.includes('@') ? phoneOrEmail.split('@')[0] : 'FreshCart Customer',
      email: phoneOrEmail.includes('@') ? phoneOrEmail : `${phoneOrEmail}@freshcart.com`,
      phone: phoneOrEmail.includes('@') ? '9876543210' : phoneOrEmail,
    });
    showToast('Logged in successfully!');
    navigate('/user');
  };

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
  };

  return (
    <div className="min-h-[75vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft max-w-md w-full">
        
        {/* Brand Icon */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-brand-700 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-brand-700/20">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-brand-950 tracking-tight">
            {user ? 'My FreshCart Account' : 'Welcome to FreshCart'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {user ? 'Manage your grocery orders & account roles' : 'Log in to track orders, save wishlists, and checkout faster'}
          </p>
        </div>

        {/* Demo Quick Selector: Customer or Admin */}
        <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2.5 text-center">
            Login as:
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleQuickLogin('customer')}
              className="flex items-center justify-center space-x-2 py-2.5 px-3 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-98"
            >
              <UserCheck className="w-4 h-4" />
              <span>Customer</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="flex items-center justify-center space-x-2 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-98"
            >
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </button>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            One-click quick switch between Customer & Admin dashboards
          </p>
        </div>

        {user ? (
          /* Profile Logged-in State */
          <div className="space-y-6">
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200/80 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-brand-700 text-white flex items-center justify-center font-bold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-900 truncate">{user.name}</h3>
                <p className="text-xs text-slate-500 truncate">{user.email || user.phone}</p>
                <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full mt-1 inline-block capitalize">
                  {user.role || 'customer'} role
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-semibold">
              {user.role === 'admin' ? (
                <Link
                  to="/admin/dashboard"
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
                >
                  <span className="font-bold">Open Admin Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <Link
                  to="/user"
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-brand-700 text-white hover:bg-brand-800 transition-colors shadow-xs"
                >
                  <span className="font-bold">Open Customer Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}

              <Link
                to="/cart"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-brand-500 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>View Shopping Cart</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link
                to="/shop"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-brand-500 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-3 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 font-bold text-xs rounded-xl border border-slate-200 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : step === 'input' ? (
          /* Mobile / Email Input */
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-[11px] font-bold text-slate-400 uppercase">Or login with OTP</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Mobile Number or Email
              </label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="text"
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  placeholder="e.g. 9876543210 or rahul@freshcart.com"
                  className="w-full text-xs pl-9 pr-3.5 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 focus:bg-white transition-all font-medium"
                  required
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                We'll send a one-time verification OTP to your phone or email.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-700/20 transition-all"
            >
              Continue
            </button>
          </form>
        ) : (
          /* OTP Verification Step */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Enter 4-Digit OTP
                </label>
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="text-xs text-brand-700 font-semibold hover:underline"
                >
                  Change
                </button>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Sent to <strong className="text-slate-800">{phoneOrEmail}</strong> (Demo code: <strong>5482</strong>)
              </p>

              <div className="flex items-center justify-center space-x-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-12 h-12 text-center font-bold text-lg rounded-xl border border-slate-300 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-700/20 transition-all"
            >
              Verify & Log In
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center space-x-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-brand-600" />
          <span>100% Privacy & Data Protection Guaranteed</span>
        </div>

      </div>
    </div>
  );
};
