import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageHero from '../components/PageHero.jsx';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page not found | Madhava Catering Services</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <PageHero eyebrow="404" title="This page has moved or doesn’t exist" subtitle="Let us take you back to something delicious.">
        <div className="page-hero-actions">
          <Link to="/" className="btn btn-primary">Home</Link>
          <Link to="/menus" className="btn btn-outline-light">Our Menu</Link>
        </div>
      </PageHero>
    </>
  );
}
