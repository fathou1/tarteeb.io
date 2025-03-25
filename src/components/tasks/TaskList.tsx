
import { useState } from 'react';
import { 
  AlertCircle, 
  Clock, 
  Check, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Plus, 
  Filter,
  CalendarDays
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import TaskCheck from './TaskCheck';
import { Badge } from '@/components/ui/badge';

type Priority = 'low' | 'medium' | 'high';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string;
  category?: string;
}

interface TaskListProps {
  title: string;
  description?: string;
  tasks: Task[];
  onAddTask?: () => void;
  onTaskComplete?: (id: string) => void;
  onTaskDelete?: (id: string) => void;
  onTaskEdit?: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  title, 
  description, 
  tasks,
  onAddTask,
  onTaskComplete,
  onTaskDelete,
  onTaskEdit
}) => {
  const [filter, setFilter] = useState<Priority | 'all'>('all');
  
  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.priority === filter);
  
  const getPriorityIcon = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle size={16} className="text-red-500" />;
      case 'medium':
        return <Clock size={16} className="text-amber-500" />;
      case 'low':
        return <Check size={16} className="text-green-500" />;
    }
  };

  const getPriorityClass = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'low':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    }
  };
  
  return (
    <div className="tarteeb-card animate-fade-in border border-border rounded-lg shadow-sm overflow-hidden bg-card">
      <div className="p-5 border-b border-border">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                  <Filter size={14} />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem 
                  onClick={() => setFilter('all')}
                  className={filter === 'all' ? 'bg-muted' : ''}
                >
                  All Tasks
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setFilter('high')}
                  className={filter === 'high' ? 'bg-muted' : ''}
                >
                  <AlertCircle size={14} className="mr-2 text-red-500" />
                  High Priority
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilter('medium')}
                  className={filter === 'medium' ? 'bg-muted' : ''}
                >
                  <Clock size={14} className="mr-2 text-amber-500" />
                  Medium Priority
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilter('low')}
                  className={filter === 'low' ? 'bg-muted' : ''}
                >
                  <Check size={14} className="mr-2 text-green-500" />
                  Low Priority
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="default" size="sm" className="h-8 bg-tarteeb-purple hover:bg-tarteeb-purple/90" onClick={onAddTask}>
              <Plus size={14} className="mr-1" />
              Add
            </Button>
          </div>
        </div>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      
      <div className="p-1">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
            <p className="mb-2">No tasks found</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={onAddTask}
            >
              Add your first task
            </Button>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filteredTasks.map((task) => (
              <li key={task.id} className="hover:bg-muted/40 transition-colors">
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <TaskCheck 
                      id={`task-${task.id}`}
                      checked={task.completed}
                      label={task.title}
                      description={task.description}
                      priority={task.priority}
                      onCheckedChange={() => onTaskComplete && onTaskComplete(task.id)}
                    />
                    
                    <div className="flex items-center gap-2 ml-4">
                      {task.dueDate && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <CalendarDays size={14} />
                          <span>{task.dueDate}</span>
                        </div>
                      )}
                      
                      {task.category && (
                        <Badge variant="outline" className="text-xs px-2 py-0 h-5">
                          {task.category}
                        </Badge>
                      )}
                      
                      <Badge className={`ml-2 text-xs px-2 py-0 h-5 flex items-center gap-1 ${getPriorityClass(task.priority)}`}>
                        {getPriorityIcon(task.priority)}
                        {task.priority}
                      </Badge>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreVertical size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onTaskEdit && onTaskEdit(task.id)}>
                            <Edit size={14} className="mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => onTaskDelete && onTaskDelete(task.id)}
                            className="text-red-500 focus:text-red-500"
                          >
                            <Trash2 size={14} className="mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
