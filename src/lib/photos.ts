import generated from './photos.generated.json';

/**
 * Property photos of Kämpabo, sourced from the owners' Google Drive folders
 * (Utomhus / Uppe / Nere) and optimized by a conversion script into
 * /public/images/kampabo. Alt texts live in messages/*.json under
 * `Gallery.alt.<category>.<id>` so they are translated per locale.
 */
export type PhotoCategory = 'utomhus' | 'uppe' | 'nere';

export type Photo = {
  id: string;
  category: PhotoCategory;
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  dynamicAltSv?: string | null;
  dynamicAltEn?: string | null;
  dynamicAltDe?: string | null;
};

type RawPhoto = Omit<Photo, 'category'>;

const withCategory = (category: PhotoCategory, list: RawPhoto[]): Photo[] =>
  list.map((p) => ({ ...p, category }));

export const propertyPhotos: Record<PhotoCategory, Photo[]> = {
  utomhus: withCategory('utomhus', generated.utomhus),
  uppe: withCategory('uppe', generated.uppe),
  nere: withCategory('nere', generated.nere),
};

export function getPhoto(category: PhotoCategory, id: string): Photo {
  const photo = propertyPhotos[category].find((p) => p.id === id);
  if (!photo) throw new Error(`Unknown photo ${category}/${id}`);
  return photo;
}

/** Key path for a photo's translated alt text within the `Gallery` namespace. */
export const altKey = (photo: Pick<Photo, 'category' | 'id'>) =>
  `alt.${photo.category}.${photo.id}` as const;

/** Hero slideshow on the start page, with focal points for landscape crops. */
export const heroSlides: { photo: Photo; position: string }[] = [
  { photo: getPhoto('utomhus', 'gard-vallmo'), position: '50% 30%' },
  { photo: getPhoto('utomhus', 'uppfart-sommar'), position: '50% 55%' },
  { photo: getPhoto('utomhus', 'roddbat-sjon'), position: '50% 60%' },
  { photo: getPhoto('utomhus', 'vinter-hus'), position: '50% 40%' },
  { photo: getPhoto('utomhus', 'hus-over-faltet'), position: '50% 25%' },
];

/** Cover image for each accommodation (cards + detail-page heroes). */
export const accommodationCovers = {
  uppe: { photo: getPhoto('uppe', 'vardagsrum'), position: '50% 60%' },
  nere: { photo: getPhoto('nere', 'vardagsrum'), position: '50% 55%' },
  hela: { photo: getPhoto('utomhus', 'uppfart-sommar'), position: '50% 55%' },
} as const;
