import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { accommodationCovers, altKey } from '@/lib/photos';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'VaraBoenden' });
  return {
    title: t('title'),
    description: t('meta'),
  };
}

export default function VaraBoendenPage() {
  const t = useTranslations('VaraBoenden');
  const tg = useTranslations('Gallery');

  const accommodations = [
    {
      title: t('h2_1'),
      desc: t('p2'),
      btn: t('btn1'),
      href: '/vara-boenden/lillstugan-uppe',
      cover: accommodationCovers.uppe
    },
    {
      title: t('h2_2'),
      desc: t('p3'),
      btn: t('btn2'),
      href: '/vara-boenden/lillstugan-nere',
      cover: accommodationCovers.nere
    },
    {
      title: t('h2_3'),
      desc: t('p4'),
      btn: t('btn3'),
      href: '/vara-boenden/hela-lillstugan',
      cover: accommodationCovers.hela
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl pt-32">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif mb-8 text-stone-900">{t('h1')}</h1>
        {t.has('p1') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p1')}</p>}
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-24">
        {accommodations.map((acc, idx) => (
          <div key={idx} className="group relative bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-500">
            <Link href={acc.href as any} className="relative block h-80 w-full overflow-hidden" tabIndex={-1} aria-hidden="true">
              <Image
                src={acc.cover.photo.src}
                alt={tg(altKey(acc.cover.photo))}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                placeholder="blur"
                blurDataURL={acc.cover.photo.blurDataURL}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ objectPosition: acc.cover.position }}
              />
            </Link>
            <div className="p-8 flex flex-col flex-grow">
              <h2 className="text-2xl font-serif mb-4 text-stone-900">{acc.title}</h2>
              <p className="text-stone-600 leading-relaxed mb-8 whitespace-pre-line flex-grow">{acc.desc}</p>
              <Link 
                href={acc.href as any} 
                className="inline-flex items-center justify-between bg-stone-50 border border-stone-200 text-stone-800 px-6 py-3 rounded-xl hover:bg-stone-100 transition-colors font-medium group before:absolute before:inset-0"
              >
                {acc.btn}
                <ArrowRight size={18} className="text-brand-primary group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mb-20 bg-stone-50 p-8 rounded-3xl border border-stone-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif text-stone-900 mb-2">Availability</h2>
          <p className="text-stone-600">Check dates for our accommodations</p>
        </div>
        <AvailabilityCalendar />
      </div>

      <div className="max-w-3xl mx-auto bg-brand-primary text-white rounded-3xl p-10 md:p-14 text-center shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          {t.has('p5') && <p className="text-xl md:text-2xl font-serif leading-relaxed mb-8 whitespace-pre-line">{t('p5')}</p>}
          {t.has('btn4') && (
            <Link href="/kontakt-bokning" className="inline-flex items-center gap-2 bg-white text-brand-primary px-8 py-4 rounded-full font-medium hover:bg-stone-100 transition-colors shadow-sm text-lg">
              {t('btn4')} <ArrowRight size={20} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
