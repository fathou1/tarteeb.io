
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  
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
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      
      <div className="flex-1 ml-0 md:ml-64 transition-all duration-300">
        <Header title={title} />
        
        <main id="dashboard-content" className="p-4 md:p-6 pb-24">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
