
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { User, Bell, Moon, Save, LogOut, Lock, Globe, Brain } from 'lucide-react';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };
  
  return (
    <DashboardLayout title="Settings">
      <div className="space-y-6 max-w-4xl mx-auto">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="profile" className="data-[state=active]:bg-tarteeb-purple data-[state=active]:text-white">
              <User size={16} className="mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-tarteeb-purple data-[state=active]:text-white">
              <Bell size={16} className="mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-tarteeb-purple data-[state=active]:text-white">
              <Moon size={16} className="mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-tarteeb-purple data-[state=active]:text-white">
              <Brain size={16} className="mr-2" />
              AI Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="animate-fade-in">
            <div className="space-y-6">
              <div className="tarteeb-card p-6">
                <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-24 h-24 rounded-full bg-tarteeb-purple/30 overflow-hidden">
                    <img 
                      src="https://i.pravatar.cc/96?img=4" 
                      alt="User avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Profile Photo</p>
                    <p className="text-sm text-muted-foreground mb-2">Upload a new profile photo</p>
                    <Button variant="outline" size="sm">Change Photo</Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input defaultValue="Alex" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input defaultValue="Johnson" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input defaultValue="alex@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone (Optional)</label>
                    <Input defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
              </div>
              
              <div className="tarteeb-card p-6">
                <h3 className="text-lg font-semibold mb-4">Account Security</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Password</label>
                    <Input type="password" defaultValue="••••••••••" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">New Password</label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm Password</label>
                    <Input type="password" />
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <Button variant="outline" className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50">
                    <LogOut size={16} />
                    Sign Out
                  </Button>
                  <Button 
                    variant="default" 
                    onClick={handleSave}
                    className="bg-tarteeb-purple hover:bg-tarteeb-purple/90 flex items-center gap-2"
                  >
                    <Save size={16} />
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="animate-fade-in">
            <div className="tarteeb-card p-6">
              <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Task Reminders</p>
                    <p className="text-sm text-muted-foreground">Receive reminders about upcoming tasks</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">AI Insights</p>
                    <p className="text-sm text-muted-foreground">Receive AI-generated productivity insights</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Weekly Summaries</p>
                    <p className="text-sm text-muted-foreground">Get weekly productivity reports via email</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">System Updates</p>
                    <p className="text-sm text-muted-foreground">Get notified about new features and updates</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-4">Delivery Methods</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Notifications</label>
                    <Select defaultValue="important">
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All notifications</SelectItem>
                        <SelectItem value="important">Important only</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Browser Notifications</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All notifications</SelectItem>
                        <SelectItem value="important">Important only</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  variant="default" 
                  onClick={handleSave}
                  className="bg-tarteeb-purple hover:bg-tarteeb-purple/90 flex items-center gap-2"
                >
                  <Save size={16} />
                  Save Preferences
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="appearance" className="animate-fade-in">
            <div className="tarteeb-card p-6">
              <h3 className="text-lg font-semibold mb-4">Theme & Display</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
                  </div>
                  <Switch 
                    checked={isDarkMode} 
                    onCheckedChange={() => {
                      setIsDarkMode(!isDarkMode);
                      document.documentElement.classList.toggle('dark');
                    }} 
                  />
                </div>
                <Separator />
                <div className="py-2">
                  <p className="font-medium mb-2">Color Theme</p>
                  <div className="grid grid-cols-5 gap-2">
                    {['#353859', '#5755d9', '#2d7ff9', '#10b981', '#f97316'].map((color) => (
                      <div 
                        key={color}
                        className={`w-10 h-10 rounded-full cursor-pointer transition-all hover:scale-110 ${color === '#353859' ? 'ring-2 ring-tarteeb-purple ring-offset-2' : ''}`}
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="py-2">
                  <p className="font-medium mb-2">Font Size</p>
                  <div className="space-y-2">
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select font size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Show Animations</p>
                    <p className="text-sm text-muted-foreground">Enable UI animations and transitions</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  variant="default" 
                  onClick={handleSave}
                  className="bg-tarteeb-purple hover:bg-tarteeb-purple/90 flex items-center gap-2"
                >
                  <Save size={16} />
                  Save Preferences
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ai" className="animate-fade-in">
            <div className="tarteeb-card p-6">
              <h3 className="text-lg font-semibold mb-4">AI Assistant Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">AI Task Suggestions</p>
                    <p className="text-sm text-muted-foreground">Get AI-powered suggestions for task prioritization</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Task Auto-Categorization</p>
                    <p className="text-sm text-muted-foreground">Let AI categorize your tasks automatically</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Smart Time Allocation</p>
                    <p className="text-sm text-muted-foreground">AI will suggest optimal time slots for your tasks</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Productivity Insights</p>
                    <p className="text-sm text-muted-foreground">Get AI analysis of your productivity patterns</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <Separator />
                <div className="py-2">
                  <p className="font-medium mb-2">AI Suggestion Frequency</p>
                  <div className="space-y-2">
                    <Select defaultValue="balanced">
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="frequent">Frequent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="p-4 mt-6 bg-tarteeb-orange/10 rounded-lg flex items-start gap-3">
                <Brain className="text-tarteeb-orange mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium text-tarteeb-dark dark:text-white">AI Data Usage</p>
                  <p className="text-sm text-muted-foreground">
                    Tarteeb.io uses your task history and productivity patterns to provide personalized AI suggestions. Your data is processed securely and never shared with third parties.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  variant="default" 
                  onClick={handleSave}
                  className="bg-tarteeb-purple hover:bg-tarteeb-purple/90 flex items-center gap-2"
                >
                  <Save size={16} />
                  Save AI Settings
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
