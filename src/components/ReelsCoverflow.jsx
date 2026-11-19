import React, { useRef, useState } from 'react';
import ReelCard from './ReelCard.jsx';

const SWIPE_THRESHOLD = 40;

// Shortest signed distance from `index` to `active` on a circular track of
// length `len` (e.g. for 5 reels, distances range from -2 to 2).
function circularDelta(index, active, len) {
  let d = index - active;
  if (d > len / 2) d -= len;
  if (d < -len / 2) d += len;
  return d;
}

export default function ReelsCoverflow({ reels, sectionInView, audioActiveId, onRequestAudio, onReleaseAudio, audioUnlocked, onUnlockAudio }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);
  const len = reels.length;

  const goTo = (nextIndex) => {
    const wrapped = ((nextIndex % len) + len) % len;
    if (wrapped === activeIndex) return;
    const leavingReel = reels[activeIndex];
    if (leavingReel && audioActiveId === leavingReel.id) onReleaseAudio(leavingReel.id);
    setActiveIndex(wrapped);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > SWIPE_THRESHOLD) goTo(activeIndex - 1);
    else if (deltaX < -SWIPE_THRESHOLD) goTo(activeIndex + 1);
    touchStartX.current = null;
  };

  return (
    <div className="reel-coverflow">
      <div className="coverflow-track" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {reels.map((reel, i) => {
          const delta = circularDelta(i, activeIndex, len);
          const isActive = delta === 0;
          const isAdjacent = Math.abs(delta) === 1;
          const forceVisible = sectionInView && (isActive || isAdjacent);

          return (
            <div
              key={reel.id}
              className={`coverflow-slot ${isActive ? 'is-active' : ''} ${isAdjacent ? 'is-adjacent' : ''}`}
              style={{ '--delta': delta, zIndex: isActive ? 3 : isAdjacent ? 2 : 1 }}
            >
              <ReelCard
                reel={reel}
                sectionInView={sectionInView}
                forcedVisible={forceVisible}
                isAudioActive={audioActiveId === reel.id}
                onRequestAudio={onRequestAudio}
                onReleaseAudio={onReleaseAudio}
                audioUnlocked={audioUnlocked}
                onUnlockAudio={onUnlockAudio}
                hideControls={!isActive}
              />
              {!isActive && isAdjacent && (
                <button
                  type="button"
                  className="coverflow-tap-target"
                  onClick={() => goTo(i)}
                  aria-label={`Show ${reel.title || 'reel'}`}
                />
              )}
            </div>
          );
        })}
      </div>

      <button type="button" className="carousel-arrow coverflow-arrow coverflow-arrow-prev" onClick={() => goTo(activeIndex - 1)} aria-label="Previous reel">
        ‹
      </button>
      <button type="button" className="carousel-arrow coverflow-arrow coverflow-arrow-next" onClick={() => goTo(activeIndex + 1)} aria-label="Next reel">
        ›
      </button>

      <div className="coverflow-dots" role="tablist" aria-label="Reel selector">
        {reels.map((reel, i) => (
          <button
            key={reel.id}
            type="button"
            className={`coverflow-dot ${i === activeIndex ? 'is-active' : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Go to ${reel.title || `reel ${i + 1}`}`}
          />
        ))}
      </div>
    </div>
  );
}
