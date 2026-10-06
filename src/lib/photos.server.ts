import { PrismaClient } from '@prisma/client';
import { Photo, PhotoCategory } from './photos';

const prisma = new PrismaClient();

export async function getMergedPhotos(): Promise<Record<PhotoCategory, Photo[]>> {
  const images = await prisma.siteImage.findMany({ orderBy: { createdAt: 'asc' } });
  
  const merged: Record<PhotoCategory, Photo[]> = {
    utomhus: [],
    uppe: [],
    nere: [],
    annan: []
  };
  
  for (const img of images) {
    const cat = img.category as PhotoCategory;
    if (merged[cat]) {
      merged[cat].push({
        id: img.id,
        category: cat,
        src: img.url,
        width: 1200,
        height: 800,
        blurDataURL: img.url,
        dynamicAltSv: img.altSv,
        dynamicAltEn: img.altEn,
        dynamicAltDe: img.altDe,
        isHero: img.isHero,
        isCover: img.isCover,
      });
    }
  }
  return merged;
}

export function getPhoto(merged: Record<PhotoCategory, Photo[]>, category: PhotoCategory, filenameKeyword: string) {
  return merged[category]?.find(p => p.src.includes(filenameKeyword)) || merged[category]?.[0];
}

export function getAlt(photo: Photo | null | undefined, locale: string, fallbackText: string = 'Bild på Kämpabo') {
  if (!photo) return fallbackText;
  if (locale === 'sv' && photo.dynamicAltSv) return photo.dynamicAltSv;
  if (locale === 'en' && photo.dynamicAltEn) return photo.dynamicAltEn;
  if (locale === 'de' && photo.dynamicAltDe) return photo.dynamicAltDe;
  return photo.dynamicAltSv || fallbackText;
}

export async function getAccommodationCovers() {
  const merged = await getMergedPhotos();
  
  const getCover = (cat: PhotoCategory, keyword: string) => {
    return merged[cat].find(p => p.isCover) || getPhoto(merged, cat, keyword) || merged[cat]?.[0];
  };
  
  return {
    uppe: { photo: getCover('uppe', 'vardagsrum'), position: '50% 60%' },
    nere: { photo: getCover('nere', 'vardagsrum'), position: '50% 55%' },
    hela: { photo: getCover('utomhus', 'uppfart-sommar'), position: '50% 55%' },
  };
}

export async function getHeroSlides() {
  const merged = await getMergedPhotos();
  
  const allHero = Object.values(merged).flat().filter(p => p.isHero).map(photo => ({ photo, position: '50% 50%' }));
  
  if (allHero.length > 0) return allHero;
  
  // Fallback
  return [
    { photo: getPhoto(merged, 'utomhus', 'gard-vallmo'), position: '50% 30%' },
    { photo: getPhoto(merged, 'utomhus', 'uppfart-sommar'), position: '50% 55%' },
    { photo: getPhoto(merged, 'utomhus', 'roddbat-sjon'), position: '50% 60%' },
    { photo: getPhoto(merged, 'utomhus', 'vinter-hus'), position: '50% 40%' },
    { photo: getPhoto(merged, 'utomhus', 'hus-over-faltet'), position: '50% 25%' },
  ].filter(s => s.photo);
}
