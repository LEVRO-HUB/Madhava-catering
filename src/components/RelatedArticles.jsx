import React from 'react';
import BlogCard from './BlogCard.jsx';

export default function RelatedArticles({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="related-articles">
      <h2>Related Articles</h2>
      <div className="blog-grid">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
