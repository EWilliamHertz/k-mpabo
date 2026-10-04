import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AttGora' });
  return {
    title: t('title'),
    description: t('meta'),
  };
}

export default function AttGoraPage() {
  const t = useTranslations('AttGora');

  const destinations = [
    {
      title: t('h2_1'),
      desc: t('p3'),
      btn: t('btn1'),
      href: '/boende-nara-isaberg',
      img: '/images/isaberg-real.jpg'
    },
    {
      title: t('h2_2'),
      desc: t('p4'),
      btn: t('btn2'),
      href: '/boende-nara-high-chaparral',
      img: '/images/high-chaparral-real.jpg'
    },
    {
      title: t('h2_3'),
      desc: t('p5'),
      btn: t('btn3'),
      href: '/boende-nara-store-mosse',
      img: '/images/store-mosse-real.jpg'
    },
    {
      title: t('h2_4'),
      desc: t('p6'),
      btn: t('btn4'),
      href: '/boende-nara-anderstorp',
      img: '/images/anderstorp-real.jpg'
    },
    {
      title: t('h2_5'),
      desc: t('p7'),
      btn: t('btn5'),
      href: '/boende-nara-gnosjo',
      img: '/images/nature.jpg' // Generic fallback since we don't have gnosjo-real.jpg
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl pt-32">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif mb-8 text-stone-900">{t('h1')}</h1>
        {t.has('p1') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p1')}</p>}
        {t.has('p2') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('p2')}</p>}
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {destinations.map((dest, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="relative h-56 w-full">
              <Image src={dest.img} alt={dest.title} fill className="object-cover" />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h2 className="text-2xl font-serif mb-4 text-stone-900">{dest.title}</h2>
              <p className="text-stone-600 leading-relaxed mb-8 whitespace-pre-line flex-grow">{dest.desc}</p>
              <Link 
                href={dest.href as any} 
                className="inline-flex items-center justify-between bg-stone-50 border border-stone-200 text-stone-800 px-6 py-3 rounded-xl hover:bg-stone-100 transition-colors font-medium group"
              >
                {dest.btn}
                <ArrowRight size={18} className="text-brand-primary group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto bg-stone-50 rounded-3xl p-8 md:p-12 text-center border border-stone-200">
        {t.has('h2_6') && <h2 className="text-3xl font-serif mb-8 text-stone-900">{t('h2_6')}</h2>}
        
        <div className="grid md:grid-cols-2 gap-8 text-left mb-12">
          <div className="flex flex-col">
            {t.has('p8') && <p className="text-stone-700 leading-relaxed mb-6 whitespace-pre-line flex-grow">{t('p8')}</p>}
            <div>
              {t.has('btn6') && (
                <a href="https://vandalorum.se" target="_blank" rel="noopener noreferrer" className="text-brand-primary font-medium hover:underline inline-flex items-center gap-2">
                  {t('btn6')} <ArrowRight size={16} />
                </a>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            {t.has('p9') && <p className="text-stone-700 leading-relaxed mb-6 whitespace-pre-line flex-grow">{t('p9')}</p>}
            <div>
              {t.has('btn7') && (
                <a href="https://gekas.se" target="_blank" rel="noopener noreferrer" className="text-brand-primary font-medium hover:underline inline-flex items-center gap-2">
                  {t('btn7')} <ArrowRight size={16} />
                </a>
              )}
            </div>
          </div>
        </div>

        {t.has('btn8') && (
          <div className="pt-8 border-t border-stone-200">
            <Link href="/vara-boenden" className="inline-block bg-brand-primary text-white px-8 py-4 rounded-full font-medium hover:bg-opacity-90 transition shadow-sm">
              {t('btn8')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
