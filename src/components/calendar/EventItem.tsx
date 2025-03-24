
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Event, getPriorityElement } from './utils/event-utils';

interface EventItemProps {
  event: Event;
  showTime?: boolean;
  onToggleComplete: (eventId: string) => void;
}

const EventItem = ({ event, showTime = false, onToggleComplete }: EventItemProps) => {
  return (
    <li 
      className={`p-3 ${showTime ? 'p-4' : ''} rounded-lg transition-colors ${
        event.completed 
          ? showTime ? 'bg-muted/20' : 'bg-muted/30 hover:bg-muted/40'
          : showTime ? 'hover:bg-muted/40' : 'bg-muted/50 hover:bg-muted'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div 
          className={`flex-1 ${event.completed ? 'line-through text-muted-foreground' : ''}`}
        >
          <h4 className={`font-medium ${showTime ? '' : 'text-sm'}`}>{event.title}</h4>
          <p className={`text-muted-foreground ${showTime ? 'text-sm' : 'text-xs mt-1'}`}>
            {showTime ? 
              event.date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) : 
              event.date.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          {showTime && (
            <div className="flex items-center gap-1">
              {getPriorityElement(event.priority)}
              <span className="text-xs font-medium capitalize">{event.priority}</span>
            </div>
          )}
          {!showTime && getPriorityElement(event.priority)}
          <Button 
            variant="ghost" 
            size="icon" 
            className={`rounded-full hover:bg-background ${showTime ? 'h-8 w-8' : 'h-7 w-7'}`}
            onClick={() => onToggleComplete(event.id)}
          >
            <div className={`w-5 h-5 rounded border flex items-center justify-center ${
              event.completed ? 'bg-tarteeb-purple border-tarteeb-purple' : 'border-muted-foreground'
            }`}>
              {event.completed && <Check size={12} className="text-white" />}
            </div>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
