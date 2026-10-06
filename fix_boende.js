const fs = require('fs');

const pages = {
  'boende-nara-isaberg': {
    namespace: 'BoendeNaraIsaberg',
    keys: ["h1","p1","btn1","p2","h2_1","p3","p4","btn2","h2_2","p5","btn3","btn4"],
    links: {
      btn1: '/vara-boenden',
      btn2: 'https://www.isaberg.com/sv/aktiviteter/cykla/',
      btn3: 'https://www.isaberg.com/sv/skidakning/',
      btn4: '/kontakt-bokning'
    }
  },
  'boende-nara-high-chaparral': {
    namespace: 'BoendeNaraHighChaparral',
    keys: ["h1","p1","btn1","h2_1","p2","p3","h2_2","p4","btn2","btn3","btn4","btn5"],
    links: {
      btn1: '/vara-boenden',
      btn2: 'https://www.highchaparral.se/sv/biljetter/',
      btn3: 'https://www.highchaparral.se/sv/',
      btn4: '/vara-boenden/hela-lillstugan',
      btn5: '/kontakt-bokning'
    }
  },
  'boende-nara-store-mosse': {
    namespace: 'BoendeNaraStoreMosse',
    keys: ["h1","p1","h2_1","p2","p3","btn1","p4","h2_2","p5","btn2","btn3","btn4"],
    links: {
      btn1: 'https://www.sverigesnationalparker.se/park/store-mosse-nationalpark/besoksinformation/leder/',
      btn2: 'https://www.sverigesnationalparker.se/park/store-mosse-nationalpark/besoksinformation/tillganglighet/',
      btn3: '/vara-boenden',
      btn4: '/kontakt-bokning'
    }
  },
  'boende-nara-anderstorp': {
    namespace: 'BoendeNaraAnderstorp',
    keys: ["h1","p1","btn1","h2_1","p2","h2_2","p3","btn2","h2_3","p4","p5","btn3","btn4"],
    links: {
      btn1: '/vara-boenden',
      btn2: 'https://anderstorpraceway.com/',
      btn3: 'https://www.scandinaviankartway.se/',
      btn4: '/kontakt-bokning'
    }
  },
  'boende-nara-gnosjo': {
    namespace: 'BoendeNaraGnosjo',
    keys: ["h1","p1","h2_1","p2","p3","h2_2","p4","btn1","h2_3","p5","btn2","h2_out","p_out1","p_out2","btn3","btn4","btn5"],
    links: {
      btn1: 'https://www.visitgnosjo.se/gora/kultur-historia/tollstorps-industrimuseum',
      btn2: 'https://www.gnosjo.se/uppleva-och-gora/kultur/tretton-kulturparlor-i-gnosjo-kommun',
      btn3: '/om-kampabo',
      btn4: '/vara-boenden',
      btn5: '/kontakt-bokning'
    }
  }
};

for (const [folder, data] of Object.entries(pages)) {
  const file = `src/app/[locale]/${folder}/page.tsx`;
  
  let elements = data.keys.map(k => {
    if (k === 'h1') return `      <h1 className="text-4xl md:text-5xl font-serif mb-8 text-stone-900">{t('${k}')}</h1>`;
    if (k.startsWith('h2')) return `      {t.has('${k}') && <h2 className="text-3xl font-serif mt-12 mb-6 text-stone-800">{t('${k}')}</h2>}`;
    if (k.startsWith('p')) return `      {t.has('${k}') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('${k}')}</p>}`;
    if (k.startsWith('btn')) {
      const link = data.links[k];
      const isExt = link.startsWith('http');
      const linkTag = isExt ? `<a href="${link}" target="_blank" rel="noopener noreferrer"` : `<Link href="${link}"`;
      const endTag = isExt ? `</a>` : `</Link>`;
      let colorClass = 'bg-brand-primary text-white hover:bg-opacity-90';
      if (k !== 'btn1' && k !== 'btn4' && k !== 'btn5') {
        colorClass = 'bg-stone-200 text-stone-800 hover:bg-stone-300';
      }
      return `      {t.has('${k}') && (
        <div className="mb-8">
          ${linkTag} className="inline-block ${colorClass} px-6 py-3 rounded transition">{t('${k}')}${endTag}
        </div>
      )}`;
    }
    return '';
  }).join('\n');

  const content = `import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '${data.namespace}' });
  return {
    title: t('title'),
    description: t('meta'),
  };
}

export default function ${data.namespace}Page() {
  const t = useTranslations('${data.namespace}');

  return (
    <div className="container mx-auto px-4 pb-12 max-w-4xl pt-24">
${elements}
    </div>
  );
}
`;

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated', file);
}
