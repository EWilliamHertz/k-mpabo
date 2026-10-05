import { getTranslations } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import PhotoHero from '@/components/PhotoHero';
import PropertyShowcase from '@/components/PropertyShowcase';
import { accommodationCovers } from '@/lib/photos';
import { getMergedPhotos } from '@/lib/photos.server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HelaLillstugan' });
  return {
    title: t('title'),
    description: t('meta'),
  };
}

export default async function HelaLillstuganPage() {
  const t = await getTranslations('HelaLillstugan');
  const tg = await getTranslations('Gallery');
  const cover = accommodationCovers.hela;
  const mergedPhotos = await getMergedPhotos();

  return (
    <div className="pb-24">
      <PhotoHero photo={cover.photo} position={cover.position} title={t('h1')} eyebrow={tg('hela')} />

      <div className="container mx-auto px-4 max-w-3xl mt-16 text-center">
        {t.has('p1') && <p className="text-lg md:text-xl text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p1')}</p>}
        {t.has('p2') && <p className="text-lg text-stone-600 leading-relaxed mb-10 whitespace-pre-line">{t('p2')}</p>}

        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {t.has('btn1') && (
            <Link href="/vara-boenden/lillstugan-uppe" className="inline-flex justify-center items-center gap-2 bg-stone-100 text-stone-800 px-6 py-4 rounded-xl hover:bg-stone-200 transition-colors font-medium">
              {t('btn1')} <ArrowRight size={18} />
            </Link>
          )}
          {t.has('btn2') && (
            <Link href="/vara-boenden/lillstugan-nere" className="inline-flex justify-center items-center gap-2 bg-stone-100 text-stone-800 px-6 py-4 rounded-xl hover:bg-stone-200 transition-colors font-medium">
              {t('btn2')} <ArrowRight size={18} />
            </Link>
          )}
        </div>
        
        <div className="bg-stone-50 border border-stone-100 p-8 rounded-2xl mb-12">
          {t.has('p3') && <p className="text-stone-600 leading-relaxed mb-6 whitespace-pre-line">{t('p3')}</p>}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {t.has('btn3') && (
              <Link href="/att-gora" className="inline-flex justify-center items-center gap-2 bg-white border border-stone-200 text-stone-800 px-6 py-3 rounded-lg hover:bg-stone-50 transition-colors font-medium">
                {t('btn3')}
              </Link>
            )}
            {t.has('btn4') && (
              <Link href="/kontakt-bokning" className="inline-flex justify-center items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors font-medium shadow-sm">
                {t('btn4')} <ArrowRight size={18} />
              </Link>
            )}
          </div>
        </div>
        
      </div>

      <section className="container mx-auto px-4 max-w-6xl mt-8">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-10 text-stone-900">{tg('title')}</h2>
        <PropertyShowcase photosData={mergedPhotos} />
      </section>
    </div>
  );
}
