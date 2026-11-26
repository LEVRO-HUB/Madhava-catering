import React from 'react';
import { Link } from 'react-router-dom';
import { heroSlides } from '../data/heroSlides.js';
import HeroSlideshow from './HeroSlideshow.jsx';
import HeroSparkles from './HeroSparkles.jsx';
import '../styles/hero.css';
import { useT } from '../i18n/LanguageContext.jsx';

export default function Hero() {
  const t = useT();
  return (
    <section id="home" className="hero">
      <HeroSlideshow slides={heroSlides} />
      <HeroSparkles />
      <div className="container hero-inner">
        <img className="hero-logo" src="/assets/logo/madhava-logo.png" alt="Madhava Catering Services" />
        <h1 className="hero-title">{t('hero.title', 'Traditional Taste, Memorable Celebrations')}</h1>
        <p className="hero-subtitle">
          {t('hero.sub', 'Authentic South Indian catering for weddings, functions and family celebrations — crafted with tradition, served with love.')}
        </p>
        <div className="hero-actions">
          <Link to="/menus" className="btn btn-primary">{t('hero.menu', 'Explore Our Menu')}</Link>
          <Link to="/services" className="btn btn-outline-light">{t('hero.services', 'Our Services')}</Link>
          <Link to="/build-your-feast" className="btn btn-outline-light">{t('hero.feast', 'Build Your Feast')}</Link>
        </div>
      </div>
    </section>
  );
}
