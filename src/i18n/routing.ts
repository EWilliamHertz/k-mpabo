import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['sv', 'en', 'de'],
  defaultLocale: 'sv',
  // Pathnames for SEO localization
  pathnames: {
    '/': '/',
    '/boende': {
      sv: '/boende',
      en: '/accommodation',
      de: '/unterkunft'
    },
    '/boende/mindre': {
      sv: '/boende/mindre',
      en: '/accommodation/small',
      de: '/unterkunft/klein'
    },
    '/boende/storre': {
      sv: '/boende/storre',
      en: '/accommodation/large',
      de: '/unterkunft/gross'
    },
    '/boende/bada': {
      sv: '/boende/bada',
      en: '/accommodation/both',
      de: '/unterkunft/beide'
    },
    '/garden': {
      sv: '/garden',
      en: '/the-farm',
      de: '/der-hof'
    },
    '/att-gora': {
      sv: '/att-gora',
      en: '/things-to-do',
      de: '/aktivitaten'
    },
    '/att-gora/isaberg': {
      sv: '/att-gora/isaberg',
      en: '/things-to-do/isaberg',
      de: '/aktivitaten/isaberg'
    },
    '/att-gora/high-chaparral': {
      sv: '/att-gora/high-chaparral',
      en: '/things-to-do/high-chaparral',
      de: '/aktivitaten/high-chaparral'
    },
    '/att-gora/store-mosse': {
      sv: '/att-gora/store-mosse',
      en: '/things-to-do/store-mosse',
      de: '/aktivitaten/store-mosse'
    },
    '/att-gora/anderstorp': {
      sv: '/att-gora/anderstorp',
      en: '/things-to-do/anderstorp',
      de: '/aktivitaten/anderstorp'
    },
    '/kontakt': {
      sv: '/kontakt',
      en: '/contact',
      de: '/kontakt'
    }
  }
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);
