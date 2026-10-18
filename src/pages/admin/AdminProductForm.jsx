import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { fallbackImage } from '../../data/products';

export const AdminProductForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, getProductById } = useProducts();
  const { showToast } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'fruits-vegetables',
    price: '',
    mrp: '',
    stock: '50',
    image: '',
    quantity: '1 unit',
  });

  useEffect(() => {
    if (isEdit) {
      const existing = getProductById(id);
      if (existing) {
        setFormData({
          name: existing.name || '',
          brand: existing.brand || '',
          category: existing.category || 'fruits-vegetables',
          price: existing.price !== undefined ? String(existing.price) : '',
          mrp: existing.mrp !== undefined ? String(existing.mrp) : '',
          stock: existing.stock !== undefined ? String(existing.stock) : '50',
          image: existing.image || '',
          quantity: existing.quantity || '1 unit',
        });
      }
    }
  }, [id, isEdit, products]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price) {
      showToast('Please enter required product name and price', 'info');
      return;
    }

    if (isEdit) {
      updateProduct(id, formData);
      showToast('Product updated successfully');
    } else {
      addProduct(formData);
      showToast('Product added successfully');
    }

    navigate('/admin/products');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft">
        <Link
          to="/admin/products"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-brand-700 transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </Link>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {isEdit
            ? 'Update grocery item specifications and pricing'
            : 'Fill in details to list a new item in FreshCart'}
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Product Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Product Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Organic Alphonso Mangoes"
              required
              className="w-full text-xs px-3.5 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 focus:bg-white transition-all font-semibold text-slate-800"
            />
          </div>

          {/* Brand & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Brand Name
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="e.g. FreshFarm / Amul / Tata"
                className="w-full text-xs px-3.5 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 focus:bg-white transition-all font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full text-xs px-3.5 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 focus:bg-white transition-all font-semibold text-slate-800"
              >
                <option value="fruits-vegetables">Fruits & Vegetables</option>
                <option value="dairy-bakery">Dairy & Bakery</option>
                <option value="staples">Staples & Cooking Essentials</option>
                <option value="snacks">Snacks & Beverages</option>
                <option value="personal-care">Personal Care</option>
                <option value="household">Household Cleaning</option>
              </select>
            </div>
          </div>

          {/* Pricing: Price, MRP, Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Selling Price (₹) *
              </label>
              <input
                type="number"
                min="1"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="149"
                required
                className="w-full text-xs px-3.5 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 focus:bg-white transition-all font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                MRP (₹)
              </label>
              <input
                type="number"
                min="1"
                value={formData.mrp}
                onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                placeholder="199"
                className="w-full text-xs px-3.5 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 focus:bg-white transition-all font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Stock Quantity
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="50"
                className="w-full text-xs px-3.5 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 focus:bg-white transition-all font-semibold text-slate-800"
              />
            </div>
          </div>

          {/* Quantity text (e.g. 1 kg) & Image URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Package / Unit (Weight/Vol)
              </label>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="e.g. 1 kg, 500 g, 1 L"
                className="w-full text-xs px-3.5 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 focus:bg-white transition-all font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full text-xs px-3.5 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-600 focus:bg-white transition-all font-medium text-slate-800"
              />
            </div>
          </div>

          {/* Image preview */}
          {formData.image && (
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                Image Preview
              </span>
              <div className="w-24 h-24 rounded-xl border border-slate-200 p-1 bg-slate-50 flex items-center justify-center overflow-hidden">
                <img
                  src={formData.image}
                  alt="Preview"
                  onError={(e) => {
                    e.target.src = fallbackImage;
                  }}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}

          {/* Submit Actions */}
          <div className="pt-4 flex items-center space-x-3">
            <button
              type="submit"
              className="px-8 py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-700/20 transition-all active:scale-98"
            >
              {isEdit ? 'Save Changes' : 'Add Product'}
            </button>
            <Link
              to="/admin/products"
              className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-colors"
            >
              Cancel
            </Link>
          </div>

        </form>
      </div>

    </div>
  );
};
