import React, { useState, useRef, useEffect } from 'react';

export default function LazyImage({ src, alt, className = '', wrapperClassName = '', ...props }) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={`lazy-image-wrapper ${wrapperClassName}`}>
      {/* Shimmer placeholder — hidden once image loads */}
      {!loaded && <div className="lazy-image-shimmer" />}

      {/* Only mount <img> when in viewport */}
      {inView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`${className} ${loaded ? 'lazy-image-loaded' : 'lazy-image-loading'}`}
          {...props}
        />
      )}
    </div>
  );
}
