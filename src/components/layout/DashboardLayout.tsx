
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

// Create a context to manage language settings
export const useLanguage = () => {
  const storedLanguage = localStorage.getItem('language') || 'en';
  const [language, setLanguage] = useState(storedLanguage);
  
  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Set RTL direction for Arabic
    if (newLanguage === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  };
  
  // Initialize direction on component mount
  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, []);
  
  return { language, changeLanguage };
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Add animation classes to children when route changes
  useEffect(() => {
    const main = document.getElementById('dashboard-content');
    if (main) {
      main.classList.add('animate-fade-in');
      
      const timer = setTimeout(() => {
        main.classList.remove('animate-fade-in');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);
  
  return (
    <div className="min-h-screen flex bg-background dark:bg-background relative">
      <Sidebar />
      
      <div className={cn(
        "flex-1 transition-all duration-300",
        "md:ml-[70px] lg:ml-64",
      )}>
        <Header title={title} />
        
        <main 
          id="dashboard-content" 
          className="p-4 md:p-6 pb-24 max-w-screen-2xl mx-auto"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
