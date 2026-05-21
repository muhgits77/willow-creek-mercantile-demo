/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, MessageSquareQuote, Heart, Plus, Sparkles, Check } from 'lucide-react';
import { Testimonial } from '../types';
import { TESTIMONIALS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function Testimonials() {
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS);
  
  // Submit neighbor review state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    quote: '',
    rating: 5,
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.location.trim() || !formData.quote.trim()) {
      setError("Please fill out all clean fields to share y'all's review.");
      return;
    }

    const newReview: Testimonial = {
      id: `review-${Date.now()}`,
      name: formData.name,
      location: formData.location,
      quote: formData.quote,
      rating: formData.rating,
      date: 'Today, 2026',
    };

    setReviews([newReview, ...reviews]);
    setError('');
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsFormOpen(false);
      setFormData({ name: '', location: '', quote: '', rating: 5 });
    }, 1800);
  };

  return (
    <section 
      id="testimonials" 
      className="bg-farm-cream py-28 md:py-36 border-b border-farm-beige relative overflow-hidden scroll-mt-24 md:scroll-mt-32"
    >
      {/* Background decoration elements */}
      <div className="absolute top-1/2 right-[-100px] w-80 h-80 bg-gingham-clay opacity-20 pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-20 border-b border-[#D9D1C5] pb-8">
          <div className="text-center md:text-left space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-1.5 h-1.5 bg-farm-clay rounded-full"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-farm-clay font-mono font-bold block">
                Grateful Accents
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-farm-charcoal leading-tight">
              What Neighbors Say <span className="italic font-light text-farm-clay">Near & Far</span>
            </h2>
            <p className="text-xs sm:text-sm font-sans text-farm-charcoal/60 italic leading-relaxed mt-1">
              "We cherish every sweet word whispered on our porch."
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="bg-farm-sage hover:bg-farm-sage-dark text-farm-cream text-xs font-semibold py-3 px-6 rounded-lg transition-transform hover:scale-103 active:scale-97 cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Share Y'all's Experience</span>
          </button>
        </div>

        {/* Dynamic submit experience form drawer */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-gingham-clay p-6 sm:p-8 rounded-xl border border-farm-beige/70 relative">
                
                <h3 className="font-serif font-bold text-lg text-farm-charcoal mb-4">
                  Add Your Story To Our Wall
                </h3>

                {isSuccess ? (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-6 space-y-3"
                  >
                    <div className="bg-farm-clay text-farm-cream w-10 h-10 rounded-full flex items-center justify-center mx-auto shadow-xs">
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <h4 className="font-serif font-bold text-base text-farm-charcoal">
                      Thank y'all for sharing, friend!
                    </h4>
                    <p className="text-xs text-farm-charcoal/60 leading-relaxed font-sans max-w-sm mx-auto">
                      Your sweet experience has been posted directly on our custom neighbor wall! Y'all are the heart of why Willow Creek Mercantile remains an absolute blessing to Pine Hollow.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    
                    {/* Name input */}
                    <div className="md:col-span-3 space-y-1">
                      <label className="block text-[10px] font-mono text-farm-charcoal/60 uppercase">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Patty Lawson"
                        className="w-full bg-farm-cream border border-farm-sage/35 rounded-lg py-2 px-3 text-xs focus:ring-1 focus:ring-farm-clay focus:border-farm-clay outline-none"
                      />
                    </div>

                    {/* Location/City */}
                    <div className="md:col-span-3 space-y-1">
                      <label className="block text-[10px] font-mono text-farm-charcoal/60 uppercase">
                        Y'all's City, State *
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Pine Hollow, KY"
                        className="w-full bg-farm-cream border border-farm-sage/35 rounded-lg py-2 px-3 text-xs focus:ring-1 focus:ring-farm-clay focus:border-farm-clay outline-none"
                      />
                    </div>

                    {/* Stars select */}
                    <div className="md:col-span-2 space-y-1">
                      <label className="block text-[10px] font-mono text-farm-charcoal/60 uppercase">
                        Accents Stars
                      </label>
                      <select
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                        className="w-full bg-farm-cream border border-farm-sage/35 rounded-lg py-2 px-3 text-xs focus:ring-1 focus:ring-farm-clay focus:border-farm-clay outline-none h-9 text-farm-charcoal/80"
                      >
                        <option value={5}>5 Golden Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={3}>3 Stars</option>
                      </select>
                    </div>

                    {/* Submit Column */}
                    <div className="md:col-span-4 flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 bg-farm-clay hover:bg-farm-clay-dark text-farm-cream text-xs font-semibold py-2.5 px-4 rounded-lg transform active:scale-95 transition-all text-center cursor-pointer shadow-sm"
                      >
                        Pin to Wall Area
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="bg-farm-cream border border-farm-beige text-farm-charcoal/60 text-xs font-semibold py-2.5 px-4 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>

                    {/* Experience message box */}
                    <div className="md:col-span-12 space-y-1 mt-1">
                      <label className="block text-[10px] font-mono text-farm-charcoal/60 uppercase">
                        Tell us about your visit / items *
                      </label>
                      <input
                        type="text"
                        value={formData.quote}
                        onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                        placeholder="e.g. I absolutely adore their tobacco basket garlands. Best rustic store in Pine Hollow!"
                        className="w-full bg-farm-cream border border-farm-sage/35 rounded-lg py-2 px-3 text-xs focus:ring-1 focus:ring-farm-clay focus:border-farm-clay outline-none"
                      />
                    </div>

                    {error && (
                      <span className="md:col-span-12 text-[10px] text-farm-clay font-medium">{error}</span>
                    )}

                  </form>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {reviews.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-farm-cream border border-farm-beige p-6 sm:p-8 rounded-xl shadow-sm flex flex-col justify-between space-y-6 relative hover:shadow-md transition-all flex flex-col h-full"
              >
                {/* Quotation icon stamp */}
                <div className="absolute top-6 right-6 text-farm-clay/10 pointer-events-none">
                  <MessageSquareQuote className="w-12 h-12" />
                </div>

                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < t.rating ? 'fill-current' : 'opacity-20'}`} 
                      />
                    ))}
                  </div>

                  {/* Prose */}
                  <p className="text-xs sm:text-sm text-farm-charcoal/80 font-sans leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                {/* Footer details */}
                <div className="flex justify-between items-center pt-4 border-t border-farm-beige/65 font-sans mt-auto">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-farm-charcoal leading-tight">
                      {t.name}
                    </h4>
                    <span className="text-[10px] uppercase font-mono text-farm-sage font-semibold tracking-wider">
                      {t.location}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-farm-charcoal/40 font-medium">
                    {t.date}
                  </span>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Stamp banner below */}
        <div className="mt-12 text-center text-xs font-mono text-farm-sage/75 flex items-center justify-center gap-2">
          <span>🌾 Over 120 neighbor reviews and Counting</span>
          <span>•</span>
          <span>Certified Southern Welcomes</span>
        </div>

      </div>
    </section>
  );
}
