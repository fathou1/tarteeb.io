
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
  ChevronRight 
} from 'lucide-react';

interface SidebarItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  isCollapsed: boolean;
  isActive: boolean;
}

const SidebarItem = ({ to, label, icon, isCollapsed, isActive }: SidebarItemProps) => (
  <Link 
    to={to} 
    className={`sidebar-item ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-center' : ''}`}
  >
    <span className="text-[20px]">{icon}</span>
    {!isCollapsed && <span>{label}</span>}
  </Link>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
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
  
  const sidebarClasses = `
    fixed top-0 left-0 z-40 h-full bg-sidebar
    ${isMobile ? 'w-64' : isCollapsed ? 'w-[70px]' : 'w-64'}
    transition-all duration-300 ease-in-out
    border-r border-sidebar-border
    ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
  `;
  
  return (
    <>
      {/* Toggle button for mobile */}
      {isMobile && (
        <button 
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-tarteeb-dark text-white shadow-md"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
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
          className={sidebarClasses}
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
            <nav className="flex-1 py-8 px-2 space-y-1">
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
            </nav>
            
            {/* User profile at bottom */}
            <div className="p-4 border-t border-sidebar-border">
              <div className={`flex ${isCollapsed && !isMobile ? 'justify-center' : 'items-center gap-3'}`}>
                <div className="w-8 h-8 rounded-full bg-tarteeb-purple/30 overflow-hidden">
                  <img 
                    src="https://i.pravatar.cc/32?img=4" 
                    alt="User avatar" 
                    className="w-full h-full object-cover"
                  />
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
