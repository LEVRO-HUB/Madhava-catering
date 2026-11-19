import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPostBySlug, relatedPosts } from '../data/blogPosts.js';
import { categoryName } from '../data/blogCategories.js';
import RelatedArticles from '../components/RelatedArticles.jsx';
import BlogCTA from '../components/BlogCTA.jsx';
import Seo from '../components/Seo.jsx';
import { SITE_URL, BUSINESS_NAME, BUSINESS_LOGO } from '../data/businessConfig.js';
import '../styles/blog.css';
import '../styles/blog-article.css';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function ContentBlock({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2>{block.text}</h2>;
    case 'h3':
      return <h3>{block.text}</h3>;
    case 'ul':
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'link':
      return (
        <Link to={block.to} className="article-link-card">
          <span className="article-link-label">{block.label}</span>
          <span className="article-link-desc">{block.description}</span>
        </Link>
      );
    case 'p':
    default:
      return <p>{block.text}</p>;
  }
}

export default function BlogArticlePage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <section className="blog-article section">
        <div className="container">
          <h1 className="section-title">Article Not Found</h1>
          <p className="section-subtitle">This article doesn't exist or may have been moved.</p>
          <Link to="/blog" className="btn btn-secondary">&larr; Back to Blog</Link>
        </div>
      </section>
    );
  }

  const related = relatedPosts(post);
  const url = `${SITE_URL}/blog/${post.slug}`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.metaDescription,
      image: `${SITE_URL}${post.image}`,
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: url,
      author: { '@type': 'Organization', name: BUSINESS_NAME },
      publisher: {
        '@type': 'Organization',
        name: BUSINESS_NAME,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}${BUSINESS_LOGO}` },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ];

  if (post.faqs && post.faqs.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return (
    <>
      <Seo
        title={post.title}
        description={post.metaDescription}
        path={`/blog/${post.slug}`}
        image={post.image}
        type="article"
        jsonLd={jsonLd}
      />
      <article className="blog-article section">
        <div className="container blog-article-container">
          <nav className="blog-article-breadcrumb" aria-label="Breadcrumb">
            <Link to="/blog">Blog</Link> <span>/</span> <span>{categoryName(post.categories[0])}</span>
          </nav>

          <header className="blog-article-header">
            <span className="blog-card-category">{categoryName(post.categories[0])}</span>
            <h1>{post.title}</h1>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </header>

          <img className="blog-article-image" src={post.image} alt={post.imageAlt} />

          <div className="blog-article-body">
            {post.content.map((block, i) => (
              <ContentBlock key={i} block={block} />
            ))}
          </div>

          {post.faqs && post.faqs.length > 0 && (
            <div className="blog-article-faq">
              <h2>Frequently Asked Questions</h2>
              {post.faqs.map((faq) => (
                <div className="faq-item" key={faq.q}>
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          )}

          <div className="blog-article-back">
            <Link to="/blog" className="btn btn-secondary">&larr; Back to Blog</Link>
          </div>
        </div>
      </article>

      <div className="container">
        <RelatedArticles posts={related} />
      </div>

      <BlogCTA />
    </>
  );
}
