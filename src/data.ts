/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Testimonial, Category } from './types';

/// ESM imports for generated premium images
// @ts-ignore
import porchHeroImage from './assets/images/porch_hero_banner_1779379942870.png';
// @ts-ignore
import farmhouseInteriorHeroImage from './assets/images/farmhouse_interior_hero_bg_1779380564511.png';
// @ts-ignore
import decorCategoryImage from './assets/images/farmhouse_decor_card_1779379959606.png';
// @ts-ignore
import seasonalCategoryImage from './assets/images/seasonal_gifts_card_1779379977252.png';
// @ts-ignore
import warmBoutiqueHeroImage from './assets/images/warm_boutique_hero_1779384314380.png';
// @ts-ignore
import farmhouseCandleImage from './assets/images/farmhouse_candle_1779384333582.png';
// @ts-ignore
import rusticHomeSignImage from './assets/images/rustic_home_sign_1779384353184.png';

export const HERO_IMAGE = rusticHomeSignImage; // Beautiful generated mantel centerpiece
export const HERO_BG_IMAGE = warmBoutiqueHeroImage; // Premium generated warm boutique interior

export const CATEGORIES: Category[] = [
  {
    id: 'decor',
    name: 'Home Decor',
    description: 'Rustic distressed signs, tobacco baskets, farmhouse mantels & vintage stoneware.',
    image: decorCategoryImage,
  },
  {
    id: 'gifts',
    name: 'Primitive Gifts',
    description: 'Handmade soy candles, local goat milk soaps, artisanal mug sets & gift basket goodies.',
    image: 'https://images.unsplash.com/photo-1607006342411-10dc6aa40017?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'seasonal',
    name: 'Seasonal Highlights',
    description: 'Autumn stitched pumpkins, spring floral cotton wreaths, and holiday hearth cheer.',
    image: seasonalCategoryImage,
  },
  {
    id: 'kitchen',
    name: 'Kitchen & Table',
    description: 'Artisanal ceramics, hand-carved honey spoons, flax linen runners & timber cheese boards.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'accessories',
    name: 'Cozy Accents',
    description: 'Chunk-woven blankets, linen pillows, burlap accents & distressed iron lanterns.',
    image: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&q=80&w=600',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'dec-1',
    name: 'Rustic "Bless This Home" Wooden Sign',
    price: 32.50,
    description: 'Bless y\'all\'s sweet hearts and homes with this timeless, heavy pine mantel sign. Hand-lettered in our sign shop with primitive charcoal milk paint over ivory linen cream, and lightly sanded to capture generations of local country character.',
    category: 'decor',
    image: rusticHomeSignImage,
    rating: 5.0,
    isBestSeller: true,
    dimensions: '10" x 24"',
    origin: 'Hand-Lettered in Kentucky'
  },
  {
    id: 'gif-1',
    name: 'Hand-Poured Cozy Hearth Farmhouse Candle',
    price: 15.00,
    description: 'Pour some warmth into y\'all\'s evenings! Hand-crafted in small batches using 100% pure native soybean wax in a rustic glass jar. Infused with rich notes of simmered red apples, local clover honey, and slow-ground Indonesian cinnamon logs for a clean 65-hour glowing burn.',
    category: 'gifts',
    image: farmhouseCandleImage,
    rating: 4.9,
    isBestSeller: true,
    isNewArrival: true,
    dimensions: '9 oz Jar',
    origin: 'Small-Batch Hand-Poured'
  },
  {
    id: 'dec-2',
    name: 'Tobacco Barn Reclaimed Wood Frame',
    price: 38.00,
    description: 'A handsome, sturdy heirloom picture frame built frame-by-frame using centuries-old reclaimed oak from local Cumberland Valley tobacco kilns. Displays rich rugged grain, original iron marks, and authentic historic distress.',
    category: 'decor',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    dimensions: '8" x 10" Inner',
    origin: 'Cumberland Woodcrafters'
  },
  {
    id: 'gif-2',
    name: 'Appalachian Goat Milk Soap & Honey Crate',
    price: 19.50,
    description: 'A sweet country blessing wrapped in a premium pine container. Holds two giant blocks of cold-process oatmeal honey soap—hand-milled with fresh, skin-softening goat milk from local pasture herds—alongside a jar of pure Kentucky wild flower honey.',
    category: 'gifts',
    image: 'https://images.unsplash.com/photo-1607006342411-10dc6aa40017?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    isNewArrival: true,
    dimensions: 'Crate with 2 Bars (5 oz)',
    origin: 'Hollow Creek Hand-Milled'
  },
  {
    id: 'kit-1',
    name: 'Vintage Speckled Enamelware Sweet Tea Pitcher',
    price: 29.50,
    description: 'Every porch rocker deserves a ice-cold pitcher of sweet Southern tea. This heavy-gauge steel enamelware classic is custom finished with retro charcoal speckles and black rim styling. Fills up to 8 tall glasses of hospitality.',
    category: 'kitchen',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    dimensions: '9" Height (2.5 Qt)',
    origin: 'Pine Hollow Enamel Co.'
  },
  {
    id: 'kit-2',
    name: 'Live-Edge Old-Growth Kentucky Walnut Slab',
    price: 45.00,
    description: 'Crafted from salvaged, native Kentucky walnut trunks, this rich dark serving slab features a living bark edge and highly swirling grain patterns. Treated on-site with pure food-grade beeswax and walnut oil, finished with a heavy leather utility strap.',
    category: 'kitchen',
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&q=80&w=600',
    rating: 5.0,
    isNewArrival: true,
    dimensions: '18" x 9" x 1.5"',
    origin: 'Licking River Woodworks'
  },
  {
    id: 'sea-1',
    name: 'Grapevine Native Cotton Boll Door Wreath',
    price: 42.00,
    description: 'Say "Y\'all welcome" before they even cross the threshold! A magnificent, dense statement wreath hand-bound with thick native Kentucky grapevine, embellished with genuine fluffy cotton bolls, green mountain fern, and a hand-tied wire-edged burlap sash.',
    category: 'seasonal',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    isBestSeller: true,
    dimensions: '22" Outer Diameter',
    origin: 'Porchside Floral Guild'
  },
  {
    id: 'acc-1',
    name: 'Classic Calico Patchwork Quilted Porch Throw',
    price: 54.00,
    description: 'Stay cozy out on the rocker even when the autumn twilight breeze sets in. A thick, beautifully weighted heirloom cotton quilt displaying hand-stitched blocks of alternating floral country calico and cream chambray check, pre-washed for velvety softness.',
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&q=80&w=600',
    rating: 5.0,
    dimensions: '50" x 65"',
    origin: 'Seamstress Guild'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Martha Jenkins',
    location: 'Somerset, KY',
    quote: "Willow Creek Mercantile is an absolute sanctuary! Every single time I wander in, the fragrance of warm baked apple butter melts my heart, and the girls treat me like local family. Y'all have the cutest displays!",
    rating: 5,
    date: 'April 14, 2026',
  },
  {
    id: 't2',
    name: 'Billy & Sarah Ray',
    location: 'Pine Hollow, KY',
    quote: "We bought the hand-carved cherry-wood dipper set and a braided runner for our dining room table. Exceptional quality with absolute rustic honest value. Bless y'all for bringing such beauty to our street!",
    rating: 5,
    date: 'May 02, 2026',
  },
  {
    id: 't3',
    name: 'Clarissa Montgomery',
    location: 'Knoxville, TN',
    quote: "We take a detour through Pine Hollow on our way down to the state parks just to shop at Willow Creek. Best farmhouse decor in Kentucky! Y'all are the absolute sweetest.",
    rating: 5,
    date: 'May 18, 2026',
  },
  {
    id: 't4',
    name: 'Abigail Finch',
    location: 'Lexington, KY',
    quote: "I ordered their vintage speckled enamelware pitcher and patchwork quilted throw, and they arrived beautifully wrapped with a handwritten note. It felt just like a warm country hug!",
    rating: 5,
    date: 'May 19, 2026',
  },
  {
    id: 't5',
    name: 'Preacher Dave Henderson',
    location: 'Pine Hollow, KY',
    quote: "The sweet folks at Willow Creek don't just run a mercantile; they serve this community with pure grace. The hand-stenciled wooden signs and candles in my study always bring a cozy ease to my spirit.",
    rating: 5,
    date: 'May 20, 2026',
  }
];

export const STORE_INFO = {
  name: "Willow Creek Mercantile",
  tagline: "Bringing Warm Southern Charm to Your Home",
  address: "214 Oak Grove Lane Suite 2, Pine Hollow, KY 42728",
  phone: "(270) 555-0198",
  email: "hello@willowcreekmercantile.com",
  hours: [
    { days: "Mon - Fri", time: "10:00 AM - 5:30 PM" },
    { days: "Saturday", time: "10:00 AM - 4:00 PM" },
    { days: "Sunday", time: "Closed (Family & Church Day)" }
  ],
  coords: {
    lat: 36.9125,
    lng: -84.7700
  }
};
