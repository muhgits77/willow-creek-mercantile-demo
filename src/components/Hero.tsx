/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { HERO_IMAGE, HERO_BG_IMAGE } from '../data';

interface HeroProps {
  onBrowseDecor: () => void;
  onMeetOwners: () => void;
}

export default function Hero({ onBrowseDecor, onMeetOwners }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[750px] flex items-center overflow-hidden bg-farm-charcoal border-b border-farm-beige flex-col"
    >
      {/* Large immersive background image of cozy farmhouse interior */}
      <div className="absolute inset-0 z-0">
        <img 
          src={HERO_BG_IMAGE} 
          alt="Cozy interior display of Willow Creek Mercantile farmhouse boutique" 
          className="w-full h-full object-cover object-center scale-[1.01]"
          referrerPolicy="no-referrer"
        />
        {/* Soft, warm vignettes and editorial ambient dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-farm-charcoal via-farm-charcoal/70 to-farm-charcoal/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-farm-charcoal via-farm-charcoal/40 to-transparent hidden lg:block" />
      </div>

      {/* Subtle Gingham background accent overlaid */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gingham opacity-10 pointer-events-none rounded-bl-full z-10" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-15 py-16 md:py-24 lg:py-32 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Text Content Block */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-center lg:text-left">
            
            {/* Small Southern Tagline Indicator */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center lg:justify-start gap-2 self-center lg:self-start bg-farm-sage/90 border border-farm-sage-light/30 text-[#F5F2EC] px-4 py-2 rounded-full text-xs font-mono tracking-widest font-semibold backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-farm-clay fill-farm-clay" />
              <span>EST. 2018 • PINE HOLLOW, KENTUCKY</span>
            </motion.div>

            {/* Main Greeting Display Typography */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-farm-cream leading-[1.1] tracking-tight">
                Bringing <br />
                <span className="font-serif italic text-farm-clay font-light">Warm Southern Charm</span> <br />
                to Your Home
              </h2>
              
              <p className="max-w-xl mx-auto lg:mx-0 text-[#F5F2EC]/90 text-base sm:text-lg lg:text-xl font-sans font-light leading-relaxed">
                Step inside <strong className="text-farm-cream font-medium">Willow Creek Mercantile</strong>, Pine Hollow's most charming country primitive & farmhouse boutique. Y'all come find hand-carved tobacco barn frames, hand-poured soy candles, and local primitive treasures handpicked to bless your home.
              </p>
            </motion.div>

            {/* Custom CTA Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={onBrowseDecor}
                className="w-full sm:w-auto bg-farm-sage hover:bg-farm-sage-dark text-[#F5F2EC] font-sans text-xs uppercase tracking-widest py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.03] flex items-center justify-center gap-2 cursor-pointer font-semibold border border-farm-sage-light/20"
                id="hero-browse-btn"
              >
                <span>Shop Our Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onMeetOwners}
                className="w-full sm:w-auto bg-[#F5F2EC]/10 hover:bg-[#F5F2EC]/20 border border-farm-cream/40 text-farm-cream font-sans text-xs uppercase tracking-widest py-4 px-10 rounded-full transition-all hover:scale-[1.03] cursor-pointer backdrop-blur-sm"
                id="hero-story-btn"
              >
                Our Story
              </button>
            </motion.div>

            {/* Southern Hospitality Quote Banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-4 flex items-center justify-center lg:justify-start gap-3 text-xs font-mono"
            >
              <span className="text-xl text-farm-clay font-bold font-serif leading-none">“</span>
              <span className="italic text-[#F5F2EC]/80 font-light">
                "There are no strangers in our shop, sweet friends, just family we haven't met yet!"
              </span>
              <span className="text-xl text-farm-clay font-bold font-serif leading-none">”</span>
            </motion.div>

          </div>

          {/* Floating asymmetric magazine catalog element card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center mt-6 lg:mt-0"
          >
            {/* Wooden primitive board frame decoration */}
            <div className="absolute -inset-2.5 sm:-inset-4 bg-farm-beige border border-farm-wood/30 rounded-2xl shadow-2xl -rotate-1 pointer-events-none" />
            
            <div className="relative bg-[#F9F6F1] p-3 sm:p-4 rounded-2xl shadow-xl border border-farm-beige z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none rotate-1 overflow-hidden group">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={HERO_IMAGE}
                  alt="Our welcoming Southern farmhouse porch entrance"
                  referrerPolicy="no-referrer"
                  className="w-full h-[260px] sm:h-[320px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Overlay Ribbon badge */}
                <div className="absolute top-4 left-4 bg-farm-clay/95 text-farm-cream text-[9px] tracking-widest uppercase font-semibold py-1.5 px-3 rounded-md shadow-sm font-sans">
                  Our Porch Display
                </div>
              </div>

              {/* Bottom wood-panel caption bar */}
              <div className="mt-4 flex justify-between items-center px-1 font-sans">
                <div>
                  <h4 className="text-xs font-bold text-farm-charcoal tracking-wide uppercase">
                    Y'all Welcome Always
                  </h4>
                  <p className="text-[11px] text-farm-charcoal/70 italic font-medium mt-0.5">
                    "Bless this home and all who enter"
                  </p>
                </div>
                <div className="text-[10px] bg-farm-sage/10 text-farm-sage font-mono font-bold py-1 px-2.5 rounded border border-farm-sage/20">
                  EST. 2018
                </div>
              </div>
            </div>

            {/* Accent stamp image behind the frame */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full border-2 border-dashed border-farm-clay/40 flex items-center justify-center p-2 rotate-12 pointer-events-none">
              <span className="text-[8px] font-mono font-bold text-farm-clay/60 text-center uppercase tracking-wider">
                Certified Southern Hospitality
              </span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

