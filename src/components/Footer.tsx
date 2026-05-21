/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Landmark, ArrowRight, Heart } from 'lucide-react';
import { STORE_INFO } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [error, setError] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      setError("Please share a coordinate email, sweet friend!");
      return;
    }

    setError('');
    setIsJoined(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 1500);
  };

  return (
    <footer className="bg-farm-charcoal text-farm-cream py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid Layout of Footer links and forms */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-farm-cream/10 pb-12 mb-12">
          
          {/* Brand/Slogan Side */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-farm-sage text-farm-cream p-2 rounded-full">
                <Landmark className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-serif font-bold text-farm-cream tracking-normal">
                Willow Creek Mercantile
              </h3>
            </div>
            
            <p className="text-xs sm:text-sm text-farm-cream/70 leading-relaxed max-w-sm font-serif italic text-amber-50">
              "Bringing Warm Southern Charm & country primitive warmth to bless y'all's home in Pine Hollow, Kentucky since 2018."
            </p>

            <span className="block text-[10px] uppercase font-mono tracking-widest text-farm-clay-light font-bold">
              Pine Hollow, Kentucky Proud
            </span>
          </div>

          {/* Quick links to shop anchors */}
          <div className="md:col-span-4 space-y-4 font-sans text-xs sm:text-sm text-farm-cream/75">
            <h4 className="font-serif font-bold text-[15px] uppercase tracking-wider text-farm-cream/90 pb-1 border-b border-farm-cream/15">
              Quick Coordinates
            </h4>
            
            <div className="space-y-2.5">
              <p>📍 {STORE_INFO.address}</p>
              <p>📞 Phone: {STORE_INFO.phone}</p>
              <p>✉️ Email: {STORE_INFO.email}</p>
              
              <div className="pt-2">
                <span className="block text-[10px] font-mono text-farm-cream/50 uppercase">
                  SOCIAL INSPIRATION
                </span>
                <div className="flex gap-4 mt-2 font-semibold">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-farm-clay transition-colors">
                    Facebook Page
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-farm-clay transition-colors">
                    Instagram Feed
                  </a>
                  <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-farm-clay transition-colors">
                    Pinterest Boards
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Porch Gazette Newsletter Sign-up */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif font-bold text-[15px] uppercase tracking-wider text-farm-cream/90 pb-1 border-b border-farm-cream/15">
              The Front Porch Gazette
            </h4>
            
            <p className="text-xs text-farm-cream/70 leading-relaxed">
              Sign up to receive sweet notices about our rustic fall pumpkin harvests, spring floral cotton wreaths, local Kentucky craft classes, and store coupons!
            </p>

            <AnimatePresence mode="wait">
              {isJoined ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-farm-sage/20 border border-farm-sage text-emerald-300 p-3 rounded-lg text-xs leading-relaxed font-semibold italic text-center"
                >
                  🌾 Welcome to the front porch list, friend! Bless you!
                </motion.div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="flex gap-1">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Share your coordinate email..."
                      className="flex-1 bg-farm-cream/10 border border-farm-cream/25 rounded-lg py-2 px-3 text-xs focus:ring-1 focus:ring-farm-clay-light focus:bg-farm-cream/20 outline-none text-farm-cream"
                    />
                    <button
                      type="submit"
                      className="bg-farm-clay text-farm-cream rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer select-none' fill-farm-cream hover:bg-farm-clay-dark"
                      aria-label="Subscribe to Gazette Newsletter"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  {error && (
                    <span className="text-[10px] text-farm-clay-light font-medium block">{error}</span>
                  )}
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Lower Credits bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-farm-cream/55 font-mono pt-4 gap-4">
          <p>© {new Date().getFullYear()} Willow Creek Mercantile. All Southern Hospitality reserved.</p>
          
          <div className="flex items-center gap-1.5 justify-center">
            <span>"Bless y'all's home"</span>
            <Heart className="w-3 h-3 text-farm-clay fill-farm-clay" />
            <span>Handcrafted in Kentucky</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
