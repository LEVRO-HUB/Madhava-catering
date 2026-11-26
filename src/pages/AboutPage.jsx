import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import Seo from '../components/Seo.jsx';
import WhyUs from '../components/WhyUs.jsx';
import ProcessTimeline from '../components/ProcessTimeline.jsx';
import FaqAccordion from '../components/FaqAccordion.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { SectionHeading } from '../components/Ornaments.jsx';
import SafeImg from '../components/SafeImg.jsx';
import { galleryItems } from '../data/siteContent.js';

const pillars = [
  { id: 'flavours', title: 'Traditional Flavours', text: 'Celebrating the rich flavours and timeless recipes of South Indian cuisine.' },
  { id: 'service', title: 'Thoughtful Service', text: 'Bringing care and attention to every dining experience.' },
  { id: 'celebrations', title: 'Memorable Celebrations', text: 'Adding warmth and flavour to weddings, family gatherings and special occasions.' },
];

export default function AboutPage() {
  const [a, b, c] = [galleryItems[0], galleryItems[1], galleryItems[2]];
  return (
    <>
      <Seo
        title="About Us | Traditional South Indian Catering"
        description="Madhava Catering Services brings authentic South Indian catering to weddings, ceremonies and family celebrations across Chennai and Tamil Nadu."
        path="/about"
      />
      <PageHero
        eyebrow="Our Story"
        title="Food That Brings People Together"
        crumb="About"
        subtitle="Authentic South Indian catering — crafted with tradition, served with love."
      />

      <section className="about-story section">
        <div className="container about-story-grid">
          <div className="about-copy">
            <SectionHeading align="left" eyebrow="Madhava Catering Services" title="A Taste of Tradition for Every Celebration" />
            <p className="rv">
              At Madhava Catering Services, we believe that food brings people together. From
              traditional wedding feasts to cherished family celebrations, we focus on serving
              delicious food and creating memorable dining experiences.
            </p>
            <p className="rv">
              We serve Chennai and across Tamil Nadu, with menus planned around your family’s
              customs — including vegetarian and Brahmin catering.
            </p>
            <div className="about-actions rv">
              <Link to="/plan-your-event" className="btn btn-primary">Plan Your Event</Link>
              <Link to="/gallery" className="btn btn-secondary">See the Gallery</Link>
            </div>
          </div>
          <div className="about-collage rv">
            <SafeImg className="ac-1" src={a.src} fallback={a.fallback} alt={a.alt} loading="lazy" />
            <SafeImg className="ac-2" src={b.src} fallback={b.fallback} alt={b.alt} loading="lazy" />
            <SafeImg className="ac-3" src={c.src} fallback={c.fallback} alt={c.alt} loading="lazy" />
          </div>
        </div>
      </section>

      <section className="about-pillars section is-dark">
        <div className="container">
          <SectionHeading light eyebrow="What We Stand For" title="Our Three Promises" />
          <div className="pillars-grid">
            {pillars.map((p, i) => (
              <div className="pillar rv" key={p.id} style={{ '--i': i }}>
                <span className="pillar-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyUs />
      <ProcessTimeline />
      <FaqAccordion limit={4} />
      <CtaBand />
    </>
  );
}
