import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BoendeNaraIsaberg' });
  return {
    title: t('title'),
    description: t('meta'),
  };
}

export default function BoendeNaraIsabergPage() {
  const t = useTranslations('BoendeNaraIsaberg');

  return (
    <div className="container mx-auto px-4 pb-12 max-w-4xl pt-24">
      <h1 className="text-4xl md:text-5xl font-serif mb-8 text-stone-900">{t('h1')}</h1>
      {t.has('p1') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p1')}</p>}
      {t.has('btn1') && (
        <div className="mb-8">
          <Link href="/vara-boenden" className="inline-block bg-brand-primary text-white hover:bg-opacity-90 px-6 py-3 rounded transition">{t('btn1')}</Link>
        </div>
      )}
      {t.has('p2') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p2')}</p>}
      {t.has('h2_1') && <h2 className="text-3xl font-serif mt-12 mb-6 text-stone-800">{t('h2_1')}</h2>}
      {t.has('p3') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p3')}</p>}
      {t.has('p4') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p4')}</p>}
      {t.has('btn2') && (
        <div className="mb-8">
          <a href="https://www.isaberg.com/sv/aktiviteter/cykla/" target="_blank" rel="noopener noreferrer" className="inline-block bg-stone-200 text-stone-800 hover:bg-stone-300 px-6 py-3 rounded transition">{t('btn2')}</a>
        </div>
      )}
      {t.has('h2_2') && <h2 className="text-3xl font-serif mt-12 mb-6 text-stone-800">{t('h2_2')}</h2>}
      {t.has('p5') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p5')}</p>}
      {t.has('btn3') && (
        <div className="mb-8">
          <a href="https://www.isaberg.com/sv/skidakning/" target="_blank" rel="noopener noreferrer" className="inline-block bg-stone-200 text-stone-800 hover:bg-stone-300 px-6 py-3 rounded transition">{t('btn3')}</a>
        </div>
      )}
      {t.has('btn4') && (
        <div className="mb-8">
          <Link href="/kontakt-bokning" className="inline-block bg-brand-primary text-white hover:bg-opacity-90 px-6 py-3 rounded transition">{t('btn4')}</Link>
        </div>
      )}
    </div>
  );
}
