
import DashboardLayout from '@/components/layout/DashboardLayout';
import CalendarView from '@/components/calendar/CalendarView';

const Calendar = () => {
  return (
    <DashboardLayout title="Calendar">
      <div className="space-y-4">
        <CalendarView />
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
