export type Database = {
  public: {
    Tables: {
      growth_blueprints: {
        Row: {
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
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          content?: string | null;
          image_url?: string | null;
          categories?: string[] | null;
          tags?: string[] | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          content?: string | null;
          image_url?: string | null;
          categories?: string[] | null;
          tags?: string[] | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
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
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          content?: string | null;
          image_url?: string | null;
          features?: string[] | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          content?: string | null;
          image_url?: string | null;
          features?: string[] | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          message: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          company?: string | null;
          message: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          company?: string | null;
          message?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      about_page: {
        Row: {
          id: string;
          section_name: string;
          title: string | null;
          content: string | null;
          image_url: string | null;
          order_index: number | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section_name: string;
          title?: string | null;
          content?: string | null;
          image_url?: string | null;
          order_index?: number | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section_name?: string;
          title?: string | null;
          content?: string | null;
          image_url?: string | null;
          order_index?: number | null;
          updated_at?: string;
        };
      };
      admins: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
        };
      };
    };
  };
}; 