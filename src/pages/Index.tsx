
import { Link } from 'react-router-dom';
import HeroSection from '@/components/landing/HeroSection';
import FeatureSection from '@/components/landing/FeatureSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-tarteeb-orange text-tarteeb-dark font-bold rounded-lg flex items-center justify-center">
              T
            </div>
            <span className="text-xl font-bold text-tarteeb-dark dark:text-white">Tarteeb.io</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-tarteeb-dark dark:text-white hover:text-tarteeb-purple dark:hover:text-tarteeb-purple transition-colors">
              Features
            </Link>
            <Link to="/" className="text-sm font-medium text-tarteeb-dark dark:text-white hover:text-tarteeb-purple dark:hover:text-tarteeb-purple transition-colors">
              Blog
            </Link>
            <Link to="/" className="text-sm font-medium text-tarteeb-dark dark:text-white hover:text-tarteeb-purple dark:hover:text-tarteeb-purple transition-colors">
              Pricing
            </Link>
            <Link to="/" className="text-sm font-medium text-tarteeb-dark dark:text-white hover:text-tarteeb-purple dark:hover:text-tarteeb-purple transition-colors">
              Updates
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <Link to="/signin" className="hidden md:inline-block text-sm font-medium px-4 py-2 rounded-lg hover:bg-muted transition-colors">
              Log in
            </Link>
            <Link to="/signin" className="tarteeb-button-primary text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </header>
      
      <main>
        <HeroSection />
        <FeatureSection />
        <TestimonialsSection />
        
        <section className="py-24 px-4 bg-tarteeb-dark text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Organize Smart, Achieve More!
            </h2>
            <p className="text-lg mb-8 text-gray-300">
              Ready to transform your productivity with AI-powered task management? Start your journey today.
            </p>
            <Link to="/signin" className="inline-block px-8 py-3 font-medium rounded-lg bg-tarteeb-orange text-tarteeb-dark hover:bg-tarteeb-orange/90 transition-colors">
              Start for Free
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="bg-tarteeb-light dark:bg-tarteeb-dark/80 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-tarteeb-orange text-tarteeb-dark font-bold rounded-lg flex items-center justify-center">
                  T
                </div>
                <span className="text-xl font-bold text-tarteeb-dark dark:text-white">Tarteeb.io</span>
              </Link>
              <p className="mt-4 text-muted-foreground text-sm">
                AI-Powered Productivity Tool for Freelancers and Professionals
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-tarteeb-dark dark:text-white">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-muted-foreground hover:text-tarteeb-purple transition-colors">Features</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-tarteeb-purple transition-colors">Integrations</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-tarteeb-purple transition-colors">Pricing</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-tarteeb-purple transition-colors">Updates</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-tarteeb-dark dark:text-white">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-muted-foreground hover:text-tarteeb-purple transition-colors">Blog</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-tarteeb-purple transition-colors">Documentation</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-tarteeb-purple transition-colors">Help Center</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-tarteeb-purple transition-colors">Community</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-tarteeb-dark dark:text-white">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-muted-foreground hover:text-tarteeb-purple transition-colors">About</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-tarteeb-purple transition-colors">Careers</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-tarteeb-purple transition-colors">Privacy</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-tarteeb-purple transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Tarteeb.io. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
