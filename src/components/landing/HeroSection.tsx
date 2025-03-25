
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden tarteeb-gradient px-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
          <div className={`space-y-8 transform transition-all duration-700 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div>
              <span className="px-3 py-1 rounded-full bg-tarteeb-purple/10 text-tarteeb-purple text-sm font-medium inline-block mb-4 animate-pulse-light">
                AI-Powered Productivity
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-tarteeb-dark">
                Your AI-Powered Discipline Partner for Freelancing Success
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-lg">
                From chaotic tasks to organized success, let AI supercharge your day. Boost your productivity, track your progress.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/signin" className="tarteeb-button-primary flex items-center gap-2 group">
                Get Started
                <ArrowRight size={18} className="transform transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/signin" className="tarteeb-button-outline">
                Try for Free
              </Link>
            </div>
            
            <div className="pt-4 flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden">
                    <img 
                      src={`https://i.pravatar.cc/32?img=${i+10}`} 
                      alt="User avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-tarteeb-purple text-white text-xs flex items-center justify-center border-2 border-white">
                  +2k
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-tarteeb-dark">2,000+</span> professionals trust Tarteeb.io
              </p>
            </div>
          </div>
          
          <div className={`transform transition-all duration-700 delay-300 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="animate-float relative">
              <div className="w-full h-full absolute -inset-1 bg-gradient-to-r from-tarteeb-purple to-tarteeb-orange rounded-2xl blur opacity-20"></div>
              <div className="shadow-xl rounded-2xl overflow-hidden glass-effect relative transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] border border-white/40">
                <img 
                  src="/lovable-uploads/0bfe12b6-778b-4c2d-bc23-0e9e6545ab37.png" 
                  alt="Tarteeb.io dashboard" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
