
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Overview from '@/components/dashboard/Overview';
import AnalyticsCard from '@/components/dashboard/AnalyticsCard';
import TaskList from '@/components/tasks/TaskList';
import { useToast } from '@/hooks/use-toast';

// Sample analytics data
const productivityData = [
  { name: 'Mon', value: 65 },
  { name: 'Tue', value: 75 },
  { name: 'Wed', value: 82 },
  { name: 'Thu', value: 78 },
  { name: 'Fri', value: 89 },
  { name: 'Sat', value: 60 },
  { name: 'Sun', value: 55 },
];

const completionData = [
  { name: 'Mon', value: 5 },
  { name: 'Tue', value: 8 },
  { name: 'Wed', value: 10 },
  { name: 'Thu', value: 7 },
  { name: 'Fri', value: 12 },
  { name: 'Sat', value: 4 },
  { name: 'Sun', value: 3 },
];

const focusTimeData = [
  { name: 'Mon', value: 4.5 },
  { name: 'Tue', value: 5.2 },
  { name: 'Wed', value: 6.0 },
  { name: 'Thu', value: 5.0 },
  { name: 'Fri', value: 5.8 },
  { name: 'Sat', value: 3.2 },
  { name: 'Sun', value: 2.5 },
];

const energyLevelData = [
  { name: 'Mon', value: 70 },
  { name: 'Tue', value: 75 },
  { name: 'Wed', value: 65 },
  { name: 'Thu', value: 80 },
  { name: 'Fri', value: 72 },
  { name: 'Sat', value: 68 },
  { name: 'Sun', value: 60 },
];

// Sample tasks data
const urgentTasks = [
  {
    id: '1',
    title: 'Finish client presentation',
    description: 'Complete slides for tomorrow\'s meeting',
    completed: false,
    priority: 'high' as const,
    dueDate: 'Today, 5:00 PM',
  },
  {
    id: '2',
    title: 'Review project proposal',
    description: 'Make final edits and send for approval',
    completed: false,
    priority: 'high' as const,
    dueDate: 'Tomorrow, 10:00 AM',
  },
  {
    id: '3',
    title: 'Call with marketing team',
    description: 'Discuss Q3 campaign strategy',
    completed: true,
    priority: 'medium' as const,
    dueDate: 'Today, 2:00 PM',
  },
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleTaskComplete = (id: string) => {
    toast({
      title: "Task updated",
      description: "The task status has been updated successfully.",
    });
  };
  
  const handleTaskDelete = (id: string) => {
    toast({
      title: "Task deleted",
      description: "The task has been deleted successfully.",
    });
  };
  
  const handleAddTask = () => {
    toast({
      title: "Add a new task",
      description: "Feature coming soon!",
    });
  };
  
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        <Overview />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnalyticsCard
            title="Productivity Score"
            value="82%"
            change={{ value: 8, trend: 'up' }}
            type="line"
            color="#737AA8"
            data={productivityData}
            dataKey="value"
          />
          <AnalyticsCard
            title="Task Completion"
            value="49"
            change={{ value: 12, trend: 'up' }}
            type="bar"
            color="#F8BB84"
            data={completionData}
            dataKey="value"
          />
          <AnalyticsCard
            title="Focus Time"
            value="5.2h"
            change={{ value: 3, trend: 'down' }}
            type="line"
            color="#5EB364"
            data={focusTimeData}
            dataKey="value"
          />
          <AnalyticsCard
            title="Energy Level"
            value="74%"
            change={{ value: 5, trend: 'up' }}
            type="line"
            color="#F76E64"
            data={energyLevelData}
            dataKey="value"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TaskList 
            title="Urgent Tasks" 
            description="Tasks requiring immediate attention"
            tasks={urgentTasks}
            onAddTask={handleAddTask}
            onTaskComplete={handleTaskComplete}
            onTaskDelete={handleTaskDelete}
          />
          
          <div className="tarteeb-card p-5 space-y-4">
            <h3 className="text-lg font-semibold text-tarteeb-dark dark:text-white">AI Suggestions</h3>
            
            <div className="border-l-4 border-tarteeb-purple pl-4 py-2">
              <h4 className="font-medium text-tarteeb-dark dark:text-white">Optimize Your Morning</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Based on your productivity patterns, try tackling complex tasks between 9-11 AM when your focus is highest.
              </p>
            </div>
            
            <div className="border-l-4 border-tarteeb-orange pl-4 py-2">
              <h4 className="font-medium text-tarteeb-dark dark:text-white">Schedule a Break</h4>
              <p className="text-sm text-muted-foreground mt-1">
                You've been working for 3 hours straight. Consider a 15-minute break to maintain productivity levels.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h4 className="font-medium text-tarteeb-dark dark:text-white">Sleep Pattern Insight</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Your productivity increases by 27% on days when you sleep more than 7 hours. Try maintaining a consistent sleep schedule.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
