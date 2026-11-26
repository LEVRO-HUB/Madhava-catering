import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ContactInfo from '../components/ContactInfo.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import FaqAccordion from '../components/FaqAccordion.jsx';
import '../styles/contact.css';
import { useT } from '../i18n/LanguageContext.jsx';

export default function ContactPage() {
  const t = useT();
  const [searchParams] = useSearchParams();
  const initialMenuSlug = searchParams.get('menu') || '';

  return (
    <>
    <Seo
        title="Contact Madhava Catering Services | Catering Enquiries"
        description="Contact Madhava Catering Services to enquire about wedding catering, traditional South Indian menus, buffet catering and special event catering."
        path="/contact"
      />
      <PageHero
        eyebrow={t('contact.eyebrow', 'Get in Touch')}
        title={t('contact.title', 'Let\'s Plan Your Celebration')}
        crumb={t('nav.contact', 'Contact')}
        subtitle={t('contact.sub', 'Planning a wedding, family function, corporate event or special celebration? Share your catering requirements with Madhava Catering Services.')}
      />
    <section className="contact-page section">
      <div className="container">
        <div className="contact-grid">
          <ContactInfo />
          <ContactForm initialMenuSlug={initialMenuSlug} />
        </div>
      </div>
    </section>
    <FaqAccordion />
    </>
  );
}
