/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Facebook, 
  Heart as HeartIcon, 
  MessageCircle, 
  Share2, 
  ExternalLink, 
  Sparkles, 
  Send,
  ThumbsUp,
  MessageSquare,
  Check
} from 'lucide-react';

interface SocialPost {
  id: string;
  type: 'instagram' | 'facebook';
  image: string;
  caption: string;
  likes: number;
  commentsCount: number;
  date: string;
  tags?: string[];
  comments?: Array<{ author: string; text: string }>;
}

const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'sp-1',
    type: 'instagram',
    image: 'https://images.unsplash.com/photo-1603006905393-0d41e755581b?auto=format&fit=crop&q=80&w=600',
    caption: "Freshly poured Southern Comfort Pecan Pie Soy Candles curing on our cottage racks. The shop smells absolutely like buttery heaven right now sweet friends! 🍂🕯️ Stop by and grab one, or let us ship a jar of Kentucky blessings right to your porch steps.",
    likes: 184,
    commentsCount: 22,
    date: '2 hours ago',
    tags: ['#willowcreekmercantile', '#handpouredcandles', '#pecanpiesoy', '#primitivegifting'],
    comments: [
      { author: 'sarah_lou_82', text: 'Oh my goodness, I can smell this photo! Saving one for me!' },
      { author: 'beverly.barnett', text: 'Hands down the best candles in the area. Burned mine for 4 hours yesterday.' },
      { author: 'clara_appalachia', text: "Y'all better save me two files when I come down Saturday!" }
    ]
  },
  {
    id: 'sp-2',
    type: 'instagram',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600',
    caption: "A peek at a cozy mantel corner styled by our sweet friend Martha Jenkins using our hand-carved tobacco barn frames! 🪵🏠 There is truly nothing that brings us more joy than seeing our local primitive finds blessing cozy family hearths. Send us y'all's photos to get featured!",
    likes: 231,
    commentsCount: 16,
    date: '1 day ago',
    tags: ['#blessyourhome', '#tobaccobarnwood', '#reclaimedframe', '#farmhousemantel'],
    comments: [
      { author: 'mjenkins_cozy', text: 'Thank you for making such beautiful solid frames! It fits our family portrait perfectly.' },
      { author: 'country_girl_98', text: 'This mantel is pure goals. So incredibly cozy!' }
    ]
  },
  {
    id: 'sp-3',
    type: 'instagram',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    caption: "Spring and fall cotton boll grapevine wreaths are officially hanging on the front porch rails! 🌾🍂 Hand-assembled on real thick Kentucky vines with beautiful dusty mountain mountain greens and our signature oversized rustic burlap bow. These sell out so fast, sweet friends!",
    likes: 312,
    commentsCount: 45,
    date: '2 days ago',
    tags: ['#handcraftedwreaths', '#countryfrontporch', '#grapevinewreath', '#willowcreekstyle'],
    comments: [
      { author: 'jess.reed', text: 'Do y\'all ship these to Knoxville? I need one for my front door ASAP.' },
      { author: 'willow_creek_mercantile', text: '@jess.reed Yes we do, sweet friend! Just shoot us a message note!' },
      { author: 'ellie_mae5', text: 'Beautiful craftsmanship as always.' }
    ]
  },
  {
    id: 'sp-4',
    type: 'instagram',
    image: 'https://images.unsplash.com/photo-1505673542670-a513cf1b1b14?auto=format&fit=crop&q=80&w=600',
    caption: "Our weekly reminders for anyone who needs to hear it today: 'There are no strangers in our shop, sweet friends, just family we haven\'t met yet!' 🌾❤️ Grab a rocking chair on the porch, grab a glass of ice-cold sweet tea, and let\'s enjoy the blessings of the season.",
    likes: 425,
    commentsCount: 37,
    date: '4 days ago',
    tags: ['#southernhospitality', '#kentuckyboutique', '#meetusontheporch', '#smalltownblessings'],
    comments: [
      { author: 'bobby_carter', text: 'This is why Willow Creek Mercantile is the benchmark of our community.' },
      { author: 'linda.g', text: "Y'all are the sweetest souls in Pine Hollow!" }
    ]
  },
  {
    id: 'sp-5',
    type: 'instagram',
    image: 'https://images.unsplash.com/photo-1607006342411-10dc6aa40017?auto=format&fit=crop&q=80&w=600',
    caption: "Mark y'all's Calendars! 🧼🍯 Gathering up local recipes for our upcoming Lavender & Field Honey Goat Milk soap-making workshop happening next Saturday right here at our workshop table. Spend a peaceful afternoon with us, learn a heritage craft, and leave with nested soap boxes!",
    likes: 198,
    commentsCount: 29,
    date: '5 days ago',
    tags: ['#localclasses', '#heritagecrafts', '#goatmilksoap', '#pinehollowky'],
    comments: [
      { author: 'graceful_appalachian', text: 'Saturdays are for soap-making! Count me and my sister in.' },
      { author: 'hannah.k', text: 'Are there still spots available? This sounds so relaxing.' }
    ]
  },
  {
    id: 'sp-6',
    type: 'instagram',
    image: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&q=80&w=600',
    caption: "Look at these new arrival cozy sage and farmhouse cream woven throw blankets catching the warm, comforting evening sun... ✨🍂 Pair them with a rustic stenciled feed sack pillow and you've got the handiest recipe for perfect Sunday reading comfort.",
    likes: 279,
    commentsCount: 20,
    date: '1 week ago',
    tags: ['#cozyaccent', '#burlappillows', '#farmhouseblanket', '#sundayslumber'],
    comments: [
      { author: 'beverly.barnett', text: 'I bought this throw on Tuesday and my cats have completely claimed it! Worth every penny.' },
      { author: 'shelby_lou', text: 'Beautiful soft green shades!' }
    ]
  }
];

