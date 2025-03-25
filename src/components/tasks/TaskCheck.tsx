
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
  description?: string;
}

const TaskCheck: React.FC<TaskCheckProps> = ({
  id,
  checked,
  label,
  priority = 'medium',
  onCheckedChange,
  className,
  description,
}) => {
  // Define priority-specific styles
  const priorityClasses = {
    low: 'border-green-500 dark:border-green-600',
    medium: 'border-amber-500 dark:border-amber-600',
    high: 'border-red-500 dark:border-red-600'
  };
  
  const priorityBgClasses = {
    low: 'bg-green-500 dark:bg-green-600',
    medium: 'bg-amber-500 dark:bg-amber-600',
    high: 'bg-red-500 dark:bg-red-600'
  };
  
  const labelClasses = checked 
    ? 'line-through text-muted-foreground' 
    : '';
  
  return (
    <div className={cn('flex items-start gap-2', className)}>
      <Checkbox 
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={cn(
          'border-2 mt-0.5', 
          priorityClasses[priority],
          checked && priorityBgClasses[priority]
        )}
      />
      <div className="flex flex-col">
        <label 
          htmlFor={id} 
          className={cn(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer',
            labelClasses
          )}
        >
          {label}
        </label>
        {description && (
          <p className={cn(
            'text-xs text-muted-foreground mt-1',
            checked && 'line-through'
          )}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskCheck;
