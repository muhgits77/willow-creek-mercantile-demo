/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedFinds from './components/FeaturedFinds';
import AboutUs from './components/AboutUs';
import Products from './components/Products';
import VisitUs from './components/VisitUs';
import Testimonials from './components/Testimonials';
import SocialFeed from './components/SocialFeed';
import Footer from './components/Footer';
import Cart from './components/Cart';
import { Product, CartItem } from './types';

export default function App() {
  // Shopping Cart state with LocalStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('asouthernaccent_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Sync cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('asouthernaccent_cart', JSON.stringify(cart));
    } catch (e) {
      console.error("Cart storage sync failed", e);
    }
  }, [cart]);

  // Handle active section monitoring on scroll using Intersection Observer
  useEffect(() => {
    const sections = ['hero', 'products', 'about', 'testimonials', 'social', 'visit'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Trigger when section occupies the focal sight line
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Cart operations helpers
  const handleAddToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      
      if (existingIndex > -1) {
        // Increment quantity
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        // Add new item
        return [...prevCart, { product, quantity }];
      }
    });

    // Optionally pulse or shake the cart indicator button in header (optional micro-interaction)
    const cartButton = document.getElementById('header-cart-btn');
    if (cartButton) {
      cartButton.classList.add('animate-bounce');
      setTimeout(() => {
        cartButton.classList.remove('animate-bounce');
      }, 1000);
    }
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Safe navigation action triggers
  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-farm-cream text-farm-charcoal selection:bg-farm-clay/20 selection:text-farm-clay flex flex-col font-sans antialiased">
      
      {/* Upper sticky header menu bar */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Single Page Sections */}
      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <Hero
          onBrowseDecor={() => navigateToSection('products')}
          onMeetOwners={() => navigateToSection('about')}
        />

        {/* FEATURED FINDS GRID */}
        <FeaturedFinds 
          onAddToCart={handleAddToCart}
        />

        {/* PRODUCTS SHOP GRID */}
        <Products 
          onAddToCart={handleAddToCart} 
        />

        {/* BACKSTORY AND CREED */}
        <AboutUs />

        {/* TESTIMONIALS/REVIEWS ACCENTS REVIEWS */}
        <Testimonials />

        {/* SOCIAL INSTAGRAM AND FACEBOOK FEED PANELS */}
        <SocialFeed />

        {/* DIRECTIONS AND CONTACT HOMESTEAD */}
        <VisitUs />

      </main>

      {/* FOOTER COORD WITH PORCH NEWSLETTER */}
      <Footer />

      {/* COMPACT SLIDING SHOPPING CART AND RESERVATION CHECKOUT MODAL */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
