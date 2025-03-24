
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import EventsList from './EventsList';
import { Event } from './utils/event-utils';

interface AllEventsListProps {
  events: Event[];
  onToggleComplete: (eventId: string) => void;
}

const AllEventsList = ({ events, onToggleComplete }: AllEventsListProps) => {
  return (
    <div className="tarteeb-card">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="font-medium">Upcoming Events</h3>
        <Button variant="outline" size="sm" className="text-sm">
          <Plus size={14} className="mr-1" />
          Add Event
        </Button>
      </div>
      
      <EventsList 
        events={events} 
        onToggleComplete={onToggleComplete} 
      />
    </div>
  );
};

export default AllEventsList;
