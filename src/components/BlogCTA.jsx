import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogCTA() {
  return (
    <section className="blog-cta">
      <div className="container blog-cta-inner">
        <h2>Planning an Event?</h2>
        <p>Explore our menu packages or get in touch with Madhava Catering Services to discuss your catering requirements.</p>
        <div className="blog-cta-actions">
          <Link to="/menus" className="btn btn-primary">Explore Our Menu</Link>
          <Link to="/contact" className="btn btn-outline-light">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
