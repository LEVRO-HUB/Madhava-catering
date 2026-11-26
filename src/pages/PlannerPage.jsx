import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import Seo from '../components/Seo.jsx';
import { services } from '../data/services.js';
import { predefinedMenus } from '../data/predefinedMenus.js';
import { WHATSAPP_NUMBER } from '../data/businessConfig.js';
import { guestRanges, mealOptions, dietOptions } from '../data/siteContent.js';
import { useT, localizeService } from '../i18n/LanguageContext.jsx';
import { submitLead, track } from '../lib/lead.js';
import '../styles/planner.css';

const PHONE_RE = /^[6-9]\d{9}$/;
const STEPS = ['Occasion', 'Details', 'Menu', 'Contact'];

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function PlannerPage() {
  const t = useT();
  const [saved, setSaved] = useState(false);
  const [hp, setHp] = useState('');
  const [params] = useSearchParams();
  const initialEvent = services.some((s) => s.id === params.get('event')) ? params.get('event') : '';
  const initialMenu = predefinedMenus.some((m) => m.slug === params.get('menu')) ? params.get('menu') : '';

  const [step, setStep] = useState(initialEvent ? 1 : 0);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});
  const [f, setF] = useState({
    event: initialEvent,
    date: '',
    guests: '',
    city: '',
    meals: [],
    diet: '',
    menu: initialMenu,
    name: '',
    phone: '',
    notes: (() => {
      try {
        return sessionStorage.getItem('madhava-feast') || '';
      } catch (e) {
        return '';
      }
    })(),
  });

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const toggleMeal = (m) =>
    setF((p) => ({ ...p, meals: p.meals.includes(m) ? p.meals.filter((x) => x !== m) : [...p.meals, m] }));

  const eventObj = services.find((s) => s.id === f.event);
  const menuObj = predefinedMenus.find((m) => m.slug === f.menu);

  const validate = (s) => {
    const e = {};
    if (s === 0 && !f.event) e.event = t('pl.err.event', 'Please choose an occasion to continue.');
    if (s === 1) {
      if (!f.guests) e.guests = t('pl.err.guests', 'Please pick an approximate guest count.');
      if (f.date && f.date < todayISO()) e.date = t('pl.err.date', 'Please choose a date that is today or later.');
    }
    if (s === 3) {
      if (!f.name.trim()) e.name = t('pl.err.name', 'Please enter your name.');
      if (!PHONE_RE.test(f.phone.replace(/\s/g, ''))) e.phone = t('pl.err.phone', 'Enter a valid 10-digit mobile number.');
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    if (step === STEPS.length - 1) {
      setDone(true);
      track('planner_complete', { occasion: f.event });
      submitLead({
        source: 'planner',
        name: f.name,
        phone: f.phone,
        occasion: eventObj ? eventObj.title : '',
        date: f.date,
        guests: f.guests,
        city: f.city,
        meals: f.meals.join(', '),
        diet: f.diet,
        menu: menuObj ? menuObj.name : '',
        notes: f.notes,
        website: hp,
      }).then((r) => setSaved(r.ok));
    }
    else setStep(step + 1);
    document.querySelector('.planner-wrap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const back = () => {
    setErrors({});
    if (done) setDone(false);
    else setStep(Math.max(0, step - 1));
  };

  const summary = useMemo(
    () =>
      [
        'New Event Plan – Madhava Catering Services',
        '',
        `Name: ${f.name}`,
        `Phone: ${f.phone}`,
        `Occasion: ${eventObj ? eventObj.title : '-'}`,
        `Event date: ${f.date || 'Not decided yet'}`,
        `Approx. guests: ${f.guests || '-'}`,
        `Venue / city: ${f.city || '-'}`,
        `Meals: ${f.meals.length ? f.meals.join(', ') : '-'}`,
        `Food style: ${f.diet || '-'}`,
        `Menu: ${menuObj ? menuObj.name : 'Need help choosing'}`,
        `Notes: ${f.notes || '-'}`,
      ].join('\n'),
    [f, eventObj, menuObj]
  );

  const waHref = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(summary)}` : '';
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      /* clipboard unavailable */
    }
  };

  return (
    <>
      <Seo
        title="Plan Your Event | Catering Planner"
        description="Plan your wedding, ceremony or family function with Madhava Catering Services. Choose your occasion, guest count and menu, then send your plan on WhatsApp."
        path="/plan-your-event"
      />
      <PageHero
        eyebrow="Event Planner"
        title={t('pl.title', 'Plan Your Celebration')}
        crumb="Plan Your Event"
        subtitle={t('pl.sub', 'Four short steps. Your plan is sent to us on WhatsApp — no sign-up, no waiting on a form.')}
      />

      <section className="planner section">
        <div className="container planner-wrap">
          <ol className="planner-steps" aria-label="Progress">
            {STEPS.map((s, i) => (
              <li
                key={s}
                className={`planner-step ${i === step && !done ? 'is-current' : ''} ${i < step || done ? 'is-done' : ''}`}
              >
                <span className="planner-dot">{i < step || done ? '✓' : i + 1}</span>
                <span className="planner-step-label">{t(`pl.step.${i}`, s)}</span>
              </li>
            ))}
          </ol>
          <div className="planner-bar" aria-hidden="true">
            <span style={{ width: `${done ? 100 : (step / (STEPS.length - 1)) * 100}%` }} />
          </div>

          <div className="planner-card" key={done ? 'done' : step}>
            {!done && step === 0 && (
              <>
                <h2>{t('pl.q0', 'What are you celebrating?')}</h2>
                <div className="planner-events" role="radiogroup" aria-label="Occasion">
                  {services.map((raw) => {
                    const s = localizeService(raw, t);
                    return (
                    <button
                      type="button"
                      key={s.id}
                      role="radio"
                      aria-checked={f.event === s.id}
                      className={`planner-event ${f.event === s.id ? 'is-on' : ''}`}
                      onClick={() => set('event', s.id)}
                    >
                      <img src={s.image} alt="" loading="lazy" />
                      <span>{s.title}</span>
                    </button>
                    );
                  })}
                </div>
                {errors.event && <p className="planner-error" role="alert">{errors.event}</p>}
              </>
            )}

            {!done && step === 1 && (
              <>
                <h2>{t('pl.q1', 'Tell us about the day')}</h2>
                <div className="planner-field">
                  <label htmlFor="pl-date">{t('pl.date', 'Event date')} <small>{t('pl.optional', '(optional)')}</small></label>
                  <input id="pl-date" type="date" min={todayISO()} value={f.date} onChange={(e) => set('date', e.target.value)} />
                  {errors.date && <p className="planner-error" role="alert">{errors.date}</p>}
                </div>
                <div className="planner-field">
                  <span className="planner-label" id="pl-guests">{t('pl.guests', 'Approximate guests')}</span>
                  <div className="planner-chips" role="radiogroup" aria-labelledby="pl-guests">
                    {guestRanges.map((g, gi) => (
                      <button
                        type="button"
                        key={g}
                        role="radio"
                        aria-checked={f.guests === g}
                        className={`planner-chip ${f.guests === g ? 'is-on' : ''}`}
                        onClick={() => set('guests', g)}
                      >
                        {t(`pl.g.${gi}`, g)}
                      </button>
                    ))}
                  </div>
                  {errors.guests && <p className="planner-error" role="alert">{errors.guests}</p>}
                </div>
                <div className="planner-field">
                  <label htmlFor="pl-city">{t('pl.venue', 'Venue or city')} <small>{t('pl.optional', '(optional)')}</small></label>
                  <input id="pl-city" type="text" placeholder={t('pl.venue.ph', 'e.g. Chennai')} value={f.city} onChange={(e) => set('city', e.target.value)} />
                </div>
                <div className="planner-field">
                  <span className="planner-label" id="pl-meals">{t('pl.meals', 'Meals needed')} <small>{t('pl.meals.hint', '(pick any)')}</small></span>
                  <div className="planner-chips" role="group" aria-labelledby="pl-meals">
                    {mealOptions.map((m, mi) => (
                      <button
                        type="button"
                        key={m}
                        aria-pressed={f.meals.includes(m)}
                        className={`planner-chip ${f.meals.includes(m) ? 'is-on' : ''}`}
                        onClick={() => toggleMeal(m)}
                      >
                        {t(`pl.m.${mi}`, m)}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {!done && step === 2 && (
              <>
                <h2>{t('pl.q2', 'Choose your food style')}</h2>
                <div className="planner-field">
                  <span className="planner-label" id="pl-diet">{t('pl.food', 'Food style')}</span>
                  <div className="planner-chips" role="radiogroup" aria-labelledby="pl-diet">
                    {dietOptions.map((d, di) => (
                      <button
                        type="button"
                        key={d}
                        role="radio"
                        aria-checked={f.diet === d}
                        className={`planner-chip ${f.diet === d ? 'is-on' : ''}`}
                        onClick={() => set('diet', d)}
                      >
                        {t(`pl.d.${di}`, d)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="planner-field">
                  <span className="planner-label" id="pl-menu">{t('pl.menu', 'Start from a menu package')} <small>{t('pl.optional', '(optional)')}</small></span>
                  <p className="planner-feast-link"><Link to="/build-your-feast">{t('pl.feast', 'Or build your own banana-leaf feast')} →</Link></p>
                  <div className="planner-menus" role="radiogroup" aria-labelledby="pl-menu">
                    <button
                      type="button"
                      role="radio"
                      aria-checked={!f.menu}
                      className={`planner-menu ${!f.menu ? 'is-on' : ''}`}
                      onClick={() => set('menu', '')}
                    >
                      <strong>{t('pl.help', 'Help me choose')}</strong>
                      <span>{t('pl.help.d', 'We’ll suggest a menu for your occasion.')}</span>
                    </button>
                    {predefinedMenus.map((m) => (
                      <button
                        type="button"
                        key={m.slug}
                        role="radio"
                        aria-checked={f.menu === m.slug}
                        className={`planner-menu ${f.menu === m.slug ? 'is-on' : ''}`}
                        onClick={() => set('menu', m.slug)}
                      >
                        <img src={m.image} alt="" loading="lazy" />
                        <strong>{m.name}</strong>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {!done && step === 3 && (
              <>
                <h2>{t('pl.q3', 'How can we reach you?')}</h2>
                <div className="planner-field">
                  <label htmlFor="pl-name">{t('pl.name', 'Your name')}</label>
                  <input id="pl-name" type="text" autoComplete="name" value={f.name} onChange={(e) => set('name', e.target.value)} />
                  {errors.name && <p className="planner-error" role="alert">{errors.name}</p>}
                </div>
                <div className="planner-field">
                  <label htmlFor="pl-phone">{t('pl.phone', 'Mobile number')}</label>
                  <input id="pl-phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder={t('pl.phone.ph', '10-digit number')} value={f.phone} onChange={(e) => set('phone', e.target.value)} />
                  {errors.phone && <p className="planner-error" role="alert">{errors.phone}</p>}
                </div>
                <div className="planner-field">
                  <label htmlFor="pl-notes">{t('pl.notes', 'Anything else we should know?')} <small>{t('pl.optional', '(optional)')}</small></label>
                  <textarea id="pl-notes" rows={3} value={f.notes} onChange={(e) => set('notes', e.target.value)} />
                </div>
                <div className="hp-field" aria-hidden="true">
                  <label htmlFor="pl-web">Website</label>
                  <input id="pl-web" type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                </div>
              </>
            )}

            {done && (
              <div className="planner-done">
                <span className="planner-done-mark" aria-hidden="true">✓</span>
                <h2>{t('pl.done', 'Your plan is ready')}</h2>
                <p>
                  {t('pl.done.d', 'Send it to us on WhatsApp and we will get back to you to talk through the menu and arrangements.')}
                </p>
                {saved && <p className="planner-saved">{t('pl.saved', 'Your plan has also been sent to our team.')}</p>}
                <pre className="planner-summary">{summary}</pre>
                <div className="planner-actions-row">
                  {waHref && (
                    <a className="btn btn-primary" href={waHref} target="_blank" rel="noopener noreferrer">
                      {t('pl.send', 'Send on WhatsApp')}
                    </a>
                  )}
                  <a className="btn btn-secondary" href="tel:9840839157">{t('cta.call', 'Call')} 98408 39157</a>
                  <button type="button" className="btn btn-secondary" onClick={copy}>
                    {copied ? t('pl.copied', 'Copied ✓') : t('pl.copy', 'Copy plan')}
                  </button>
                </div>
              </div>
            )}

            <div className="planner-nav">
              {(step > 0 || done) && (
                <button type="button" className="btn btn-secondary" onClick={back}>{t('pl.back', '← Back')}</button>
              )}
              {!done && (
                <button type="button" className="btn btn-primary planner-next" onClick={next}>
                  {step === STEPS.length - 1 ? t('pl.review', 'Review My Plan') : t('pl.next', 'Continue →')}
                </button>
              )}
            </div>
          </div>

          <aside className="planner-aside" aria-label="Your plan so far">
            <h3>{t('pl.aside', 'Your plan so far')}</h3>
            <dl>
              <dt>{t('pl.aside.occasion', 'Occasion')}</dt><dd>{eventObj ? localizeService(eventObj, t).title : '—'}</dd>
              <dt>{t('pl.aside.date', 'Date')}</dt><dd>{f.date || '—'}</dd>
              <dt>{t('pl.aside.guests', 'Guests')}</dt><dd>{f.guests || '—'}</dd>
              <dt>{t('pl.aside.food', 'Food style')}</dt><dd>{f.diet || '—'}</dd>
              <dt>{t('pl.aside.menu', 'Menu')}</dt><dd>{menuObj ? menuObj.name : '—'}</dd>
            </dl>
            <p>{t('pl.aside.talk', 'Prefer to talk? Call')} <a href="tel:9840839157">98408 39157</a> or <a href="tel:9566160584">95661 60584</a>.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
