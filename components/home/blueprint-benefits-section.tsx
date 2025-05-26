"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { 
  TrendingUp, 
  Target, 
  BarChart3, 
  LineChart, 
  Users, 
  LightbulbIcon,
  Search,
  FileBarChart,
  BookOpen,
  ChartPie
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "framer-motion";

type BenefitCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  delay?: number;
  isInView?: boolean;
};

function BenefitCard({ icon, title, description, className, delay = 0, isInView = false }: BenefitCardProps) {
  return (
    <div 
      className={cn(
        "p-6 rounded-xl bg-card border border-border/40 transition-all hover:shadow-md", 
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transform: isInView ? "none" : "translateY(20px)",
        opacity: isInView ? 1 : 0,
        transition: "transform 0.7s ease, opacity 0.7s ease"
      }}
    >
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export function BlueprintBenefitsSection() {
  const ref = useRef(null);
  const processRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const isProcessInView = useInView(processRef, { once: true, amount: 0.1 });
  
  const scrollToGrowthBlueprints = () => {
    const section = document.getElementById('growth-blueprints');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const benefits = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Data-Driven Growth",
      description: "Make strategic decisions based on market research and validated growth metrics instead of guesswork."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Targeted Strategies",
      description: "Focus your resources on proven acquisition and retention strategies tailored to your business stage."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Optimize Conversion",
      description: "Implement tested frameworks to improve your funnel conversion rates at every stage."
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Predictable Revenue",
      description: "Build sustainable growth models that deliver consistent, predictable revenue growth."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Customer Retention",
      description: "Reduce churn and increase lifetime value with proven retention strategies from successful SaaS companies."
    },
    {
      icon: <LightbulbIcon className="h-6 w-6" />,
      title: "Market Insights",
      description: "Gain competitive advantage with research-backed insights into customer behavior and market trends."
    }
  ];

  const researchProcess = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Market Research",
      description: "We analyze market trends, consumer behavior, and competitor strategies across the SaaS landscape."
    },
    {
      icon: <FileBarChart className="h-6 w-6" />,
      title: "Data Analysis",
      description: "Our team collects and analyzes performance metrics from successful SaaS companies to identify growth patterns."
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Expert Validation",
      description: "Each blueprint is validated by industry experts and successful founders to ensure practicality."
    },
    {
      icon: <ChartPie className="h-6 w-6" />,
      title: "Actionable Framework",
      description: "We transform complex findings into clear, step-by-step frameworks you can implement immediately."
    }
  ];

  return (
    <section className="py-16 bg-muted/30" id="blueprint-benefits">
      <div className="container mx-auto px-4">
        <div ref={ref}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-opensauce mb-4">
              How Growth Blueprints Help SaaS Founders
            </h2>
            <p className="text-lg text-muted-foreground">
              Our research-backed blueprints give you actionable strategies to overcome key challenges and accelerate growth at every stage of your SaaS journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                className="transform hover:-translate-y-1 transition-transform"
                delay={index * 100}
                isInView={isInView}
              />
            ))}
          </div>
          
          <div 
            className="mt-12 text-center"
            style={{
              transform: isInView ? "none" : "translateY(20px)",
              opacity: isInView ? 1 : 0,
              transition: "transform 0.7s ease, opacity 0.7s ease",
              transitionDelay: "600ms"
            }}
          >
            <Button 
              size="lg" 
              onClick={scrollToGrowthBlueprints}
            >
              Explore Growth Blueprints
            </Button>
          </div>
        </div>
        
        {/* Research Process Section */}
        <div ref={processRef} className="mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-opensauce mb-4">
              Our Research Process
            </h2>
            <p className="text-lg text-muted-foreground">
              Each growth blueprint is the result of a rigorous research methodology that combines data analysis, expert insights, and proven strategies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {researchProcess.map((process, index) => (
              <div 
                key={index}
                className="flex items-start gap-4"
                style={{
                  transform: isProcessInView ? "none" : "translateY(20px)",
                  opacity: isProcessInView ? 1 : 0,
                  transition: "transform 0.7s ease, opacity 0.7s ease",
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {process.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
                  <p className="text-muted-foreground">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 