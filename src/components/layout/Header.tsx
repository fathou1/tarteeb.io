
import { useState, useEffect } from 'react';
import { Bell, Sun, Moon, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Check for user's preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isMobile && (
            <div className="w-8 h-8 bg-tarteeb-orange text-tarteeb-dark font-bold rounded-lg flex items-center justify-center">
              T
            </div>
          )}
          <h1 className="text-xl md:text-2xl font-semibold text-tarteeb-dark dark:text-white">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          {!isMobile && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-muted-foreground" />
              </div>
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full md:w-60 h-9 bg-muted dark:bg-muted/20 rounded-lg pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-tarteeb-purple"
              />
            </div>
          )}
          
          <button 
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-muted dark:bg-muted/20 hover:bg-muted-foreground/10 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} className="text-muted-foreground" />
          </button>
          
          <button 
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-muted dark:bg-muted/20 hover:bg-muted-foreground/10 transition-colors"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun size={18} className="text-muted-foreground" />
            ) : (
              <Moon size={18} className="text-muted-foreground" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
