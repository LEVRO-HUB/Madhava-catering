import React from 'react';
import { Link } from 'react-router-dom';
import { categoryName } from '../data/blogCategories.js';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogCard({ post, featured = false }) {
  return (
    <article className={`blog-card ${featured ? 'is-featured' : ''}`}>
      <Link to={`/blog/${post.slug}`} className="blog-card-image">
        <img src={post.image} alt={post.imageAlt} loading="lazy" />
      </Link>
      <div className="blog-card-body">
        <span className="blog-card-category">{categoryName(post.categories[0])}</span>
        <h3>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <div className="blog-card-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <Link to={`/blog/${post.slug}`} className="blog-card-read">
            Read Article &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
