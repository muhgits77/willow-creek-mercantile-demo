/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Heart, MapPin, Store } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({
  cart,
  onOpenCart,
  activeSection,
  setActiveSection,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [favoritesCount] = useState(2); // Simulated lovely favorite items

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = cart.reduce((add, item) => add + item.quantity, 0);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'products', label: 'Shop Decor' },
    { id: 'about', label: 'Our Story' },
    { id: 'testimonials', label: 'Community' },
    { id: 'social', label: 'Social Feed' },
    { id: 'visit', label: 'Visit Us' },
  ];

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
          {/* Top Banner Alert Bar */}
      <div className="bg-farm-sage-dark text-farm-cream text-xs py-2 px-4 text-center font-sans tracking-wide flex items-center justify-center gap-2">
        <span className="hidden sm:inline">🌾 Welcoming y'all in Pine Hollow, KY!</span>
        <span>🍁 Fall primitive arrangements & soy candles are in stock!</span>
        <span className="hidden md:inline">✨ Free shipping on orders over $60. Bless your home!</span>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-farm-cream/95 backdrop-blur-md border-b border-farm-beige shadow-sm py-3'
            : 'bg-farm-cream/90 backdrop-blur-sm border-b border-farm-beige/55 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo with Farmhouse Styling */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="bg-farm-sage text-farm-cream p-2.5 rounded-full transition-all group-hover:bg-farm-clay">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-farm-charcoal tracking-normal flex items-center gap-1">
                Willow Creek Mercantile
              </h1>
              <span className="block text-[10px] uppercase tracking-widest text-farm-sage font-mono font-medium -mt-0.5">
                Country Primitive & Farmhouse Decor
              </span>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center lg:gap-6 xl:gap-8 font-sans text-xs uppercase tracking-widest text-[#5C5043]/90">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-1.5 py-2.5 transition-colors cursor-pointer duration-300 font-semibold hover:text-farm-clay ${
                  activeSection === item.id
                    ? 'text-farm-clay font-bold'
                    : 'text-[#5C5043]'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-farm-clay rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 33 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Utilities (Favorites, Address Indicator, Cart, Mobile Menu) */}
          <div className="flex items-center gap-4">
            
            {/* Store Location Map Anchor */}
            <button
              onClick={() => handleNavClick('visit')}
              className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-farm-sage hover:text-farm-clay transition-colors pr-2 border-r border-farm-beige"
              title="Get Directions to Pine Hollow shop"
            >
              <MapPin className="w-4 h-4" />
              <span>Pine Hollow, KY</span>
            </button>

            {/* Cart Icon Button with Bounce Pulse */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-farm-charcoal hover:text-farm-sage transition-all hover:scale-105 select-none"
              aria-label="Open Shopping Cart"
              id="header-cart-btn"
            >
              <ShoppingBag className="w-5.5 h-5.5 stroke-[2]" />
              <AnimatePresence>
                {totalCartItems > 0 && (
                  <motion.span
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    key={totalCartItems}
                    className="absolute -top-1 -right-1 bg-farm-clay text-farm-cream text-[11px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
                  >
                    {totalCartItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 lg:hidden text-farm-charcoal hover:text-farm-sage"
              aria-label="Toggle Mobile Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-[88px] z-30 bg-farm-cream border-b border-farm-beige shadow-lg lg:hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2 bg-gingham-clay rounded-b-xl border-t border-farm-beige">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-serif transition-colors ${
                    activeSection === item.id
                      ? 'bg-farm-beige/60 text-farm-sage font-bold'
                      : 'hover:bg-farm-beige/30 text-farm-charcoal/90'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 mt-2 border-t border-farm-beige flex flex-col gap-3 px-4">
                <div className="flex items-center gap-2 text-xs font-mono text-farm-sage-dark">
                  <MapPin className="w-4 h-4" />
                  <span>214 Oak Grove Lane Suite 2, Pine Hollow, KY 42728</span>
                </div>
                <p className="text-xs text-farm-charcoal/60 italic font-sans">
                  "🌾 Y'all come on in and stay a while!"
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
