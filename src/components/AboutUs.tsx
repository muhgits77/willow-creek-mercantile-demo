/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, Landmark, MapPin, Feather, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutUs() {
  const values = [
    {
      icon: <Heart className="w-5 h-5 text-farm-clay" />,
      title: "Southern Hospitality",
      description: "When y'all step through our doors, you aren't just custom customers—you are extended family. Expect a warm greeting, cold sweet tea, and sweet conversation."
    },
    {
      icon: <Feather className="w-5 h-5 text-farm-sage" />,
      title: "Reclaimed Wood Craft",
      description: "We work directly with local Pine Hollow carpenters to reclaim local tobacco barn oak. Every frame and wooden box is built to preserve Kentucky's heritage."
    },
    {
      icon: <MapPin className="w-5 h-5 text-farm-wood" />,
      title: "Pine Hollow Proud",
      description: "Located in the sweet mountain heart of Pine Hollow, KY. Nested among beautiful creeks and valleys, we adore our small-town roots and supporting local families."
    }
  ];

  return (
    <section 
      id="about" 
      className="bg-[#FAF7F2] py-28 md:py-36 border-b border-farm-beige relative overflow-hidden scroll-mt-24 md:scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 border-b border-[#D9D1C5] pb-8 gap-4">
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-farm-clay rounded-full"></span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-sans text-farm-clay font-bold block">
                Our Story & Dedication
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-farm-charcoal leading-tight">
              Our Small-Town <span className="italic font-normal text-farm-clay">Roots</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-farm-wood/90 max-w-xs leading-relaxed italic md:text-right border-l md:border-l-0 md:border-r-2 border-farm-clay/30 pl-4 md:pl-0 md:pr-4 py-1">
            "Bless your heart and bless sweet southern homes."
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Grid: Styled images with a vintage layout */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 relative">
            <div className="absolute inset-0 bg-gingham opacity-[0.03] rounded-xl pointer-events-none" />
            
            <div className="space-y-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-[#FAF7F2] p-2 rounded-2xl border border-farm-beige shadow-md rotate-[-2deg]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400" 
                  alt="Cozy mugs and cinnamon rolls" 
                  referrerPolicy="no-referrer"
                  className="rounded-xl w-full h-44 object-cover"
                />
                <span className="block text-[10px] text-center font-mono text-farm-charcoal/60 mt-2 italic">
                  Kitchen warmth
                </span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-[#FAF7F2] p-2 rounded-2xl border border-farm-beige shadow-md rotate-[1deg]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400" 
                  alt="Wreath and decorative baskets" 
                  referrerPolicy="no-referrer"
                  className="rounded-xl w-full h-32 object-cover"
                />
                <span className="block text-[10px] text-center font-mono text-farm-charcoal/60 mt-2 italic">
                  Grapevine cotton
                </span>
              </motion.div>
            </div>

            <div className="space-y-4 pt-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-[#FAF7F2] p-2 rounded-2xl border border-farm-beige shadow-md rotate-[2deg]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1505673542670-a513cf1b1b14?auto=format&fit=crop&q=80&w=400" 
                  alt="Natural wood elements" 
                  referrerPolicy="no-referrer"
                  className="rounded-xl w-full h-32 object-cover"
                />
                <span className="block text-[10px] text-center font-mono text-farm-charcoal/60 mt-2 italic">
                  Dough bowls
                </span>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-[#FAF7F2] p-2 rounded-2xl border border-farm-beige shadow-md rotate-[-1deg]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=400" 
                  alt="Primitive jugs on a mantle" 
                  referrerPolicy="no-referrer"
                  className="rounded-xl w-full h-44 object-cover"
                />
                <span className="block text-[10px] text-center font-mono text-farm-charcoal/60 mt-2 italic">
                  Salt-glazed jugs
                </span>
              </motion.div>
            </div>
          </div>

          {/* Story Narrative Text */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-3xl font-serif font-light text-farm-charcoal leading-tight">
              Welcome to Our <span className="font-serif italic text-farm-clay">Little Blessing</span>
            </h3>
            
            <div className="space-y-6 text-[#6B5E54] text-sm sm:text-base font-sans font-light leading-relaxed">
              <div className="relative bg-[#FAF7F2] p-6 rounded-2xl border border-farm-beige/60 shadow-xs">
                <span className="absolute -top-4 -left-2 text-7xl text-farm-sage opacity-25 italic font-serif">“</span>
                <p className="font-serif italic text-lg sm:text-xl text-[#5A5A40] leading-relaxed relative z-10 pl-4">
                  Nestled in the heart of Pine Hollow, Kentucky, Willow Creek Mercantile offers hand-selected farmhouse and country primitive treasures to make your house feel like a home. Y'all are always welcome!
                </p>
              </div>

              <p>
                In 2018, Willow Creek Mercantile grew from a cozy family woodshop in Pine Hollow to our charming retail boutique in historic Pine Hollow, Kentucky. We spent our energy combining the absolute hand-built honesty of traditional American primitive treasures with the bright, clean layout of elegant Southern estates.
              </p>
              <p>
                Every tobacco barn frame, soy candle-jar, and grapevine cotton wreath is picked to preserve authentic heritage. We spend our weeks visiting quiet Kentucky farms, matching items that carry comfort, artisan dignity, and true warm hospitality.
              </p>
            </div>

            {/* core highlights listed simply */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              {values.map((v, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-farm-beige/70 space-y-2.5 hover:shadow-md transition-all duration-300">
                  <div className="bg-farm-cream w-9 h-9 rounded-full border border-farm-beige shadow-sm flex items-center justify-center">
                    {v.icon}
                  </div>
                  <h4 className="font-serif font-bold text-[15px] text-farm-charcoal">
                    {v.title}
                  </h4>
                  <p className="text-xs text-farm-charcoal/60 font-sans leading-relaxed">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
