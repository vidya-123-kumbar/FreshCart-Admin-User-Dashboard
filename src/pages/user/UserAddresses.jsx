import React, { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, CheckCircle2, X } from 'lucide-react';
import { useAddresses } from '../../context/AddressContext';
import { useCart } from '../../context/CartContext';

export const UserAddresses = () => {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAddresses();
  const { showToast } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    tag: 'Home',
    name: 'Rahul Sharma',
    phone: '9876543210',
    addressLine: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '',
    isDefault: false,
  };

  const [form, setForm] = useState(initialForm);

  const openAddModal = () => {
    setEditingId(null);
    setForm(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (addr) => {
    setEditingId(addr.id);
    setForm({
      tag: addr.tag || 'Home',
      name: addr.name || '',
      phone: addr.phone || '',
      addressLine: addr.addressLine || '',
      city: addr.city || 'Bengaluru',
      state: addr.state || 'Karnataka',
      pincode: addr.pincode || '',
      isDefault: !!addr.isDefault,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.addressLine.trim() || !form.pincode.trim()) {
      showToast('Please fill in required address fields', 'info');
      return;
    }

    if (editingId) {
      updateAddress(editingId, form);
      showToast('Address updated successfully');
    } else {
      addAddress(form);
      showToast('Address added successfully');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteAddress(id);
    showToast('Address deleted', 'info');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Saved Addresses
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your grocery delivery locations for quick checkout
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-white rounded-xl font-bold text-xs shadow-md shadow-brand-700/20 transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Address</span>
        </button>
      </div>

      {/* Address Cards Grid */}
      {addresses.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-soft">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-3">
            <MapPin className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No saved addresses</h3>
          <p className="text-xs text-slate-400 mt-1 mb-5">
            Add a home or work address for fast delivery.
          </p>
          <button
            type="button"
            onClick={openAddModal}
            className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all inline-block"
          >
            + Add First Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`bg-white rounded-2xl border p-5 shadow-soft flex flex-col justify-between transition-all ${
                addr.isDefault
                  ? 'border-brand-500/80 ring-1 ring-brand-500/20'
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-brand-50 border border-brand-200 text-brand-800 font-extrabold text-[10px] uppercase">
                    {addr.tag}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Default Delivery
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 mt-1">
                  {addr.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                  {addr.addressLine}
                </p>
                <p className="text-xs text-slate-600 font-medium">
                  {addr.city}, {addr.state || 'Karnataka'}
                </p>
                <p className="text-xs font-bold text-slate-700 mt-0.5">
                  {addr.pincode}
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Phone: <span className="font-semibold text-slate-600">{addr.phone}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(addr)}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-brand-500 text-slate-600 hover:text-brand-700 text-xs font-bold transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(addr.id)}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-rose-300 text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>

                {!addr.isDefault && (
                  <button
                    type="button"
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-[11px] font-bold text-brand-700 hover:underline"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Simple Add/Edit Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-black text-slate-900 mb-1">
              {editingId ? 'Edit Address' : 'Add New Address'}
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Enter your grocery delivery location details
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Label (Tag)
                  </label>
                  <select
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 font-semibold"
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full text-xs px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Street Address / Flat / Building
                </label>
                <input
                  type="text"
                  value={form.addressLine}
                  onChange={(e) => setForm({ ...form, addressLine: e.target.value })}
                  placeholder="e.g. Flat 402, Green Glen Layout, Koramangala"
                  required
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 font-semibold"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    required
                    className="w-full text-xs px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    required
                    className="w-full text-xs px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                    placeholder="560034"
                    required
                    className="w-full text-xs px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 font-semibold"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="defaultCheck"
                  checked={form.isDefault}
                  onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                  className="rounded border-slate-300 text-brand-700 focus:ring-brand-500"
                />
                <label htmlFor="defaultCheck" className="text-xs text-slate-600 font-medium cursor-pointer">
                  Set as default delivery address
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold rounded-xl shadow-md shadow-brand-700/20 transition-all"
                >
                  {editingId ? 'Save Changes' : 'Add Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
