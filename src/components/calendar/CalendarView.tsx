
import { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  List, 
  LayoutGrid, 
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import CalendarGrid from './CalendarGrid';
import DailyEvents from './DailyEvents';
import AllEventsList from './AllEventsList';
import { Event, events as initialEvents } from './utils/event-utils';

const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [calendarEvents, setCalendarEvents] = useState<Event[]>(initialEvents);
  
  // Sort events by date for list view
  const sortedEvents = [...calendarEvents].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
  
  // Handle event completion toggle
  const toggleEventComplete = (eventId: string) => {
    setCalendarEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, completed: !event.completed } 
          : event
      )
    );
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Calendar</h2>
        <div className="flex gap-2">
          <Button
            variant={view === 'calendar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('calendar')}
            className={view === 'calendar' ? 'bg-tarteeb-purple hover:bg-tarteeb-purple/90' : ''}
          >
            <LayoutGrid size={16} className="mr-1" />
            Calendar
          </Button>
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('list')}
            className={view === 'list' ? 'bg-tarteeb-purple hover:bg-tarteeb-purple/90' : ''}
          >
            <List size={16} className="mr-1" />
            List
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        {view === 'calendar' && (
          <>
            <div className="col-span-1 md:col-span-5">
              <CalendarGrid 
                date={date} 
                onDateSelect={setDate} 
                events={calendarEvents} 
              />
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <DailyEvents 
                date={date} 
                events={calendarEvents} 
                onToggleComplete={toggleEventComplete} 
              />
            </div>
          </>
        )}
        
        {view === 'list' && (
          <div className="col-span-1 md:col-span-7">
            <AllEventsList 
              events={sortedEvents} 
              onToggleComplete={toggleEventComplete} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
