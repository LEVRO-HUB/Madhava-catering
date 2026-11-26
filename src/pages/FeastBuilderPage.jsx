import React, { useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import Seo from '../components/Seo.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { categories, categoryById } from '../data/categories.js';
import { dishes } from '../data/dishes.js';
import { WHATSAPP_NUMBER } from '../data/businessConfig.js';
import { useMenuSelection } from '../context/MenuSelectionContext.jsx';
import { useT } from '../i18n/LanguageContext.jsx';
import { track } from '../lib/lead.js';
import '../styles/feast.css';

// Dish photos are optional: until real photographs exist in /assets/dishes
// the badge falls back to the category icon, so the builder always looks right.
function Badge({ dish, size = 'md' }) {
  const [bad, setBad] = useState(false);
  const cat = categoryById[dish.category];
  return (
    <span className={`fb-badge is-${size}`} title={dish.name}>
      {!bad ? (
        <img src={dish.image} alt="" loading="lazy" onError={() => setBad(true)} />
      ) : (
        <span className="fb-badge-icon" aria-hidden="true">{cat?.icon || '✨'}</span>
      )}
      <span className="fb-badge-name">{dish.name}</span>
    </span>
  );
}

export default function FeastBuilderPage() {
  const t = useT();
  const navigate = useNavigate();
  const { selectedIds, selectedDishes, toggleDish, clearAll } = useMenuSelection();
  const [cat, setCat] = useState('all');
  const [dlError, setDlError] = useState(false);
  const leafRef = useRef(null);

  const list = cat === 'all' ? dishes : dishes.filter((d) => d.category === cat);
  const onLeaf = useMemo(
    () => selectedDishes.filter((d) => !categoryById[d.category]?.servedSeparately),
    [selectedDishes]
  );
  const onTray = useMemo(
    () => selectedDishes.filter((d) => categoryById[d.category]?.servedSeparately),
    [selectedDishes]
  );

  // Order dishes on the leaf the way a real feast is laid out: by category order.
  const leafSorted = useMemo(() => {
    const order = Object.fromEntries(categories.map((c, i) => [c.id, i]));
    return [...onLeaf].sort((a, b) => order[a.category] - order[b.category]);
  }, [onLeaf]);

  const summaryText = () =>
    [
      'My Feast – Madhava Catering Services',
      '',
      ...categories
        .map((c) => {
          const names = selectedDishes.filter((d) => d.category === c.id).map((d) => d.name);
          return names.length ? `${c.name}: ${names.join(', ')}` : null;
        })
        .filter(Boolean),
      '',
      `Total items: ${selectedDishes.length}`,
    ].join('\n');

  const waHref = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(summaryText())}`
    : '';

  const download = async () => {
    setDlError(false);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(leafRef.current, { backgroundColor: '#fff8ec', scale: 2, useCORS: true });
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'my-madhava-feast.png';
      a.click();
      track('feast_download');
    } catch (e) {
      setDlError(true);
    }
  };

  const toPlanner = () => {
    try {
      sessionStorage.setItem('madhava-feast', summaryText());
    } catch (e) {
      /* ignore */
    }
    track('feast_to_planner', { items: selectedDishes.length });
    navigate('/plan-your-event');
  };

  return (
    <>
      <Seo
        title="Build Your Feast | Banana-Leaf Menu Builder"
        description="Pick traditional South Indian dishes and watch your banana-leaf feast fill up. Send your menu to Madhava Catering Services on WhatsApp."
        path="/build-your-feast"
      />
      <PageHero
        eyebrow={t('fb.eyebrow', 'Feast Builder')}
        title={t('fb.title', 'Build Your Banana-Leaf Feast')}
        crumb={t('ft.feast', 'Build Your Feast')}
        subtitle={t('fb.sub', 'Choose dishes and watch your leaf fill up. Then send it to us on WhatsApp.')}
      />

      <section className="fb section">
        <div className="container fb-grid">
          <div className="fb-pick">
            <h2 className="fb-h">{t('fb.pick', 'Pick your dishes')}</h2>
            <p className="fb-hint">{t('fb.hint', 'Tap a dish to add it to your leaf; tap again to remove it.')}</p>
            <div className="fb-cats" role="group" aria-label="Categories">
              <button type="button" className={`fb-cat ${cat === 'all' ? 'is-on' : ''}`} onClick={() => setCat('all')}>
                {t('gal.all', 'All')}
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`fb-cat ${cat === c.id ? 'is-on' : ''}`}
                  aria-pressed={cat === c.id}
                  onClick={() => setCat(c.id)}
                >
                  <span aria-hidden="true">{c.icon}</span> {c.name}
                </button>
              ))}
            </div>
            <div className="fb-dishes">
              {list.map((d) => {
                const on = selectedIds.includes(d.id);
                return (
                  <button
                    type="button"
                    key={d.id}
                    className={`fb-dish ${on ? 'is-on' : ''}`}
                    aria-pressed={on}
                    onClick={() => {
                      toggleDish(d.id);
                      track('feast_toggle', { dish: d.id });
                    }}
                  >
                    <Badge dish={d} size="sm" />
                    <span className="fb-check" aria-hidden="true">{on ? '✓' : '+'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="fb-side" aria-label={t('fb.leaf', 'Your leaf')}>
            <div className="fb-capture" ref={leafRef}>
              <div className="fb-leaf">
                <div className="fb-leaf-items">
                  {leafSorted.length === 0 && <p className="fb-empty">{t('fb.empty', 'Pick dishes to fill your leaf')}</p>}
                  {leafSorted.map((d) => (
                    <Badge key={d.id} dish={d} />
                  ))}
                </div>
              </div>
              {onTray.length > 0 && (
                <div className="fb-tray">
                  <h3>{t('fb.tray', 'Served separately')}</h3>
                  <div className="fb-tray-items">
                    {onTray.map((d) => (
                      <Badge key={d.id} dish={d} size="sm" />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p className="fb-count">
              <strong>{selectedDishes.length}</strong> {t('fb.count', 'items')}
            </p>
            <div className="fb-actions">
              {waHref && selectedDishes.length > 0 && (
                <a className="btn btn-primary" href={waHref} target="_blank" rel="noopener noreferrer" onClick={() => track('feast_whatsapp')}>
                  {t('fb.send', 'Send my feast on WhatsApp')}
                </a>
              )}
              <button type="button" className="btn btn-secondary" onClick={toPlanner} disabled={!selectedDishes.length}>
                {t('fb.plan', 'Continue to planner')}
              </button>
              <button type="button" className="btn btn-secondary" onClick={download} disabled={!selectedDishes.length}>
                {t('fb.download', 'Download as image')}
              </button>
              <button type="button" className="fb-clear" onClick={clearAll} disabled={!selectedDishes.length}>
                {t('fb.clear', 'Clear all')}
              </button>
            </div>
            {dlError && <p className="planner-error" role="alert">{t('fb.dl.err', 'Could not create the image. Please try again.')}</p>}
            <p className="fb-note">{t('fb.note', 'This is a starting point. We confirm the final menu, quantities and arrangements with you.')}</p>
            <Link to="/menus" className="fb-link">{t('hero.menu', 'Explore Our Menu')} →</Link>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
