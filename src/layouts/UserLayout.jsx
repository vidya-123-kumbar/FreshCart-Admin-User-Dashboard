import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Heart, 
  User, 
  MapPin, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const UserLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', to: '/user', icon: LayoutDashboard, end: true },
    { label: 'My Orders', to: '/user/orders', icon: ShoppingBag },
    { label: 'Wishlist', to: '/user/wishlist', icon: Heart },
    { label: 'Profile', to: '/user/profile', icon: User },
    { label: 'Addresses', to: '/user/addresses', icon: MapPin },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-[calc(100vh-140px)] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Navigation bar */}
        <div className="lg:hidden mb-6 bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex items-center overflow-x-auto space-x-1 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-brand-700 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Desktop 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-5 sticky top-28">
              {/* User Avatar Mini Card */}
              <div className="flex items-center space-x-3 pb-5 mb-5 border-b border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-200 text-brand-700 font-black text-lg flex items-center justify-center shadow-xs">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-bold text-slate-900 truncate">
                    {user?.name || 'FreshCart User'}
                  </h2>
                  <p className="text-xs text-slate-500 truncate">
                    {user?.email || 'customer@freshcart.com'}
                  </p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-brand-50 text-brand-800 border-l-4 border-brand-700 font-extrabold shadow-2xs'
                            : 'text-slate-600 hover:text-brand-700 hover:bg-slate-50'
                        }`
                      }
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                    </NavLink>
                  );
                })}

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors mt-4 pt-3 border-t border-slate-100"
                >
                  <div className="flex items-center space-x-3">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Dashboard Content */}
          <main className="lg:col-span-9 min-w-0">
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
};
