
import { useState } from 'react';
import CalendarGrid from './CalendarGrid';
import { Event, events as initialEvents } from './utils/event-utils';

const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [calendarEvents, setCalendarEvents] = useState<Event[]>(initialEvents);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Calendar</h2>
      </div>
      
      <div className="w-full">
        <CalendarGrid 
          date={date} 
          onDateSelect={setDate} 
          events={calendarEvents} 
        />
      </div>
    </div>
  );
};

export default CalendarView;
