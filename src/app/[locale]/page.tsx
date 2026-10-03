import HeroSection from '@/components/HeroSection';
import AnimatedActivities from '@/components/AnimatedActivities';
import GuestbookSection from '@/components/GuestbookSection';
import { getGuestbookEntries } from '@/actions/guestbook';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

export default async function Home() {
  const entries = await getGuestbookEntries();

  return (
    <div className="flex flex-col">
      <HeroSection />

      <section className="py-24 container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl font-serif mb-6">En naturnära upplevelse</h2>
        <p className="text-lg text-stone-600 leading-relaxed mb-12">
          Välkommen till vår gård i hjärtat av de småländska skogarna. Här kan du koppla av, 
          njuta av naturens lugn och bo bekvämt i moderna, välutrustade boenden med hög standard.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/boende/mindre" className="group block overflow-hidden rounded-xl">
            <div className="relative h-64 w-full">
              <Image src="/images/small.jpg" alt="Small cabin" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-6 bg-white shadow-sm text-left">
              <h3 className="text-xl font-semibold mb-2">Mindre Boendet</h3>
              <p className="text-stone-500">Perfekt för den lilla familjen. 4 bäddar.</p>
            </div>
          </Link>
          <Link href="/boende/storre" className="group block overflow-hidden rounded-xl">
            <div className="relative h-64 w-full">
              <Image src="/images/large.jpg" alt="Large villa" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-6 bg-white shadow-sm text-left">
              <h3 className="text-xl font-semibold mb-2">Större Boendet</h3>
              <p className="text-stone-500">Rymligt och ljust. 8 bäddar.</p>
            </div>
          </Link>
        </div>
      </section>

      <AnimatedActivities />
      
      <GuestbookSection entries={entries} />
    </div>
  );
}
