"use client";

import { useState } from 'react';
import { submitBooking } from '@/actions/booking';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface BookingModalProps {
  buttonText: string;
}

export default function BookingModal({ buttonText }: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const t = useTranslations('KontaktBokning');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      await submitBooking(formData);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Något gick fel. Vänligen försök igen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="inline-block bg-brand-primary text-white px-8 py-4 rounded-full hover:bg-opacity-90 transition font-medium text-lg shadow-sm"
      >
        {buttonText}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 md:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 transition"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-serif mb-6 text-stone-900">{t('h1')}</h2>
            
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
                <p className="text-xl text-stone-800 font-medium mb-2">{t('success')}</p>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="mt-6 text-brand-primary hover:underline"
                >
                  Stäng
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">{t('name')} *</label>
                  <input required name="name" type="text" className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">{t('email')} *</label>
                  <input required name="email" type="email" className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">{t('dates')}</label>
                    <input name="dates" type="text" placeholder="t.ex. 12-15 juli" className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">{t('guests')}</label>
                    <input name="guests" type="number" min="1" className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">{t('message')}</label>
                  <textarea name="message" rows={4} placeholder="Beskriv ert sällskap eller eventuella frågor..." className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition resize-none"></textarea>
                </div>
                
                <p className="text-xs text-stone-500 italic mb-4">{t('p3')}</p>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-brand-primary text-white py-4 px-4 rounded-xl hover:bg-opacity-90 transition font-medium text-lg disabled:opacity-70"
                >
                  {isSubmitting ? "Skickar..." : t('btn1')}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
