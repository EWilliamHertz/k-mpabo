import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import HeroSection from '@/components/HeroSection';
import AnimatedActivities from '@/components/AnimatedActivities';
import PropertyShowcase from '@/components/PropertyShowcase';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';
import { getAccommodationCovers, getMergedPhotos, getPhoto, getAlt, getHeroSlides } from '@/lib/photos.server';


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Startsida' });
  return {
    title: t('title'),
    description: t('meta'),
  };
}

export default async function StartsidaPage({ params }: any) {
  const t = await getTranslations('Startsida');
  const tg = await getTranslations('Gallery');
  const ta = await getTranslations('Availability');

  const mergedPhotos = await getMergedPhotos();
  const accommodationCovers = await getAccommodationCovers();
  const heroSlides = await getHeroSlides();
  const lake = getPhoto(mergedPhotos, 'utomhus', 'rodd-sjon');
  const uppe = accommodationCovers.uppe;
  const nere = accommodationCovers.nere;
  const locale = (await params).locale;

  return (
    <div className="flex flex-col">
      <HeroSection slides={heroSlides} />

      {/* Intro + lake */}
      <section id="valkommen" className="scroll-mt-24 container mx-auto px-4 py-24 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-serif mb-8 text-stone-900">{t('h1')}</h1>
            {t.has('p1') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p1')}</p>}
            {t.has('p2') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p2')}</p>}
            {t.has('p4') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p4')}</p>}
            {t.has('btn2') && (
              <Link href="/om-kampabo" className="inline-block bg-stone-200 text-stone-800 px-6 py-3 rounded hover:bg-stone-300 transition">{t('btn2')}</Link>
            )}
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-xl">
            <Image
              src={lake.src}
              alt={getAlt(lake, locale)}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={lake.blurDataURL}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Accommodations teaser */}
      <section className="bg-brand-primary text-white py-24">
        <div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
            {[uppe, nere].map(({ photo, position }, i) => (
              <div key={photo.src} className={`relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg ${i === 1 ? 'mt-12' : ''}`}>
                <Image
                  src={photo.src}
                  alt={getAlt(photo, locale)}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  placeholder="blur"
                  blurDataURL={photo.blurDataURL}
                  className="object-cover"
                  style={{ objectPosition: position }}
                />
              </div>
            ))}
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            {t.has('h2_1') && <h2 className="text-3xl md:text-4xl font-serif mb-6">{t('h2_1')}</h2>}
            {t.has('p3') && <p className="text-lg text-white/85 leading-relaxed mb-8 whitespace-pre-line">{t('p3')}</p>}
            {t.has('btn1') && (
              <Link href="/vara-boenden" className="inline-block bg-white text-brand-primary px-8 py-4 rounded-full font-medium hover:bg-stone-100 transition">{t('btn1')}</Link>
            )}
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section id="bilder" className="scroll-mt-24 py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-stone-900">{tg('title')}</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">{tg('subtitle')}</p>
          </div>
          <PropertyShowcase photosData={mergedPhotos} />
        </div>
      </section>

      {/* Activities */}
      <section className="container mx-auto px-4 pb-24 max-w-4xl text-center">
        {t.has('h2_2') && <h2 className="text-3xl font-serif mt-12 mb-6 text-stone-800">{t('h2_2')}</h2>}
        {t.has('p5') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p5')}</p>}

        <AnimatedActivities />

        {t.has('btn3') && (
          <div className="mt-8 mb-4">
            <Link href="/att-gora" className="inline-block bg-brand-primary text-white px-6 py-3 rounded hover:bg-opacity-90 transition">{t('btn3')}</Link>
          </div>
        )}
      </section>

      {/* Availability Calendar Section */}
      <section className="bg-stone-50 py-24">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6 text-stone-900">{ta('title')}</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-12">
            {ta('intro')}
          </p>
          <AvailabilityCalendar />
          
          {t.has('btn4') && (
            <div className="mt-12">
              <Link href="/kontakt-bokning" className="inline-block bg-stone-900 text-white px-8 py-4 rounded-full font-medium hover:bg-stone-800 transition shadow-lg">{t('btn4')}</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
