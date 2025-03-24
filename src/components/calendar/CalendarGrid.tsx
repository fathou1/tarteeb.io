
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { format, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    <div className="tarteeb-card p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={prevMonth}
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
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <Calendar
        mode="single"
        selected={date}
        onSelect={onDateSelect}
        defaultMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        className="rounded-lg w-full"
        classNames={{
          day_selected: "bg-tarteeb-purple text-white hover:bg-tarteeb-purple focus:bg-tarteeb-purple",
          day_today: "bg-accent text-accent-foreground",
          day: "h-12 w-12 p-0 font-normal text-base",
          caption: "hidden", // Hide the default caption since we have custom navigation
          nav: "hidden", // Hide the default navigation since we have custom buttons
          cell: "text-center text-base p-0 relative first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          head_cell: "text-muted-foreground rounded-md w-12 font-normal text-sm",
          row: "flex w-full mt-2",
          head: "flex",
          table: "w-full border-collapse space-y-1",
        }}
      />
    </div>
  );
};

export default CalendarGrid;
