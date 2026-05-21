/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Search, SlidersHorizontal, Eye, Plus, Check, Star, Landmark } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, CATEGORIES } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface ProductsProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function Products({ onAddToCart }: ProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [modalQty, setModalQty] = useState<number>(1);

  // Close Quick view modal on Escape key press
  useEffect(() => {
    if (!selectedProduct) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
        setModalQty(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct]);

  // Performance Optimization: Cache Filtered & Sorted List via useMemo
  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = !query ||
                            product.name.toLowerCase().includes(query) ||
                            product.description.toLowerCase().includes(query) ||
                            (product.origin && product.origin.toLowerCase().includes(query));
      
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        default: // popular - show best sellers or new arrivals first
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          if (a.isNewArrival && !b.isNewArrival) return -1;
          if (!a.isNewArrival && b.isNewArrival) return 1;
          return 0;
      }
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleAddToCartClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  const handleModalAddToCart = (product: Product) => {
    onAddToCart(product, modalQty);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
    // Close modal
    setSelectedProduct(null);
    setModalQty(1);
  };

  const getCategoryLabel = (catId: string) => {
    switch (catId) {
      case 'decor': return 'Home Decor';
      case 'gifts': return 'Primitive Gifts';
      case 'seasonal': return 'Seasonal Highlights';
      case 'kitchen': return 'Kitchen & Table';
      case 'accessories': return 'Cozy Accents';
      default: return 'All';
    }
  };

  return (
    <section 
      id="products" 
      className="bg-farm-cream py-28 md:py-36 border-b border-farm-beige scroll-mt-24 md:scroll-mt-32"
      role="region"
      aria-label="Farmhouse Products Shelf"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-farm-clay rounded-full"></span>
            <span className="text-xs uppercase tracking-[0.25em] text-farm-clay font-mono font-bold block">
              Our Shoppable Shelves
            </span>
            <span className="w-1.5 h-1.5 bg-farm-clay rounded-full"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-farm-charcoal leading-tight">
            Browse Our Farmhouse Treasures
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-[1px] bg-farm-sage/30"></div>
            <div className="text-[10px] text-farm-sage font-serif italic">Y'all Welcome Always</div>
            <div className="w-10 h-[1px] bg-farm-sage/30"></div>
          </div>
          <p className="text-sm sm:text-base font-sans text-farm-charcoal/75 leading-relaxed max-w-lg mx-auto italic">
            Each item is thoughtfully selected or handcrafted to invoke sweet Southern hospitality and cozy, primitive warmth. Y'all stay a while!
          </p>
        </div>

        {/* Toolbar & Filter Controls Grid */}
        <div className="bg-farm-cream p-4 rounded-xl border border-farm-beige shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Elegant Search Bar */}
            <div className="relative w-full md:max-w-sm">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-farm-charcoal/40 pointer-events-none" aria-hidden="true">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search soy candles, wooden frames..."
                className="w-full pl-9 pr-12 py-2.5 bg-farm-cream rounded-lg border border-farm-sage/35 text-farm-charcoal text-sm outline-none focus:border-farm-clay focus:ring-1 focus:ring-farm-clay/35 transition-all"
                aria-label="Search farmhouse treasures"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-farm-charcoal/40 hover:text-farm-clay cursor-pointer"
                  aria-label="Clear search input"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Custom Category Tab Filters (Horizontal Scroll on Mobile) */}
            <div 
              className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none"
              role="tablist"
              aria-label="Product category tabs"
            >
              <button
                role="tab"
                aria-selected={selectedCategory === 'all'}
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-farm-sage text-farm-cream shadow-sm'
                    : 'bg-farm-cream text-farm-charcoal/70 hover:bg-farm-beige border border-farm-beige'
                }`}
                aria-label="Show all farmhouse treasures"
              >
                All Treasures
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={selectedCategory === cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-farm-sage text-farm-cream shadow-sm'
                      : 'bg-farm-cream text-farm-charcoal/70 hover:bg-farm-beige border border-farm-beige'
                  }`}
                  aria-label={`Show ${cat.name}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort Dropdown Selector */}
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
              <SlidersHorizontal className="w-4 h-4 text-farm-charcoal/50" aria-hidden="true" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-farm-cream border border-farm-sage/35 rounded-lg text-xs py-2 px-3 focus:outline-none focus:border-farm-clay text-farm-charcoal/80 outline-none cursor-pointer"
                aria-label="Sort products display order"
              >
                <option value="popular">Sorted by: Popularity</option>
                <option value="rating">Sorted by: Highly Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="alphabetical">Sorted by: A to Z</option>
              </select>
            </div>

          </div>
        </div>

        {/* Product Cards Grid Section */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-gingham rounded-2xl border border-dashed border-farm-beige px-6">
            <h3 className="font-serif font-bold text-xl text-farm-charcoal">
              No farmhouse treasures found, friend!
            </h3>
            <p className="text-sm font-sans text-farm-charcoal/60 mt-2 max-w-sm mx-auto">
              We couldn't locate any matches for "{searchQuery}". Try browsing another cozy category or clear the search.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-farm-sage bg-farm-cream border border-farm-sage px-4 py-2 rounded-lg hover:bg-farm-beige transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            role="feed"
            aria-busy="false"
            aria-label="Products list grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => {
                const isAdded = addedProductId === product.id;
                
                return (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white border border-farm-beige rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-farm-sage/55 hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-farm-sage/40 focus-within:border-farm-sage/50 transition-all duration-300 flex flex-col h-full relative"
                    id={`product-card-${product.id}`}
                    role="article"
                    aria-label={product.name}
                  >
                    
                    {/* Image Area with Zoom Effects */}
                    <div className="relative pt-[100%] overflow-hidden bg-farm-cream border-b border-farm-beige">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08] group-focus-within:scale-[1.08]"
                      />

                      {/* Accent Ribbons */}
                      <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 pointer-events-none">
                        {product.isBestSeller && (
                          <span className="bg-farm-clay text-farm-cream text-[9px] font-mono font-bold px-2 py-0.5 rounded tracking-wider uppercase shadow-xs">
                            Best Seller
                          </span>
                        )}
                        {product.isNewArrival && (
                          <span className="bg-farm-sage text-farm-cream text-[9px] font-mono font-bold px-2 py-0.5 rounded tracking-wider uppercase shadow-xs">
                            New Arrival
                          </span>
                        )}
                      </div>

                      {/* Image Action Overlay (Quick View & Favorites) */}
                      <div className="absolute inset-0 bg-farm-charcoal/20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedProduct(product)}
                          className="bg-farm-cream text-farm-charcoal hover:bg-farm-clay hover:text-farm-cream hover:rotate-12 hover:scale-110 p-2.5 rounded-full shadow-md transition-all scale-90 group-hover:scale-100 group-focus-within:scale-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-farm-clay"
                          title="Quick View Details"
                          aria-label={`Quick view details for ${product.name}`}
                        >
                          <Eye className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </div>

                    </div>

                    {/* Meta/Text Info Details */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                      
                      <div className="space-y-1.5">
                        {/* Category & Origin Indicator */}
                        <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest font-semibold text-farm-sage pr-1">
                          <span>{getCategoryLabel(product.category)}</span>
                          {product.origin && (
                            <span className="text-farm-clay text-[9px] font-medium flex items-center gap-0.5">
                              <Landmark className="w-2.5 h-2.5" />
                              {product.origin}
                            </span>
                          )}
                        </div>

                        {/* Product Title */}
                        <h3 className="font-serif font-bold text-base text-farm-charcoal group-hover:text-farm-sage transition-colors line-clamp-1">
                          {product.name}
                        </h3>

                        {/* Stars Rating Display */}
                        <div className="flex items-center gap-1" role="img" aria-label={`Rated ${product.rating.toFixed(1)} out of 5 stars`}>
                          <div className="flex text-amber-500" aria-hidden="true">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'opacity-30'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-mono text-farm-charcoal/50 pr-1" aria-hidden="true">
                            ({product.rating.toFixed(1)})
                          </span>
                        </div>

                        {/* Short Description */}
                        <p className="text-xs text-farm-charcoal/65 font-sans line-clamp-2 md:line-clamp-3 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Pricing & Add to Cart Action */}
                      <div className="flex items-center justify-between pt-2 border-t border-farm-beige/65">
                        <div className="font-serif text-lg font-bold text-farm-charcoal">
                          ${product.price.toFixed(2)}
                          {product.dimensions && (
                            <span className="block text-[10px] font-mono text-farm-charcoal/40 font-normal mt-0.5">
                              Size: {product.dimensions}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={(e) => handleAddToCartClick(e, product)}
                          disabled={isAdded}
                          className={`px-3.5 py-2.5 rounded-lg text-xs font-sans font-semibold tracking-wide transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-600 text-farm-cream cursor-default scale-100'
                              : 'bg-farm-sage hover:bg-farm-sage-dark text-farm-cream hover:scale-105 active:scale-95'
                          }`}
                          aria-label={isAdded ? `${product.name} added to cart` : `Add ${product.name} to shopping cart`}
                          id={`add-btn-${product.id}`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>

      {/* QUICK VIEW DETAIL MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div 
            className="fixed inset-0 z-50 overflow-y-auto bg-farm-charcoal/60 backdrop-blur-xs flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-product-title"
            aria-describedby="modal-product-desc"
          >
            
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-farm-cream rounded-2xl w-full max-w-3xl border border-farm-beige shadow-2xl overflow-hidden relative font-sans leading-relaxed"
            >
              
              {/* Close Button */}
              <button
                onClick={() => { setSelectedProduct(null); setModalQty(1); }}
                className="absolute top-4 right-4 z-10 bg-farm-cream p-2 rounded-full border border-farm-beige hover:border-farm-clay text-farm-charcoal/60 hover:text-farm-clay transition-all cursor-pointer shadow-xs focus:ring-2 focus:ring-farm-clay outline-none"
                id="close-modal-btn"
                aria-label="Close product quick view modal"
              >
                Close ×
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                
                {/* Image Section */}
                <div className="relative pt-[90%] md:pt-0 md:h-[450px] bg-farm-cream border-r border-farm-beige/70">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {selectedProduct.isBestSeller && (
                    <span className="absolute top-4 left-4 bg-farm-clay text-farm-cream text-[9px] font-mono font-bold px-2.5 py-1 rounded tracking-widest uppercase">
                      Best Seller
                    </span>
                  )}
                </div>

                {/* Content Info Section */}
                <div className="p-6 sm:p-8 flex flex-col justify-between h-full bg-gingham-clay min-h-[380px] md:min-h-[450px]">
                  
                  <div className="space-y-4">
                    
                    {/* Category Label */}
                    <span className="text-[10px] font-mono font-bold tracking-widest text-farm-sage uppercase block">
                      {getCategoryLabel(selectedProduct.category)}
                    </span>

                    {/* Headline Name */}
                    <h3 id="modal-product-title" className="font-serif font-bold text-2xl text-farm-charcoal leading-tight">
                      {selectedProduct.name}
                    </h3>

                    {/* Rating Bar */}
                    <div className="flex items-center gap-1.5" role="img" aria-label={`Rated ${selectedProduct.rating.toFixed(1)} out of 5 stars`}>
                      <div className="flex text-amber-500" aria-hidden="true">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'opacity-20'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs font-mono font-bold text-farm-charcoal/60" aria-hidden="true">
                        {selectedProduct.rating.toFixed(1)} out of 5 stars
                      </span>
                    </div>

                    {/* Long Narrative Description */}
                    <p id="modal-product-desc" className="text-xs sm:text-sm text-farm-charcoal/75">
                      {selectedProduct.description}
                    </p>

                    {/* Crafting Metadata Spec Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-farm-beige">
                      <div>
                        <span className="block text-[9px] font-mono text-farm-charcoal/40 uppercase">
                          CRAFT ORIGIN
                        </span>
                        <span className="text-xs font-serif font-bold text-farm-sage-dark">
                          {selectedProduct.origin || "Kentucky Local Crafts"}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[9px] font-mono text-farm-charcoal/40 uppercase">
                          DIMENSIONS
                        </span>
                        <span className="text-xs font-mono text-farm-charcoal/70">
                          {selectedProduct.dimensions || "N/A"}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Add to Cart Actions Block */}
                  <div className="pt-6 border-t border-farm-beige flex gap-4 items-center justify-between">
                    
                    <div>
                      <span className="block text-[9px] font-mono text-farm-charcoal/40 uppercase">
                        PRICE
                      </span>
                      <span className="text-xl font-serif font-bold text-farm-charcoal">
                        ${selectedProduct.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity Selector plus Button */}
                    <div className="flex items-center gap-3">
                      
                      <div className="flex items-center border border-farm-sage/40 rounded-lg overflow-hidden bg-farm-cream" role="group" aria-label="Quantity controls">
                        <button
                          onClick={() => setModalQty(q => Math.max(1, q - 1))}
                          className="px-3 py-1.5 text-xs font-mono font-extrabold text-farm-charcoal/70 hover:bg-farm-beige transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-3.5 py-1 text-xs font-mono font-bold text-farm-charcoal" aria-label={`Selected quantity ${modalQty}`}>
                          {modalQty}
                        </span>
                        <button
                          onClick={() => setModalQty(q => q + 1)}
                          className="px-3 py-1.5 text-xs font-mono font-extrabold text-farm-charcoal/70 hover:bg-farm-beige transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleModalAddToCart(selectedProduct)}
                        className="bg-farm-clay hover:bg-farm-clay-dark text-farm-cream text-xs font-semibold py-2.5 px-5 rounded-lg transition-transform hover:scale-105 active:scale-95 shadow-sm cursor-pointer flex items-center gap-1"
                        id="modal-add-btn"
                        aria-label={`Add ${modalQty} ${selectedProduct.name} to shopping cart for $${(selectedProduct.price * modalQty).toFixed(2)}`}
                      >
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Add ${ (selectedProduct.price * modalQty).toFixed(2) }</span>
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
