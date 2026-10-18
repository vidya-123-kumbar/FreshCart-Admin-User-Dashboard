import React, { useState } from 'react';
import { Users, Search, Mail, Phone } from 'lucide-react';

const INITIAL_CUSTOMERS = [
  {
    id: 'c-1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '9876543210',
    orders: 3,
    status: 'Active',
    joined: 'Jan 2026',
  },
  {
    id: 'c-2',
    name: 'Priya Patel',
    email: 'priya.patel@gmail.com',
    phone: '9811223344',
    orders: 5,
    status: 'Active',
    joined: 'Feb 2026',
  },
  {
    id: 'c-3',
    name: 'Amit Verma',
    email: 'amit.verma@yahoo.com',
    phone: '9822334455',
    orders: 2,
    status: 'Active',
    joined: 'Mar 2026',
  },
  {
    id: 'c-4',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@gmail.com',
    phone: '9833445566',
    orders: 8,
    status: 'Active',
    joined: 'Dec 2025',
  },
  {
    id: 'c-5',
    name: 'Karthik Iyer',
    email: 'karthik.iyer@outlook.com',
    phone: '9844556677',
    orders: 1,
    status: 'Active',
    joined: 'Apr 2026',
  },
  {
    id: 'c-6',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@gmail.com',
    phone: '9855667788',
    orders: 4,
    status: 'Active',
    joined: 'May 2026',
  },
];

export const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = INITIAL_CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Registered Customers
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Directory of customers registered on FreshCart
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold px-3.5 py-1.5 rounded-xl">
          Total: {INITIAL_CUSTOMERS.length} Customers
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-soft">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customer by name, email, or phone number..."
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 focus:bg-white transition-all font-medium"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 uppercase font-bold text-[11px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Orders</th>
                <th className="py-3.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400">
                    <Users className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                    No customers found matching "{searchTerm}".
                  </td>
                </tr>
              ) : (
                filtered.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Name & Initial */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-900">{customer.name}</div>
                          <div className="text-[10px] text-slate-400">Joined {customer.joined}</div>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {customer.email}
                    </td>

                    {/* Phone */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {customer.phone}
                    </td>

                    {/* Orders */}
                    <td className="py-3.5 px-4">
                      <span className="font-black text-slate-900">{customer.orders}</span>{' '}
                      <span className="text-slate-400">orders</span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
