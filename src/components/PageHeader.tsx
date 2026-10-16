import { ReactNode } from 'react';

/**
 * Background for page headings: a panorama of JanShram's service photos —
 * electrician, mason, plumber, carpenter, painter, AC repair, the team — each
 * cropped by hand to the strip's own height so the whole head is in frame.
 *
 * Drawn at the header's height and repeated across, never `cover`ed: a single
 * wide photo stretched over an 80px strip is cropped differently at every
 * screen width, which is how faces ended up sliced at the forehead. This
 * fills any width and cuts nobody. 1888×160 source, a 944px period at 80px.
 */
const PANORAMA = '/banners/header-panorama.webp';
const PERIOD = 944;

/** Shifts the panorama per page so neighbouring pages show different people. */
function offsetFor(title: string): number {
  let h = 0;
  for (const ch of title) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  // Whole tiles only (118px each at 80px tall), so a seam never lands mid-face.
  return (h % 8) * (PERIOD / 8);
}

/**
 * The heading strip at the top of every page: 80px, full width, the service
 * panorama behind a brand-blue overlay, title on the left and the page's
 * actions on the right.
 */
export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div
      className="relative mb-6 overflow-hidden rounded-2xl shadow-sm"
      style={{
        backgroundColor: '#0B2A66',
        backgroundImage: `url(${PANORAMA})`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'auto 100%',
        backgroundPosition: `${-offsetFor(title)}px center`,
      }}
    >
      {/* Deep where the title sits, lighter towards the right so the people
          still read through — the colour carries the brand, the photos the
          trade. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(8,33,84,0.94) 0%, rgba(10,60,150,0.86) 38%, rgba(10,132,255,0.55) 72%, rgba(244,123,32,0.45) 100%)',
        }}
      />
      <div className="relative flex min-h-20 flex-col gap-3 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight leading-tight text-white">{title}</h1>
          {description && <p className="text-sm text-white/80 mt-0.5">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2 sm:justify-end">{actions}</div>}
      </div>
    </div>
  );
}
