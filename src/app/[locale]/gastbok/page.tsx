"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Gastbok() {
  const t = useTranslations('Gastbok');

  const mockReviews = [
    { id: 1, name: 'Familjen Andersson', date: 'Augusti 2025', text: 'Fantastiskt vackert boende och underbar natur! Barnen älskade att springa fritt på gården. Vi kommer garanterat tillbaka.' },
    { id: 2, name: 'Schmidt Family', date: 'Juli 2025', text: 'Wir hatten eine wundervolle Zeit. Die Hütte ist sehr gemütlich und modern eingerichtet. Perfekt für einen entspannten Urlaub in Schweden.' },
    { id: 3, name: 'Emma & Lars', date: 'Juni 2025', text: 'En oas av lugn. Nära till fantastiska vandringsleder i Store Mosse men ändå helt avskilt. Rekommenderas starkt!' }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-serif mb-6">{t('title')}</h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">{t('description')}</p>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-3 space-y-8">
          {mockReviews.map((review, i) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 relative"
            >
              <div className="absolute top-8 right-8 text-stone-300 text-6xl font-serif leading-none opacity-50">"</div>
              <p className="text-stone-700 italic mb-6 text-lg relative z-10">{review.text}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-stone-900">{review.name}</span>
                <span className="text-stone-500">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="md:col-span-2">
          <div className="bg-stone-900 text-white p-8 rounded-2xl sticky top-32">
            <h3 className="text-2xl font-serif mb-6">{t('leaveMessage')}</h3>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Tack för din hälsning!'); }}>
              <div>
                <label htmlFor="gb-name" className="block text-sm font-medium text-stone-300 mb-2">{t('name')}</label>
                <input type="text" id="gb-name" required className="w-full px-4 py-3 rounded bg-stone-800 border border-stone-700 focus:outline-none focus:border-stone-500 text-white" />
              </div>
              <div>
                <label htmlFor="gb-message" className="block text-sm font-medium text-stone-300 mb-2">{t('message')}</label>
                <textarea id="gb-message" rows={4} required className="w-full px-4 py-3 rounded bg-stone-800 border border-stone-700 focus:outline-none focus:border-stone-500 text-white"></textarea>
              </div>
              <button type="submit" className="w-full bg-white text-stone-900 py-3 rounded font-medium hover:bg-stone-200 transition-colors">
                {t('submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
