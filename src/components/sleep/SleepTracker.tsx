
import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { format, subDays } from 'date-fns';
import { 
  Moon, 
  Zap, 
  BrainCircuit, 
  Lightbulb, 
  Plus, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Generate sample sleep data for the last 7 days
const generateSleepData = () => {
  const data = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = subDays(new Date(), i);
    data.push({
      date: format(date, 'EEE'),
      hours: 5 + Math.random() * 4, // Random sleep hours between 5-9
      quality: Math.floor(50 + Math.random() * 50), // Random quality between 50-100
      energyLevel: Math.floor(50 + Math.random() * 50) // Random energy between 50-100
    });
  }
  
  return data;
};

// AI insights based on sleep data
const generateInsights = (data: any[]) => {
  // Calculate averages
  const avgSleep = data.reduce((sum, day) => sum + day.hours, 0) / data.length;
  const avgQuality = data.reduce((sum, day) => sum + day.quality, 0) / data.length;
  const avgEnergy = data.reduce((sum, day) => sum + day.energyLevel, 0) / data.length;
  
  // Determine if sleep is consistent
  const sleepTimes = data.map(day => day.hours);
  const maxDiff = Math.max(...sleepTimes) - Math.min(...sleepTimes);
  const isConsistent = maxDiff < 1.5;
  
  // Generate insights
  const insights = [];
  
  if (avgSleep < 7) {
    insights.push({
      title: "Increase Sleep Time",
      message: "You're averaging less than 7 hours of sleep. Try to get 7-9 hours for optimal productivity.",
      icon: <Moon className="text-tarteeb-purple" />
    });
  }
  
  if (!isConsistent) {
    insights.push({
      title: "Inconsistent Sleep Schedule",
      message: "Your sleep schedule varies by more than 1.5 hours. A consistent sleep routine can improve your productivity.",
      icon: <Zap className="text-tarteeb-orange" />
    });
  }
  
  if (avgQuality < 70) {
    insights.push({
      title: "Improve Sleep Quality",
      message: "Your sleep quality is below optimal. Consider reducing screen time before bed and creating a relaxing bedtime routine.",
      icon: <BrainCircuit className="text-tarteeb-purple" />
    });
  }
  
  if (avgEnergy < 70) {
    insights.push({
      title: "Energy Optimization",
      message: "Your energy levels could be improved. Consider short power naps and more physical activity during the day.",
      icon: <Lightbulb className="text-tarteeb-orange" />
    });
  }
  
  return insights.length > 0 ? insights : [{
    title: "Great Sleep Habits",
    message: "You're maintaining healthy sleep patterns. Keep it up!",
    icon: <Moon className="text-green-500" />
  }];
};

const sleepData = generateSleepData();
const insights = generateInsights(sleepData);

const SleepTracker = () => {
  const [hours, setHours] = useState<number>(7);
  const [quality, setQuality] = useState<number>(75);
  const [addingEntry, setAddingEntry] = useState(false);
  const [showInsights, setShowInsights] = useState(true);
  const { toast } = useToast();
  
  const handleAddEntry = () => {
    toast({
      title: "Sleep entry added",
      description: `Added ${hours} hours with ${quality}% quality for today.`,
    });
    
    setAddingEntry(false);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Sleep Tracker</h2>
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => setAddingEntry(!addingEntry)}
          className="bg-tarteeb-purple hover:bg-tarteeb-purple/90"
        >
          <Plus size={16} className="mr-1" />
          Add Sleep Entry
        </Button>
      </div>
      
      {addingEntry && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Add Sleep Entry</CardTitle>
            <CardDescription>Record how much sleep you got last night</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Hours of Sleep: {hours}</label>
                <Input 
                  type="range" 
                  min="0" 
                  max="12" 
                  step="0.5" 
                  value={hours} 
                  onChange={(e) => setHours(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0h</span>
                  <span>4h</span>
                  <span>8h</span>
                  <span>12h</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1.5">Sleep Quality: {quality}%</label>
                <Input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step="5" 
                  value={quality} 
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Poor</span>
                  <span>Average</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setAddingEntry(false)}>Cancel</Button>
            <Button 
              variant="default" 
              onClick={handleAddEntry}
              className="bg-tarteeb-purple hover:bg-tarteeb-purple/90"
            >
              Save Entry
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 tarteeb-card p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Sleep Analytics</h3>
            <div className="text-sm text-muted-foreground">Last 7 Days</div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sleepData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" domain={[0, 12]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="hours" 
                  name="Sleep Hours" 
                  stroke="#737AA8" 
                  strokeWidth={2} 
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="quality" 
                  name="Quality %" 
                  stroke="#F8BB84" 
                  strokeWidth={2} 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="energyLevel" 
                  name="Energy %" 
                  stroke="#5EB364" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Avg. Sleep</p>
              <p className="text-xl font-semibold">{(sleepData.reduce((sum, day) => sum + day.hours, 0) / sleepData.length).toFixed(1)}h</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Avg. Quality</p>
              <p className="text-xl font-semibold">{Math.round(sleepData.reduce((sum, day) => sum + day.quality, 0) / sleepData.length)}%</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Avg. Energy</p>
              <p className="text-xl font-semibold">{Math.round(sleepData.reduce((sum, day) => sum + day.energyLevel, 0) / sleepData.length)}%</p>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1 tarteeb-card">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <h3 className="font-medium flex items-center gap-2">
              <BrainCircuit size={18} className="text-tarteeb-purple" />
              AI Sleep Insights
            </h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowInsights(!showInsights)}
              className="h-7 w-7"
            >
              {showInsights ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </div>
          
          {showInsights && (
            <div className="p-4 space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/50 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center gap-2 mb-1">
                    {insight.icon}
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">{insight.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SleepTracker;
