import React, { useState } from 'react';
import { Tag, Plus, Trash2, Power, CheckCircle2, X, Percent, IndianRupee } from 'lucide-react';
import { useOffers } from '../../context/OfferContext';
import { useCart } from '../../context/CartContext';

export const AdminOffers = () => {
  const { offers, addOffer, deleteOffer, toggleOfferStatus } = useOffers();
  const { showToast } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    code: '',
    title: '',
    discountType: 'flat',
    discountValue: '',
    minOrder: '299',
    description: '',
  });

  const handleCreateOffer = (e) => {
    e.preventDefault();
    if (!form.code.trim() || !form.discountValue) {
      showToast('Please enter offer code and discount amount', 'info');
      return;
    }

    addOffer(form);
    showToast(`Offer ${form.code.toUpperCase()} added successfully`);
    setForm({
      code: '',
      title: '',
      discountType: 'flat',
      discountValue: '',
      minOrder: '299',
      description: '',
    });
    setIsModalOpen(false);
  };

  const handleDelete = (idOrCode, code) => {
    if (window.confirm(`Delete offer coupon "${code}"?`)) {
      deleteOffer(idOrCode);
      showToast(`Offer ${code} deleted`, 'info');
    }
  };

  const handleToggle = (idOrCode, code, currentStatus) => {
    toggleOfferStatus(idOrCode);
    showToast(`Offer ${code} is now ${currentStatus ? 'Inactive' : 'Active'}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Promotional Offers & Coupons
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage discount codes, vouchers, and cart promo campaigns
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-white rounded-xl font-bold text-xs shadow-md shadow-brand-700/20 transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Offer</span>
        </button>
      </div>

      {/* Offers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {offers.map((offer) => (
          <div
            key={offer.id || offer.code}
            className={`bg-white rounded-2xl border p-5 shadow-soft flex flex-col justify-between transition-all ${
              offer.isActive
                ? 'border-emerald-200/80 bg-white'
                : 'border-slate-200/70 bg-slate-50/70 opacity-75'
            }`}
          >
            <div>
              {/* Status Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono font-black text-sm text-brand-900 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-lg tracking-wider">
                  {offer.code}
                </span>

                <button
                  type="button"
                  onClick={() => handleToggle(offer.id || offer.code, offer.code, offer.isActive)}
                  className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                    offer.isActive
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300'
                  }`}
                  title="Click to toggle status"
                >
                  <Power className="w-3 h-3" />
                  <span>{offer.isActive ? 'Active' : 'Inactive'}</span>
                </button>
              </div>

              {/* Discount Title */}
              <div className="text-xl font-black text-slate-900 mb-1">
                {offer.title ||
                  (offer.discountType === 'percentage'
                    ? `${offer.discountValue}% OFF`
                    : `₹${offer.discountValue} OFF`)}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 font-medium line-clamp-2 mb-3">
                {offer.description || `Applicable on orders above ₹${offer.minOrder}`}
              </p>

              {/* Min Order requirement */}
              <div className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md inline-block">
                Min Order: ₹{offer.minOrder}
              </div>
            </div>

            {/* Actions: Delete */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
              <span className="text-[11px] text-slate-400 font-medium">
                {offer.discountType === 'percentage' ? 'Percentage discount' : 'Flat rupee discount'}
              </span>

              <button
                type="button"
                onClick={() => handleDelete(offer.id || offer.code, offer.code)}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Delete Offer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Simple Add Offer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-black text-slate-900 mb-1">
              Add Promotional Offer
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Create a new coupon code for customer checkout discounts
            </p>

            <form onSubmit={handleCreateOffer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. SUMMER30"
                  required
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 uppercase font-mono font-bold focus:outline-none focus:border-brand-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Discount Type
                  </label>
                  <select
                    value={form.discountType}
                    onChange={(e) => setForm({ ...form, discountType: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-brand-600"
                  >
                    <option value="flat">Flat ₹ OFF</option>
                    <option value="percentage">Percentage % OFF</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Discount Value *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.discountValue}
                    onChange={(e) => setForm({ ...form, discountValue: e.target.value })}
                    placeholder={form.discountType === 'flat' ? '50' : '15'}
                    required
                    className="w-full text-xs px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 font-bold focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Minimum Order Amount (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.minOrder}
                  onChange={(e) => setForm({ ...form, minOrder: e.target.value })}
                  placeholder="299"
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="e.g. Save ₹50 on minimum grocery cart of ₹399"
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 font-medium focus:outline-none focus:border-brand-600"
                />
              </div>

              <div className="pt-3 flex items-center justify-end space-x-3">
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
                  Create Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
