import { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  Calendar, 
  Tag, 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  Check, 
  BookOpen, 
  Sparkles, 
  X,
  MessageSquare
} from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../blogData';
import { BlogPost } from '../types';

interface BlogsPageProps {
  onBackToHome: () => void;
  onOpenWorkModal: () => void;
}

// Extract blog post from URL hash (#blog-slug, #blog/slug, #blogs/slug)
const getPostFromHash = (hash: string): BlogPost | null => {
  if (!hash) return null;
  let slug = '';
  if (hash.startsWith('#blog-')) {
    slug = hash.replace('#blog-', '');
  } else if (hash.startsWith('#blog/')) {
    slug = hash.replace('#blog/', '');
  } else if (hash.startsWith('#blogs/')) {
    slug = hash.replace('#blogs/', '');
  } else if (hash.startsWith('#article/')) {
    slug = hash.replace('#article/', '');
  }
  
  if (!slug || slug === 's') return null;
  return BLOG_POSTS.find((p) => p.slug === slug || p.id === slug) || null;
};

export const BlogsPage = ({ onBackToHome, onOpenWorkModal }: BlogsPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Initialize selected post from current URL hash if present
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(() => {
    return typeof window !== 'undefined' ? getPostFromHash(window.location.hash) : null;
  });
  
  const [copiedLink, setCopiedLink] = useState(false);

  // Synchronize post selection with browser history and URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const post = getPostFromHash(window.location.hash);
      setSelectedPost(post);
      if (post) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // SEO: Update page title, meta description, OG tags, canonical link, and JSON-LD schema
  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';

    if (selectedPost) {
      const permalink = `${origin}${pathname}#blog-${selectedPost.slug}`;
      document.title = `${selectedPost.title} | Emma Louise King`;

      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', selectedPost.excerpt);
      }

      // Update Open Graph tags for social & search visibility
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', `${selectedPost.title} | Emma Louise King`);
      }

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', selectedPost.excerpt);
      }

      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', permalink);

      // Open Graph image
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (selectedPost.coverImage) {
        if (!ogImage) {
          ogImage = document.createElement('meta');
          ogImage.setAttribute('property', 'og:image');
          document.head.appendChild(ogImage);
        }
        ogImage.setAttribute('content', selectedPost.coverImage);
      }

      // Canonical link
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = permalink;

      // Google Search JSON-LD Structured Data for BlogPosting
      const existingScript = document.getElementById('blog-seo-jsonld');
      if (existingScript) {
        existingScript.remove();
      }
      const script = document.createElement('script');
      script.id = 'blog-seo-jsonld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": permalink
        },
        "headline": selectedPost.title,
        "description": selectedPost.excerpt,
        "image": selectedPost.coverImage || undefined,
        "datePublished": "2026-09-01",
        "author": {
          "@type": "Person",
          "name": "Emma Louise King",
          "jobTitle": "Director of People & Performance",
          "worksFor": {
            "@type": "Organization",
            "name": "Baytify Real Estate"
          }
        },
        "publisher": {
          "@type": "Organization",
          "name": "Baytify Real Estate",
          "url": "https://www.baytify.com/"
        },
        "keywords": selectedPost.tags.join(', '),
        "articleSection": selectedPost.category,
        "inLanguage": "en-US",
        "url": permalink
      });
      document.head.appendChild(script);

    } else {
      document.title = "Blogs & Industry Perspectives | Emma Louise King";
      
      const permalink = `${origin}${pathname}#blogs`;
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (canonical) {
        canonical.href = permalink;
      }

      // JSON-LD Collection schema for all blog posts
      const existingScript = document.getElementById('blog-seo-jsonld');
      if (existingScript) {
        existingScript.remove();
      }
      const script = document.createElement('script');
      script.id = 'blog-seo-jsonld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Perspectives & Real Estate Insights by Emma Louise King",
        "description": "Insights on Dubai Real Estate, People Operations, Brokerage Culture & Leadership.",
        "url": permalink,
        "hasPart": BLOG_POSTS.map((post) => ({
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "url": `${origin}${pathname}#blog-${post.slug}`,
          "keywords": post.tags.join(', ')
        }))
      });
      document.head.appendChild(script);
    }

    return () => {
      const existingScript = document.getElementById('blog-seo-jsonld');
      if (existingScript) existingScript.remove();
    };
  }, [selectedPost]);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Open post and push unique SEO URL to window.location.hash
  const handleOpenPost = (post: BlogPost) => {
    setSelectedPost(post);
    window.location.hash = `blog-${post.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close post and reset URL back to blog list
  const handleClosePost = () => {
    setSelectedPost(null);
    window.location.hash = 'blogs';
  };

  const getPostPermalink = (post: BlogPost) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
    return `${origin}${pathname}#blog-${post.slug}`;
  };

  const handleCopyLink = (post: BlogPost) => {
    const link = getPostPermalink(post);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="pt-24 pb-24 bg-[#FAF8F5] min-h-screen text-[#1E232A]">
      {/* Top Header / Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-[#E8E1D5] mb-10">
          <div className="flex items-center gap-2 text-xs font-medium text-[#7A6F60]">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1 hover:text-[#9C7A4A] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <span>/</span>
            <span className="text-[#1E232A] font-semibold">Blogs & Perspectives</span>
            {selectedPost && (
              <>
                <span>/</span>
                <span className="text-[#9C7A4A] font-medium truncate max-w-[200px] sm:max-w-sm">
                  {selectedPost.title}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Page Title & Intro */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0EAE1] text-[#7A5D33] text-xs font-semibold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#9C7A4A]" />
            <span>Perspectives & Industry Insights</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E232A] leading-tight mb-4">
            Insights on Dubai Real Estate, People Operations & Leadership.
          </h1>
          <p className="text-base sm:text-lg text-[#615647] font-normal leading-relaxed">
            Reflections drawn from twenty years managing teams from Dublin to Dubai, a decade in UAE property recruitment, and scaling people operations at Baytify Real Estate.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1E232A] text-white shadow-xs'
                    : 'bg-[#F0EAE1]/70 hover:bg-[#EAE2D5] text-[#554A3D]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] md:w-72">
            <Search className="w-4 h-4 text-[#8C8070] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search insights, tags, topics..."
              className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#D8CEBF] bg-white text-[#1E232A] placeholder-[#8F8372] focus:outline-none focus:border-[#9C7A4A] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6F60] hover:text-[#1E232A]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Articles Grid - Semantic HTML Links with Unique URLs for Search Engines & Users */}
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-[#E0D6C5] my-8">
            <BookOpen className="w-10 h-10 text-[#A09585] mx-auto mb-3" />
            <h3 className="text-base font-semibold text-[#1E232A] mb-1">
              No articles found
            </h3>
            <p className="text-xs text-[#7A6F60] mb-4">
              Try adjusting your search query or selecting a different category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1E232A] rounded-md hover:bg-[#9C7A4A] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                id={`article-${post.slug}`}
                className="rounded-xl border border-[#E2D8C7] bg-white p-6 flex flex-col justify-between hover:shadow-lg transition-all hover:-translate-y-0.5 group"
              >
                <div>
                  {/* Category & Time */}
                  <div className="flex items-center justify-between text-xs text-[#7A6F60] mb-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#F5EFE6] text-[#8C6B38]">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title with Semantic SEO Anchor */}
                  <h2 className="font-editorial text-xl font-bold text-[#1E232A] group-hover:text-[#9C7A4A] transition-colors mb-3 leading-snug">
                    <a
                      href={`#blog-${post.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenPost(post);
                      }}
                      className="hover:underline underline-offset-4"
                      title={post.title}
                    >
                      {post.title}
                    </a>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-[#615647] leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] text-[#7A6F60] border border-[#EBE3D6]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer metadata & Action Link */}
                  <div className="pt-3.5 border-t border-[#F0EAE1] flex items-center justify-between">
                    <span className="text-[11px] text-[#8F8474]">
                      {post.publishedDate}
                    </span>

                    <a
                      href={`#blog-${post.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenPost(post);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E232A] group-hover:text-[#9C7A4A] transition-colors cursor-pointer"
                      title={`Read ${post.title}`}
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom Consultation Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-[#1E232A] text-white border border-[#2A313C] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
              Speaking & Advisory
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold mt-1 mb-2">
              Interested in real estate people strategies or executive advisory?
            </h3>
            <p className="text-xs sm:text-sm text-[#A09585] leading-relaxed">
              Emma regularly discusses property talent architecture, retention mechanics, and modern brokerage performance with founders, operators, and industry platforms across the UAE.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onOpenWorkModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-[#D4AF37] text-[#1E232A] hover:text-[#1E232A] text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Emma</span>
            </button>
            <button
              onClick={onBackToHome}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all border border-white/10 cursor-pointer"
            >
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full Article Reader View with Dedicated URL & SEO Sharing Box */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6"
          onClick={handleClosePost}
        >
          <div 
            className="bg-[#FAF8F5] border border-[#E0D6C5] rounded-2xl max-w-3xl w-full my-8 p-6 sm:p-10 shadow-2xl relative text-[#1E232A]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClosePost}
              className="absolute top-5 right-5 p-2 rounded-full text-[#7A6F60] hover:text-[#1E232A] hover:bg-[#EAE2D5] transition-colors cursor-pointer"
              aria-label="Close article"
              title="Close article (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Meta */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#7A6F60] mb-4">
              <span className="px-2.5 py-0.5 rounded-md font-semibold bg-[#F0EAE1] text-[#8C6B38]">
                {selectedPost.category}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {selectedPost.publishedDate}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedPost.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E232A] leading-tight mb-4">
              {selectedPost.title}
            </h1>

            {/* Author Byline Bar */}
            <div className="flex items-center justify-between py-4 border-y border-[#E8E1D5] mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1E232A] text-white flex items-center justify-center font-bold text-sm">
                  EK
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1E232A]">Emma Louise King</p>
                  <p className="text-xs text-[#7A6F60]">Director of People & Performance · Baytify Real Estate</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyLink(selectedPost)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-[#50483E] bg-[#F0EAE1] hover:bg-[#E5DCD0] transition-colors cursor-pointer"
                  title="Share article link"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-700" />
                      <span className="text-green-700 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Share</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Key Takeaways Box (if present) */}
            {selectedPost.keyTakeaways && selectedPost.keyTakeaways.length > 0 && (
              <div className="mb-8 p-5 rounded-xl bg-white border border-[#E0D6C5] shadow-xs">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6B38] uppercase tracking-wider mb-2.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Executive Takeaways</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#453D32]">
                  {selectedPost.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#9C7A4A] font-bold mt-0.5">•</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Cover Image under Takeaways Box */}
            {selectedPost.coverImage && (
              <div className="mb-8 overflow-hidden rounded-2xl border border-[#E0D6C5] bg-[#F2ECE2] shadow-sm">
                <img
                  src={selectedPost.coverImage}
                  alt={selectedPost.title}
                  className="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            )}

            {/* Article Content Paragraphs */}
            <div className="space-y-5 text-sm sm:text-base text-[#3E362C] leading-relaxed font-normal">
              {selectedPost.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-[#E8E1D5] flex flex-wrap gap-2">
              {selectedPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded bg-white border border-[#DDD3C4] text-[#63584A]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Reader Footer CTAs */}
            <div className="mt-8 pt-6 border-t border-[#E8E1D5] flex items-center justify-start">
              <button
                onClick={handleClosePost}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md border border-[#D0C6B8] hover:bg-[#EAE2D5] text-[#50483E] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Articles</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
