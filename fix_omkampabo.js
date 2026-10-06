const fs = require('fs');

const file = `src/app/[locale]/om-kampabo/page.tsx`;
let content = fs.readFileSync(file, 'utf8');

const keys = ["h1","p1","p2","h2_1","p3","p4","btn1","p5","btn2"];
const links = {
  btn1: '/boende-nara-gnosjo',
  btn2: '/vara-boenden'
};

let elements = keys.map(k => {
  if (k === 'h1') return `      <h1 className="text-4xl md:text-5xl font-serif mb-8 text-stone-900">{t('${k}')}</h1>`;
  if (k.startsWith('h2')) return `      {t.has('${k}') && <h2 className="text-3xl font-serif mt-12 mb-6 text-stone-800">{t('${k}')}</h2>}`;
  if (k.startsWith('p')) return `      {t.has('${k}') && <p className="text-lg text-stone-700 leading-relaxed mb-6 whitespace-pre-line">{t('${k}')}</p>}`;
  if (k.startsWith('btn')) {
    const link = links[k];
    const linkTag = `<Link href="${link}"`;
    const endTag = `</Link>`;
    let colorClass = 'bg-brand-primary text-white hover:bg-opacity-90';
    if (k === 'btn2') colorClass = 'bg-stone-200 text-stone-800 hover:bg-stone-300';
    return `      {t.has('${k}') && (
        <div className="mb-8">
          ${linkTag} className="inline-block ${colorClass} px-6 py-3 rounded transition">{t('${k}')}${endTag}
        </div>
      )}`;
  }
  return '';
});

// We want to insert the grid after p2.
elements.splice(3, 0, `      <div className="grid md:grid-cols-2 gap-6 my-12">
        {farm && (
          <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl shadow-xl">
            <Image
              src={farm.src}
              alt={getAlt(farm)}
              fill
              sizes="(max-width: 896px) 100vw, 440px"
              placeholder="empty"
              className="object-cover"
              style={{ objectPosition: '50% 30%' }}
            />
          </figure>
        )}
        {boat && (
          <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl shadow-xl">
            <Image
              src={boat.src}
              alt={getAlt(boat)}
              fill
              sizes="(max-width: 896px) 100vw, 440px"
              placeholder="empty"
              className="object-cover"
              style={{ objectPosition: '50% 50%' }}
            />
          </figure>
        )}
      </div>`);

// Add the gallery at the end
elements.push(`      <section className="mt-20">
        <PhotoGallery photos={mergedPhotos.utomhus.filter(p => (!boat || p.id !== boat.id))} initialCount={6} />
      </section>`);

const jsx = elements.join('\n');

const newContent = content.replace(/<div className="container mx-auto px-4 py-24 max-w-4xl pt-32">([\s\S]*?)<\/div>/, `<div className="container mx-auto px-4 py-24 max-w-4xl pt-32">\n${jsx}\n    </div>`);

fs.writeFileSync(file, newContent, 'utf8');
console.log('Updated', file);
