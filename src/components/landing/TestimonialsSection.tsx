
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Freelance Designer",
    avatar: "https://i.pravatar.cc/100?img=1",
    quote: "Tarteeb.io transformed how I manage my design projects. The AI suggestions are spot-on and save me hours every week.",
    stars: 5
  },
  {
    name: "Michael Chen",
    role: "Software Developer",
    avatar: "https://i.pravatar.cc/100?img=3",
    quote: "As a developer juggling multiple projects, I need a system that thinks ahead. Tarteeb.io does exactly that, predicting what I need before I know it.",
    stars: 5
  },
  {
    name: "Emma Rodriguez",
    role: "Content Creator",
    avatar: "https://i.pravatar.cc/100?img=5",
    quote: "The sleep tracking feature helped me realize how my content quality correlates with my rest. Now I'm more productive and creating better work.",
    stars: 4
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    
    const element = document.querySelector('.testimonials-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (isVisible) {
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isVisible]);
  
  return (
    <section className="py-24 px-4 testimonials-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-tarteeb-purple/10 text-tarteeb-purple text-sm font-medium inline-block mb-4">
            Customer Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-tarteeb-dark mb-4">
            Loved by Professionals Worldwide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how Tarteeb.io is helping professionals like you achieve more with less stress.
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white dark:bg-card rounded-xl p-8 shadow-sm border border-border max-w-3xl mx-auto">
                    <div className="flex gap-2 mb-4">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < testimonial.stars ? "fill-tarteeb-orange text-tarteeb-orange" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <p className="text-lg font-medium text-tarteeb-dark mb-6 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-tarteeb-dark">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? 'bg-tarteeb-purple' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
