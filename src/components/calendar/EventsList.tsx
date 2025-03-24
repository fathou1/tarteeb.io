
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventItem from './EventItem';
import { Event } from './utils/event-utils';

interface EventsListProps {
  events: Event[];
  isDetailView?: boolean;
  onToggleComplete: (eventId: string) => void;
}

const NoEventsMessage = ({ isDetailView = false }: { isDetailView?: boolean }) => (
  <div className={`text-center ${isDetailView ? 'py-6' : 'py-8'} text-muted-foreground`}>
    <p className="text-sm">{isDetailView ? 'No events for this day' : 'No events scheduled'}</p>
    <Button variant="outline" size="sm" className="mt-3">
      <Plus size={14} className="mr-1" />
      Add Event
    </Button>
  </div>
);

const EventsList = ({ events, isDetailView = false, onToggleComplete }: EventsListProps) => {
  if (events.length === 0) {
    return <NoEventsMessage isDetailView={isDetailView} />;
  }

  return (
    <ul className={isDetailView ? 'space-y-3' : 'divide-y divide-border'}>
      {events.map((event) => (
        <EventItem 
          key={event.id} 
          event={event} 
          showTime={!isDetailView}
          onToggleComplete={onToggleComplete} 
        />
      ))}
    </ul>
  );
};

export default EventsList;
