import React, { useEffect, useRef, useState } from 'react';

// `forcedVisible`: when provided (true/false), skips this card's own
// scroll-based IntersectionObserver and uses this value directly as its
// "should play" signal instead — used by the mobile coverflow carousel,
// which positions cards with transforms rather than native scrolling.
//
// `audioUnlocked` / `onUnlockAudio`: browsers may block audio enabled
// without a direct user gesture. Hovering never counts as a strong enough
// gesture in every browser, so hover-triggered unmuting is only attempted
// once the user has explicitly unlocked audio via a real click (the sound
// button itself, on any card). Until then, hover only brightens/enlarges —
// the sound button remains the visible, always-available way to enable it.
export default function ReelCard({
  reel,
  trackRef,
  sectionInView,
  forcedVisible,
  isAudioActive,
  onRequestAudio,
  onReleaseAudio,
  audioUnlocked,
  onUnlockAudio,
  hideControls,
  className = '',
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const [trackVisible, setTrackVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [errored, setErrored] = useState(false);

  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  const isTouchDevice = useRef(
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(hover: none)').matches : false
  );

  const effectiveVisible = forcedVisible === undefined ? trackVisible : forcedVisible;
  const shouldPlay = sectionInView && effectiveVisible && !userPaused && !reducedMotion.current;

  // Horizontal visibility within the carousel's own scroll track — only
  // used when this card isn't given an explicit `forcedVisible` value.
  useEffect(() => {
    if (forcedVisible !== undefined) return undefined;
    const container = containerRef.current;
    const root = trackRef?.current;
    if (!container || errored) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setTrackVisible(entry.isIntersecting),
      { root: root || null, threshold: 0.6 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [errored, trackRef, forcedVisible]);

  // Play/pause driven by combined section + carousel visibility. Hover
  // never touches this — only brightness/scale (CSS) and audio do.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || errored) return;

    if (shouldPlay) {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => {
            setPlaying(true);
            setAutoplayBlocked(false);
          })
          .catch(() => {
            // Browser blocked autoplay/power-saving — reflect that honestly
            // rather than claiming the video is playing.
            setAutoplayBlocked(true);
            setPlaying(false);
          });
      }
    } else {
      video.pause();
      setPlaying(false);
    }
  }, [shouldPlay, errored]);

  // Audio: only the carousel's single "active" reel is unmuted.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isAudioActive;
  }, [isAudioActive]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setUserPaused(false);
      video
        .play()
        .then(() => {
          setPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch(() => setAutoplayBlocked(true));
    } else {
      video.pause();
      setPlaying(false);
      setUserPaused(true);
    }
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice.current && audioUnlocked) onRequestAudio(reel.id);
  };
  const handleMouseLeave = () => {
    if (!isTouchDevice.current) onReleaseAudio(reel.id);
  };
  const handleSoundButton = () => {
    onUnlockAudio();
    if (isAudioActive) onReleaseAudio(reel.id);
    else onRequestAudio(reel.id);
  };

  return (
    <div
      className={`reel-card ${className}`}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!errored ? (
        <>
          <video
            ref={videoRef}
            className="reel-video"
            src={reel.src}
            muted={!isAudioActive}
            loop
            playsInline
            preload="metadata"
            onError={() => setErrored(true)}
          />
          {(autoplayBlocked || (!playing && userPaused)) && !hideControls && (
            <button type="button" className="reel-play-overlay" onClick={togglePlay} aria-label="Play reel">
              ▶
            </button>
          )}
          {!hideControls && (
            <div className="reel-controls">
              <button type="button" onClick={togglePlay} aria-label={playing ? 'Pause reel' : 'Play reel'}>
                {playing ? '❚❚' : '▶'}
              </button>
              <button
                type="button"
                className={`reel-sound-btn ${isTouchDevice.current ? 'is-touch' : ''}`}
                onClick={handleSoundButton}
                aria-label={isAudioActive ? 'Mute reel' : 'Unmute reel'}
                aria-pressed={isAudioActive}
              >
                {isAudioActive ? '🔊' : '🔇'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="reel-fallback">
          <span>{reel.title || 'Reel'} unavailable</span>
        </div>
      )}
      {reel.title && !hideControls && <p className="reel-caption">{reel.title}</p>}
    </div>
  );
}
