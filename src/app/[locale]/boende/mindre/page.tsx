"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MindreBoende() {
  const t = useTranslations('Boende');

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-serif mb-6">{t('small')}</h1>
        <div className="relative h-[50vh] w-full rounded-2xl overflow-hidden mb-12">
          <Image src="/images/small.jpg" alt={t('small')} fill className="object-cover" priority />
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 prose prose-stone prose-lg">
            <p className="lead text-2xl font-light text-stone-600 mb-6">
              Vårt mindre boende erbjuder en mysig och avkopplande miljö, perfekt för det lilla sällskapet eller familjen.
            </p>
            <p className="text-stone-600">
              Inrett med modern skandinavisk design, ljust trä och bekväma möbler. Här finns allt du behöver för en bekväm vistelse i Småland. Njut av morgonkaffet på verandan med utsikt över den omgivande naturen.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 h-fit">
            <h4 className="font-semibold text-lg mb-4 border-b border-stone-100 pb-2">Faciliteter</h4>
            <ul className="space-y-3 text-stone-600">
              <li>4 bäddar</li>
              <li>Fullt utrustat kök</li>
              <li>Modernt badrum</li>
              <li>Egen uteplats</li>
              <li>Gratis Wi-Fi</li>
            </ul>
            <button className="w-full mt-8 bg-stone-900 text-white py-3 rounded hover:bg-stone-800 transition-colors">
              Boka nu
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