export default function SocialFeed() {
  const [activeTab, setActiveTab] = useState<'instagram' | 'facebook'>('instagram');
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [postLikes, setPostLikes] = useState<Record<string, number>>({});
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});
  
  // Custom comment states
  const [newComment, setNewComment] = useState('');
  const [addedComments, setAddedComments] = useState<Record<string, Array<{author: string; text: string}>>>({});
  const [shareSuccessId, setShareSuccessId] = useState<string | null>(null);

  const handleLike = (postId: string) => {
    const isAlreadyLiked = hasLiked[postId];
    setHasLiked(prev => ({ ...prev, [postId]: !isAlreadyLiked }));
    setPostLikes(prev => ({
      ...prev,
      [postId]: (prev[postId] || SOCIAL_POSTS.find(p => p.id === postId)?.likes || 0) + (isAlreadyLiked ? -1 : 1)
    }));
  };

  const handleShare = (postId: string) => {
    setShareSuccessId(postId);
    setTimeout(() => {
      setShareSuccessId(null);
    }, 2000);
  };

  const handleAddComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const freshComment = {
      author: 'sweet_friend_guest',
      text: newComment.trim()
    };

    setAddedComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), freshComment]
    }));
    setNewComment('');
  };

  return (
    <section 
      id="social" 
      className="bg-[#FCF9F5] bg-parchment py-28 md:py-36 border-b border-[#D9D1C5] relative scroll-mt-24 md:scroll-mt-32"
    >
      {/* Decorative Stamp styling in background */}
      <div className="absolute top-1/2 right-12 z-0 font-serif text-[180px] font-bold text-farm-sage/[0.03] select-none pointer-events-none -translate-y-1/2 rotate-12">
        W.C.M
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#D9D1C5] pb-8 gap-4">
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-farm-clay rounded-full"></span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-sans text-farm-clay font-bold block">
                Join Our Country Hearthside Family
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-farm-charcoal leading-tight">
              Front Porch <span className="italic font-normal text-farm-clay">Happenings</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-farm-wood/90 max-w-sm leading-relaxed italic md:text-right border-l md:border-l-0 md:border-r-2 border-farm-clay/30 pl-4 md:pl-0 md:pr-4 py-1">
            "Follow our daily boutique shares, handmade candle pours, and local Kentucky workshop smiles on y'all's screens!"
          </p>
        </div>

        {/* Dynamic Social Network Toggler */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#FAF7F2] p-1.5 rounded-2xl border border-[#EBE7DF] flex gap-2 shadow-xs">
            
            <button
              onClick={() => setActiveTab('instagram')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === 'instagram'
                  ? 'bg-farm-sage text-[#F5F2EC] shadow-md hover:bg-farm-sage-dark'
                  : 'text-farm-wood hover:text-farm-charcoal bg-transparent'
              }`}
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram Feed</span>
            </button>

            <button
              onClick={() => setActiveTab('facebook')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === 'facebook'
                  ? 'bg-farm-sage text-[#F5F2EC] shadow-md hover:bg-farm-sage-dark'
                  : 'text-farm-wood hover:text-farm-charcoal bg-transparent'
              }`}
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook Column</span>
            </button>

          </div>
        </div>

        {/* FEED CONTENT VIEWS */}
        <AnimatePresence mode="wait">
          {activeTab === 'instagram' ? (
            
            /* INSTAGRAM GRID VIEW */
            <motion.div
              key="insta"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {SOCIAL_POSTS.map((post) => {
                const currentLikes = postLikes[post.id] ?? post.likes;
                const likesActive = hasLiked[post.id] || false;
                
                return (
                  <div
                    key={post.id}
                    id={`insta-post-${post.id}`}
                    onClick={() => setSelectedPost(post)}
                    className="group bg-[#FAF7F2] border border-[#EBE7DF] rounded-2xl p-3.5 hover:shadow-xl hover:border-farm-clay/35 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    
                    {/* Visual Media with Polaroid Margins */}
                    <div className="relative pt-[100%] overflow-hidden rounded-xl bg-[#EBE5DC]">
                      <img 
                        src={post.image} 
                        alt="Willow Creek Mercantile Instagram Post" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Hover Overlay containing stats */}
                      <div className="absolute inset-0 bg-farm-charcoal/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                        <div className="flex items-center gap-1.5 text-[#FAF7F2]">
                          <HeartIcon className="w-5 h-5 fill-[#FAF7F2]" />
                          <span className="font-mono text-sm font-semibold">{currentLikes}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#FAF7F2]">
                          <MessageCircle className="w-5 h-5 fill-none stroke-[2.5]" />
                          <span className="font-mono text-sm font-semibold">
                            {post.commentsCount + (addedComments[post.id]?.length || 0)}
                          </span>
                        </div>
                      </div>

                      {/* Network top indicator */}
                      <div className="absolute top-3 right-3 bg-black/45 backdrop-blur-xs p-1.5 rounded-full text-white">
                        <Instagram className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Captions teaser */}
                    <div className="pt-4 px-1 space-y-3">
                      
                      {/* Interaction Actions Bar */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-farm-clay font-bold">
                          {post.date}
                        </span>
                        
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleLike(post.id); }}
                            className={`p-1.5 rounded-full transition-colors ${
                              likesActive 
                                ? 'bg-[#FFEDED] text-rose-500' 
                                : 'text-farm-wood hover:text-farm-clay'
                            }`}
                            title="Love post"
                          >
                            <HeartIcon className={`w-4 h-4 ${likesActive ? 'fill-current' : ''}`} />
                          </button>
                          
                          <button
                            onClick={(e) => { e.stopPropagation(); handleShare(post.id); }}
                            className="p-1.5 text-farm-wood hover:text-farm-clay transition-colors"
                            title="Share post coordinates"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-[#5D524A] font-sans line-clamp-3 leading-relaxed">
                        {post.caption}
                      </p>

                      {post.tags && (
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[10px] font-mono text-farm-sage font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                    </div>

                  </div>
                );
              })}
            </motion.div>

          ) : (
            
            /* FACEBOOK TIMELINE COLUMN VIEW (Aligned as double timeline layouts) */
            <motion.div
              key="fb"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              {[SOCIAL_POSTS[0], SOCIAL_POSTS[3]].map((post, index) => {
                const currentLikes = postLikes[post.id] ?? post.likes;
                const likesActive = hasLiked[post.id] || false;
                const matchesShare = shareSuccessId === post.id;
                const commentsList = [
                  ...(post.comments || []),
                  ...(addedComments[post.id] || [])
                ];

                return (
                  <div
                    key={post.id}
                    id={`fb-post-${post.id}`}
                    className="bg-[#FAF7F2] border border-[#EBE7DF] rounded-3xl shadow-md overflow-hidden flex flex-col font-sans"
                  >
                    
                    {/* FB Post Header */}
                    <div className="p-5 flex items-center justify-between border-b border-[#EBE7DF]">
                      <div className="flex items-center gap-3">
                        {/* Profile badge */}
                        <div className="w-10 h-10 bg-farm-sage text-white rounded-full flex items-center justify-center font-serif font-bold text-sm shadow-inner">
                          WCM
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-extrabold text-farm-charcoal">
                              Willow Creek Mercantile
                            </h4>
                            <span className="text-[9px] bg-[#E1EDEA] text-farm-sage px-2 py-0.5 rounded-full font-mono font-bold uppercase">
                              Author
                            </span>
                          </div>
                          <span className="block text-[10px] font-mono text-[#8C7E74] mt-0.5">
                            {post.date} • Pine Hollow, KY • 🌎 Public
                          </span>
                        </div>
                      </div>

                      {/* Header right brand */}
                      <div className="bg-[#EAE4D9]/50 p-2 rounded-full text-[#3B5998]">
                        <Facebook className="w-5 h-5" />
                      </div>
                    </div>

                    {/* FB Caption Body Text */}
                    <div className="p-5 space-y-4">
                      
                      <p className="text-sm text-[#4A3F33] leading-relaxed">
                        {post.caption}
                      </p>

                      {post.tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map((tag, i) => (
                            <span key={i} className="text-xs font-mono text-farm-clay hover:underline cursor-pointer">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                    </div>

                    {/* FB Post attached image */}
                    <div className="relative pt-[56.25%] bg-[#FAF7F2] border-y border-[#EBE7DF] overflow-hidden">
                      <img
                        src={post.image}
                        alt="Facebook shared rustic vignette"
                        className="absolute inset-0 w-full h-full object-cover hover:scale-101 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Likes and stats counters */}
                    <div className="px-5 py-3 border-b border-[#EBE7DF] flex items-center justify-between text-xs font-mono text-[#8C7E74]">
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-5 bg-[#3B5998] text-[#FAF7F2] rounded-full flex items-center justify-center scale-90">
                          <ThumbsUp className="w-3 h-3 fill-current" />
                        </div>
                        <span className="font-semibold text-farm-charcoal">{currentLikes} people reacted</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{commentsList.length} comments</span>
                        <span>•</span>
                        <span>12 shares</span>
                      </div>
                    </div>

                    {/* Live Interaction buttons row */}
                    <div className="px-3 py-1.5 bg-[#F6F2EB]/50 border-b border-[#EBE7DF] grid grid-cols-3 gap-2 text-xs">
                      
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all font-semibold cursor-pointer ${
                          likesActive 
                            ? 'text-[#3E62AD] bg-[#EAF0FC]'
                            : 'text-farm-wood hover:bg-[#FAF7F1] hover:text-farm-charcoal'
                        }`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${likesActive ? 'fill-current' : ''}`} />
                        <span>Like</span>
                      </button>

                      <button
                        onClick={() => {
                          const contactInput = document.getElementById(`comment-input-${post.id}`);
                          if (contactInput) contactInput.focus();
                        }}
                        className="flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all font-semibold text-farm-wood hover:bg-[#FAF7F1] hover:text-farm-charcoal cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Comment</span>
                      </button>

                      <button
                        onClick={() => handleShare(post.id)}
                        disabled={matchesShare}
                        className={`flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all font-semibold cursor-pointer ${
                          matchesShare
                            ? 'text-emerald-700 bg-emerald-100/60'
                            : 'text-farm-wood hover:bg-[#FAF7F1] hover:text-farm-charcoal'
                        }`}
                      >
                        {matchesShare ? (
                          <>
                            <Check className="w-4 h-4 stroke-[2.5]" />
                            <span>Shared!</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                          </>
                        )}
                      </button>

                    </div>

                    {/* FB Comments columns area */}
                    <div className="bg-[#FAF7F2] p-5 space-y-4">
                      
                      <div className="space-y-3.5">
                        {commentsList.map((c, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs">
                            <div className="w-7 h-7 bg-[#E6DEC9] text-farm-sage rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 border border-[#D9D1C5] mt-0.5 shadow-xs">
                              {c.author.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="bg-[#EFEAE1]/80 rounded-2xl px-3 py-2.5 max-w-[85%] border border-[#E8E1D5]">
                              <span className="block font-bold text-farm-charcoal mb-0.5">
                                {c.author}
                              </span>
                              <p className="text-[#5D524A] leading-relaxed">
                                {c.text}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Write a comment form */}
                      <form 
                        onSubmit={(e) => handleAddComment(e, post.id)}
                        className="flex gap-2 pt-2"
                      >
                        <input
                          id={`comment-input-${post.id}`}
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Write a warm Southern comment..."
                          className="flex-1 bg-farm-cream border border-[#D9D1C5] rounded-xl py-2 px-3 text-xs outline-none focus:ring-1 focus:ring-farm-clay focus:border-farm-clay pr-10"
                        />
                        <button
                          type="submit"
                          className="bg-farm-sage hover:bg-farm-sage-dark text-[#FAF7F2] p-2 rounded-xl text-xs transition-colors cursor-pointer"
                        >
                          <Send className="w-4 h-4 fill-current" />
                        </button>
                      </form>

                    </div>

                  </div>
                );
              })}
            </motion.div>

          )}
        </AnimatePresence>

        {/* Dynamic CTA box below streams */}
        <div className="mt-16 bg-[#FAF7F2] border border-[#EBE7DF] rounded-3xl p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between shadow-md gap-6 hover:border-farm-clay/20 transition-all">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold text-farm-charcoal flex items-center justify-center md:justify-start gap-1.5">
              <Sparkles className="w-5 h-5 text-farm-clay fill-farm-clay animate-spin" />
              <span>Stay Inspired Online</span>
            </h3>
            <p className="text-xs sm:text-sm text-farm-wood font-medium leading-relaxed">
              We handpost cozy furniture displays, primitive stencils, and seasonal updates every week sweet friends!
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1877F2] text-white px-5 py-3 rounded-full text-xs font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md font-sans uppercase tracking-wider cursor-pointer"
            >
              <Facebook className="w-4 h-4 fill-current" />
              <span>Like Page</span>
            </a>
            
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-[#E1306C] via-[#C13584] to-[#833AB4] text-white px-5 py-3 rounded-full text-xs font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md font-sans uppercase tracking-wider cursor-pointer font-bold"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow Us</span>
            </a>
          </div>
        </div>

      </div>

      {/* INSTAGRAM MODAL PREVIEW */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-farm-charcoal/70 backdrop-blur-xs flex items-center justify-center p-4">
            
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="bg-[#FAF7F2] rounded-3xl w-full max-w-3xl border border-[#D9D1C5] shadow-2xl overflow-hidden relative"
            >
              {/* Close button */}
              <button
                onClick={() => { setSelectedPost(null); setNewComment(''); }}
                className="absolute top-4 right-4 z-20 bg-[#FAF7F2] px-3 py-1.5 rounded-full border border-[#D9D1C5] text-xs font-mono font-bold text-farm-charcoal/70 hover:border-farm-clay hover:text-farm-clay transition-all cursor-pointer"
                id="close-social-modal"
              >
                ✕ Close
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                
                {/* Media Column */}
                <div className="relative pt-[100%] md:pt-0 md:h-[500px] bg-[#EAE5DC]">
                  <img
                    src={selectedPost.image}
                    alt="Selected Instagram Post"
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>

                {/* Feed Details & Live comments simulation */}
                <div className="p-6 sm:p-8 flex flex-col justify-between h-full min-h-[400px] md:h-[500px]">
                  
                  <div className="space-y-4 overflow-y-auto max-h-[300px] md:max-h-[360px] pr-1 scrollbar-thin">
                    <div className="flex items-center gap-2 pb-3.5 border-b border-[#D9D1C5]">
                      <div className="w-8 h-8 rounded-full bg-farm-sage text-white flex items-center justify-center font-bold text-xs shadow-inner">
                        WC
                      </div>
                      <div>
                        <span className="font-serif font-bold text-sm text-farm-charcoal block leading-none">
                          willow_creek_mercantile
                        </span>
                        <span className="text-[9px] font-mono tracking-wider text-farm-clay font-bold block mt-1 uppercase">
                          Pine Hollow, Kentucky
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5D524A] font-sans leading-relaxed">
                      {selectedPost.caption}
                    </p>

                    {selectedPost.tags && (
                      <div className="flex flex-wrap gap-1">
                        {selectedPost.tags.map((tag, i) => (
                          <span key={i} className="text-xs font-mono text-farm-sage font-semibold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Simulation replies */}
                    <div className="pt-4 border-t border-[#D9D1C5] space-y-3.5">
                      <span className="block text-[10px] font-mono text-[#8C7E74] uppercase tracking-wider">
                        Sweet Comments ({ (selectedPost.comments || []).length + (addedComments[selectedPost.id]?.length || 0) })
                      </span>

                      <div className="space-y-3">
                        {[
                          ...(selectedPost.comments || []),
                          ...(addedComments[selectedPost.id] || [])
                        ].map((c, i) => (
                          <div key={i} className="text-xs leading-relaxed">
                            <strong className="text-farm-charcoal font-semibold mr-1.5">{c.author}</strong>
                            <span className="text-[#62554A]">{c.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Actions & Comment Input Box */}
                  <div className="pt-4 border-t border-[#D9D1C5]">
                    
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="block text-[10px] uppercase font-mono tracking-widest text-[#8C7E74]">
                          Reactions
                        </span>
                        <span className="text-xs font-mono font-bold text-farm-charcoal">
                          {postLikes[selectedPost.id] ?? selectedPost.likes} Loves
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleLike(selectedPost.id)}
                          className={`p-2 rounded-xl border transition-all cursor-pointer ${
                            hasLiked[selectedPost.id]
                              ? 'bg-rose-50 border-rose-200 text-rose-500'
                              : 'bg-white border-[#D9D1C5] text-farm-wood hover:text-farm-clay'
                          }`}
                        >
                          <HeartIcon className={`w-4 h-4 ${hasLiked[selectedPost.id] ? 'fill-current' : ''}`} />
                        </button>

                        <button
                          onClick={() => handleShare(selectedPost.id)}
                          className="bg-white border border-[#D9D1C5] p-2 rounded-xl text-farm-wood hover:text-farm-clay transition-colors cursor-pointer"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Write comment action */}
                    <form 
                      onSubmit={(e) => handleAddComment(e, selectedPost.id)}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a sweet comment..."
                        className="flex-grow bg-white border border-[#D9D1C5] rounded-xl py-2 px-3 text-xs outline-none focus:ring-1 focus:ring-farm-clay focus:border-farm-clay"
                      />
                      <button
                        type="submit"
                        className="bg-farm-sage hover:bg-farm-sage-dark text-[#FAF7F2] py-2 px-4 rounded-xl text-xs font-sans uppercase font-bold tracking-wider cursor-pointer"
                      >
                        Post
                      </button>
                    </form>

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
