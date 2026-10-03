"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Kontakt() {
  const t = useTranslations('Kontakt');

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-serif mb-6">{t('title')}</h1>
        <p className="text-lg text-stone-600">{t('description')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-stone-100"
      >
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert(t('success')); }}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">{t('name')}</label>
              <input type="text" id="name" required className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-400 bg-stone-50" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">{t('email')}</label>
              <input type="email" id="email" required className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-400 bg-stone-50" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="dates" className="block text-sm font-medium text-stone-700 mb-2">{t('dates')}</label>
              <input type="text" id="dates" placeholder="T.ex. 12-19 Juli" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-400 bg-stone-50" />
            </div>
            <div>
              <label htmlFor="guests" className="block text-sm font-medium text-stone-700 mb-2">{t('guests')}</label>
              <select id="guests" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-400 bg-stone-50">
                <option value="1-4">1-4</option>
                <option value="5-8">5-8</option>
                <option value="9-12">9-12</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">{t('message')}</label>
            <textarea id="message" rows={5} required className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-400 bg-stone-50"></textarea>
          </div>
          <button type="submit" className="w-full bg-brand-accent text-white py-4 rounded-lg hover:bg-brand-primary transition-colors font-medium text-lg">
            {t('submit')}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
