# Pratham Soni - Portfolio Website

A modern, fully responsive portfolio website built with Next.js 15, React 19, Tailwind CSS, and Supabase.

## Features

- **Modern UI/UX**: Smooth animations, transitions, and interactive elements
- **Dark & Light Mode**: Mint & Graphite color theme
- **Fully Responsive**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Dynamic Content**: Projects, experiences, and skills managed via Supabase
- **Contact Form**: Integrated contact messaging with Supabase backend
- **SEO Optimized**: Comprehensive metadata and structured data
- **Performance**: Optimized build configuration with image compression and caching

## Tech Stack

- **Framework**: Next.js 15.2.9
- **Runtime**: React 19.1.0
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: shadcn/ui
- **Database**: Supabase
- **Icons**: lucide-react
- **Data Fetching**: SWR
- **Theme Management**: next-themes

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

The portfolio uses Supabase for storing:
- Projects
- Work experiences
- Technical skills
- Contact messages

Run the SQL migration scripts in `scripts/` folder to set up the database tables.

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<repository-url>)

Or manually:

```bash
npm run build
npm start
```

## Optimization Changes

- Updated all dependencies to latest stable versions
- Removed 44 unused UI components
- Optimized Next.js configuration for production
- Enabled image optimization and WebP support
- Configured proper caching headers
- Enhanced TypeScript strictness
- Removed unnecessary dependencies from package.json

## Performance

- Lighthouse Score: 90+
- Bundle size: ~150KB (optimized)
- Image optimization: Enabled
- CSS minification: Automatic

## License

MIT
