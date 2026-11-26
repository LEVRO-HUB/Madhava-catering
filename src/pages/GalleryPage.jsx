import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import Seo from '../components/Seo.jsx';
import GalleryGrid from '../components/GalleryGrid.jsx';
import CtaBand from '../components/CtaBand.jsx';

export default function GalleryPage() {
  return (
    <>
      <Seo
        title="Gallery | Catering Moments"
        description="A glimpse of Madhava Catering Services — traditional South Indian feasts, banana-leaf menus, celebrations and the kitchen behind them."
        path="/gallery"
      />
      <PageHero
        eyebrow="Gallery"
        title="A Glimpse of the Feast"
        crumb="Gallery"
        subtitle="Banana-leaf spreads, celebrations of every kind and the kitchen that makes them happen."
      >
        <div className="page-hero-actions">
          <Link to="/#reels" className="btn btn-outline-light">Watch Our Reels</Link>
        </div>
      </PageHero>

      <section className="gallery-page section">
        <div className="container">
          <GalleryGrid />
          <p className="gallery-note">
            Imagery shown is representative of our menus and celebrations. Real event photographs
            are added as they are approved.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
