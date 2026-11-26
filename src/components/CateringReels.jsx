import React from 'react';
import { reels } from '../data/reels.js';
import ReelsCarousel from './ReelsCarousel.jsx';
import '../styles/reels.css';
import { useT } from '../i18n/LanguageContext.jsx';

export default function CateringReels() {
  const t = useT();
  return (
    <section id="reels" className="catering-reels section">
      <div className="container">
        <h2 className="section-title">{t('reels.title', 'Our Catering Moments')}</h2>
        <p className="section-subtitle">
          {t('reels.sub', 'A glimpse of our delicious food, beautiful celebrations and memorable catering experiences.')}
        </p>
        <ReelsCarousel reels={reels} />
      </div>
    </section>
  );
}
