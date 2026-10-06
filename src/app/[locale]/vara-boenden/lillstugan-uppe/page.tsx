export const dynamic = 'force-dynamic';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import PhotoHero from '@/components/PhotoHero';
import PhotoGallery from '@/components/PhotoGallery';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';

import { getMergedPhotos, getAccommodationCovers } from '@/lib/photos.server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LillstuganUppe' });
  return {
    title: t('title'),
    description: t('meta'),
  };
}

export default async function LillstuganUppePage() {
  const t = await getTranslations('LillstuganUppe');
  const tg = await getTranslations('Gallery');
  const mergedPhotos = await getMergedPhotos();
  const accommodationCovers = await getAccommodationCovers();
  const cover = accommodationCovers.uppe;

  return (
    <div className="pb-24">
      <PhotoHero photo={cover.photo} position={cover.position} title={t('h1')} eyebrow={tg('uppe')} />

      <div className="container mx-auto px-4 max-w-3xl mt-16 text-center">
        {t.has('p1') && <p className="text-lg md:text-xl text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p1')}</p>}
        {t.has('p2') && <p className="text-lg text-stone-600 leading-relaxed mb-10 whitespace-pre-line">{t('p2')}</p>}

        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {t.has('btn1') && (
            <Link href="/vara-boenden/hela-lillstugan" className="inline-flex justify-center items-center gap-2 bg-stone-100 text-stone-800 px-6 py-4 rounded-xl hover:bg-stone-200 transition-colors font-medium">
              {t('btn1')}
            </Link>
          )}
          {t.has('btn2') && (
            <Link href="/kontakt-bokning" className="inline-flex justify-center items-center gap-2 bg-brand-primary text-white px-6 py-4 rounded-xl hover:bg-opacity-90 transition-colors font-medium shadow-sm">
              {t('btn2')} <ArrowRight size={18} />
            </Link>
          )}
        </div>
        
        {t.has('p3') && (
          <div className="bg-stone-50 border border-stone-100 p-6 rounded-xl inline-block mt-4">
             <p className="text-stone-600 leading-relaxed whitespace-pre-line">{t('p3')}</p>
          </div>
        )}
        
      </div>

      <section className="container mx-auto px-4 max-w-6xl mt-20">
        <AvailabilityCalendar accommodation="lilla" />
      </section>

      <section className="container mx-auto px-4 max-w-6xl mt-20">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-10 text-stone-900">{tg('uppeTitle')}</h2>
        <PhotoGallery photos={mergedPhotos.uppe} />
      </section>

      <section className="container mx-auto px-4 max-w-6xl mt-20">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-10 text-stone-900">{tg('utomhusTitle')}</h2>
        <PhotoGallery photos={mergedPhotos.utomhus} initialCount={6} />
      </section>
    </div>
  );
}
