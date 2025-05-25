-- Update Services Table Schema (if needed)
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}';

-- Delete existing services to avoid duplicates
DELETE FROM services WHERE slug IN ('content-marketing', 'lead-generation', 'market-research', 'growth-strategy');

-- Insert Content Marketing Service
INSERT INTO services (
  id, 
  title, 
  slug, 
  description, 
  features, 
  published,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(), 
  'Content Marketing', 
  'content-marketing', 
  'Create compelling content that engages your audience and builds brand authority. Our data-backed approach ensures your content resonates with your target users.',
  ARRAY[
    'SEO-optimized blog content',
    'Whitepapers & case studies',
    'Email campaigns',
    'Social media strategy'
  ],
  true,
  NOW(),
  NOW()
);

-- Insert Lead Generation Service
INSERT INTO services (
  id, 
  title, 
  slug, 
  description, 
  features, 
  published,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(), 
  'Lead Generation', 
  'lead-generation', 
  'Drive high-quality leads with targeted campaigns specifically designed for SaaS companies. We identify and engage potential customers at every stage of the funnel.',
  ARRAY[
    'Qualified lead targeting',
    'Conversion optimization',
    'Marketing automation',
    'Lead nurturing workflows'
  ],
  true,
  NOW(),
  NOW()
);

-- Insert Market Research Service
INSERT INTO services (
  id, 
  title, 
  slug, 
  description, 
  features, 
  published,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(), 
  'Market Research', 
  'market-research', 
  'Gain deep insights into your market with comprehensive research and competitor analysis. Understand trends, gaps, and opportunities within your niche.',
  ARRAY[
    'Competitor analysis',
    'Market sizing',
    'User interviews',
    'Trend forecasting'
  ],
  true,
  NOW(),
  NOW()
);

-- Insert Growth Strategy Service
INSERT INTO services (
  id, 
  title, 
  slug, 
  description, 
  features, 
  published,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(), 
  'Growth Strategy', 
  'growth-strategy', 
  'Develop data-backed growth strategies that align with your business goals. Our experts help you identify the most effective channels for sustainable growth.',
  ARRAY[
    'Channel optimization',
    'Pricing strategy',
    'Expansion planning',
    'Retention analysis'
  ],
  true,
  NOW(),
  NOW()
); 