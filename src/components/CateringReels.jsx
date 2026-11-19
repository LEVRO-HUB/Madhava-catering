import React from 'react';
import { reels } from '../data/reels.js';
import ReelsCarousel from './ReelsCarousel.jsx';
import '../styles/reels.css';

export default function CateringReels() {
  return (
    <section id="reels" className="catering-reels section">
      <div className="container">
        <h2 className="section-title">Our Catering Moments</h2>
        <p className="section-subtitle">
          A glimpse of our delicious food, beautiful celebrations and memorable catering experiences.
        </p>
        <ReelsCarousel reels={reels} />
      </div>
    </section>
  );
}
