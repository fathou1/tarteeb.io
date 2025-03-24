
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { format, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DayIndicator from './DayIndicator';
import { Event } from './utils/event-utils';

interface CalendarGridProps {
  date: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  events: Event[];
}

const CalendarGrid = ({ date, onDateSelect, events }: CalendarGridProps) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Navigate to previous month
  const prevMonth = () => {
    setSelectedMonth(prevMonth => subMonths(prevMonth, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setSelectedMonth(prevMonth => addMonths(prevMonth, 1));
  };

  return (
    <div className="tarteeb-card p-0 overflow-hidden">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevMonth}
            className="h-7 w-7"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-medium">
            {format(selectedMonth, 'MMMM yyyy')}
          </h3>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextMonth}
            className="h-7 w-7"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={onDateSelect}
        defaultMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        className="rounded-lg p-3"
        classNames={{
          day_selected: "bg-tarteeb-purple text-white hover:bg-tarteeb-purple focus:bg-tarteeb-purple",
          day_today: "bg-accent text-accent-foreground",
          day: "h-12 w-12 p-0 font-normal text-base",
          caption: "flex justify-center py-4 px-4 relative items-center",
          caption_label: "text-base font-medium hidden",
          nav: "space-x-1 flex items-center hidden",
          nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          cell: "text-center text-base p-0 relative first:[&:nth-child(7n+1)]:rounded-l-md last:[&:nth-child(7n+7)]:rounded-r-md focus-within:relative focus-within:z-20",
          head_cell: "text-muted-foreground rounded-md w-12 font-normal text-sm",
          row: "flex w-full mt-3",
          head: "flex",
          table: "w-full border-collapse space-y-2",
        }}
        components={{
          Day: ({ date: dayDate, ...props }) => {
            return <button {...props}>
              <DayIndicator day={dayDate} events={events} />
            </button>;
          }
        }}
      />
    </div>
  );
};

export default CalendarGrid;
