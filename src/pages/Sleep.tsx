
import DashboardLayout from '@/components/layout/DashboardLayout';
import SleepTracker from '@/components/sleep/SleepTracker';

const Sleep = () => {
  return (
    <DashboardLayout title="Sleep Tracking">
      <div className="space-y-4">
        <SleepTracker />
      </div>
    </DashboardLayout>
  );
};

export default Sleep;
