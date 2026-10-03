"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="flex flex-col items-center">
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
          <Link href="/boende" className="inline-flex items-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-stone-100 transition-colors">
            {t('cta')} <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      <section className="py-24 container mx-auto px-4 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-serif mb-6">En naturnära upplevelse</h2>
          <p className="text-lg text-stone-600 leading-relaxed mb-12">
            Välkommen till vår gård i hjärtat av de småländska skogarna. Här kan du koppla av, 
            njuta av naturens lugn och bo bekvämt i moderna, välutrustade boenden med hög standard.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/boende/mindre" className="group block overflow-hidden rounded-xl">
              <div className="relative h-64 w-full">
                <Image src="/images/small.jpg" alt="Small cabin" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6 bg-white shadow-sm text-left">
                <h3 className="text-xl font-semibold mb-2">Mindre Boendet</h3>
                <p className="text-stone-500">Perfekt för den lilla familjen. 4 bäddar.</p>
              </div>
            </Link>
            <Link href="/boende/storre" className="group block overflow-hidden rounded-xl">
              <div className="relative h-64 w-full">
                <Image src="/images/large.jpg" alt="Large villa" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6 bg-white shadow-sm text-left">
                <h3 className="text-xl font-semibold mb-2">Större Boendet</h3>
                <p className="text-stone-500">Rymligt och ljust. 8 bäddar.</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
