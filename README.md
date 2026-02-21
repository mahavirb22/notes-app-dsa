# DSA Notes Web Application

A blazing-fast, modern notes application specifically designed for DSA learners to store, organize, and revisit algorithm/concept notes. Built with Next.js 14, PostgreSQL (Neon), Clerk Auth, and TanStack Query.

## ✨ Features

- ⚡ **Instant Performance**: Optimistic UI updates + aggressive client-side caching
- 🔐 **Authentication**: Secure authentication via Clerk
- 🗄️ **Serverless Database**: PostgreSQL via Neon with Prisma ORM
- 🎨 **Modern Dark UI**: Custom theme with electric cyan accents
- 📝 **Markdown Support**: Rich text with syntax highlighting for code blocks
- 🔍 **Smart Filters**: Search by title/content, filter by topic and difficulty
- ♻️ **Soft Delete**: Delete with undo option
- 🚀 **Edge Runtime**: Fast API routes with cold start elimination

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Custom Components
- **Database**: PostgreSQL (Neon) + Prisma ORM
- **Auth**: Clerk
- **State Management**: TanStack Query (React Query)
- **Markdown**: react-markdown + rehype-highlight
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Neon database account (free tier: https://neon.tech)
- A Clerk account (free tier: https://clerk.com)

### Installation

1. **Install dependencies**:

```bash
npm install
```

2. **Configure environment variables**:

Create a `.env` file in the root directory:

```env
# Neon PostgreSQL connection string
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

3. **Setup database**:

```bash
npm run db:push
```

4. **Run development server**:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📖 Detailed Setup Guide

See [SETUP.md](./SETUP.md) for comprehensive setup instructions including:

- Getting Neon database credentials
- Setting up Clerk authentication
- Project structure overview
- Deployment instructions
- Troubleshooting

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push Prisma schema to database
- `npm run db:studio` - Open Prisma Studio (database GUI)

## 📁 Project Structure

```
notes-app/
├── src/
│   ├── app/              # Next.js pages (App Router)
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and configs
│   └── types/           # TypeScript types
├── prisma/
│   └── schema.prisma    # Database schema
└── public/              # Static assets
```

## 🎯 Key Features Implementation

### Optimistic Updates

All CRUD operations update the UI immediately before server confirmation, providing an instant user experience.

### Aggressive Caching

TanStack Query configured with 5-minute stale time - notes load from cache instantly on revisit.

### Edge Runtime

All API routes use Edge Runtime for faster cold starts and better performance.

### Soft Delete with Undo

Notes are soft-deleted with a 3-second undo window before permanent deletion.

## 🌐 Deployment

Deploy to Vercel with one click:

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy!

Vercel automatically handles:

- Build optimization
- Prisma Client generation
- Edge Runtime support
- Automatic deployments

## 🙏 Acknowledgments

Built with modern web technologies to provide the best developer experience for DSA learners.
