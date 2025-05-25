# Fusion Focus Website

A Next.js website for Fusion Focus, a company providing data-driven research and growth strategies for SaaS founders.

## Features

- Growth Blueprints - Free research-backed strategies for SaaS founders
- Services - Professional services offered by the company
- About Page - Company information and mission
- Contact Form - For user inquiries
- Admin Dashboard - Secure admin area for content management

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase
- **Authentication**: Supabase Auth

## SQL Database Updates

There are SQL files in the `db` directory that can be used to update the database:

- `update-services.sql`: Updates the services data
- `update-blueprints.sql`: Updates the growth blueprints data

### How to run the SQL files

You can run these SQL files in your Supabase dashboard:

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the content of the SQL file you want to run
5. Click "Run" to execute the SQL

Alternatively, you can use the Supabase CLI to run the SQL files:

```bash
supabase db execute --file db/update-services.sql
supabase db execute --file db/update-blueprints.sql
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd fusion-focus-website
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

4. Set up Supabase database
- Create a new Supabase project
- Run the SQL scripts in the `supabase` directory:
  - First run `schema.sql` to create the tables
  - Then run `rls_policies.sql` to set up row-level security

5. Run the development server
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `app/` - Next.js app router pages and layouts
- `components/` - Reusable UI components
- `lib/` - Utility functions and libraries
- `public/` - Static assets
- `supabase/` - Supabase setup scripts and configuration
- `types/` - TypeScript type definitions

## Admin Access

To access the admin dashboard:

1. Add your email to the `admins` table in Supabase
2. Navigate to `/admin/login` and sign in
3. You'll be redirected to the admin dashboard

## Deployment

The site can be deployed to Vercel:

1. Push your code to a GitHub repository
2. Connect the repository to Vercel
3. Configure the environment variables
4. Deploy

## License

This project is licensed under the MIT License - see the LICENSE file for details. 