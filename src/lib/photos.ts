export type PhotoCategory = 'utomhus' | 'uppe' | 'nere' | 'annan';

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
