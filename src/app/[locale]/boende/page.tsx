"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

export default function BoendeOverview() {
  const t = useTranslations('Boende');

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-serif mb-6">{t('title')}</h1>
        <p className="text-lg text-stone-600">{t('description')}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
        <Link href="/boende/mindre" className="group block overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition-all">
          <div className="relative h-72 w-full">
            <Image src="/images/small.jpg" alt={t('small')} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-2">{t('small')}</h2>
            <p className="text-stone-600 mb-4">Perfekt för den mindre familjen. Modern inredning och egen uteplats.</p>
            <span className="text-sm font-medium uppercase tracking-wider text-stone-900 group-hover:underline">Läs mer & boka</span>
          </div>
        </Link>
        <Link href="/boende/storre" className="group block overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition-all">
          <div className="relative h-72 w-full">
            <Image src="/images/large.jpg" alt={t('large')} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-2">{t('large')}</h2>
            <p className="text-stone-600 mb-4">Rymligt boende för upp till 8 personer med stora sociala ytor och kamin.</p>
            <span className="text-sm font-medium uppercase tracking-wider text-stone-900 group-hover:underline">Läs mer & boka</span>
          </div>
        </Link>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <Link href="/boende/bada" className="group flex flex-col md:flex-row overflow-hidden rounded-2xl bg-stone-900 text-white shadow-sm hover:shadow-md transition-all">
          <div className="relative h-64 md:h-auto md:w-1/2">
            <Image src="/images/hero.jpg" alt={t('both')} fill className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" />
          </div>
          <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-serif mb-4">{t('both')}</h2>
            <p className="text-stone-300 mb-8">
              Större sällskap? Hyr hela gården och få exklusiv tillgång till båda boendena och alla utomhusytor. Upp till 12 bäddar totalt.
            </p>
            <span className="inline-block bg-white text-stone-900 px-6 py-3 rounded text-center font-medium hover:bg-stone-200 transition-colors">
              Se tillgänglighet
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
