import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { type Photo } from '@/lib/photos';

type Props = {
  photo: Photo;
  position?: string;
  title: string;
  eyebrow?: string;
};

/** Full-bleed photo header used on the accommodation pages. */
export default async function PhotoHero({ photo, position = '50% 50%', title, eyebrow }: Props) {
  const tg = await getTranslations('Gallery');
  
  if (!photo) {
    return (
      <div className="relative w-full h-[70vh] min-h-[460px] overflow-hidden bg-stone-900 flex items-center justify-center text-white">
        <h1>{title}</h1>
      </div>
    );
  }


  return (
    <div className="relative w-full h-[70vh] min-h-[460px] overflow-hidden bg-stone-900">
      <Image
        src={photo.src}
        alt={(photo.dynamicAltSv || 'Kämpabo')}
        fill
        sizes="100vw"
        priority
        placeholder="blur"
        blurDataURL={photo.blurDataURL}
        className="object-cover"
        style={{ objectPosition: position }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
        {eyebrow && (
          <p className="mb-4 text-xs md:text-sm uppercase tracking-[0.35em] text-white/80">{eyebrow}</p>
        )}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight drop-shadow-lg">{title}</h1>
      </div>
    </div>
  );
}
