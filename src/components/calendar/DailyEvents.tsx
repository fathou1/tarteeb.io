
import { Calendar as CalendarIcon } from 'lucide-react';
import EventsList from './EventsList';
import { Event, formatDateToString, formatDisplayDate } from './utils/event-utils';

interface DailyEventsProps {
  date: Date | undefined;
  events: Event[];
  onToggleComplete: (eventId: string) => void;
}

const DailyEvents = ({ date, events, onToggleComplete }: DailyEventsProps) => {
  // Filter events for the selected date
  const filteredEvents = date
    ? events.filter(event => formatDateToString(event.date) === formatDateToString(date))
    : [];

  return (
    <div className="tarteeb-card p-4">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
        <CalendarIcon size={18} className="text-tarteeb-purple" />
        <h3 className="font-medium">
          {date ? formatDisplayDate(date) : 'Select a date'}
        </h3>
      </div>
      
      <EventsList 
        events={filteredEvents} 
        isDetailView={true}
        onToggleComplete={onToggleComplete} 
      />
    </div>
  );
};

export default DailyEvents;
