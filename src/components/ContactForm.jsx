import React, { useState } from 'react';
import { WHATSAPP_NUMBER } from '../data/businessConfig.js';
import { services } from '../data/services.js';
import { predefinedMenus } from '../data/predefinedMenus.js';
import '../styles/enquiry-form.css';

const INDIAN_MOBILE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function buildWhatsAppMessage(f) {
  const lines = [
    'New Catering Enquiry – Madhava Catering Services',
    '',
    `Name: ${f.fullName}`,
    `Phone: ${f.phone}`,
    `Email: ${f.email || '-'}`,
    `Event Type: ${f.eventType}`,
    `Event Date: ${f.eventDate}`,
    `Event Location: ${f.eventLocation}`,
    `Guest Count: ${f.guestCount}`,
    `Preferred Menu: ${f.preferredMenuName || 'No preference specified'}`,
    `Additional Requirements: ${f.additionalRequirements || '-'}`,
  ];
  return lines.join('\n');
}

export default function ContactForm({ initialMenuSlug }) {
  const [fields, setFields] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: '',
    eventLocation: '',
    guestCount: '',
    preferredMenu: initialMenuSlug || '',
    additionalRequirements: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const updateField = (key) => (e) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
    if (status === 'sent') setStatus('idle');
  };

  const validate = () => {
    const next = {};
    if (!fields.fullName.trim()) next.fullName = 'Please enter your full name.';

    if (!fields.phone.trim()) next.phone = 'Please enter your phone number.';
    else if (!INDIAN_MOBILE_RE.test(fields.phone.trim())) next.phone = 'Enter a valid 10-digit Indian mobile number.';

    if (fields.email.trim() && !EMAIL_RE.test(fields.email.trim())) {
      next.email = 'Enter a valid email address, or leave this field empty.';
    }

    if (!fields.eventType) next.eventType = 'Please select an event type.';

    if (!fields.eventDate) next.eventDate = 'Please select your event date.';
    else if (fields.eventDate < todayISO()) next.eventDate = 'Event date cannot be in the past.';

    if (!fields.eventLocation.trim()) next.eventLocation = 'Please enter the event location.';

    if (!fields.guestCount) next.guestCount = 'Please enter the expected guest count.';
    else if (!Number.isInteger(Number(fields.guestCount)) || Number(fields.guestCount) <= 0) {
      next.guestCount = 'Enter a valid guest count (whole number greater than 0).';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === 'sending' || status === 'sent') return;
    if (!validate()) return;

    if (!WHATSAPP_NUMBER) return; // configuration notice renders below instead

    setStatus('sending');

    const preferredMenuName = predefinedMenus.find((m) => m.slug === fields.preferredMenu)?.name;
    const message = buildWhatsAppMessage({
      fullName: fields.fullName.trim(),
      phone: fields.phone.trim(),
      email: fields.email.trim(),
      eventType: fields.eventType,
      eventDate: fields.eventDate,
      eventLocation: fields.eventLocation.trim(),
      guestCount: fields.guestCount,
      preferredMenuName,
      additionalRequirements: fields.additionalRequirements.trim(),
    });

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    // Note: window.open(..., 'noopener') always returns null by spec (that's
    // the point of noopener — the caller can't hold a reference to the new
    // window), so a null return here does NOT mean the popup was blocked.
    // There is no reliable cross-browser way to detect a blocked popup from
    // a direct click handler, so we only avoid the false "popup blocked"
    // error this previously produced on every single click.
    window.open(url, '_blank', 'noopener,noreferrer');
    setStatus('sent');
  };

  if (!WHATSAPP_NUMBER) {
    return (
      <div className="contact-form enquiry-form enquiry-form-unconfigured">
        <h3>Send an Enquiry</h3>
        <p>
          Online enquiry submission isn't configured yet. Please call us directly at{' '}
          <a href="tel:9840839157">98408 39157</a> or <a href="tel:9566160584">95661 60584</a> to
          discuss your event.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form enquiry-form" onSubmit={handleSubmit} noValidate>
      <h2>Share Your Catering Requirements</h2>

      <div className="form-field">
        <label htmlFor="fullName">Full Name *</label>
        <input
          id="fullName"
          type="text"
          value={fields.fullName}
          onChange={updateField('fullName')}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? 'err-fullName' : undefined}
        />
        {errors.fullName && <span id="err-fullName" className="form-error">{errors.fullName}</span>}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="phone">Phone Number *</label>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit mobile number"
            value={fields.phone}
            onChange={updateField('phone')}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'err-phone' : undefined}
          />
          {errors.phone && <span id="err-phone" className="form-error">{errors.phone}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Optional"
            value={fields.email}
            onChange={updateField('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'err-email' : undefined}
          />
          {errors.email && <span id="err-email" className="form-error">{errors.email}</span>}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="eventType">Event Type *</label>
        <select
          id="eventType"
          value={fields.eventType}
          onChange={updateField('eventType')}
          aria-invalid={!!errors.eventType}
          aria-describedby={errors.eventType ? 'err-eventType' : undefined}
        >
          <option value="">Select an event type</option>
          {services.map((s) => (
            <option key={s.id} value={s.title}>{s.title}</option>
          ))}
        </select>
        {errors.eventType && <span id="err-eventType" className="form-error">{errors.eventType}</span>}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="eventDate">Event Date *</label>
          <input
            id="eventDate"
            type="date"
            min={todayISO()}
            value={fields.eventDate}
            onChange={updateField('eventDate')}
            aria-invalid={!!errors.eventDate}
            aria-describedby={errors.eventDate ? 'err-eventDate' : undefined}
          />
          {errors.eventDate && <span id="err-eventDate" className="form-error">{errors.eventDate}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="guestCount">Expected Guest Count *</label>
          <input
            id="guestCount"
            type="number"
            min={1}
            step={1}
            value={fields.guestCount}
            onChange={updateField('guestCount')}
            aria-invalid={!!errors.guestCount}
            aria-describedby={errors.guestCount ? 'err-guestCount' : undefined}
          />
          {errors.guestCount && <span id="err-guestCount" className="form-error">{errors.guestCount}</span>}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="eventLocation">Event Location *</label>
        <input
          id="eventLocation"
          type="text"
          placeholder="Venue or area, e.g. Chennai"
          value={fields.eventLocation}
          onChange={updateField('eventLocation')}
          aria-invalid={!!errors.eventLocation}
          aria-describedby={errors.eventLocation ? 'err-eventLocation' : undefined}
        />
        {errors.eventLocation && <span id="err-eventLocation" className="form-error">{errors.eventLocation}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="preferredMenu">Preferred Menu</label>
        <select id="preferredMenu" value={fields.preferredMenu} onChange={updateField('preferredMenu')}>
          <option value="">No preference</option>
          {predefinedMenus.map((m) => (
            <option key={m.slug} value={m.slug}>{m.name}</option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="additionalRequirements">Additional Requirements</label>
        <textarea
          id="additionalRequirements"
          rows={4}
          value={fields.additionalRequirements}
          onChange={updateField('additionalRequirements')}
          placeholder="Optional — any special requests for your event"
        />
      </div>

      {errors.submit && <p className="form-error form-error-top">{errors.submit}</p>}

      <button type="submit" className="btn btn-primary contact-submit" disabled={status === 'sending' || status === 'sent'}>
        {status === 'sending' ? 'Opening WhatsApp…' : status === 'sent' ? 'Opened in WhatsApp' : 'Send Enquiry via WhatsApp'}
      </button>

      {status === 'sent' && (
        <p className="enquiry-note">
          We've opened WhatsApp with your enquiry filled in — please press send there to complete it.
          Edit any field above to send another enquiry.
        </p>
      )}
    </form>
  );
}
