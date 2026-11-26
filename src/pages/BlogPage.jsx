import React, { useMemo, useState } from 'react';
import { blogPosts } from '../data/blogPosts.js';
import { categoryName } from '../data/blogCategories.js';
import PageHero from '../components/PageHero.jsx';
import BlogCategories from '../components/BlogCategories.jsx';
import BlogSearch from '../components/BlogSearch.jsx';
import BlogCard from '../components/BlogCard.jsx';
import BlogCTA from '../components/BlogCTA.jsx';
import Seo from '../components/Seo.jsx';
import { SITE_URL, BUSINESS_NAME } from '../data/businessConfig.js';
import '../styles/blog.css';

const featuredPost = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date))[0];

export default function BlogPage() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return blogPosts.filter((post) => {
      if (post.id === featuredPost?.id) return false;
      const matchesCategory = category === 'all' || post.categories.includes(category);
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.categories.some((c) => categoryName(c).toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${BUSINESS_NAME} Blog`,
    url: `${SITE_URL}/blog`,
    publisher: { '@type': 'Organization', name: BUSINESS_NAME },
  };

  return (
    <>
      <Seo
        title="Catering Blog | Wedding Menus & Event Guides"
        description="Wedding catering ideas, traditional South Indian menus, event planning tips and catering guides for Chennai and Tamil Nadu from Madhava Catering Services."
        path="/blog"
        jsonLd={jsonLd}
      />
      <PageHero
        eyebrow="Journal"
        title="The Madhava Journal"
        crumb="Blog"
        subtitle="Wedding catering ideas, traditional South Indian menus, event planning tips and catering guides for Chennai and Tamil Nadu."
      />
      <section className="blog-page section">
        <div className="container">

          {featuredPost && (
            <div className="blog-featured">
              <span className="blog-featured-label">Featured Article</span>
              <BlogCard post={featuredPost} featured />
            </div>
          )}

          <BlogSearch value={search} onChange={setSearch} />
          <BlogCategories active={category} onSelect={setCategory} />

          {filtered.length > 0 ? (
            <div className="blog-grid">
              {filtered.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="blog-empty">No articles match your search. Try a different keyword or category.</p>
          )}
        </div>
      </section>
      <BlogCTA />
    </>
  );
}
