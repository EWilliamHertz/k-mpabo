import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  
  return (
    <footer className="bg-brand-primary text-stone-400 py-12 mt-20">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-serif text-stone-100 mb-6">Kämpabo</h3>
        <p className="mb-2">{t('address')}</p>
        <p className="text-sm mt-8 opacity-60">© {new Date().getFullYear()} Kämpabo. All rights reserved.</p>
      </div>
    </footer>
  );
}
