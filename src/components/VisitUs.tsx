/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Landmark, Map, Navigation, ArrowRight, Heart, Sparkles, CheckCircle } from 'lucide-react';
import { STORE_INFO } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function VisitUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'question', // 'question' | 'custom' | 'class'
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Directions tab simulated
  const [travelFrom, setTravelFrom] = useState('');
  const [travelResult, setTravelResult] = useState<{ time: string; distance: string; route: string } | null>(null);
  
  // Tab for Google Maps vs Local roadmap
  const [activeMapTab, setActiveMapTab] = useState<'real' | 'artisan'>('real');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parseErrors: Record<string, string> = {};
    if (!formData.name.trim()) parseErrors.name = "Tell us y'all's name, please!";
    if (!formData.email.trim()) parseErrors.email = "Please share a coordinate email.";
    if (!formData.message.trim()) parseErrors.message = "Write down y'all's note to us.";

    if (Object.keys(parseErrors).length > 0) {
      setErrors(parseErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    setTimeout(() => {
      // clear form
      setFormData({ name: '', email: '', subject: 'question', message: '' });
    }, 1000);
  };

  const handleDirections = (e: React.FormEvent) => {
    e.preventDefault();
    if (!travelFrom.trim()) return;

    const from = travelFrom.toLowerCase();
    if (from.includes('somerset')) {
      setTravelResult({
        time: "32 minutes",
        distance: "25.2 miles",
        route: "Head South on US-127 S toward Pine Hollow. Cross the bridge over the Cumberland basin, continue straight, and turn right on Oak Grove Lane. We are on the right next to the willow grove!"
      });
    } else if (from.includes('lexington')) {
      setTravelResult({
        time: "1 hour, 58 minutes",
        distance: "102.4 miles",
        route: "Take US-27 S through Somerset, then proceed onto US-127 S toward Pine Hollow, turning right onto Oak Grove Lane. Pull on in by the creek-bed sign!"
      });
    } else if (from.includes('london') || from.includes('75')) {
      setTravelResult({
        time: "1 hour, 15 minutes",
        distance: "54.8 miles",
        route: "Take KY-80 West onto Somerset bypass, merge onto Hwy 90 West, proceed toward Pine Hollow, and turn right toward Oak Grove Lane."
      });
    } else {
      setTravelResult({
        time: "15 - 35 minutes",
        distance: "Approx. 12-25 miles",
        route: "Drive into Pine Hollow's quiet mountain country. Follow signs for Oak Grove Lane or look out for the old willow creek. We are nested right by the creek-bend porch!"
      });
    }
  };

  return (
    <section 
      id="visit" 
      className="bg-farm-cream py-28 md:py-36 border-b border-[#D9D1C5] relative scroll-mt-24 md:scroll-mt-32"
    >
      <div className="absolute top-0 left-0 w-64 h-64 bg-gingham opacity-[0.03] pointer-events-none rounded-br-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 border-b border-[#D9D1C5] pb-8 gap-4">
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-farm-clay rounded-full"></span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-sans text-farm-clay font-bold block">
                Plan Your Trip
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-farm-charcoal leading-tight">
              Come <span className="italic font-normal text-farm-clay">See Us</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-farm-wood/90 max-w-xs leading-relaxed italic md:text-right border-l md:border-l-0 md:border-r-2 border-farm-clay/30 pl-4 md:pl-0 md:pr-4 py-1">
            "Bless your heart & pull on up to the porch. Cold sweet tea is always waiting for y'all!"
          </p>
        </div>

        {/* Info Cards, Directions and Map Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card left: Store info & Hours */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            
            {/* Information Card */}
            <div className="bg-[#FAF7F2] border border-[#EBE7DF] p-6 sm:p-8 rounded-2xl md:rounded-3xl shadow-md space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="space-y-1.5 pb-4 border-b border-farm-beige">
                  <h3 className="font-serif font-semibold text-xl text-farm-charcoal leading-tight">
                    Homestead Coordinates
                  </h3>
                  <p className="text-[10px] text-farm-sage font-mono uppercase tracking-wider font-bold">
                    Pine Hollow, Kentucky
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3.5 text-sm">
                    <div className="bg-farm-cream text-farm-sage p-2 rounded-xl border border-farm-beige shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-farm-clay" />
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-farm-charcoal text-xs uppercase tracking-wider">Homestead Address</h4>
                      <p className="text-farm-charcoal/80 text-xs font-mono mt-1 leading-relaxed">
                        {STORE_INFO.address}
                      </p>
                    </div>
                  </div>

                  {/* Telephone */}
                  <div className="flex items-start gap-3.5 text-sm">
                    <div className="bg-farm-cream text-farm-sage p-2 rounded-xl border border-farm-beige shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-farm-clay" />
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-farm-charcoal text-xs uppercase tracking-wider">Give Us a Ring</h4>
                      <p className="text-farm-charcoal/80 text-xs font-mono mt-1 font-semibold">
                        {STORE_INFO.phone}
                      </p>
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="flex items-start gap-3.5 text-sm">
                    <div className="bg-farm-cream text-farm-sage p-2 rounded-xl border border-farm-beige shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-farm-clay" />
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-farm-charcoal text-xs uppercase tracking-wider">Digital Post</h4>
                      <p className="text-farm-charcoal/80 text-xs font-mono mt-1 break-all select-all">
                        {STORE_INFO.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours Listing */}
              <div className="space-y-3.5 pt-6 border-t border-[#EBE7DF] mt-6">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase text-farm-clay tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Shop Store Hours</span>
                </div>
                
                <div className="space-y-2 text-xs">
                  {STORE_INFO.hours.map((h, i) => (
                    <div key={i} className="flex justify-between items-center py-1 border-b border-dashed border-[#EBE7DF]/75 last:border-0">
                      <span className="font-medium text-farm-charcoal">{h.days}:</span>
                      <span className={`font-mono ${h.time.includes('Closed') ? 'text-farm-clay font-bold italic' : 'text-farm-charcoal/75'}`}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                  <p className="text-[10px] text-farm-charcoal/60 leading-relaxed italic pt-2.5">
                    🌾 <strong>Sunday Worship:</strong> Closed Sundays so our shop family can rest, restore spirits, and enjoy sweet family time.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Card Middle: Responsive simulated Map widget / Directions finder */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="bg-[#FAF7F2] border border-[#EBE7DF] rounded-2xl md:rounded-3xl shadow-md overflow-hidden flex flex-col flex-1">
              
              {/* Map Tab bar headers */}
              <div className="bg-farm-beige/40 p-1.5 border-b border-[#EBE7DF] flex justify-between items-center">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setActiveMapTab('real')}
                    className={`px-3 py-1.5 rounded-lg font-sans text-xs transition-all cursor-pointer ${
                      activeMapTab === 'real'
                        ? 'bg-farm-sage text-[#F5F2EC] shadow-sm font-semibold'
                        : 'text-farm-wood hover:text-farm-charcoal bg-transparent'
                    }`}
                  >
                    Google Map
                  </button>
                  <button
                    onClick={() => setActiveMapTab('artisan')}
                    className={`px-3 py-1.5 rounded-lg font-sans text-xs transition-all cursor-pointer ${
                      activeMapTab === 'artisan'
                        ? 'bg-farm-sage text-[#F5F2EC] shadow-sm font-semibold'
                        : 'text-farm-wood hover:text-farm-charcoal bg-transparent'
                    }`}
                  >
                    Road Map
                  </button>
                </div>
                <span className="text-[9px] bg-farm-clay text-white py-1 px-2.5 rounded-full font-mono font-bold uppercase tracking-wider mr-1 shadow-sm">
                  Pine Hollow (KY)
                </span>
              </div>

              {/* Toggle Content area */}
              {activeMapTab === 'real' ? (
                /* ACTUAL EMBEDDED GOOGLE MAP IFRAME WITH REFINED GREYSCALE LOOK */
                <div className="h-56 w-full overflow-hidden relative bg-[#EAE5DC] border-b border-[#EBE7DF]">
                  <iframe 
                    title="Google Maps Embed - Willow Creek Mercantile"
                    src="https://maps.google.com/maps?q=214%20Oak%20Grove%20Lane%20Suite%202,%20Pine%20Hollow,%20KY%2042728&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 grayscale opacity-90 contrast-110 hover:grayscale-0 transition-all duration-700 hover:opacity-100"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#FAF7F2]/90 backdrop-blur-xs px-2 py-1 rounded text-[9px] font-mono text-farm-wood border border-[#EBE7DF] pointer-events-none">
                    Interactive Live View
                  </div>
                </div>
              ) : (
                /* Map Graphic Box (Custom Country SVG Styled roadmap) */
                <div className="bg-parchment h-56 flex flex-col justify-between p-4 relative overflow-hidden border-b border-[#EBE7DF] select-none">
                  
                  {/* Cumberland River decoration */}
                  <div className="absolute top-1/4 -left-10 right-0 h-4 bg-sky-200/40 border-y border-dashed border-sky-300 -rotate-6 flex items-center justify-center">
                    <span className="text-[8px] font-mono font-semibold tracking-widest text-sky-500/50 uppercase leading-none">
                      Cumberland Basin
                    </span>
                  </div>

                  {/* Lake Cumberland Tag */}
                  <div className="absolute top-4 left-6 bg-sky-50 border border-sky-100 text-[8px] font-mono text-sky-600/70 py-0.5 px-2 rounded-full rotate-2">
                    ⚓ To Lake Cumberland
                  </div>

                  {/* Main Highway 90 Roads */}
                  <div className="absolute inset-y-0 left-1/2 w-4 bg-amber-100 border-x border-amber-200/50 flex items-center justify-center shadow-inner">
                    <span className="text-[7px] font-mono text-amber-600/50 rotate-90 tracking-widest uppercase">
                    <span className="text-sm font-mono text-amber-600/50 rotate-90 tracking-widest uppercase">
                      OAK GROVE LN
                    </span>
                    </span>
                  </div>
                  <div className="absolute top-1/2 inset-x-0 h-4 bg-amber-100 border-y border-amber-200/50 flex justify-center items-center">
                    <span className="text-[7px] font-mono text-amber-600/50 tracking-widest uppercase">
                      HIGHWAY 90 (To Pine Hollow)
                    </span>
                  </div>

                  {/* Shop node */}
                  <div className="absolute top-[42%] left-[45%] z-10 flex flex-col items-center">
                    <motion.div 
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ repeat: Infinity, duration: 2.2 }}
                      className="bg-farm-clay text-farm-cream p-1.5 rounded-full shadow-md border-2 border-farm-cream cursor-pointer"
                      title="Willow Creek Mercantile"
                    >
                      <MapPin className="w-3.5 h-3.5 fill-farm-cream" />
                    </motion.div>
                    <span className="bg-farm-charcoal text-farm-cream text-[8px] font-mono font-bold py-0.5 px-1.5 rounded shadow-sm scale-90 whitespace-nowrap -mt-0.5 border border-farm-beige/20">
                      Our Shop Door
                    </span>
                  </div>

                  {/* Wayne County Courthouse node */}
                  <div className="absolute bottom-8 left-1/4 flex items-center gap-1">
                    <div className="bg-farm-sage text-[#F5F2EC] p-1 rounded-full border border-farm-cream">
                      <Landmark className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-[8px] font-sans font-bold text-farm-charcoal/60 whitespace-nowrap">
                      Historic Creek Station
                    </span>
                  </div>

                  {/* Elk Spring Creek */}
                  <span className="absolute bottom-4 right-8 text-[8px] font-mono text-farm-charcoal/40 italic">
                    🌿 Elk Spring Creek
                  </span>

                </div>
              )}

              {/* Simulated GPS Calculator */}
              <div className="p-5 flex-grow flex flex-col justify-between bg-gradient-to-b from-[#F2ECE4]/30 to-[#FAF7F2]">
                
                <form onSubmit={handleDirections} className="space-y-3">
                  <span className="block text-[10px] uppercase tracking-wider text-farm-wood font-mono font-bold">
                    Southern Crossroads Calculator
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={travelFrom}
                      onChange={(e) => setTravelFrom(e.target.value)}
                      placeholder="Somerset, London, Lexington..."
                      className="flex-1 bg-farm-cream border border-[#D9D1C5] rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-farm-clay focus:border-farm-clay outline-none font-sans"
                    />
                    <button
                      type="submit"
                      className="bg-farm-sage hover:bg-farm-sage-dark text-[#F5F2EC] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all hover:scale-[1.02]"
                    >
                      <Navigation className="w-3.5 h-3.5 fill-current" />
                      <span>Route</span>
                    </button>
                  </div>
                  <span className="text-[10px] text-farm-charcoal/50 font-mono italic block text-right pr-1">
                    Try typing: "Somerset" or "Lexington"
                  </span>
                </form>

                <AnimatePresence mode="wait">
                  {travelResult ? (
                    <motion.div
                      key={travelFrom}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="bg-farm-cream p-3 rounded-lg border border-[#EBE7DF] text-xs space-y-1.5 mt-3 shadow-xs"
                    >
                      <div className="flex justify-between items-center text-[10px] font-mono text-farm-clay font-bold">
                        <span>EST TIME: {travelResult.time}</span>
                        <span>{travelResult.distance}</span>
                      </div>
                      <p className="text-farm-charcoal/80 leading-relaxed font-sans text-xs">
                        {travelResult.route}
                      </p>
                    </motion.div>
                  ) : (
                    <div className="text-center py-4 text-xs font-sans text-farm-charcoal/50 italic flex items-center justify-center gap-1.5 mt-2">
                      <Sparkles className="w-4 h-4 text-farm-clay/60 animate-pulse" />
                      <span>Get road directions to historic Pine Hollow square!</span>
                    </div>
                  )}
                </AnimatePresence>

              </div>

            </div>
          </div>

          {/* Card Right: Cozy primitive Store Contact Form */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            
            <div className="bg-[#FAF7F2] border border-[#EBE7DF] p-6 sm:p-8 rounded-2xl md:rounded-3xl shadow-md flex-1 flex flex-col justify-between animate-fadeIn">
              
              <div className="space-y-4">
                <div className="space-y-1 pb-4 border-b border-farm-beige">
                  <h3 className="font-serif font-semibold text-xl text-farm-charcoal leading-tight">
                    Write Us a Love Note
                  </h3>
                  <p className="text-[10px] text-farm-sage font-mono uppercase tracking-wider font-bold">
                    Comments, Inquiries, or Custom Pleasures
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    /* Sweet Submission Message */
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="text-center py-10 space-y-4"
                    >
                      <div className="bg-farm-sage text-[#F5F2EC] w-12 h-12 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <CheckCircle className="w-6 h-6 stroke-[2.5]" />
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="font-serif font-semibold text-lg text-farm-charcoal">
                          Note Safely Sent!
                        </h4>
                        <p className="text-xs text-farm-wood/80 leading-relaxed max-w-xs mx-auto font-sans font-light">
                          Thank y'all so much for the sweet note! It has been handed straight to our shopgirls. We'll give you a phone call or email back real fast.
                        </p>
                      </div>

                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-[11px] font-mono font-bold text-farm-clay border-b border-dashed border-farm-clay hover:text-farm-clay-dark"
                      >
                        Write another request
                      </button>
                    </motion.div>
                  ) : (
                    /* Contact Input Form Group */
                    <form onSubmit={handleContactSubmit} className="space-y-3.5">
                      
                      {/* Name input */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono text-farm-charcoal/60 uppercase font-bold" htmlFor="contact-name">
                          Y'all's Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setErrors({...errors, name: ''}) || setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Martha Ray"
                          className="w-full bg-farm-cream border border-[#D9D1C5] rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-farm-clay focus:border-farm-clay outline-none font-sans"
                        />
                        {errors.name && (
                          <span className="text-[10px] text-farm-clay font-medium">{errors.name}</span>
                        )}
                      </div>

                      {/* Email input */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono text-farm-charcoal/60 uppercase font-bold" htmlFor="contact-email">
                          Email Coordinates *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setErrors({...errors, email: ''}) || setFormData({ ...formData, email: e.target.value })}
                          placeholder="martha@countryfields.com"
                          className="w-full bg-farm-cream border border-[#D9D1C5] rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-farm-clay focus:border-farm-clay outline-none font-sans"
                        />
                        {errors.email && (
                          <span className="text-[10px] text-farm-clay font-medium">{errors.email}</span>
                        )}
                      </div>

                      {/* Subject select */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono text-farm-charcoal/60 uppercase font-bold" htmlFor="contact-subject">
                          What is this about?
                        </label>
                        <select
                          id="contact-subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-farm-cream border border-[#D9D1C5] rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-farm-clay focus:border-farm-clay outline-none h-10 text-farm-charcoal/80 font-sans cursor-pointer"
                        >
                          <option value="question">A simple store question</option>
                          <option value="custom">Inquiring about custom floral wreaths</option>
                          <option value="class">Kentucky Crafts Class reservation</option>
                          <option value="family">Just sending positive blessings!</option>
                        </select>
                      </div>

                      {/* Message area */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono text-farm-charcoal/60 uppercase font-bold" htmlFor="contact-message">
                          Message Note *
                        </label>
                        <textarea
                          id="contact-message"
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setErrors({...errors, message: ''}) || setFormData({ ...formData, message: e.target.value })}
                          placeholder="Leave your question or custom request here..."
                          className="w-full bg-farm-cream border border-[#D9D1C5] rounded-xl py-2.5 px-3 text-xs focus:ring-1 focus:ring-farm-clay focus:border-farm-clay outline-none resize-none font-sans"
                        />
                        {errors.message && (
                          <span className="text-[10px] text-farm-clay font-medium">{errors.message}</span>
                        )}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-full bg-farm-sage hover:bg-farm-sage-dark text-[#F5F2EC] font-sans font-bold text-xs py-3 rounded-xl shadow-md tracking-wider uppercase transition-all hover:scale-102 flex items-center justify-center gap-1.5 cursor-pointer mt-4 focus:ring-2 focus:ring-farm-clay outline-none"
                        id="contact-submit-btn"
                      >
                        <span>Send Message Note to girls</span>
                        <Send className="w-3.5 h-3.5 fill-current" />
                      </button>

                    </form>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
