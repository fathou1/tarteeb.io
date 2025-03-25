
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  ListTodo, 
  Calendar, 
  Moon, 
  Settings, 
  Puzzle, 
  ChevronLeft, 
  ChevronRight,
  Sun,
  User,
  MenuIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  isCollapsed: boolean;
  isActive: boolean;
}

const SidebarItem = ({ to, label, icon, isCollapsed, isActive }: SidebarItemProps) => (
  <TooltipProvider delayDuration={0}>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link 
          to={to} 
          className={cn(
            "flex items-center px-3 py-2.5 rounded-lg text-sidebar-foreground hover:text-white",
            "hover:bg-tarteeb-purple/30 transition-colors duration-200",
            isActive ? 'bg-tarteeb-purple text-white' : '',
            isCollapsed ? 'justify-center' : 'gap-3'
          )}
        >
          <span className="text-[20px] flex-shrink-0">{icon}</span>
          {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{label}</span>}
        </Link>
      </TooltipTrigger>
      {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
    </Tooltip>
  </TooltipProvider>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check for user's preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
    
    const checkSize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsCollapsed(true);
      } else if (window.innerWidth < 1024) {
        setIsMobile(false);
        setIsCollapsed(true);
      } else {
        setIsMobile(false);
        setIsCollapsed(false);
      }
    };
    
    checkSize();
    window.addEventListener('resize', checkSize);
    
    return () => window.removeEventListener('resize', checkSize);
  }, []);
  
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location, isMobile]);
  
  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setIsCollapsed(!isCollapsed);
      // Save preference
      localStorage.setItem('sidebar-collapsed', String(!isCollapsed));
    }
  };
  
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
      toast({
        title: "Light mode activated",
        description: "Your preference has been saved.",
      });
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
      toast({
        title: "Dark mode activated",
        description: "Your preference has been saved.",
      });
    }
  };
  
  const sidebarItems = [
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { to: '/tasks', label: 'Tasks', icon: <ListTodo size={20} /> },
    { to: '/calendar', label: 'Calendar', icon: <Calendar size={20} /> },
    { to: '/sleep', label: 'Sleep Tracking', icon: <Moon size={20} /> },
    { to: '/plugins', label: 'Plugins', icon: <Puzzle size={20} /> },
    { to: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const variants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 },
  };
  
  const sidebarWidth = isCollapsed ? 'w-[70px]' : 'w-64';
  
  return (
    <>
      {/* Toggle button for mobile */}
      {isMobile && (
        <button 
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-sidebar text-sidebar-foreground shadow-md hover:bg-sidebar-accent/20 transition-colors"
          aria-label="Toggle sidebar"
        >
          <MenuIcon size={20} />
        </button>
      )}
      
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          className={cn(
            "fixed top-0 left-0 z-40 h-full bg-sidebar border-r border-sidebar-border",
            "transition-all duration-300 ease-in-out",
            isMobile ? 'w-64' : sidebarWidth,
            isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'
          )}
          initial={isMobile ? "closed" : "open"}
          animate={isOpen || !isMobile ? "open" : "closed"}
          variants={variants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-4 flex items-center justify-between">
              {!isCollapsed && (
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-tarteeb-orange text-tarteeb-dark font-bold rounded-lg flex items-center justify-center">
                    T
                  </div>
                  <span className="text-xl font-bold text-white">Tarteeb.io</span>
                </Link>
              )}
              
              {isCollapsed && !isMobile && (
                <Link to="/" className="mx-auto">
                  <div className="w-8 h-8 bg-tarteeb-orange text-tarteeb-dark font-bold rounded-lg flex items-center justify-center">
                    T
                  </div>
                </Link>
              )}
              
              {!isMobile && (
                <button 
                  onClick={toggleSidebar}
                  className="text-sidebar-foreground hover:text-white transition-colors"
                  aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
              )}
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 py-6 px-2 space-y-1 overflow-y-auto scrollbar-none">
              <div className="space-y-4">
                <div className={cn("px-3 text-xs uppercase text-sidebar-foreground/50 font-semibold", isCollapsed && "text-center")}>
                  {!isCollapsed && 'Navigation'}
                </div>
                
                {sidebarItems.map((item) => (
                  <SidebarItem
                    key={item.to}
                    to={item.to}
                    label={item.label}
                    icon={item.icon}
                    isCollapsed={isCollapsed && !isMobile}
                    isActive={location.pathname === item.to}
                  />
                ))}
              </div>
            </nav>
            
            {/* Theme Toggle Button */}
            <div className="px-2 mb-2">
              <button
                onClick={toggleTheme}
                className={cn(
                  "w-full flex items-center px-3 py-2 rounded-lg text-sidebar-foreground", 
                  "hover:text-white hover:bg-tarteeb-purple/30 transition-colors duration-200",
                  isCollapsed && !isMobile ? 'justify-center' : 'gap-3'
                )}
              >
                <span className="text-[20px] flex-shrink-0">
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </span>
                {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </span>}
              </button>
            </div>
            
            {/* User profile at bottom */}
            <div className="p-4 border-t border-sidebar-border">
              <div className={cn("flex items-center", isCollapsed && !isMobile ? 'justify-center' : 'gap-3')}>
                <div className="w-8 h-8 rounded-full bg-tarteeb-purple/30 overflow-hidden flex-shrink-0">
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <User size={16} />
                  </div>
                </div>
                {!isCollapsed && (
                  <div>
                    <p className="text-sm font-medium text-white">Demo User</p>
                    <p className="text-xs text-sidebar-foreground">Free Plan</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
