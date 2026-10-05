"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import PhotoGallery from '@/components/PhotoGallery';
import { type PhotoCategory, type Photo } from '@/lib/photos';

type Props = {
  categories?: PhotoCategory[];
  initialCount?: number;
  photosData: Record<PhotoCategory, Photo[]>;
};

/** Tabbed gallery switching between outdoor, upstairs and downstairs photos. */
export default function PropertyShowcase({
  categories = ['utomhus', 'uppe', 'nere'],
  initialCount = 6,
  photosData,
}: Props) {
  const t = useTranslations('Gallery');
  const [active, setActive] = useState<PhotoCategory>(categories[0]);

  return (
    <div>
      <div role="tablist" className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => {
          const selected = cat === active;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(cat)}
              className={`relative rounded-full px-6 py-2.5 text-sm font-medium tracking-wide transition-colors ${
                selected ? 'text-white' : 'text-stone-700 hover:bg-stone-200/60'
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="showcase-pill"
                  className="absolute inset-0 rounded-full bg-brand-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">
                {t(cat)} <span className="opacity-60">· {photosData[cat].length}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel">
        <PhotoGallery key={active} photos={photosData[active]} initialCount={initialCount} />
      </div>
    </div>
  );
}
