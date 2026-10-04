import fs from 'fs';
import path from 'path';

const pages = [
  {
    path: 'page.tsx', // Root
    key: 'Startsida',
  },
  {
    path: 'om-kampabo/page.tsx',
    key: 'OmKampabo',
  },
  {
    path: 'vara-boenden/page.tsx',
    key: 'VaraBoenden',
  },
  {
    path: 'vara-boenden/lillstugan-uppe/page.tsx',
    key: 'LillstuganUppe',
  },
  {
    path: 'vara-boenden/lillstugan-nere/page.tsx',
    key: 'LillstuganNere',
  },
  {
    path: 'vara-boenden/hela-lillstugan/page.tsx',
    key: 'HelaLillstugan',
  },
  {
    path: 'att-gora/page.tsx',
    key: 'AttGora',
  },
  {
    path: 'boende-nara-isaberg/page.tsx',
    key: 'BoendeNaraIsaberg',
  },
  {
    path: 'boende-nara-high-chaparral/page.tsx',
    key: 'BoendeNaraHighChaparral',
  },
  {
    path: 'boende-nara-store-mosse/page.tsx',
    key: 'BoendeNaraStoreMosse',
  },
  {
    path: 'boende-nara-anderstorp/page.tsx',
    key: 'BoendeNaraAnderstorp',
  },
  {
    path: 'boende-nara-gnosjo/page.tsx',
    key: 'BoendeNaraGnosjo',
  },
  {
    path: 'kontakt-bokning/page.tsx',
    key: 'KontaktBokning',
  }
];

const basePath = path.join(process.cwd(), 'src/app/[locale]');

// Clean old dirs to prevent conflicts (optional, but good for cleanup)
const dirsToRemove = ['boende', 'kontakt', 'garden'];
for (const dir of dirsToRemove) {
  const p = path.join(basePath, dir);
  if (fs.existsSync(p)) {
    fs.rmSync(p, { recursive: true, force: true });
  }
}

pages.forEach(({ path: pagePath, key }) => {
  const fullPath = path.join(basePath, pagePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });

  const isContact = key === 'KontaktBokning';

  const componentTemplate = `import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: '${key}' });
  return {
    title: t('title'),
    description: t('meta'),
  };
}

export default function ${key}Page() {
  const t = useTranslations('${key}');

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl pt-32">
      <h1 className="text-4xl md:text-5xl font-serif mb-8 text-stone-900">{t('h1')}</h1>
      
      {t.has('p1') && <p className="text-lg text-stone-700 leading-relaxed mb-6">{t('p1')}</p>}
      {t.has('p2') && <p className="text-lg text-stone-700 leading-relaxed mb-6">{t('p2')}</p>}
      
      {t.has('btn1') && (
        <div className="mb-8">
          <Link href="/vara-boenden" className="inline-block bg-brand-primary text-white px-6 py-3 rounded hover:bg-opacity-90 transition">{t('btn1')}</Link>
        </div>
      )}

      {t.has('h2_1') && <h2 className="text-3xl font-serif mt-12 mb-6 text-stone-800">{t('h2_1')}</h2>}
      {t.has('p3') && <p className="text-lg text-stone-700 leading-relaxed mb-6">{t('p3')}</p>}
      {t.has('p4') && <p className="text-lg text-stone-700 leading-relaxed mb-6">{t('p4')}</p>}

      {t.has('btn2') && (
        <div className="mb-8">
          <Link href="/om-kampabo" className="inline-block bg-stone-200 text-stone-800 px-6 py-3 rounded hover:bg-stone-300 transition">{t('btn2')}</Link>
        </div>
      )}

      {t.has('h2_2') && <h2 className="text-3xl font-serif mt-12 mb-6 text-stone-800">{t('h2_2')}</h2>}
      {t.has('p5') && <p className="text-lg text-stone-700 leading-relaxed mb-6">{t('p5')}</p>}
      {t.has('p6') && <p className="text-lg text-stone-700 leading-relaxed mb-6">{t('p6')}</p>}

      {t.has('btn3') && (
        <div className="mb-8">
          <Link href="/att-gora" className="inline-block bg-brand-primary text-white px-6 py-3 rounded hover:bg-opacity-90 transition">{t('btn3')}</Link>
        </div>
      )}

      {t.has('h2_3') && <h2 className="text-3xl font-serif mt-12 mb-6 text-stone-800">{t('h2_3')}</h2>}
      {t.has('p7') && <p className="text-lg text-stone-700 leading-relaxed mb-6">{t('p7')}</p>}
      {t.has('p8') && <p className="text-lg text-stone-700 leading-relaxed mb-6">{t('p8')}</p>}

      {t.has('btn4') && (
        <div className="mb-8">
          <Link href="/kontakt-bokning" className="inline-block bg-brand-primary text-white px-6 py-3 rounded hover:bg-opacity-90 transition">{t('btn4')}</Link>
        </div>
      )}
      
      {t.has('h2_4') && <h2 className="text-3xl font-serif mt-12 mb-6 text-stone-800">{t('h2_4')}</h2>}
      {t.has('h2_5') && <h2 className="text-3xl font-serif mt-12 mb-6 text-stone-800">{t('h2_5')}</h2>}
      {t.has('h2_6') && <h2 className="text-3xl font-serif mt-12 mb-6 text-stone-800">{t('h2_6')}</h2>}

      {t.has('p9') && <p className="text-lg text-stone-700 leading-relaxed mb-6">{t('p9')}</p>}

      ${isContact ? `
      <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border border-stone-100">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t('name')}</label>
            <input type="text" className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-brand-primary focus:border-brand-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t('email')}</label>
            <input type="email" className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-brand-primary focus:border-brand-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t('dates')}</label>
            <input type="text" className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-brand-primary focus:border-brand-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t('guests')}</label>
            <input type="number" className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-brand-primary focus:border-brand-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">{t('message')}</label>
            <textarea rows={4} className="w-full px-4 py-2 border border-stone-300 rounded-md focus:ring-brand-primary focus:border-brand-primary"></textarea>
          </div>
          <button type="button" className="w-full bg-brand-primary text-white py-3 px-4 rounded-md hover:bg-opacity-90 transition font-medium">
            {t('btn1')}
          </button>
        </form>
      </div>` : ''}
    </div>
  );
}
`;

  fs.writeFileSync(fullPath, componentTemplate);
});

console.log("Pages generated successfully.");
