export type GrowthBlueprint = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  image_url: string | null;
  categories: string[] | null;
  tags: string[] | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  image_url: string | null;
  features: string[] | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type AboutPageSection = {
  id: string;
  section_name: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
  order_index: number | null;
  updated_at: string;
};

export type Admin = {
  id: string;
  email: string;
  created_at: string;
}; 