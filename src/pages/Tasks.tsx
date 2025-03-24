
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TaskList from '@/components/tasks/TaskList';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample tasks data
const dailyTasks = [
  {
    id: '1',
    title: 'Finish client presentation',
    description: 'Complete slides for tomorrow\'s meeting',
    completed: false,
    priority: 'high' as const,
    dueDate: 'Today, 5:00 PM',
    category: 'Work',
  },
  {
    id: '2',
    title: 'Review project proposal',
    description: 'Make final edits and send for approval',
    completed: false,
    priority: 'high' as const,
    dueDate: 'Today, 10:00 AM',
    category: 'Work',
  },
  {
    id: '3',
    title: 'Call with marketing team',
    description: 'Discuss Q3 campaign strategy',
    completed: true,
    priority: 'medium' as const,
    dueDate: 'Today, 2:00 PM',
    category: 'Meetings',
  },
  {
    id: '4',
    title: 'Gym workout',
    description: 'Cardio and upper body routine',
    completed: false,
    priority: 'low' as const,
    dueDate: 'Today, 7:00 PM',
    category: 'Personal',
  },
];

const weeklyTasks = [
  {
    id: '5',
    title: 'Weekly team standup',
    description: 'Update on project progress',
    completed: false,
    priority: 'medium' as const,
    dueDate: 'Thu, 9:00 AM',
    category: 'Meetings',
  },
  {
    id: '6',
    title: 'Complete quarterly report',
    description: 'Compile data and prepare summary',
    completed: false,
    priority: 'high' as const,
    dueDate: 'Fri, 5:00 PM',
    category: 'Work',
  },
  {
    id: '7',
    title: 'Dentist appointment',
    description: 'Regular checkup',
    completed: false,
    priority: 'medium' as const,
    dueDate: 'Wed, 2:30 PM',
    category: 'Personal',
  },
];

const monthlyTasks = [
  {
    id: '8',
    title: 'Client contract renewal',
    description: 'Prepare proposal and negotiate terms',
    completed: false,
    priority: 'high' as const,
    dueDate: 'Jun 30',
    category: 'Work',
  },
  {
    id: '9',
    title: 'Team building workshop',
    description: 'Organize activities and book venue',
    completed: false,
    priority: 'medium' as const,
    dueDate: 'Jun 20',
    category: 'Team',
  },
  {
    id: '10',
    title: 'Monthly budget review',
    description: 'Analyze expenses and prepare next month\'s budget',
    completed: false,
    priority: 'medium' as const,
    dueDate: 'Jun 28',
    category: 'Finance',
  },
];

const Tasks = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  
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
  
  const handleTaskEdit = (id: string) => {
    toast({
      title: "Edit task",
      description: "Feature coming soon!",
    });
  };
  
  const handleAddTask = () => {
    setDialogOpen(true);
  };
  
  const handleSaveTask = () => {
    toast({
      title: "Task added",
      description: "Your new task has been added successfully.",
    });
    setDialogOpen(false);
  };
  
  return (
    <DashboardLayout title="Tasks">
      <div className="space-y-4">
        <Tabs defaultValue="daily" onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="daily" className="data-[state=active]:bg-tarteeb-purple data-[state=active]:text-white">Daily</TabsTrigger>
              <TabsTrigger value="weekly" className="data-[state=active]:bg-tarteeb-purple data-[state=active]:text-white">Weekly</TabsTrigger>
              <TabsTrigger value="monthly" className="data-[state=active]:bg-tarteeb-purple data-[state=active]:text-white">Monthly</TabsTrigger>
            </TabsList>
            
            <Button 
              variant="default" 
              onClick={handleAddTask}
              className="bg-tarteeb-purple hover:bg-tarteeb-purple/90"
            >
              Add New Task
            </Button>
          </div>
          
          <TabsContent value="daily" className="mt-0">
            <TaskList 
              title="Today's Tasks" 
              description="Tasks due today"
              tasks={dailyTasks}
              onAddTask={handleAddTask}
              onTaskComplete={handleTaskComplete}
              onTaskDelete={handleTaskDelete}
              onTaskEdit={handleTaskEdit}
            />
          </TabsContent>
          
          <TabsContent value="weekly" className="mt-0">
            <TaskList 
              title="This Week's Tasks" 
              description="Tasks due this week"
              tasks={weeklyTasks}
              onAddTask={handleAddTask}
              onTaskComplete={handleTaskComplete}
              onTaskDelete={handleTaskDelete}
              onTaskEdit={handleTaskEdit}
            />
          </TabsContent>
          
          <TabsContent value="monthly" className="mt-0">
            <TaskList 
              title="This Month's Tasks" 
              description="Tasks due this month"
              tasks={monthlyTasks}
              onAddTask={handleAddTask}
              onTaskComplete={handleTaskComplete}
              onTaskDelete={handleTaskDelete}
              onTaskEdit={handleTaskEdit}
            />
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="tarteeb-card p-5">
            <h3 className="text-lg font-semibold mb-4">AI Task Insights</h3>
            <div className="space-y-4">
              <div className="p-3 bg-tarteeb-purple/10 rounded-lg">
                <p className="text-sm">You complete 30% more tasks when you start your day with high-priority items. Try tackling important tasks in the morning.</p>
              </div>
              <div className="p-3 bg-tarteeb-orange/10 rounded-lg">
                <p className="text-sm">Based on your patterns, Wednesday is your most productive day. Consider scheduling important work then.</p>
              </div>
            </div>
          </div>
          
          <div className="tarteeb-card p-5 col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Task Completion Trends</h3>
            <div className="grid grid-cols-7 gap-1 h-32">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                const height = [60, 80, 100, 75, 90, 40, 30][i];
                return (
                  <div key={day} className="flex flex-col items-center">
                    <div className="flex-1 w-full flex items-end">
                      <div 
                        className="w-full bg-tarteeb-purple/80 rounded-t-sm animate-fade-in" 
                        style={{ height: `${height}%`, animationDelay: `${i * 100}ms` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground mt-2">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Task Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task with details and priority.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Task Title</label>
              <Input placeholder="Enter task title" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input placeholder="Enter task description" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Due Date</label>
                <Input type="date" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select defaultValue="work">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="meetings">Meetings</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button 
              variant="default" 
              onClick={handleSaveTask}
              className="bg-tarteeb-purple hover:bg-tarteeb-purple/90"
            >
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Tasks;
