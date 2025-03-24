
import { CheckSquare, Clock, AlertCircle, CalendarCheck } from 'lucide-react';

const statsData = [
  {
    title: 'Total Tasks',
    value: 24,
    icon: <CheckSquare className="text-tarteeb-purple" size={20} />,
    color: 'bg-tarteeb-purple/10'
  },
  {
    title: 'In Progress',
    value: 8,
    icon: <Clock className="text-tarteeb-orange" size={20} />,
    color: 'bg-tarteeb-orange/10'
  },
  {
    title: 'Urgent',
    value: 3,
    icon: <AlertCircle className="text-red-500" size={20} />,
    color: 'bg-red-50 dark:bg-red-500/10'
  },
  {
    title: 'Completed Today',
    value: 5,
    icon: <CalendarCheck className="text-green-500" size={20} />,
    color: 'bg-green-50 dark:bg-green-500/10'
  }
];

const Overview = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <div 
          key={index}
          className="tarteeb-card p-5 flex items-center gap-4 hover:shadow-md transition-all duration-300 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
            <p className="text-2xl font-semibold text-tarteeb-dark dark:text-white">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Overview;
