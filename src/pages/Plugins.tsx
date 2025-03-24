
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Puzzle, Calendar, Clock, BarChart2, Globe, Zap, Lock } from 'lucide-react';

const plugins = [
  {
    id: 'time-tracker',
    name: 'Time Tracker',
    description: 'Automatically track time spent on tasks',
    icon: <Clock className="h-10 w-10 text-tarteeb-purple" />,
    installed: true,
    enabled: true,
    free: true,
  },
  {
    id: 'advanced-analytics',
    name: 'Advanced Analytics',
    description: 'Get deeper insights into your productivity trends',
    icon: <BarChart2 className="h-10 w-10 text-tarteeb-purple" />,
    installed: true,
    enabled: false,
    free: false,
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar Sync',
    description: 'Sync your tasks with Google Calendar',
    icon: <Calendar className="h-10 w-10 text-tarteeb-purple" />,
    installed: false,
    enabled: false,
    free: true,
  },
  {
    id: 'pomodoro',
    name: 'Pomodoro Timer',
    description: 'Work in focused intervals with breaks',
    icon: <Clock className="h-10 w-10 text-tarteeb-orange" />,
    installed: false,
    enabled: false,
    free: true,
  },
  {
    id: 'website-blocker',
    name: 'Website Blocker',
    description: 'Block distracting websites during focus time',
    icon: <Globe className="h-10 w-10 text-tarteeb-purple" />,
    installed: false,
    enabled: false,
    free: false,
  },
  {
    id: 'ai-coach',
    name: 'AI Productivity Coach',
    description: 'Get personalized productivity advice from AI',
    icon: <Zap className="h-10 w-10 text-tarteeb-orange" />,
    installed: false,
    enabled: false,
    free: false,
  },
];

const Plugins = () => {
  const [installedPlugins, setInstalledPlugins] = useState(
    plugins.map(plugin => ({ ...plugin }))
  );
  const { toast } = useToast();
  
  const handleToggleEnable = (id: string) => {
    setInstalledPlugins(prev => 
      prev.map(plugin => 
        plugin.id === id ? { ...plugin, enabled: !plugin.enabled } : plugin
      )
    );
    
    const plugin = installedPlugins.find(p => p.id === id);
    if (plugin) {
      toast({
        title: `${plugin.name} ${plugin.enabled ? 'disabled' : 'enabled'}`,
        description: `The plugin has been ${plugin.enabled ? 'disabled' : 'enabled'} successfully.`,
      });
    }
  };
  
  const handleInstall = (id: string) => {
    setInstalledPlugins(prev => 
      prev.map(plugin => 
        plugin.id === id ? { ...plugin, installed: true, enabled: true } : plugin
      )
    );
    
    const plugin = installedPlugins.find(p => p.id === id);
    if (plugin) {
      toast({
        title: `${plugin.name} installed`,
        description: `The plugin has been installed and enabled successfully.`,
      });
    }
  };
  
  const handleUninstall = (id: string) => {
    setInstalledPlugins(prev => 
      prev.map(plugin => 
        plugin.id === id ? { ...plugin, installed: false, enabled: false } : plugin
      )
    );
    
    const plugin = installedPlugins.find(p => p.id === id);
    if (plugin) {
      toast({
        title: `${plugin.name} uninstalled`,
        description: `The plugin has been uninstalled successfully.`,
      });
    }
  };
  
  return (
    <DashboardLayout title="Plugins">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-tarteeb-dark dark:text-white">Plugins Gallery</h2>
            <p className="text-muted-foreground">Enhance your productivity with these powerful plugins</p>
          </div>
          <Button 
            variant="default" 
            className="bg-tarteeb-purple hover:bg-tarteeb-purple/90"
          >
            <Puzzle size={18} className="mr-2" />
            Browse All Plugins
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {installedPlugins.map((plugin) => (
            <Card key={plugin.id} className="tarteeb-card animate-fade-in">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-lg bg-tarteeb-light dark:bg-tarteeb-dark/10">
                    {plugin.icon}
                  </div>
                  {!plugin.free && (
                    <div className="px-2 py-1 rounded-full bg-tarteeb-orange/10 text-tarteeb-orange text-xs font-medium flex items-center gap-1">
                      <Lock size={12} />
                      Premium
                    </div>
                  )}
                </div>
                <CardTitle className="text-xl mt-2">{plugin.name}</CardTitle>
                <CardDescription>{plugin.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {plugin.installed && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Enable</span>
                    <Switch 
                      checked={plugin.enabled} 
                      onCheckedChange={() => handleToggleEnable(plugin.id)} 
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                {!plugin.installed ? (
                  <Button 
                    variant="default" 
                    onClick={() => handleInstall(plugin.id)}
                    className="bg-tarteeb-purple hover:bg-tarteeb-purple/90"
                  >
                    Install
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={() => handleUninstall(plugin.id)}
                  >
                    Uninstall
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 p-6 rounded-lg border border-dashed border-border text-center">
          <h3 className="text-lg font-medium mb-2">Develop Your Own Plugin</h3>
          <p className="text-muted-foreground mb-4">
            Create custom plugins to enhance Tarteeb.io with your own functionality.
          </p>
          <Button variant="outline">
            Developer Documentation
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Plugins;
