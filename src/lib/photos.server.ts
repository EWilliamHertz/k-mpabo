
import { propertyPhotos, PhotoCategory, Photo } from './photos';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getMergedPhotos(): Promise<Record<PhotoCategory, Photo[]>> {
  const dynamicImages = await prisma.siteImage.findMany();
  
  const merged: Record<PhotoCategory, Photo[]> = {
    utomhus: [...propertyPhotos.utomhus],
    uppe: [...propertyPhotos.uppe],
    nere: [...propertyPhotos.nere],
  };
  
  for (const img of dynamicImages) {
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
      });
    }
  }
  return merged;
}
