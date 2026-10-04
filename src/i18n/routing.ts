import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['sv', 'en', 'de'],
  defaultLocale: 'sv',
  // Pathnames for SEO localization
  pathnames: {
    '/': '/',
    '/om-kampabo': {
      sv: '/om-kampabo',
      en: '/about-kampabo',
      de: '/uber-kampabo'
    },
    '/vara-boenden': {
      sv: '/vara-boenden',
      en: '/our-accommodations',
      de: '/unsere-unterkunfte'
    },
    '/vara-boenden/lillstugan-uppe': {
      sv: '/vara-boenden/lillstugan-uppe',
      en: '/our-accommodations/lillstugan-upstairs',
      de: '/unsere-unterkunfte/lillstugan-oben'
    },
    '/vara-boenden/lillstugan-nere': {
      sv: '/vara-boenden/lillstugan-nere',
      en: '/our-accommodations/lillstugan-downstairs',
      de: '/unsere-unterkunfte/lillstugan-unten'
    },
    '/vara-boenden/hela-lillstugan': {
      sv: '/vara-boenden/hela-lillstugan',
      en: '/our-accommodations/whole-lillstugan',
      de: '/unsere-unterkunfte/ganzes-lillstugan'
    },
    '/att-gora': {
      sv: '/att-gora',
      en: '/things-to-do',
      de: '/aktivitaten'
    },
    '/boende-nara-isaberg': {
      sv: '/boende-nara-isaberg',
      en: '/accommodation-near-isaberg',
      de: '/unterkunft-nahe-isaberg'
    },
    '/boende-nara-high-chaparral': {
      sv: '/boende-nara-high-chaparral',
      en: '/accommodation-near-high-chaparral',
      de: '/unterkunft-nahe-high-chaparral'
    },
    '/boende-nara-store-mosse': {
      sv: '/boende-nara-store-mosse',
      en: '/accommodation-near-store-mosse',
      de: '/unterkunft-nahe-store-mosse'
    },
    '/boende-nara-anderstorp': {
      sv: '/boende-nara-anderstorp',
      en: '/accommodation-near-anderstorp',
      de: '/unterkunft-nahe-anderstorp'
    },
    '/boende-nara-gnosjo': {
      sv: '/boende-nara-gnosjo',
      en: '/accommodation-near-gnosjo',
      de: '/unterkunft-nahe-gnosjo'
    },
    '/kontakt-bokning': {
      sv: '/kontakt-bokning',
      en: '/contact-booking',
      de: '/kontakt-buchung'
    },
    '/gastbok': {
      sv: '/gastbok',
      en: '/guestbook',
      de: '/gaestebuch'
    }
  }
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);
