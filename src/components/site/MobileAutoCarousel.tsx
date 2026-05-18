import { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode[];
  /** Cards per slide */
  perSlide?: number;
  /** Interval in ms */
  intervalMs?: number;
  className?: string;
};

/**
 * Mobile-only auto-rotating carousel.
 * Groups children into slides of `perSlide` and advances every `intervalMs`.
 * Loops infinitely. Preserves the children's own styling.
 */
export function MobileAutoCarousel({
  children,
  perSlide = 2,
  intervalMs = 3000,
  className = "",
}: Props) {
  const items = Array.isArray(children) ? children : [children];
  const slides: ReactNode[][] = [];
  for (let i = 0; i < items.length; i += perSlide) {
    const slice = items.slice(i, i + perSlide);
    // If last slide is short, wrap from the beginning so it stays full.
    while (slice.length < perSlide && items.length >= perSlide) {
      slice.push(items[(i + slice.length) % items.length]);
    }
    slides.push(slice);
  }

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((v) => (v + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slides.length, intervalMs]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((group, i) => (
          <div key={i} className="shrink-0 w-full grid grid-cols-2 gap-3">
            {group.map((node, j) => (
              <div key={j} className="min-w-0">
                {node}
              </div>
            ))}
          </div>
        ))}
      </div>
      {slides.length > 1 && (
        <div className="mt-4 flex justify-center gap-1.5">
          {slides.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === index ? 18 : 6,
                backgroundColor: i === index ? "var(--brand-nude)" : "rgba(90,70,55,0.30)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
