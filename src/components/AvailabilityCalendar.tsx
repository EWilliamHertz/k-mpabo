'use client';

import { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, startOfDay, startOfWeek, addDays } from 'date-fns';
import { sv, enGB, de } from 'date-fns/locale';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Booking = {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  accommodation: 'stora' | 'lilla' | null;
};

type View = 'all' | 'stora' | 'lilla';

export default function AvailabilityCalendar({ accommodation }: { accommodation?: 'stora' | 'lilla' }) {
  const t = useTranslations('Availability');
  const locale = useLocale();
  const dfLocale = locale === 'sv' ? sv : locale === 'de' ? de : enGB;
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<View>(accommodation ?? 'all');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => {
        setBookings(data.bookings || []);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching bookings', err);
        setIsLoading(false);
      });
  }, []);

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // A booking without an accommodation blocks both units
  const isUnitBooked = (date: Date, unit: 'stora' | 'lilla') => {
    return bookings.filter(b => !b.accommodation || b.accommodation === unit).some(booking => {
      const start = startOfDay(new Date(booking.startDate));
      const end = startOfDay(new Date(booking.endDate));
      // iCal end dates are exclusive (check-out day), so the check-out day stays available
      const day = startOfDay(date);
      return day >= start && day < end;
    });
  };

  // 'both' = every unit booked, 'partial' = only one unit booked (all-view only)
  const getStatus = (date: Date): 'free' | 'partial' | 'both' => {
    if (view === 'stora' || view === 'lilla') return isUnitBooked(date, view) ? 'both' : 'free';
    const s = isUnitBooked(date, 'stora');
    const l = isUnitBooked(date, 'lilla');
    return s && l ? 'both' : s || l ? 'partial' : 'free';
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-stone-100 transition-all">
      {!accommodation && (
        <div className="flex gap-1 p-1 mb-6 bg-stone-100 rounded-full text-sm" role="tablist">
          {(['all', 'stora', 'lilla'] as View[]).map(v => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={`flex-1 px-3 py-2 rounded-full font-medium transition-colors ${view === v ? 'bg-stone-800 text-white shadow' : 'text-stone-600 hover:bg-stone-200'}`}
            >
              {t(`view_${v}`)}
            </button>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <button onClick={prevMonth} className="p-2 hover:bg-stone-100 rounded-full transition-colors" aria-label={t('prev')}>
          <ChevronLeft className="w-5 h-5 text-stone-600" />
        </button>
        <h2 className="text-xl font-medium text-stone-800 tracking-wide">
          {format(currentMonth, 'LLLL yyyy', { locale: dfLocale })}
        </h2>
        <button onClick={nextMonth} className="p-2 hover:bg-stone-100 rounded-full transition-colors" aria-label={t('next')}>
          <ChevronRight className="w-5 h-5 text-stone-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {Array.from({ length: 7 }).map((_, i) => format(addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), i), 'EEEEE', { locale: dfLocale })).map((day, i) => (
          <div key={i} className="text-center text-xs font-semibold uppercase tracking-wider text-stone-400 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: (monthStart.getDay() + 6) % 7 }).map((_, i) => (
          <div key={`empty-${i}`} className="p-2" />
        ))}
        
        {daysInMonth.map(date => {
          const status = getStatus(date);
          const booked = status !== 'free';
          const today = isToday(date);
          const past = startOfDay(date) < startOfDay(new Date());

          return (
            <div
              key={date.toISOString()}
              className={`
                aspect-square flex items-center justify-center rounded-xl text-sm transition-all duration-200
                ${!isSameMonth(date, currentMonth) ? 'hidden' : ''}
                ${status === 'both'
                  ? 'bg-red-50 text-red-400 font-medium cursor-not-allowed shadow-inner'
                  : status === 'partial'
                  ? 'bg-amber-50 text-amber-600 font-medium shadow-inner'
                  : 'hover:bg-stone-800 hover:text-white hover:shadow-md cursor-pointer bg-white'}
                ${today && !booked ? 'ring-2 ring-stone-800 ring-offset-2' : ''}
                ${past && !booked ? 'text-stone-300 hover:bg-stone-50 hover:text-stone-400' : (!booked ? 'text-stone-700' : '')}
                ${isLoading ? 'animate-pulse bg-stone-100 text-transparent' : ''}
              `}
              title={status === 'both' ? t('booked') : status === 'partial' ? t('partial') : t('available')}
            >
              {format(date, 'd')}
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 justify-center text-sm border-t border-stone-100 pt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white border border-stone-300 shadow-sm"></div>
          <span className="text-stone-500 font-medium">{t('available')}</span>
        </div>
        {view === 'all' && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-50 border border-amber-200 shadow-inner"></div>
            <span className="text-stone-500 font-medium">{t('partial')}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-50 border border-red-100 shadow-inner"></div>
          <span className="text-stone-500 font-medium">{t('booked')}</span>
        </div>
      </div>
    </div>
  );
}
