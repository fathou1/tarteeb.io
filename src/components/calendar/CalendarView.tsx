
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  List, 
  LayoutGrid, 
  AlertCircle, 
  Clock, 
  Check 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type EventPriority = 'high' | 'medium' | 'low';

interface Event {
  id: string;
  title: string;
  date: Date;
  priority: EventPriority;
}

const events: Event[] = [
  {
    id: '1',
    title: 'Client Meeting',
    date: new Date(2023, 5, 15),
    priority: 'high'
  },
  {
    id: '2',
    title: 'Project Deadline',
    date: new Date(2023, 5, 20),
    priority: 'high'
  },
  {
    id: '3',
    title: 'Team Check-in',
    date: new Date(2023, 5, 18),
    priority: 'medium'
  },
  {
    id: '4',
    title: 'Review Documentation',
    date: new Date(2023, 5, 22),
    priority: 'low'
  }
];

const getPriorityElement = (priority: EventPriority) => {
  switch (priority) {
    case 'high':
      return <AlertCircle size={14} className="text-red-500" />;
    case 'medium':
      return <Clock size={14} className="text-amber-500" />;
    case 'low':
      return <Check size={14} className="text-green-500" />;
  }
};

// Helper to format date to YYYY-MM-DD for comparison
const formatDateToString = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  
  // Filter events for the selected date (if in calendar view) or all events (for list view)
  const filteredEvents = view === 'calendar' && date
    ? events.filter(event => formatDateToString(event.date) === formatDateToString(date))
    : events.sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Custom day renderer to show event indicators in calendar
  const dayRenderer = (day: Date) => {
    // Check if there are events on this day
    const hasEvents = events.some(event => formatDateToString(event.date) === formatDateToString(day));
    
    // Get the highest priority event for this day
    const highestPriorityEvent = events
      .filter(event => formatDateToString(event.date) === formatDateToString(day))
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })[0];
    
    // Return the day with an indicator if there are events
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
  
  return (
    <div className="space-y-4 animate-fade-in">
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {view === 'calendar' && (
          <>
            <div className="col-span-1 md:col-span-2 tarteeb-card">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-lg"
                classNames={{
                  day_selected: "bg-tarteeb-purple text-white hover:bg-tarteeb-purple focus:bg-tarteeb-purple",
                  day_today: "bg-accent text-accent-foreground",
                  day: "h-9 w-9 p-0 font-normal",
                  caption: "flex justify-center py-4 px-4 relative items-center",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  cell: "text-center text-sm p-0 relative first:[&:nth-child(7n+1)]:rounded-l-md last:[&:nth-child(7n+7)]:rounded-r-md focus-within:relative focus-within:z-20",
                  head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  head: "flex",
                  table: "w-full border-collapse space-y-1",
                }}
                components={{
                  PrevButton: (props) => (
                    <Button {...props} size="icon" variant="ghost" className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  ),
                  NextButton: (props) => (
                    <Button {...props} size="icon" variant="ghost" className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ),
                  IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                  IconRight: () => <ChevronRight className="h-4 w-4" />,
                }}
                renderDay={dayRenderer}
              />
            </div>
            
            <div className="col-span-1 tarteeb-card p-4">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                <CalendarIcon size={18} className="text-tarteeb-purple" />
                <h3 className="font-medium">
                  {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h3>
              </div>
              
              {filteredEvents.length > 0 ? (
                <ul className="space-y-3">
                  {filteredEvents.map((event) => (
                    <li key={event.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        {getPriorityElement(event.priority)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {event.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p className="text-sm">No events for this day</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Add Event
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
        
        {view === 'list' && (
          <div className="col-span-1 md:col-span-3 tarteeb-card">
            <div className="p-4 border-b border-border">
              <h3 className="font-medium">Upcoming Events</h3>
            </div>
            
            {filteredEvents.length > 0 ? (
              <ul className="divide-y divide-border">
                {filteredEvents.map((event) => (
                  <li key={event.id} className="p-4 hover:bg-muted/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {event.date.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getPriorityElement(event.priority)}
                        <span className="text-xs font-medium capitalize">{event.priority}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No events scheduled</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Add Event
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
