'use client';

import { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isWithinInterval, startOfDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Booking = {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
};

export default function AvailabilityCalendar({ accommodation }: { accommodation?: 'stora' | 'lilla' }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(accommodation ? `/api/bookings?accommodation=${accommodation}` : '/api/bookings')
      .then(res => res.json())
      .then(data => {
        setBookings(data.bookings || []);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching bookings', err);
        setIsLoading(false);
      });
  }, [accommodation]);

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const isDateBooked = (date: Date) => {
    return bookings.some(booking => {
      const start = startOfDay(new Date(booking.startDate));
      const end = startOfDay(new Date(booking.endDate));
      return isWithinInterval(startOfDay(date), { start, end });
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-stone-100 transition-all">
      <div className="flex justify-between items-center mb-6">
        <button onClick={prevMonth} className="p-2 hover:bg-stone-100 rounded-full transition-colors" aria-label="Previous month">
          <ChevronLeft className="w-5 h-5 text-stone-600" />
        </button>
        <h2 className="text-xl font-medium text-stone-800 tracking-wide">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button onClick={nextMonth} className="p-2 hover:bg-stone-100 rounded-full transition-colors" aria-label="Next month">
          <ChevronRight className="w-5 h-5 text-stone-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs font-semibold uppercase tracking-wider text-stone-400 py-2">
            {day.charAt(0)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: monthStart.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} className="p-2" />
        ))}
        
        {daysInMonth.map(date => {
          const booked = isDateBooked(date);
          const today = isToday(date);
          const past = startOfDay(date) < startOfDay(new Date());

          return (
            <div
              key={date.toISOString()}
              className={`
                aspect-square flex items-center justify-center rounded-xl text-sm transition-all duration-200
                ${!isSameMonth(date, currentMonth) ? 'hidden' : ''}
                ${booked 
                  ? 'bg-red-50 text-red-400 font-medium cursor-not-allowed shadow-inner' 
                  : 'hover:bg-stone-800 hover:text-white hover:shadow-md cursor-pointer bg-white'}
                ${today && !booked ? 'ring-2 ring-stone-800 ring-offset-2' : ''}
                ${past && !booked ? 'text-stone-300 hover:bg-stone-50 hover:text-stone-400' : (!booked ? 'text-stone-700' : '')}
                ${isLoading ? 'animate-pulse bg-stone-100 text-transparent' : ''}
              `}
              title={booked ? 'Booked' : 'Available'}
            >
              {format(date, 'd')}
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 flex gap-6 justify-center text-sm border-t border-stone-100 pt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white border border-stone-300 shadow-sm"></div>
          <span className="text-stone-500 font-medium">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-50 border border-red-100 shadow-inner"></div>
          <span className="text-stone-500 font-medium">Booked</span>
        </div>
      </div>
    </div>
  );
}
