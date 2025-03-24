
import { useState } from 'react';
import { 
  Check, 
  Clock, 
  AlertCircle, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Plus, 
  Filter 
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

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
        return 'task-priority-high';
      case 'medium':
        return 'task-priority-medium';
      case 'low':
        return 'task-priority-low';
    }
  };
  
  return (
    <div className="tarteeb-card animate-fade-in">
      <div className="p-5 border-b border-border">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-semibold text-tarteeb-dark dark:text-white">{title}</h3>
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
                <div className="flex items-center p-4 gap-3">
                  <Checkbox 
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => onTaskComplete && onTaskComplete(task.id)}
                    className={`h-5 w-5 rounded border ${
                      task.completed ? 'data-[state=checked]:bg-tarteeb-purple data-[state=checked]:border-tarteeb-purple' : 'border-gray-300'
                    } text-tarteeb-purple focus:ring-tarteeb-purple cursor-pointer`}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-tarteeb-dark dark:text-white'}`}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-xs text-muted-foreground truncate max-w-md">
                        {task.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {task.dueDate && (
                      <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                    )}
                    
                    <span className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${getPriorityClass(task.priority)}`}>
                      {getPriorityIcon(task.priority)}
                      {task.priority}
                    </span>
                    
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
