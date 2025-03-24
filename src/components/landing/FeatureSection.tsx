
import { Battery, Brain, Calendar, Lightbulb, BarChartBig, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';

const features = [
  {
    icon: <Brain className="h-8 w-8 text-tarteeb-purple" />,
    title: "AI-Powered Task Prioritization",
    description: "Our AI intelligently prioritizes your tasks based on deadlines, importance, and your work patterns.",
  },
  {
    icon: <Calendar className="h-8 w-8 text-tarteeb-purple" />,
    title: "Smart Scheduling",
    description: "Get AI-generated optimal time slots for your tasks based on your productivity patterns and calendar.",
  },
  {
    icon: <Battery className="h-8 w-8 text-tarteeb-purple" />,
    title: "Sleep & Energy Tracking",
    description: "Monitor your sleep and energy levels to understand how they affect your productivity.",
  },
  {
    icon: <BarChartBig className="h-8 w-8 text-tarteeb-purple" />,
    title: "Performance Analytics",
    description: "Visualize your productivity trends and identify patterns to optimize your workflow.",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-tarteeb-purple" />,
    title: "AI Suggestions",
    description: "Receive personalized suggestions to improve your productivity and work-life balance.",
  },
  {
    icon: <Activity className="h-8 w-8 text-tarteeb-purple" />,
    title: "Productivity Insights",
    description: "Deep analytics into your working patterns to help you optimize your productivity.",
  },
];

const FeatureSection = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!visibleFeatures.includes(index)) {
              setVisibleFeatures(prev => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.feature-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [visibleFeatures]);

  return (
    <section className="py-24 px-4 bg-tarteeb-light/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-tarteeb-orange/10 text-tarteeb-orange text-sm font-medium inline-block mb-4">
            Smart Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-tarteeb-dark mb-4">
            AI-Powered Productivity Tools
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Unlock your full potential with our suite of AI-powered productivity tools designed to help you work smarter, not harder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              data-index={index}
              className={`feature-card tarteeb-card p-8 transition-all duration-700 transform ${
                visibleFeatures.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="mb-5 p-3 rounded-lg bg-tarteeb-light inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-tarteeb-dark">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
