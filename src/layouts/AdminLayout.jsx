import React from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Tag, 
  LogOut, 
  Store,
  Shield,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products', to: '/admin/products', icon: Package },
    { label: 'Orders', to: '/admin/orders', icon: ShoppingBag },
    { label: 'Customers', to: '/admin/customers', icon: Users },
    { label: 'Offers', to: '/admin/offers', icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Admin Badge */}
          <div className="flex items-center space-x-3">
            <Link to="/admin/dashboard" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-700 text-white flex items-center justify-center shadow-xs">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black text-brand-950 tracking-tight block leading-tight">
                  Fresh<span className="text-brand-700">Cart</span>
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 inline-block">
                  Admin Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Actions & Admin info */}
          <div className="flex items-center space-x-4">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-brand-700 bg-slate-100 hover:bg-brand-50 px-3 py-1.5 rounded-xl border border-slate-200 transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Storefront</span>
            </Link>

            <div className="flex items-center space-x-2 border-l border-slate-200 pl-4">
              <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center">
                A
              </div>
              <div className="hidden sm:block text-left text-xs leading-tight">
                <div className="font-bold text-slate-800">{user?.name || 'Administrator'}</div>
                <div className="text-[10px] text-slate-400">Store Manager</div>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Mobile Navigation bar */}
        <div className="lg:hidden mb-6 bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex items-center overflow-x-auto space-x-1 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
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

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Admin Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-5 sticky top-24">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3.5 mb-3">
                Store Operations
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
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

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors mt-6 pt-3 border-t border-slate-100"
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

          {/* Admin Content Area */}
          <main className="lg:col-span-9 min-w-0">
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
};
