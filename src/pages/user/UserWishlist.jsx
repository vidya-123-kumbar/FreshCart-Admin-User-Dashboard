import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { fallbackImage } from '../../data/products';

export const UserWishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart, showToast } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`Added ${product.name} to cart!`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            My Wishlist
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Products you have saved to buy later
          </p>
        </div>
        <div className="bg-rose-50 text-rose-700 px-3.5 py-1.5 rounded-2xl text-xs font-bold border border-rose-200 flex items-center space-x-1.5">
          <Heart className="w-4 h-4 fill-current" />
          <span>{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</span>
        </div>
      </div>

      {/* Wishlist Items Grid */}
      {wishlist.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-soft">
          <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mx-auto mb-3">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">Your wishlist is empty</h3>
          <p className="text-xs text-slate-400 mt-1 mb-5">
            Save items that you like and come back to them anytime.
          </p>
          <Link
            to="/shop"
            className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all inline-block"
          >
            Explore Grocery Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-4 flex flex-col justify-between hover:shadow-card-hover transition-all group"
            >
              <div>
                <div className="relative pt-[70%] bg-slate-50 rounded-xl overflow-hidden mb-3">
                  <img
                    src={product.image || fallbackImage}
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = fallbackImage;
                    }}
                    className="absolute inset-0 w-full h-full object-contain p-3 group-hover:scale-105 transition-transform"
                  />
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 shadow-xs transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-[10px] font-bold text-brand-700 uppercase tracking-wider mb-1">
                  {product.brand || 'FreshCart'}
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className="font-bold text-slate-800 text-xs line-clamp-2 hover:text-brand-700 transition-colors mb-2"
                >
                  {product.name}
                </Link>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-3">
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-sm font-black text-slate-900">
                    ₹{product.price}
                  </span>
                  {product.mrp > product.price && (
                    <span className="text-[11px] text-slate-400 line-through">
                      ₹{product.mrp}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 bg-brand-700 hover:bg-brand-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
