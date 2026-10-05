import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BoendeNaraGnosjo' });
  return {
    title: t('title'),
    description: t('meta'),
  };
}

export default function BoendeNaraGnosjoPage() {
  const t = useTranslations('BoendeNaraGnosjo');

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl pt-32">
      <h1 className="text-4xl md:text-5xl font-serif mb-8 text-stone-900">{t('h1')}</h1>
      
      {t.has('p1') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p1')}</p>}
      {t.has('p2') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p2')}</p>}
      
      {t.has('btn1') && (
        <div className="mb-8">
          <Link href="/vara-boenden" className="inline-block bg-brand-primary text-white px-6 py-3 rounded hover:bg-opacity-90 transition">{t('btn1')}</Link>
        </div>
      )}

      {t.has('h2_out') && <h2 className="text-3xl font-serif mt-12 mb-6 text-stone-800">{t('h2_out')}</h2>}
      {t.has('p_out1') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p_out1')}</p>}
      {t.has('p_out2') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p_out2')}</p>}

      {t.has('h2_1') && <h2 className="text-3xl font-serif mt-12 mb-6 text-stone-800">{t('h2_1')}</h2>}
      {t.has('p3') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p3')}</p>}
      {t.has('p4') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p4')}</p>}

      {t.has('btn2') && (
        <div className="mb-8">
          <Link href="/om-kampabo" className="inline-block bg-stone-200 text-stone-800 px-6 py-3 rounded hover:bg-stone-300 transition">{t('btn2')}</Link>
        </div>
      )}

      {t.has('h2_2') && <h2 className="text-3xl font-serif mt-12 mb-6 text-stone-800">{t('h2_2')}</h2>}
      {t.has('p5') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p5')}</p>}
      {t.has('p6') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p6')}</p>}

      {t.has('btn3') && (
        <div className="mb-8">
          <Link href="/att-gora" className="inline-block bg-brand-primary text-white px-6 py-3 rounded hover:bg-opacity-90 transition">{t('btn3')}</Link>
        </div>
      )}

      {t.has('h2_3') && <h2 className="text-3xl font-serif mt-12 mb-6 text-stone-800">{t('h2_3')}</h2>}
      {t.has('p7') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p7')}</p>}
      {t.has('p8') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p8')}</p>}

      {t.has('btn4') && (
        <div className="mb-8">
          <Link href="/kontakt-bokning" className="inline-block bg-brand-primary text-white px-6 py-3 rounded hover:bg-opacity-90 transition">{t('btn4')}</Link>
        </div>
      )}
      
      {t.has('h2_4') && <h2 className="text-3xl font-serif mt-12 mb-6 text-stone-800">{t('h2_4')}</h2>}
      {t.has('h2_5') && <h2 className="text-3xl font-serif mt-12 mb-6 text-stone-800">{t('h2_5')}</h2>}
      {t.has('h2_6') && <h2 className="text-3xl font-serif mt-12 mb-6 text-stone-800">{t('h2_6')}</h2>}

      {t.has('p9') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p9')}</p>}

      
    </div>
  );
}
