
import { Event, formatDateToString } from './utils/event-utils';

interface DayIndicatorProps {
  day: Date;
  events: Event[];
}

const DayIndicator = ({ day, events }: DayIndicatorProps) => {
  // Check if there are events on this day
  const hasEvents = events.some(event => 
    formatDateToString(event.date) === formatDateToString(day)
  );
  
  // Get the highest priority event for this day
  const highestPriorityEvent = events
    .filter(event => formatDateToString(event.date) === formatDateToString(day))
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })[0];
  
  return (
    <div className="relative">
      {day.getDate()}
      {hasEvents && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
          <div className={`w-1.5 h-1.5 rounded-full ${
            highestPriorityEvent?.priority === 'high' ? 'bg-red-500' : 
            highestPriorityEvent?.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
          }`}></div>
        </div>
      )}
    </div>
  );
};

export default DayIndicator;
