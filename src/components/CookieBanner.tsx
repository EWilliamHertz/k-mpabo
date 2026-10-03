"use client";

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const t = useTranslations('CookieConsent');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'all');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'essential');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 w-full bg-brand-primary text-stone-100 p-6 z-[100] shadow-2xl"
        >
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm md:text-base max-w-2xl">{t('message')}</p>
            <div className="flex gap-4 w-full md:w-auto">
              <button 
                onClick={handleDecline}
                className="flex-1 md:flex-none px-6 py-2 border border-stone-600 rounded hover:bg-brand-accent transition-colors text-sm"
              >
                {t('decline')}
              </button>
              <button 
                onClick={handleAccept}
                className="flex-1 md:flex-none px-6 py-2 bg-white text-brand-primary rounded hover:bg-stone-200 transition-colors text-sm font-medium"
              >
                {t('accept')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
