"use client";

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { altKey, type Photo } from '@/lib/photos';
import { useLocale } from 'next-intl';

type LightboxProps = {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

/** Fullscreen photo viewer with keyboard, button and swipe navigation. */
export function Lightbox({ photos, index, onClose, onIndexChange }: LightboxProps) {
  const locale = useLocale();
  const t = useTranslations('Gallery');
  const [direction, setDirection] = useState(0);

  const getAlt = (p: Photo) => {
    if (locale === 'sv' && p.dynamicAltSv) return p.dynamicAltSv;
    if (locale === 'en' && p.dynamicAltEn) return p.dynamicAltEn;
    if (locale === 'de' && p.dynamicAltDe) return p.dynamicAltDe;
    return t(altKey(p));
  };
  const open = index !== null;

  const go = useCallback(
    (step: number) => {
      if (index === null) return;
      setDirection(step);
      onIndexChange((index + step + photos.length) % photos.length);
    },
    [index, photos.length, onIndexChange]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, go, onClose]);

  const photo = index !== null ? photos[index] : null;
  const alt = photo ? t(altKey(photo)) : '';

  return (
    <AnimatePresence>
      {photo && index !== null && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-stone-950/95 backdrop-blur-sm flex items-center justify-center"
          onClick={onClose}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={photo.src}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -80 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              drag={photos.length > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(1);
                else if (info.offset.x > 80) go(-1);
              }}
              className="relative w-[92vw] h-[80vh] md:w-[86vw] md:h-[86vh] cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photo.src}
                alt={alt}
                fill
                sizes="92vw"
                className="object-contain select-none pointer-events-none"
                priority
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-0 inset-x-0 flex items-center justify-between p-4 md:p-6 text-white/90">
            <span className="text-sm tracking-widest tabular-nums">
              {t('counter', { current: index + 1, total: photos.length })}
            </span>
            <button
              onClick={onClose}
              aria-label={t('close')}
              className="rounded-full p-2 bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); go(-1); }}
                aria-label={t('previous')}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 rounded-full p-3 bg-white/10 hover:bg-white/25 text-white transition-colors"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); go(1); }}
                aria-label={t('next')}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 rounded-full p-3 bg-white/10 hover:bg-white/25 text-white transition-colors"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type GalleryProps = {
  photos: Photo[];
  /** Number of photos shown before the "show all" button. Defaults to all. */
  initialCount?: number;
};

/** Masonry photo gallery that opens a fullscreen lightbox on click. */
export default function PhotoGallery({ photos, initialCount }: GalleryProps) {
  const t = useTranslations('Gallery');
  const [active, setActive] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const limit = initialCount && !expanded ? initialCount : photos.length;
  const visible = photos.slice(0, limit);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {visible.map((photo, i) => {
          const alt = t(altKey(photo));
          return (
          <motion.button
            key={photo.src}
            type="button"
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: 'easeOut' }}
            className="group relative mb-4 block w-full overflow-hidden rounded-2xl bg-stone-200 break-inside-avoid focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/40"
            aria-label={`${t('open')}: ${alt}`}
          >
            <Image
              src={photo.src}
              alt={alt}
              width={photo.width}
              height={photo.height}
              placeholder="blur"
              blurDataURL={photo.blurDataURL}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <Expand
              size={20}
              className="pointer-events-none absolute right-4 bottom-4 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </motion.button>
          );
        })}
      </div>

      {limit < photos.length && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-8 py-3 font-medium text-stone-800 shadow-sm transition-colors hover:bg-stone-100"
          >
            {t('showAll', { count: photos.length })}
          </button>
        </div>
      )}

      <Lightbox photos={photos} index={active} onClose={() => setActive(null)} onIndexChange={setActive} />
    </>
  );
}
