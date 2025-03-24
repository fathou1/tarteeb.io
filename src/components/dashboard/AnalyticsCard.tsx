
import { BarChart2, TrendingUp, TrendingDown } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
  type: 'line' | 'bar';
  color: string;
  data: Array<any>;
  dataKey: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  change,
  type,
  color,
  data,
  dataKey
}) => {
  return (
    <div className="tarteeb-card p-5 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-semibold text-tarteeb-dark dark:text-white">{value}</p>
            {change && (
              <div className={`flex items-center text-xs font-medium ${
                change.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {change.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{change.value}%</span>
              </div>
            )}
          </div>
        </div>
        <div className="p-2 rounded-full bg-tarteeb-light dark:bg-tarteeb-dark/10">
          <BarChart2 size={16} className="text-tarteeb-purple" />
        </div>
      </div>
      
      <div className="h-[120px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10 }} 
                dy={5}
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
                }} 
                labelStyle={{ fontWeight: 600 }} 
              />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                strokeWidth={2} 
                dot={{ r: 2 }} 
                activeDot={{ r: 5 }} 
              />
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10 }} 
                dy={5}
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
                }} 
                labelStyle={{ fontWeight: 600 }} 
              />
              <Bar 
                dataKey={dataKey} 
                fill={color} 
                radius={[4, 4, 0, 0]} 
                barSize={10} 
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsCard;
