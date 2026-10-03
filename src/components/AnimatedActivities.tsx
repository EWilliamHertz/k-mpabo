"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useRef } from 'react';

export default function AnimatedActivities() {
  const t = useTranslations('AttGora');
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animate upwards as user scrolls
  const y = useTransform(scrollYProgress, [0, 0.5], [200, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const activities = [
    { slug: 'store-mosse', title: t('storeMosse'), desc: 'Upplev södra Sveriges största myrområde.', img: '/images/nature.jpg' },
    { slug: 'isaberg', title: t('isaberg'), desc: 'Skidåkning, MTB, äventyrsbana och rodel.', img: '/images/nature.jpg' },
    { slug: 'high-chaparral', title: t('highChaparral'), desc: 'Vilda västern-parken för hela familjen.', img: '/images/nature.jpg' },
    { slug: 'anderstorp', title: t('anderstorp'), desc: 'Skandinaviens mest kända racerbana.', img: '/images/nature.jpg' }
  ];

  return (
    <section ref={containerRef} className="py-32 bg-stone-50 overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div style={{ opacity, y }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">{t('title')}</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">{t('description')}</p>
        </motion.div>

        <motion.div 
          style={{ y, opacity }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {activities.map((act, index) => (
            <Link 
              key={act.slug} 
              href={`/att-gora/${act.slug}` as any} 
              className="group block overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
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
                <div className="text-xs font-semibold uppercase tracking-widest text-stone-900 group-hover:text-stone-500 transition-colors">
                  Läs mer →
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
