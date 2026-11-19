import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ContactInfo from '../components/ContactInfo.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Seo from '../components/Seo.jsx';
import '../styles/contact.css';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const initialMenuSlug = searchParams.get('menu') || '';

  return (
    <section className="contact-page section">
      <Seo
        title="Contact Madhava Catering Services | Catering Enquiries"
        description="Contact Madhava Catering Services to enquire about wedding catering, traditional South Indian menus, buffet catering and special event catering."
        path="/contact"
      />
      <div className="container">
        <div className="contact-page-header">
          <span className="contact-eyebrow">Get in Touch</span>
          <h1>Let's Plan Your Celebration</h1>
          <p>
            Planning a wedding, family function, corporate event or special celebration? Share
            your catering requirements with Madhava Catering Services.
          </p>
        </div>

        <div className="contact-grid">
          <ContactInfo />
          <ContactForm initialMenuSlug={initialMenuSlug} />
        </div>
      </div>
    </section>
  );
}
