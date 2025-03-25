
import { format } from 'date-fns';

export type EventPriority = 'high' | 'medium' | 'low';

export interface Event {
  id: string;
  title: string;
  date: Date;
  priority: EventPriority;
  completed?: boolean;
}

// Sample events data
export const events: Event[] = [
  {
    id: '1',
    title: 'Client Meeting',
    date: new Date(2023, 5, 15),
    priority: 'high',
    completed: false
  },
  {
    id: '2',
    title: 'Project Deadline',
    date: new Date(2023, 5, 20),
    priority: 'high',
    completed: false
  },
  {
    id: '3',
    title: 'Team Check-in',
    date: new Date(2023, 5, 18),
    priority: 'medium',
    completed: true
  },
  {
    id: '4',
    title: 'Review Documentation',
    date: new Date(2023, 5, 22),
    priority: 'low',
    completed: false
  }
];

// Helper to format date to YYYY-MM-DD for comparison
export const formatDateToString = (date: Date) => {
  return date.toISOString().split('T')[0];
};

// Utility to format the date for display
export const formatDisplayDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const formatDateWithTime = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Function to get the priority color class based on priority level
export const getPriorityColorClass = (priority: EventPriority): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-amber-500';
    case 'low':
      return 'bg-green-500';
    default:
      return '';
  }
};
