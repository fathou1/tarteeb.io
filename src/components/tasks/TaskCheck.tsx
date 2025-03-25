
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface TaskCheckProps {
  id: string;
  checked: boolean;
  label: string;
  priority?: 'low' | 'medium' | 'high';
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

const TaskCheck: React.FC<TaskCheckProps> = ({
  id,
  checked,
  label,
  priority = 'medium',
  onCheckedChange,
  className,
}) => {
  const priorityClasses = {
    low: 'border-green-500 dark:border-green-600',
    medium: 'border-amber-500 dark:border-amber-600',
    high: 'border-red-500 dark:border-red-600'
  };
  
  const labelClasses = checked 
    ? 'line-through text-muted-foreground' 
    : '';
  
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Checkbox 
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={cn(
          'border-2', 
          priorityClasses[priority],
          checked && `bg-${priority === 'low' ? 'green' : priority === 'medium' ? 'amber' : 'red'}-500`
        )}
      />
      <label 
        htmlFor={id} 
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer',
          labelClasses
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default TaskCheck;
