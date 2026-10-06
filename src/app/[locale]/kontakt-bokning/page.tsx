import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import BookingModal from '@/components/BookingModal';
import { Link } from '@/i18n/routing';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'KontaktBokning' });
  return {
    title: t('title'),
    description: t('meta'),
  };
}

export default function KontaktBokningPage() {
  const t = useTranslations('KontaktBokning');

  return (
    <div className="container mx-auto px-4 pb-12 max-w-4xl pt-24 text-center">
      <h1 className="text-4xl md:text-6xl font-serif mb-6 md:mb-8 text-stone-900">{t('h1')}</h1>
      
      <div className="max-w-2xl mx-auto mb-8 md:mb-10">
        {t.has('p1') && <p className="text-lg md:text-xl text-stone-700 leading-relaxed mb-4 md:mb-6 whitespace-pre-line">{t('p1')}</p>}
        {t.has('p2') && <p className="text-lg md:text-xl text-stone-700 leading-relaxed mb-4 md:mb-6 whitespace-pre-line">{t('p2')}</p>}
      </div>

      <div className="mb-12">
        <AvailabilityCalendar />
      </div>
      
      <div className="mb-16">
        <BookingModal buttonText={t('btn_open')} />
      </div>

      <div className="bg-stone-50 p-10 rounded-3xl border border-stone-100 max-w-3xl mx-auto">
        {t.has('h2_1') && <h2 className="text-2xl font-serif mb-4 text-stone-800">{t('h2_1')}</h2>}
        {t.has('p4') && <p className="text-lg text-stone-600 leading-relaxed mb-6 whitespace-pre-line">{t('p4')}</p>}
        {t.has('btn2') && (
          <Link href="/vara-boenden" className="text-brand-primary font-medium hover:underline inline-flex items-center gap-2">
            {t('btn2')} →
          </Link>
        )}
      </div>
    </div>
  );
}
