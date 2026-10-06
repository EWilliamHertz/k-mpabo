"use client";

import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pages that open with a full-bleed photo hero, where the bar starts transparent over the image
  const heroPages = ['/vara-boenden/lillstugan-uppe', '/vara-boenden/lillstugan-nere', '/vara-boenden/hela-lillstugan'];
  const overHero = !scrolled && !isOpen && heroPages.includes(pathname);

  const links = [
    { href: '/om-kampabo', label: t('omKampabo') },
    { href: '/vara-boenden', label: t('varaBoenden') },
    { href: '/att-gora', label: t('attGora') },
    { href: '/gastbok', label: t('gastbok') },
    { href: '/kontakt-bokning', label: t('kontakt') },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'} ${overHero ? 'text-white' : ''}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold tracking-tighter">
          Kämpabo
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href as any}
              className={`text-sm tracking-wide uppercase transition-colors ${overHero ? `hover:text-white/70 ${pathname === link.href ? 'font-semibold text-white' : 'text-white/90'}` : `hover:text-stone-500 ${pathname === link.href ? 'font-semibold text-brand-primary' : 'text-stone-700'}`}`}
            >
              {link.label}
            </Link>
          ))}
          <div className={`flex gap-2 text-xs ml-4 border-l pl-4 ${overHero ? 'border-white/40' : 'border-stone-300'}`}>
            <Link href={pathname as any} locale="sv" className="hover:underline">SV</Link>
            <Link href={pathname as any} locale="en" className="hover:underline">EN</Link>
            <Link href={pathname as any} locale="de" className="hover:underline">DE</Link>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-stone-100 flex flex-col p-4 md:hidden"
          >
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href as any}
                onClick={() => setIsOpen(false)}
                className="py-3 px-4 text-lg border-b border-stone-50"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-4 py-4 px-4">
              <Link href={pathname as any} locale="sv" className="text-sm font-semibold">SV</Link>
              <Link href={pathname as any} locale="en" className="text-sm font-semibold">EN</Link>
              <Link href={pathname as any} locale="de" className="text-sm font-semibold">DE</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
