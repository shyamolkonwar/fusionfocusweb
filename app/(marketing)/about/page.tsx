import { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase";
import { AboutPageSection } from "@/types/supabase";

export const metadata: Metadata = {
  title: "About Us | Data-Driven SaaS Research",
  description: "Learn about Fusion Focus, our mission, vision, and the team behind our data-driven SaaS research and marketing solutions.",
};

async function getAboutPageSections() {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('about_page')
    .select('*')
    .order('order_index');
    
  if (error) {
    console.error('Error fetching about page content:', error);
    return [];
  }
  
  return data as AboutPageSection[];
}

export default async function AboutPage() {
  const sections = await getAboutPageSections();
  
  // Define fallback content if no data is retrieved from the database
  const fallbackSections = [
    {
      section_name: "mission",
      title: "Our Mission",
      content: "<p>Our mission is to empower SaaS founders with data-driven research and insights that lead to informed decisions and sustainable growth. We believe that success in the competitive SaaS landscape requires a deep understanding of market dynamics, user needs, and emerging trends.</p>",
    },
    {
      section_name: "vision",
      title: "Our Vision",
      content: "<p>We envision a future where every SaaS company, regardless of size, has access to high-quality market research and data-driven strategies that were once only available to enterprise organizations with substantial budgets.</p>",
    },
    {
      section_name: "story",
      title: "Our Story",
      content: "<p>Fusion Focus was born from a simple observation: SaaS founders were making critical business decisions based on intuition rather than data. Our founder, having worked with numerous startups, witnessed how this approach often led to misaligned products, ineffective marketing, and stunted growth.</p><p>We started as a small research team in 2024, dedicated to providing affordable, high-quality market insights to early-stage SaaS companies. Since then, we've expanded our services and team, while maintaining our core commitment to data-driven decision making.</p>",
    },
    {
      section_name: "values",
      title: "Our Values",
      content: "<p>At Fusion Focus, our work is guided by these core values:</p><ul><li><strong>Data-Driven Excellence:</strong> We believe in the power of data to reveal insights and guide strategic decisions.</li><li><strong>Founder-Centric Approach:</strong> We understand the unique challenges SaaS founders face and tailor our work to address them directly.</li><li><strong>Continuous Learning:</strong> The technology landscape evolves rapidly, and we're committed to staying ahead of trends and methodologies.</li><li><strong>Transparent Partnership:</strong> We build relationships based on honesty, clear communication, and shared goals.</li></ul>",
    },
  ];
  
  // Use data from the database if available, otherwise use fallback content
  const displaySections = sections.length > 0 ? sections : fallbackSections;
  
  // Find specific sections by name
  const findSection = (name: string) => {
    return displaySections.find(section => section.section_name === name);
  };
  
  const missionSection = findSection("mission");
  const visionSection = findSection("vision");
  const storySection = findSection("story");
  const valuesSection = findSection("values");
  const teamSection = findSection("team");

  return (
    <div className="pt-16 pb-24">
      {/* Hero Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-opensauce mb-6">
              About Fusion Focus
            </h1>
            <p className="text-lg text-muted-foreground">
              We're on a mission to transform how SaaS companies understand their markets and make strategic decisions.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {missionSection && (
              <div>
                <h2 className="text-2xl font-bold font-opensauce mb-4">
                  {missionSection.title || "Our Mission"}
                </h2>
                <div 
                  className="prose prose-slate dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: missionSection.content || "" }}
                />
              </div>
            )}
            
            {visionSection && (
              <div>
                <h2 className="text-2xl font-bold font-opensauce mb-4">
                  {visionSection.title || "Our Vision"}
                </h2>
                <div 
                  className="prose prose-slate dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: visionSection.content || "" }}
                />
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      {storySection && (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold font-opensauce mb-6 text-center">
                {storySection.title || "Our Story"}
              </h2>
              <div 
                className="prose prose-slate dark:prose-invert mx-auto"
                dangerouslySetInnerHTML={{ __html: storySection.content || "" }}
              />
            </div>
          </div>
        </section>
      )}
      
      {/* Our Values */}
      {valuesSection && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold font-opensauce mb-6 text-center">
                {valuesSection.title || "Our Values"}
              </h2>
              <div 
                className="prose prose-slate dark:prose-invert mx-auto"
                dangerouslySetInnerHTML={{ __html: valuesSection.content || "" }}
              />
            </div>
          </div>
        </section>
      )}
      
      {/* Team Section */}
      {teamSection && (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold font-opensauce mb-6 text-center">
              {teamSection.title || "Our Team"}
            </h2>
            <div 
              className="prose prose-slate dark:prose-invert mx-auto text-center mb-12"
              dangerouslySetInnerHTML={{ __html: teamSection.content || "" }}
            />
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-opensauce mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how our data-driven approach can help your SaaS business thrive.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Contact Us
              </a>
              <a 
                href="/#growth-blueprints" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                View Growth Blueprints
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}