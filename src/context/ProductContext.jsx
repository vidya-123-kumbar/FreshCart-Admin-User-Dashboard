import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as defaultProducts } from '../data/products';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('freshcart_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return defaultProducts;
    } catch {
      return defaultProducts;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('freshcart_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save freshcart_products to localStorage', e);
    }
  }, [products]);

  const addProduct = (productData) => {
    const newId = `prod-${Date.now()}`;
    const newProduct = {
      id: newId,
      name: productData.name,
      brand: productData.brand || 'FreshCart',
      category: productData.category || 'fruits-vegetables',
      price: Number(productData.price) || 0,
      mrp: Number(productData.mrp) || Number(productData.price) || 0,
      discount: productData.mrp && productData.price && Number(productData.mrp) > Number(productData.price)
        ? Math.round(((Number(productData.mrp) - Number(productData.price)) / Number(productData.mrp)) * 100)
        : 0,
      rating: 4.5,
      reviewCount: 1,
      quantity: productData.quantity || '1 unit',
      inStock: productData.stock !== undefined ? Number(productData.stock) > 0 : true,
      stock: productData.stock !== undefined ? Number(productData.stock) : 50,
      image: productData.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
      images: [
        productData.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
      ],
      description: productData.description || `${productData.name} - premium quality grocery item.`,
      specifications: {
        'Pack Type': 'Pouch / Box',
        'Shelf Life': '7 to 15 days',
      },
      nutrition: { Calories: '45 kcal' },
      reviews: [],
    };

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const price = updatedData.price !== undefined ? Number(updatedData.price) : item.price;
          const mrp = updatedData.mrp !== undefined ? Number(updatedData.mrp) : item.mrp;
          const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
          return {
            ...item,
            ...updatedData,
            price,
            mrp,
            discount,
            stock: updatedData.stock !== undefined ? Number(updatedData.stock) : (item.stock ?? 50),
            inStock: updatedData.stock !== undefined ? Number(updatedData.stock) > 0 : item.inStock,
          };
        }
        return item;
      })
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const getProductById = (id) => {
    return products.find((p) => p.id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
