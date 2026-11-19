import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container footer-inner">
        <img src="/assets/logo/madhava-logo.png" alt="Madhava Catering Services" className="footer-logo" />
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <a href="tel:9840839157">98408 39157</a>
          <a href="tel:9566160584">95661 60584</a>
          <Link to="/contact" className="btn btn-outline-light footer-contact-btn">Contact Us</Link>
        </div>
        <p className="footer-note">© {new Date().getFullYear()} Madhava Catering Services. Traditional taste, memorable celebrations.</p>
      </div>
    </footer>
  );
}
