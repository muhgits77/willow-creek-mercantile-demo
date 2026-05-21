/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Trash2, Gift, Send, Landmark, ChevronRight, CheckCircle2, Heart } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    giftNote: '',
    pickupType: 'shipping', // 'shipping' | 'pickup'
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Close Cart Drawer on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const itemsPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shippingThreshold = 60;
  const isFreeShipping = itemsPrice >= shippingThreshold;
  const shippingCost = itemsPrice > 0 && !isFreeShipping && formData.pickupType === 'shipping' ? 6.95 : 0;
  const taxCost = itemsPrice * 0.06; // Kentucky state sales tax is 6%
  const finalPrice = itemsPrice + shippingCost + taxCost;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "We need y'all's name, please!";
    if (!formData.email.trim()) errors.email = "Please share a coordinate email.";
    if (!formData.phone.trim()) errors.phone = "A handy phone number for text alerts.";
    if (formData.pickupType === 'shipping' && !formData.address.trim()) {
      errors.address = "Where should we send your lovely box?";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setCheckoutStep('success');
  };

  const resetAll = () => {
    onClearCart();
    setCheckoutStep('cart');
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      giftNote: '',
      pickupType: 'shipping',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-farm-charcoal/40 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Sliding Cart Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-farm-cream border-l border-farm-beige shadow-2xl flex flex-col h-full overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Your Shopping Cart"
          >
            {/* Header Area */}
            <div className="p-5 border-b border-farm-beige flex items-center justify-between bg-gingham-clay">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-farm-sage" aria-hidden="true" />
                <h3 className="font-serif font-bold text-lg text-farm-charcoal">
                  {checkoutStep === 'cart' ? 'Y\'all\'s Treasures' : checkoutStep === 'checkout' ? 'Cozy Checkout' : 'Order Blessed!'}
                </h3>
                <span className="text-[10px] bg-farm-clay text-farm-cream px-1.5 py-0.5 rounded-full font-mono font-bold">
                  {cart.reduce((add, item) => add + item.quantity, 0)} items
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full border border-farm-beige hover:border-farm-clay text-farm-charcoal/50 hover:text-farm-clay transition-colors cursor-pointer focus:ring-2 focus:ring-farm-clay outline-none"
                id="cart-close-btn"
                aria-label="Close Shopping Drawer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Main Interactive Drawer Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              
              {checkoutStep === 'cart' && (
                <>
                  {cart.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-16 flex flex-col items-center justify-center space-y-4">
                      <div className="bg-farm-cream w-16 h-16 rounded-full flex items-center justify-center border border-farm-beige shadow-sm text-farm-sage/35" aria-hidden="true">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-serif font-semibold text-base text-farm-charcoal">
                          Y'all's bag is currently empty!
                        </h4>
                        <p className="text-xs text-farm-charcoal/55 max-w-xs mx-auto mt-1 leading-relaxed font-sans">
                          Take a wander through our shelves, friend, and pick out some rustic wood frames or hand-poured pecan pie candles to bless your home!
                        </p>
                      </div>
                      <button
                        onClick={onClose}
                        className="bg-farm-sage hover:bg-farm-sage-dark text-farm-cream text-xs font-semibold py-2.5 px-6 rounded-lg transition-transform hover:scale-105 cursor-pointer"
                        aria-label="Continue browser browsing"
                      >
                        Start Wandering
                      </button>
                    </div>
                  ) : (
                    /* Cart Item List */
                    <div className="space-y-4">
                      
                      {/* Free Shipping Alert Gauge */}
                      <div className="bg-farm-sage-pale border border-farm-sage-light/60 p-3.5 rounded-lg text-xs leading-relaxed text-farm-sage-dark font-sans flex items-start gap-2" role="status">
                        <span className="text-base" aria-hidden="true">🌾</span>
                        <div>
                          {isFreeShipping ? (
                            <span><strong>Congratulations!</strong> Your order qualifies for <strong>Free Southern Shipping</strong>!</span>
                          ) : (
                            <span>Y'all are just <strong>${(shippingThreshold - itemsPrice).toFixed(2)}</strong> away from <strong>Free Shipping</strong> (orders over $60).</span>
                          )}
                          <div className="w-full bg-farm-beige h-1.5 rounded-full overflow-hidden mt-2 border border-farm-sage/10" aria-hidden="true">
                            <div 
                              className="bg-farm-sage h-full transition-all duration-500" 
                              style={{ width: `${Math.min(100, (itemsPrice / shippingThreshold) * 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Items loop */}
                      <div className="divide-y divide-farm-beige" role="list" aria-label="Selected cart items">
                        {cart.map((item) => (
                          <div key={item.product.id} className="py-4 flex gap-4 first:pt-0 last:pb-0" role="listitem">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              referrerPolicy="no-referrer"
                              className="w-16 h-16 object-cover rounded-lg border border-farm-beige"
                            />
                            
                            <div className="flex-1 space-y-1">
                              <h4 className="text-sm font-serif font-semibold text-farm-charcoal leading-tight line-clamp-1">
                                {item.product.name}
                              </h4>
                              
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-mono text-farm-charcoal/60">
                                  ${item.product.price.toFixed(2)} ea.
                                </span>
                                <span className="font-serif font-bold text-farm-charcoal">
                                  ${(item.product.price * item.quantity).toFixed(2)}
                                </span>
                              </div>

                              {/* Quantity controls and delete row */}
                              <div className="flex items-center justify-between pt-1">
                                <div className="flex items-center border border-farm-sage/30 rounded bg-farm-cream overflow-hidden" role="group" aria-label={`Quantity controls for ${item.product.name}`}>
                                  <button
                                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                    className="px-2 py-0.5 text-xs font-mono font-extrabold text-farm-charcoal/60 hover:bg-farm-beige cursor-pointer"
                                    aria-label={`Decrease quantity of ${item.product.name}`}
                                  >
                                    -
                                  </button>
                                  <span className="px-2 text-xs font-mono font-medium text-farm-charcoal" aria-label={`Current quantity ${item.quantity}`}>
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                    className="px-2 py-0.5 text-xs font-mono font-extrabold text-farm-charcoal/60 hover:bg-farm-beige cursor-pointer"
                                    aria-label={`Increase quantity of ${item.product.name}`}
                                  >
                                    +
                                  </button>
                                </div>

                                <button
                                  onClick={() => onRemoveItem(item.product.id)}
                                  className="text-farm-clay-dark hover:text-red-700 p-1 rounded hover:bg-farm-clay/5 transition-colors cursor-pointer"
                                  aria-label={`Remove ${item.product.name} from shopping cart`}
                                >
                                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                                </button>
                              </div>

                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Gift wrapping option */}
                      <div className="bg-farm-cream p-3.5 rounded-lg border border-dashed border-farm-wood/30 flex items-start gap-2.5 bg-gingham-clay" aria-hidden="true">
                        <Gift className="w-4 h-4 text-farm-clay mt-0.5 shrink-0" />
                        <div>
                          <h5 className="text-xs font-serif font-bold text-farm-charcoal">
                            Need standard Gift Wrapping? (Complimentary)
                          </h5>
                          <p className="text-[10px] text-farm-charcoal/60 font-sans mt-0.5">
                            We wrap our treasures with premium kraft paper, clean jute twine, and a sprig of lavender. Share y'all's custom note inside the checkout!
                          </p>
                        </div>
                      </div>

                    </div>
                  )}
                </>
              )}

              {checkoutStep === 'checkout' && (
                /* CHECKOUT FORM */
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="border-b border-farm-beige pb-2 mb-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-farm-clay font-bold">
                      Reservation Pickup / Shipping details
                    </h4>
                  </div>

                  {/* Toggle pickup vs shipping */}
                  <div className="grid grid-cols-2 gap-2 bg-farm-beige/40 p-1 rounded-lg border border-farm-beige" role="radiogroup" aria-label="Fulfillment Type">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, pickupType: 'shipping' })}
                      className={`aria-checked:bg-white aria-checked:text-farm-sage-dark py-1.5 rounded-md text-xs font-sans font-semibold transition-all cursor-pointer ${
                        formData.pickupType === 'shipping'
                          ? 'bg-farm-cream text-farm-sage-dark shadow-xs'
                          : 'text-farm-charcoal/50 hover:text-farm-charcoal'
                      }`}
                      aria-checked={formData.pickupType === 'shipping'}
                      role="radio"
                    >
                      Ship to Me
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, pickupType: 'pickup' })}
                      className={`aria-checked:bg-white aria-checked:text-farm-sage-dark py-1.5 rounded-md text-xs font-sans font-semibold transition-all cursor-pointer ${
                        formData.pickupType === 'pickup'
                          ? 'bg-farm-cream text-farm-sage-dark shadow-xs'
                          : 'text-farm-charcoal/50 hover:text-farm-charcoal'
                      }`}
                      aria-checked={formData.pickupType === 'pickup'}
                      role="radio"
                    >
                      Pine Hollow Shop Pickup
                    </button>
                  </div>

                  {/* Name field */}
                  <div className="space-y-1">
                    <label id="lbl-check-fullname" className="block text-xs font-mono text-farm-charcoal/70 uppercase">
                      Y'all's Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Amber Peck"
                      aria-labelledby="lbl-check-fullname"
                      required
                      className="w-full bg-farm-cream border border-farm-sage/30 rounded-lg py-2 px-3 text-xs focus:ring-1 focus:ring-farm-clay focus:border-farm-clay outline-none"
                    />
                    {formErrors.name && (
                      <span className="text-[10px] text-farm-clay font-medium" role="alert">{formErrors.name}</span>
                    )}
                  </div>

                  {/* Contact Row (Email / Phone) */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label id="lbl-check-email" className="block text-xs font-mono text-farm-charcoal/70 uppercase">
                        Email Coordinates *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="amber@example.com"
                        aria-labelledby="lbl-check-email"
                        required
                        className="w-full bg-farm-cream border border-farm-sage/30 rounded-lg py-2 px-3 text-xs focus:ring-1 focus:ring-farm-clay focus:border-farm-clay outline-none"
                      />
                      {formErrors.email && (
                        <span className="text-[10px] text-farm-clay font-medium" role="alert">{formErrors.email}</span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label id="lbl-check-phone" className="block text-xs font-mono text-farm-charcoal/70 uppercase">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(606) 555-0199"
                        aria-labelledby="lbl-check-phone"
                        required
                        className="w-full bg-farm-cream border border-farm-sage/30 rounded-lg py-2 px-3 text-xs focus:ring-1 focus:ring-farm-clay focus:border-farm-clay outline-none"
                      />
                      {formErrors.phone && (
                        <span className="text-[10px] text-farm-clay font-medium" role="alert">{formErrors.phone}</span>
                      )}
                    </div>
                  </div>

                  {/* Address Area (Conditional on selection) */}
                  {formData.pickupType === 'shipping' && (
                    <motion.div 
                      initial={{ scaleY: 0.8, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      className="space-y-1"
                    >
                      <label id="lbl-check-address" className="block text-xs font-mono text-farm-charcoal/70 uppercase">
                        Sweet Home Shipping Address *
                      </label>
                      <textarea
                        rows={2}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="House Number, Street Name, City, State ZIP"
                        aria-labelledby="lbl-check-address"
                        className="w-full bg-farm-cream border border-farm-sage/30 rounded-lg py-2 px-3 text-xs focus:ring-1 focus:ring-farm-clay focus:border-farm-clay outline-none resize-none"
                      />
                      {formErrors.address && (
                        <span className="text-[10px] text-farm-clay font-medium" role="alert">{formErrors.address}</span>
                      )}
                    </motion.div>
                  )}

                  {/* Custom Gift Note */}
                  <div className="space-y-1">
                    <label id="lbl-check-giftnote" className="block text-xs font-mono text-farm-charcoal/70 uppercase">
                      Gift Note / Custom Shop Instructions
                    </label>
                    <textarea
                      rows={2}
                      value={formData.giftNote}
                      onChange={(e) => setFormData({ ...formData, giftNote: e.target.value })}
                      placeholder="e.g. Please wrap with standard jute ties & write: 'Happy Anniversary Mom!' on the gift card."
                      aria-labelledby="lbl-check-giftnote"
                      className="w-full bg-farm-cream border border-farm-sage/30 rounded-lg py-2 px-3 text-xs focus:ring-1 focus:ring-farm-clay focus:border-farm-clay outline-none resize-none"
                    />
                  </div>

                  {/* Demo Alert Box */}
                  <div className="bg-farm-beige p-3 rounded-lg border border-farm-wood/20 text-[10px] leading-relaxed text-farm-charcoal/60 font-sans italic" aria-hidden="true">
                    🌾 <strong>Southern Note:</strong> This is a simulation Checkout for the digital portfolio showcase. Our shop girls will receive your reservation, holding items under y'all's name for local arrangement. Perfect security—no raw card numbers needed!
                  </div>

                  {/* Hidden Submit Button triggers the form validation */}
                  <input type="submit" id="main-checkout-form-submit" className="hidden" />

                </form>
              )}

              {checkoutStep === 'success' && (
                /* SUCCESS CELEBRATION BOX */
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-6 text-center py-8"
                  role="status"
                >
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-farm-clay/10 rounded-full scale-125 animate-ping" />
                    <div className="bg-farm-clay text-farm-cream w-16 h-16 rounded-full flex items-center justify-center border-4 border-farm-cream shadow-md z-10 relative">
                      <CheckCircle2 className="w-8 h-8 font-extrabold" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-serif font-bold text-2xl text-farm-charcoal">
                      Thank Y'all So Much!
                    </h4>
                    <span className="text-xs uppercase tracking-widest font-mono text-farm-sage font-bold block">
                      Order Blessed & reserved
                    </span>
                    <p className="text-sm text-farm-charcoal/75 leading-relaxed pt-2 max-w-sm mx-auto font-sans">
                      Hooray! Y'all's request has been safely cataloged at the Pine Hollow front desk. We have tucked away your frames, candles, and seasonal primitive arrangements under your name!
                    </p>
                  </div>

                  <div className="bg-gingham-clay p-4 rounded-xl border border-farm-beige text-left text-xs text-farm-charcoal/75 space-y-2.5">
                    <div className="flex justify-between font-mono font-bold text-[10px] border-b border-farm-beige/70 pb-1.5 text-farm-clay">
                      <span>RESERVATION #</span>
                      <span>WCM-2489-KY</span>
                    </div>
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Fulfillment:</strong> {formData.pickupType === 'pickup' ? 'Local pickup in Pine Hollow, KY' : `Ship box to: ${formData.address}`}</p>
                    <p><strong>Selected Total Items:</strong> {cart.reduce((add, item) => add + item.quantity, 0)} items</p>
                    <p className="italic font-medium text-[11px] text-farm-sage-dark pt-1 border-t border-dotted border-farm-beige">
                      "Our girls will call or text you shortly at <strong>{formData.phone}</strong> to confirm shipping coordinates or pickup times. Bless your heart!"
                    </p>
                  </div>

                  <button
                    onClick={resetAll}
                    className="w-full bg-farm-sage hover:bg-farm-sage-dark text-farm-cream font-sans font-bold text-sm py-3 px-6 rounded-lg transition-all hover:scale-102 flex items-center justify-center gap-1.5 cursor-pointer"
                    id="cart-back-btn"
                    aria-label="Clean cart and keep browsing other treasures"
                  >
                    <span>Keep Wandering the Shop</span>
                    <Heart className="w-4 h-4 fill-farm-cream" aria-hidden="true" />
                  </button>
                </motion.div>
              )}

            </div>

            {/* Footer Area with Price Totals */}
            {checkoutStep !== 'success' && cart.length > 0 && (
              <div className="p-5 border-t border-farm-beige bg-gingham">
                
                {/* Cost summary table */}
                <div className="space-y-2.5 text-sm mb-5 font-sans">
                  <div className="flex justify-between text-farm-charcoal/70 font-medium">
                    <span>Selected Treasures:</span>
                    <span className="font-mono text-xs">${itemsPrice.toFixed(2)}</span>
                  </div>
                  {formData.pickupType === 'shipping' && (
                    <div className="flex justify-between text-farm-charcoal/70 font-medium">
                      <span>Sweet Delivery:</span>
                      <span className="font-mono text-xs">
                        {shippingCost === 0 ? <strong className="text-farm-sage">FREE</strong> : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-farm-charcoal/70 font-medium">
                    <span>KY Sales Tax (6%):</span>
                    <span className="font-mono text-xs">${taxCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-farm-charcoal text-base font-serif font-bold pt-2 border-t border-dotted border-farm-beige">
                    <span>Complete Total:</span>
                    <span className="font-mono">${finalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Primary Button */}
                {checkoutStep === 'cart' ? (
                  <button
                    onClick={() => setCheckoutStep('checkout')}
                    className="w-full bg-farm-clay hover:bg-farm-clay-dark text-farm-cream font-sans font-bold text-sm py-4 rounded-lg shadow-md transition-all hover:scale-102 flex items-center justify-center gap-1 cursor-pointer"
                    id="checkout-proceed-btn"
                    aria-label={`Proceed to checkout. Total is $${finalPrice.toFixed(2)}`}
                  >
                    <span>Proceed to Secure Booking Checkout</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    onClick={() => document.getElementById('main-checkout-form-submit')?.click()}
                    className="w-full bg-farm-sage hover:bg-farm-sage-dark text-farm-cream font-sans font-bold text-sm py-4 rounded-lg shadow-md transition-all hover:scale-102 flex items-center justify-center gap-1 cursor-pointer"
                    id="checkout-finalize-btn"
                    aria-label="Submit booking and reserve items"
                  >
                    <span>Place Booking & Reserve Items</span>
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}

              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
