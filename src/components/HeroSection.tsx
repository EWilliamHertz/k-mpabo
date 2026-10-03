"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const t = useTranslations('Home');

  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Kämpabo Farmhouse"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-4"
      >
        <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">{t('title')}</h1>
        <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto">{t('subtitle')}</p>
        <Link href="/boende" className="inline-flex items-center gap-2 bg-white text-brand-primary px-8 py-4 rounded-full text-lg font-medium hover:bg-stone-100 transition-colors">
          {t('cta')} <ArrowRight size={20} />
        </Link>
      </motion.div>
    </section>
  );
}
