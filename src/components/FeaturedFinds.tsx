/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Plus, Check, Star, Landmark, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface FeaturedFindsProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function FeaturedFinds({ onAddToCart }: FeaturedFindsProps) {
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

  // Performance Optimization: Cache curated catalog using useMemo
  const featuredProducts = useMemo(() => {
    const featuredIds = ['dec-1', 'gif-1', 'sea-1', 'acc-1'];
    return featuredIds
      .map(id => PRODUCTS.find(p => p.id === id))
      .filter((p): p is Product => p !== undefined);
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  const handleModalAddToCart = (product: Product) => {
    onAddToCart(product, modalQty);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
    setSelectedProduct(null);
    setModalQty(1);
  };

  return (
    <section 
      id="featured" 
      className="bg-[#FCF9F5] bg-parchment py-28 md:py-36 border-b border-farm-beige relative scroll-mt-24 md:scroll-mt-32"
      role="region"
      aria-label="Curated Pieces"
    >
      {/* Editorial Decorative Vines Accent or Side Banner */}
      <div className="absolute top-10 left-10 text-[100px] font-serif text-farm-sage/5 select-none pointer-events-none hidden xl:block font-light" aria-hidden="true">
        Curated Finds
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#D9D1C5] pb-8 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-farm-clay rounded-full"></span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-sans text-farm-clay font-bold block">
                Handpicked Southern Goods
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-farm-charcoal leading-tight">
              Featured <span className="italic font-normal text-farm-clay">Finds</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-farm-wood/90 max-w-sm leading-relaxed italic md:text-right border-l md:border-l-0 md:border-r-2 border-farm-clay/30 pl-4 md:pl-0 md:pr-4 py-1">
            "Bless your home with our seasonal table-spread favorites, hearth accents, and hand-poured candle jars."
          </p>
        </div>

        {/* Modular Grid Layout representing asymmetrical editorial catalogs */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          role="feed"
          aria-label="Curated Featured Finds"
        >
          {featuredProducts.map((product, idx) => {
            const isAdded = addedProductId === product.id;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group flex flex-col justify-between bg-white border border-[#EBE7DF] rounded-2xl overflow-hidden hover:shadow-2xl hover:border-farm-sage/55 hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-farm-sage/40 focus-within:border-farm-sage/40 transition-all duration-300"
                id={`featured-card-${product.id}`}
                role="article"
                aria-label={product.name}
              >
                {/* Visual Image container with soft vignette and action layers */}
                <div 
                  onClick={() => setSelectedProduct(product)}
                  className="relative pt-[115%] overflow-hidden bg-[#EAE5DC] cursor-pointer"
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08] group-focus-within:scale-[1.08]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Gentle hover/focus overlay with eye button */}
                  <div className="absolute inset-0 bg-farm-charcoal/30 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                      className="bg-[#F9F6F1] text-farm-charcoal p-3 rounded-full hover:bg-farm-clay hover:text-white hover:rotate-12 hover:scale-110 shadow-lg transition-all duration-300 scale-90 group-hover:scale-100 group-focus-within:scale-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-farm-clay"
                      aria-label={`Quick look at ${product.name}`}
                    >
                      <Eye className="w-5 h-5 stroke-[2]" />
                    </button>
                  </div>

                  {/* Top-right corner badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none" aria-hidden="true">
                    {product.isBestSeller && (
                      <span className="bg-farm-clay text-white text-[9px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm font-semibold">
                        Best Seller
                      </span>
                    )}
                    {product.isNewArrival && (
                      <span className="bg-farm-sage text-[#F9F6F1] text-[9px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm font-semibold">
                        New
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Tiny Category Tag */}
                    <div className="flex justify-between items-center text-[9px] uppercase tracking-wider font-mono text-farm-sage/70" aria-label="Category and manufacture metadata">
                      <span>
                        {product.category === 'decor' && 'Home Decor'}
                        {product.category === 'gifts' && 'Handmade Gift'}
                        {product.category === 'seasonal' && 'Seasonal Accent'}
                        {product.category === 'accessories' && 'Cozy Accent'}
                        {product.category === 'kitchen' && 'Kitchen & Table'}
                      </span>
                      {product.origin && (
                        <span className="flex items-center gap-0.5" aria-label={`Originated in ${product.origin}`}>
                          <Landmark className="w-2.5 h-2.5 text-farm-clay" />
                          {product.origin}
                        </span>
                      )}
                    </div>

                    {/* Headline */}
                    <h3 
                      onClick={() => setSelectedProduct(product)}
                      className="font-serif text-base text-[#4A3F35] font-medium leading-snug hover:text-farm-clay transition-colors cursor-pointer line-clamp-2"
                    >
                      {product.name}
                    </h3>

                    {/* Simple Stars display */}
                    <div className="flex items-center gap-1" role="img" aria-label={`Rated ${product.rating.toFixed(1)} out of 5 stars`}>
                      <div className="flex text-amber-500" aria-hidden="true">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'opacity-20'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-farm-charcoal/50" aria-hidden="true">
                        ({product.rating})
                      </span>
                    </div>

                    {/* Short text snippet */}
                    <p className="text-xs text-farm-charcoal/70 font-sans line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Add action row */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#EBE7DF]">
                    <span className="font-serif text-base font-bold text-farm-charcoal">
                      ${product.price.toFixed(2)}
                    </span>

                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={isAdded}
                      className={`px-3 py-2 rounded-full text-xs tracking-wider transition-all shadow-sm flex items-center gap-1 cursor-pointer font-sans uppercase ${
                        isAdded
                          ? 'bg-emerald-600 text-[#F9F6F1] cursor-default'
                          : 'bg-farm-sage text-[#F9F6F1] hover:bg-farm-sage-dark hover:scale-[1.03]'
                      }`}
                      aria-label={isAdded ? `${product.name} Added` : `Buy ${product.name}`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3 h-3 stroke-[2.5]" aria-hidden="true" />
                          <span className="text-[10px] font-bold">Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3 stroke-[2.5]" aria-hidden="true" />
                          <span className="text-[10px] font-bold">Buy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* QUICK VIEW PREVIEW MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div 
            className="fixed inset-0 z-50 overflow-y-auto bg-farm-charcoal/65 backdrop-blur-xs flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="fea-modal-title"
            aria-describedby="fea-modal-desc"
          >
            
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="bg-[#FBF9F5] rounded-3xl w-full max-w-3xl border border-[#D9D1C5] shadow-2xl overflow-hidden relative font-sans leading-relaxed text-[#4A3F35]"
            >
              
              {/* Close Button */}
              <button
                onClick={() => { setSelectedProduct(null); setModalQty(1); }}
                className="absolute top-4 right-4 z-10 bg-[#FBF9F5] p-2 rounded-full border border-[#D9D1C5] hover:border-farm-clay hover:text-farm-clay text-farm-charcoal/60 transition-all cursor-pointer shadow-xs font-mono text-xs focus:ring-2 focus:ring-farm-clay outline-none"
                id="close-featured-modal"
                aria-label="Close featured quick view modal"
              >
                ✕ Close
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                
                {/* Asymmetric Product Showcase Image */}
                <div className="relative pt-[100%] md:pt-0 md:h-[460px] bg-[#EAE5DC]">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {selectedProduct.isBestSeller && (
                    <span className="absolute top-4 left-4 bg-farm-clay text-white text-[9px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm font-semibold pointer-events-none" aria-hidden="true">
                      Best Seller
                    </span>
                  )}
                </div>

                {/* Editorial-style specs details info column */}
                <div className="p-6 sm:p-8 flex flex-col justify-between h-full min-h-[380px] md:min-h-[460px] bg-gradient-to-br from-[#FAF8F5] to-[#F3EEE5]">
                  
                  <div className="space-y-4">
                    {/* Origin sticker */}
                    <span className="text-[10px] font-mono tracking-widest text-farm-clay uppercase font-bold block">
                      {selectedProduct.category.toUpperCase()} • {selectedProduct.origin || "Kentucky Local craft"}
                    </span>

                    {/* Headline h3 */}
                    <h3 id="fea-modal-title" className="font-serif text-2xl text-[#4A3F35] font-semibold leading-tight">
                      {selectedProduct.name}
                    </h3>

                    {/* Rating stars */}
                    <div className="flex items-center gap-1.5" role="img" aria-label={`Rated ${selectedProduct.rating.toFixed(1)} out of 5 stars`}>
                      <div className="flex text-amber-500" aria-hidden="true">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'opacity-20'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs font-mono text-farm-charcoal/60" aria-hidden="true">
                        {selectedProduct.rating.toFixed(1)} / 5 stars
                      </span>
                    </div>

                    {/* Narrative Description text */}
                    <p id="fea-modal-desc" className="text-xs sm:text-sm text-[#6B5E54] leading-relaxed">
                      {selectedProduct.description}
                    </p>

                    {/* Size and specs bar */}
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#D9D1C5]">
                      <div>
                        <span className="block text-[9px] font-sans text-farm-wood/60 uppercase tracking-wider">
                          Dimensions
                        </span>
                        <span className="text-xs font-mono text-[#4A3F35] font-semibold">
                          {selectedProduct.dimensions || "Aesthetic Accent"}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[9px] font-sans text-farm-wood/60 uppercase tracking-wider">
                          Artisan Origin
                        </span>
                        <span className="text-xs font-serif text-[#4A3F35] font-semibold">
                          {selectedProduct.origin || "Hand-selected Piece"}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Actions Block */}
                  <div className="pt-6 border-t border-[#D9D1C5] flex gap-4 items-center justify-between">
                    <div>
                      <span className="block text-[9px] font-sans text-farm-wood/60 uppercase tracking-wider">
                        Price
                      </span>
                      <span className="text-xl font-serif font-bold text-farm-charcoal">
                        ${selectedProduct.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Simple stepper and add-to-cart button */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-[#D9D1C5] rounded-xl overflow-hidden bg-[#FAF8F5]" role="group" aria-label="Quantity selector">
                        <button
                          onClick={() => setModalQty(q => Math.max(1, q - 1))}
                          className="px-2.5 py-1 text-xs font-mono text-[#4A3F35] hover:bg-[#EBE7DF] transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-mono font-bold text-[#4A3F35]" aria-label={`Quantity ${modalQty}`}>
                          {modalQty}
                        </span>
                        <button
                          onClick={() => setModalQty(q => q + 1)}
                          className="px-2.5 py-1 text-xs font-mono text-[#4A3F35] hover:bg-[#EBE7DF] transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleModalAddToCart(selectedProduct)}
                        className="bg-farm-sage hover:bg-farm-sage-dark text-[#F9F6F1] text-xs font-semibold px-4 py-2.5 rounded-xl hover:scale-[1.02] active:scale-95 transition-transform shadow-md flex items-center gap-1 cursor-pointer font-sans uppercase tracking-wider"
                        aria-label={`Add ${modalQty} ${selectedProduct.name} to cart for $${(selectedProduct.price * modalQty).toFixed(2)}`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
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
