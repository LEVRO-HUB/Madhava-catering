import React from 'react';

export default function TestimonialCard({ testimonial, isSample }) {
  return (
    <div className="testimonial-card">
      {isSample && <span className="testimonial-sample-badge">Sample</span>}
      <span className="testimonial-quote-mark" aria-hidden="true">&ldquo;</span>
      <p className="testimonial-quote">{testimonial.quote}</p>

      {testimonial.rating && (
        <div className="testimonial-rating" aria-label={`${testimonial.rating} out of 5 stars`}>
          {'★'.repeat(testimonial.rating)}
          {'☆'.repeat(5 - testimonial.rating)}
        </div>
      )}

      <div className="testimonial-footer">
        {testimonial.photo && (
          <img className="testimonial-photo" src={testimonial.photo} alt={testimonial.name} loading="lazy" />
        )}
        <div className="testimonial-identity">
          <span className="testimonial-name">{testimonial.name}</span>
          <span className="testimonial-event">{testimonial.eventType}</span>
        </div>
      </div>

      {testimonial.source && <span className="testimonial-source">via {testimonial.source}</span>}
    </div>
  );
}
