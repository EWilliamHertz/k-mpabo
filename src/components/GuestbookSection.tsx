"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { addGuestbookEntry } from '@/actions/guestbook';
import { useRef } from 'react';

type Entry = { id: string | number, name: string, message: string, created_at: Date };

export default function GuestbookSection({ entries }: { entries: Entry[] }) {
  const t = useTranslations('Gastbok');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    await addGuestbookEntry(formData);
    formRef.current?.reset();
  };

  return (
    <section className="py-24 bg-stone-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif mb-6">{t('title')}</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">{t('description')}</p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3 space-y-8">
            {entries.length === 0 ? (
              <p className="text-stone-500 italic">Inga inlägg ännu. Bli den första att skriva!</p>
            ) : (
              entries.map((review, i) => (
                <motion.div 
                  key={review.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 relative"
                >
                  <div className="absolute top-8 right-8 text-stone-200 text-6xl font-serif leading-none opacity-50">"</div>
                  <p className="text-stone-700 italic mb-6 text-lg relative z-10">{review.message}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-brand-primary">{review.name}</span>
                    <span className="text-stone-500">{new Date(review.created_at).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="md:col-span-2">
            <div className="bg-brand-primary text-white p-8 rounded-2xl sticky top-32">
              <h3 className="text-2xl font-serif mb-6">{t('leaveMessage')}</h3>
              <form ref={formRef} action={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="gb-name" className="block text-sm font-medium text-stone-300 mb-2">{t('name')}</label>
                  <input type="text" name="name" id="gb-name" required className="w-full px-4 py-3 rounded bg-brand-accent border border-stone-700 focus:outline-none focus:border-stone-500 text-white" />
                </div>
                <div>
                  <label htmlFor="gb-message" className="block text-sm font-medium text-stone-300 mb-2">{t('message')}</label>
                  <textarea name="message" id="gb-message" rows={4} required className="w-full px-4 py-3 rounded bg-brand-accent border border-stone-700 focus:outline-none focus:border-stone-500 text-white"></textarea>
                </div>
                <button type="submit" className="w-full bg-white text-brand-primary py-3 rounded font-medium hover:bg-stone-200 transition-colors">
                  {t('submit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
