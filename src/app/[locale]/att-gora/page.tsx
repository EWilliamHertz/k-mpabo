"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

export default function AttGora() {
  const t = useTranslations('AttGora');

  const activities = [
    { slug: 'store-mosse', title: t('storeMosse'), desc: 'Upplev södra Sveriges största myrområde.', img: '/images/store-mosse-real.jpg' },
    { slug: 'isaberg', title: t('isaberg'), desc: 'Skidåkning, MTB, äventyrsbana och rodel.', img: '/images/isaberg-real.jpg' },
    { slug: 'high-chaparral', title: t('highChaparral'), desc: 'Vilda västern-parken för hela familjen.', img: '/images/high-chaparral-real.jpg' },
    { slug: 'anderstorp', title: t('anderstorp'), desc: 'Skandinaviens mest kända racerbana.', img: '/images/anderstorp-real.jpg' }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-serif mb-4">{t('title')}</h1>
        <p className="text-lg text-stone-600">{t('description')}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {activities.map((act, index) => (
          <motion.div
            key={act.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/att-gora/${act.slug}` as any} className="group block overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-72 w-full">
                <Image src={act.img} alt={act.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-semibold mb-2">{act.title}</h2>
                <p className="text-stone-600">{act.desc}</p>
                <div className="mt-4 text-sm font-medium uppercase tracking-wider text-brand-primary flex items-center gap-2">
                  Läs mer <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
