"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useRef } from 'react';

export default function AnimatedActivities() {
  const t = useTranslations('AttGora');

  const activities = [
    { slug: 'boende-nara-store-mosse', title: t('storeMosse'), desc: 'Upplev södra Sveriges största myrområde.', img: '/images/store-mosse-real.jpg' },
    { slug: 'boende-nara-isaberg', title: t('isaberg'), desc: 'Skidåkning, MTB, äventyrsbana och rodel.', img: '/images/isaberg-real.jpg' },
    { slug: 'boende-nara-high-chaparral', title: t('highChaparral'), desc: 'Vilda västern-parken för hela familjen.', img: '/images/high-chaparral-real.jpg' },
    { slug: 'boende-nara-anderstorp', title: t('anderstorp'), desc: 'Skandinaviens mest kända racerbana.', img: '/images/anderstorp-real.jpg' }
  ];

  return (
    <section className="py-32 bg-stone-50 overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6">{t('title')}</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">{t('description')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((act, index) => (
            <motion.div
              key={act.slug}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
            >
              <Link 
                href={`/${act.slug}` as any} 
                className="group block overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 h-full"
              >
              <div className="relative h-64 w-full">
                <Image src={act.img} alt={act.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-semibold mb-2">{act.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-stone-600 text-sm mb-4">{act.desc}</p>
                <div className="text-xs font-semibold uppercase tracking-widest text-brand-primary group-hover:text-stone-500 transition-colors">
                  Läs mer →
                </div>
              </div>
            </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
