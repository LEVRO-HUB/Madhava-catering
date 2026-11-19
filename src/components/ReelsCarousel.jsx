import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReelCard from './ReelCard.jsx';
import ReelsCoverflow from './ReelsCoverflow.jsx';

const GAP = 20;
const MOBILE_BREAKPOINT = 640;
// Slightly less than a whole number of items so a sliver of the next card
// peeks in at the edge — a visual hint that more reels exist (Part 5).
const DESKTOP_PEEK_ITEMS = 4.15;
const TABLET_PEEK_ITEMS_WIDE = 3.12;
const TABLET_PEEK_ITEMS_NARROW = 2.15;

function getMode(width) {
  if (width < MOBILE_BREAKPOINT) return 'coverflow';
  if (width < 1024) return width >= 820 ? 'tablet-3' : 'tablet-2';
  return 'desktop';
}

function itemsForMode(mode) {
  switch (mode) {
    case 'desktop':
      return { display: 4, basis: DESKTOP_PEEK_ITEMS };
    case 'tablet-3':
      return { display: 3, basis: TABLET_PEEK_ITEMS_WIDE };
    case 'tablet-2':
      return { display: 2, basis: TABLET_PEEK_ITEMS_NARROW };
    default:
      return { display: 1, basis: 1 };
  }
}

export default function ReelsCarousel({ reels }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  const [mode, setMode] = useState(() => getMode(typeof window !== 'undefined' ? window.innerWidth : 1400));
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [visibleRange, setVisibleRange] = useState({ first: 0, last: Math.min(3, reels.length - 1) });
  const [sectionInView, setSectionInView] = useState(false);
  const [audioActiveId, setAudioActiveId] = useState(null);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  useEffect(() => {
    const onResize = () => setMode(getMode(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Whole section on-page visibility — pauses everything (both carousel
  // modes) when the reels section itself is scrolled off-page.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(([entry]) => setSectionInView(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { display: itemsPerView, basis: peekItems } = itemsForMode(mode);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 4);

    const card = track.querySelector('.reel-slot');
    if (card) {
      const cardWidth = card.getBoundingClientRect().width + GAP;
      const first = Math.round(track.scrollLeft / cardWidth);
      const last = Math.min(first + itemsPerView - 1, reels.length - 1);
      setVisibleRange({ first, last });
    }
  }, [itemsPerView, reels.length]);

  useEffect(() => {
    if (mode === 'coverflow') return undefined;
    const track = trackRef.current;
    if (!track) return undefined;
    updateScrollState();
    track.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      track.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState, mode]);

  const scroll = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.reel-slot');
    const cardWidth = card ? card.getBoundingClientRect().width + GAP : track.clientWidth / itemsPerView;
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: direction * cardWidth, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const requestAudio = useCallback((id) => setAudioActiveId(id), []);
  const releaseAudio = useCallback((id) => {
    setAudioActiveId((current) => (current === id ? null : current));
  }, []);
  const unlockAudio = useCallback(() => setAudioUnlocked(true), []);

  if (mode === 'coverflow') {
    return (
      <div className="reel-carousel-wrapper" ref={wrapperRef}>
        <ReelsCoverflow
          reels={reels}
          sectionInView={sectionInView}
          audioActiveId={audioActiveId}
          onRequestAudio={requestAudio}
          onReleaseAudio={releaseAudio}
          audioUnlocked={audioUnlocked}
          onUnlockAudio={unlockAudio}
        />
      </div>
    );
  }

  const cardBasis = `calc((100% - ${(peekItems - 1) * GAP}px) / ${peekItems})`;

  return (
    <div className="reel-carousel-wrapper" ref={wrapperRef}>
      <div className="reel-counter">
        {visibleRange.first + 1}–{visibleRange.last + 1} of {reels.length} Reels
      </div>

      <div className="reel-carousel">
        <button
          type="button"
          className="carousel-arrow carousel-arrow-prev"
          onClick={() => scroll(-1)}
          disabled={!canPrev}
          aria-label="Previous reels"
        >
          ‹
        </button>

        <div className="reel-track" ref={trackRef} style={{ gap: `${GAP}px` }}>
          {reels.map((reel) => (
            <div key={reel.id} className="reel-slot" style={{ flexBasis: cardBasis }}>
              <ReelCard
                reel={reel}
                trackRef={trackRef}
                sectionInView={sectionInView}
                isAudioActive={audioActiveId === reel.id}
                onRequestAudio={requestAudio}
                onReleaseAudio={releaseAudio}
                audioUnlocked={audioUnlocked}
                onUnlockAudio={unlockAudio}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="carousel-arrow carousel-arrow-next"
          onClick={() => scroll(1)}
          disabled={!canNext}
          aria-label="Next reels"
        >
          ›
        </button>
      </div>
    </div>
  );
}
