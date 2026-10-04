"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';

export default function StoreMosse() {
  const t = useTranslations('AttGora');

  return (
    <div className="container mx-auto px-4 py-16">
      <Link href="/att-gora" className="inline-flex items-center gap-2 text-stone-500 hover:text-brand-primary transition-colors mb-12 uppercase text-sm tracking-wider font-semibold">
        <ArrowLeft size={16} /> Tillbaka till översikt
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-serif mb-6">{t('storeMosse')}</h1>
        <div className="relative h-[60vh] w-full rounded-2xl overflow-hidden mb-12">
          <Image src="/images/store-mosse-real.jpg" alt={t('storeMosse')} fill sizes="(max-width: 896px) 100vw, 896px" className="object-cover" priority />
        </div>
        
        <div className="prose prose-stone prose-lg max-w-none">
          <p className="lead text-2xl font-light text-stone-600 mb-8">
            Upptäck södra Sveriges största myrområde. En fantastisk naturupplevelse för alla åldrar, bara en kort bilresa från Kämpabo.
          </p>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Vandringsleder</h3>
              <p className="text-stone-600 mb-6">
                Med över 40 km markerade vandringsleder erbjuder Store Mosse allt från korta barnvänliga promenader till längre dagsutflykter. Upplev den storslagna naturen längs träspångarna.
              </p>
              <h3 className="text-xl font-semibold mb-4">Naturum</h3>
              <p className="text-stone-600">
                Besök Naturum där du kan lära dig mer om myrens unika flora och fauna. Här finns även kikare att låna för fågelskådning.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 h-fit">
              <h4 className="font-semibold text-lg mb-4 border-b border-stone-100 pb-2">Praktisk Information</h4>
              <ul className="space-y-3 text-stone-600">
                <li><strong className="text-brand-primary">Avstånd från Kämpabo:</strong> ca 25 minuter med bil</li>
                <li><strong className="text-brand-primary">Inträde:</strong> Gratis</li>
                <li><strong className="text-brand-primary">Passar för:</strong> Familjer, naturälskare, fotografer</li>
                <li><strong className="text-brand-primary">Tips:</strong> Ta med bekväma skor och en kikare!</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
