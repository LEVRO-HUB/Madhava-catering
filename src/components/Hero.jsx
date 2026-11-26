import React from 'react';
import { Link } from 'react-router-dom';
import { heroSlides } from '../data/heroSlides.js';
import HeroSlideshow from './HeroSlideshow.jsx';
import HeroSparkles from './HeroSparkles.jsx';
import '../styles/hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <HeroSlideshow slides={heroSlides} />
      <HeroSparkles />
      <div className="container hero-inner">
        <img className="hero-logo" src="/assets/logo/madhava-logo.png" alt="Madhava Catering Services" />
        <h1 className="hero-title">Traditional Taste, Memorable Celebrations</h1>
        <p className="hero-subtitle">
          Authentic South Indian catering for weddings, functions and family celebrations —
          crafted with tradition, served with love.
        </p>
        <div className="hero-actions">
          <Link to="/menus" className="btn btn-primary">Explore Our Menu</Link>
          <Link to="/services" className="btn btn-outline-light">Our Services</Link>
        </div>
      </div>
    </section>
  );
}
