import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function EventCalendar({ events = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Helper to format date string as YYYY-MM-DD for comparison
  const formatDateString = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // Build grid
  const days = [];
  // Empty slots before first day
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  // Actual days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Find today's date to highlight it
  const today = new Date();
  const isCurrentMonth = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
  const todayDate = today.getDate();

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-card border border-white/40 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-extrabold text-navy-secondary">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={prevMonth}
            className="p-1.5 rounded-md hover:bg-navy-primary/10 text-navy-secondary transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextMonth}
            className="p-1.5 rounded-md hover:bg-navy-primary/10 text-navy-secondary transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-xs font-bold text-text-muted uppercase tracking-wider py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="h-10"></div>;
          }

          const dateStr = formatDateString(currentDate.getFullYear(), currentDate.getMonth(), day);
          // Find events for this day
          const dayEvents = events.filter(e => {
            if (!e.date) return false;
            try {
              const eventDateStr = new Date(e.date).toISOString().split('T')[0];
              return eventDateStr === dateStr;
            } catch (err) {
              return false;
            }
          });

          const isToday = isCurrentMonth && day === todayDate;
          const hasEvents = dayEvents.length > 0;

          return (
            <div key={day} className="relative group flex justify-center items-center h-10 w-full">
              <div 
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all
                  ${isToday ? 'bg-navy-primary text-white shadow-md' : 'text-text-dark hover:bg-accent/10 hover:text-navy-primary cursor-pointer'}
                `}
              >
                {day}
              </div>
              
              {/* Event Marker */}
              {hasEvents && (
                <div className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_5px_rgba(255,107,107,0.5)]"></div>
              )}

              {/* Tooltip */}
              {hasEvents && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-navy-secondary text-white text-xs rounded-md py-2 px-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 shadow-lg pointer-events-none">
                  <div className="font-bold border-b border-white/20 pb-1 mb-1">
                    {monthNames[currentDate.getMonth()]} {day}, {currentDate.getFullYear()}
                  </div>
                  <ul className="space-y-1 mt-1">
                    {dayEvents.map((e, idx) => (
                      <li key={idx} className="truncate">
                        <span className="text-accent">•</span> {e.title}
                      </li>
                    ))}
                  </ul>
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-navy-secondary"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
