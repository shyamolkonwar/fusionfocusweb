-- Update Growth Blueprints Table Schema (if needed)
ALTER TABLE growth_blueprints 
ADD COLUMN IF NOT EXISTS categories TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Delete existing blueprints to avoid duplicates (optional - remove this if you want to keep existing data)
-- DELETE FROM growth_blueprints WHERE slug IN ('saas-customer-acquisition', 'saas-retention-strategies', 'saas-pricing-optimization');

-- Insert SaaS Customer Acquisition Blueprint
INSERT INTO growth_blueprints (
  id, 
  title, 
  slug, 
  description, 
  categories,
  tags,
  published,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(), 
  'SaaS Customer Acquisition Blueprint', 
  'saas-customer-acquisition', 
  'A comprehensive guide to acquiring customers for your SaaS product using data-driven methods',
  ARRAY['Marketing', 'Acquisition'],
  ARRAY['saas', 'marketing', 'customer-acquisition', 'lead-generation'],
  true,
  NOW(),
  NOW()
);

-- Insert SaaS User Retention Strategies
INSERT INTO growth_blueprints (
  id, 
  title, 
  slug, 
  description, 
  categories,
  tags,
  published,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(), 
  'SaaS User Retention Strategies', 
  'saas-retention-strategies', 
  'Proven strategies to improve user retention and reduce churn for SaaS businesses',
  ARRAY['Growth', 'Retention'],
  ARRAY['saas', 'retention', 'churn-reduction', 'customer-success'],
  true,
  NOW(),
  NOW()
);

-- Insert SaaS Pricing Optimization Guide
INSERT INTO growth_blueprints (
  id, 
  title, 
  slug, 
  description, 
  categories,
  tags,
  published,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(), 
  'SaaS Pricing Optimization Guide', 
  'saas-pricing-optimization', 
  'Learn how to optimize your SaaS pricing strategy for maximum revenue and customer satisfaction',
  ARRAY['Strategy', 'Pricing'],
  ARRAY['saas', 'pricing', 'revenue-optimization', 'monetization'],
  true,
  NOW(),
  NOW()
); 