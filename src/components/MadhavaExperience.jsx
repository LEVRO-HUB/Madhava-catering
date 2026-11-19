import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/madhava-experience.css';

const CDN = 'https://res.cloudinary.com/eppaoadw/image/fetch/f_auto,q_auto,w_1000/';
const SITE = 'https://madhava-catering.pages.dev';
const exp = (file) => `${CDN}${SITE}/assets/experience/${encodeURIComponent(file)}`;

function CollageImage({ className, src, alt, style }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className={`${className} collage-img-fallback`} style={style} aria-hidden="true">
        <span>{alt}</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      style={style}
      onError={() => setErrored(true)}
    />
  );
}

const features = [
  {
    id: 'flavours',
    title: 'Traditional Flavours',
    description: 'Celebrating the rich flavours and timeless recipes of South Indian cuisine.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6c7 4 11 10 11 17a11 11 0 1 1-22 0c0-7 4-13 11-17Z" />
        <path d="M24 14v19" />
      </svg>
    ),
  },
  {
    id: 'service',
    title: 'Thoughtful Service',
    description: 'Bringing care and attention to every dining experience.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 26c0-7 6-13 14-13s14 6 14 13" />
        <path d="M8 26h32v4a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4v-4Z" />
        <path d="M18 38h12" />
      </svg>
    ),
  },
  {
    id: 'celebrations',
    title: 'Memorable Celebrations',
    description: 'Adding warmth and flavour to weddings, family gatherings and special occasions.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6v6M11 12l4 4M37 12l-4 4" />
        <path d="M12 40 22 18l4 9 4-6 6 19Z" />
      </svg>
    ),
  },
];

export default function MadhavaExperience() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reducedMotion =
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    if (reducedMotion) {
      setVisible(true);
      return undefined;
    }

    const el = sectionRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`madhava-experience section ${visible ? 'is-visible' : ''}`}
    >
      <div className="container experience-top">
        <div className="experience-intro">
          <span className="experience-eyebrow reveal" style={{ transitionDelay: '0ms' }}>
            The Madhava Experience
          </span>
          <h2 className="experience-heading reveal" style={{ transitionDelay: '90ms' }}>
            Every Celebration Deserves a Taste of Tradition.
          </h2>
          <p className="experience-copy reveal" style={{ transitionDelay: '180ms' }}>
            At Madhava Catering Services, we believe that food brings people together. From
            traditional wedding feasts to cherished family celebrations, we focus on serving
            delicious food and creating memorable dining experiences.
          </p>
          <Link to="/services" className="btn btn-primary reveal" style={{ transitionDelay: '270ms' }}>
            Explore Our Services
          </Link>
        </div>

        <div className="experience-collage reveal" style={{ transitionDelay: '200ms' }}>
          <div className="experience-collage-pattern" aria-hidden="true" />
          <div className="experience-collage-dot" aria-hidden="true" />
          <CollageImage
            className="collage-img collage-img-main"
            src={exp('Teal-Clad Server at South Indian Wedding Feast-1.png')}
            alt="Madhava Catering Services staff serving guests at a traditional South Indian wedding feast"
            style={{ objectPosition: '50% 30%' }}
          />
          <CollageImage
            className="collage-img collage-img-secondary-1"
            src={exp('Busy South Asian Catering Kitchen-2.png')}
            alt="Catering chefs preparing food in a busy event kitchen"
          />
          <CollageImage
            className="collage-img collage-img-secondary-2"
            src={exp('Elegant South Indian Wedding Feast Hall-3.png')}
            alt="Elegant banana leaf dining hall set up for a wedding celebration"
          />
        </div>
      </div>

      <div className="container">
        <div className="experience-features">
          {features.map((feature, i) => (
            <div
              key={feature.id}
              className="feature-card reveal"
              style={{ transitionDelay: `${320 + i * 110}ms` }}
            >
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
