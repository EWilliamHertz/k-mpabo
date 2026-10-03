import { getGuestbookEntries } from '@/actions/guestbook';
import GuestbookSection from '@/components/GuestbookSection';

export default async function GastbokPage() {
  const entries = await getGuestbookEntries();

  return (
    <div className="pt-8">
      <GuestbookSection entries={entries} />
    </div>
  );
}
