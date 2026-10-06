"use client";

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { type Photo } from '@/lib/photos';

const SLIDE_MS = 7000;

export default function HeroSection({ slides }: { slides: { photo: Photo, position: string }[] }) {
  const t = useTranslations('Home');
  const tg = useTranslations('Gallery');
  const locale = useLocale();
  
  const getAlt = (p: Photo) => {
    if (locale === 'sv' && p.dynamicAltSv) return p.dynamicAltSv;
    if (locale === 'en' && p.dynamicAltEn) return p.dynamicAltEn;
    if (locale === 'de' && p.dynamicAltDe) return p.dynamicAltDe;
    return 'Kämpabo';
  };

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [index]);

  const slide = slides[index];

  return (
    <section className="relative w-full h-[100svh] min-h-[560px] flex items-center justify-center overflow-hidden bg-stone-900">
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.photo.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: SLIDE_MS / 1000 + 2, ease: 'linear' }}
          >
            <Image
              src={slide.photo.src}
              alt={getAlt(slide.photo)}
              fill
              priority={index === 0}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={slide.photo.blurDataURL}
              className="object-cover"
              style={{ objectPosition: slide.position }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        className="relative z-10 text-center text-white px-4"
      >
        <p className="mb-5 text-xs md:text-sm uppercase tracking-[0.35em] text-white/80">
          Anderstorp · Småland
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight mb-6 drop-shadow-lg">
          {t('title')}
        </h1>
        <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto text-white/90 drop-shadow">
          {t('subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/vara-boenden"
            className="inline-flex items-center gap-2 bg-white text-brand-primary px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:bg-stone-100 transition-colors"
          >
            {t('cta')} <ArrowRight size={20} />
          </Link>
          <Link
            href="/kontakt-bokning"
            className="inline-flex items-center gap-2 border border-white/60 text-white px-8 py-4 rounded-full text-lg font-medium backdrop-blur-sm hover:bg-white/10 transition-colors"
          >
            {t('cta2')}
          </Link>
        </div>
      </motion.div>

      <div className="absolute bottom-8 inset-x-0 z-10 flex flex-col items-center gap-6">
        <div className="flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.photo.src}
              onClick={() => setIndex(i)}
              aria-label={tg('counter', { current: i + 1, total: slides.length })}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-10 bg-white' : 'w-4 bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
        <motion.a
          href="#valkommen"
          aria-label={tg('scroll')}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/80 hover:text-white"
        >
          <ChevronDown size={28} />
        </motion.a>
      </div>
    </section>
  );
}
