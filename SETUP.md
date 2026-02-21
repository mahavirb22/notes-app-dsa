# DSA Notes - Setup Guide

A blazing-fast, modern notes application for DSA learners built with Next.js 14, PostgreSQL (Neon), Clerk Auth, and TanStack Query.

## Features

- ⚡ **Instant Performance**: Optimistic UI updates + aggressive client-side caching
- 🔐 **Authentication**: Clerk for seamless sign-in/sign-up
- 🗄️ **Database**: PostgreSQL via Neon's serverless platform with Prisma ORM
- 🎨 **Modern UI**: Tailwind CSS + custom dark theme with cyan accents
- 📝 **Markdown Support**: Rich text with syntax highlighting for code blocks
- 🔍 **Smart Filters**: Search by title/content, filter by topic and difficulty
- ♻️ **Soft Delete**: Delete with 3-second undo window
- 🚀 **Edge Runtime**: API routes optimized for cold start elimination

## Prerequisites

- Node.js 18+ and npm
- A Neon database account (free tier available at https://neon.tech)
- A Clerk account (free tier available at https://clerk.com)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
cd notes-app
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (or copy from `.env.example`):

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

#### Getting Your Neon Database URL:

1. Go to https://neon.tech and create a free account
2. Create a new project
3. Copy the connection string from the dashboard
4. Paste it as your `DATABASE_URL`

#### Getting Your Clerk Keys:

1. Go to https://clerk.com and create a free account
2. Create a new application
3. Copy the publishable key and secret key from the "API Keys" section
4. Paste them into your `.env` file

### 3. Setup Database

Generate Prisma Client and push schema to database:

```bash
npm run db:push
```

This command will:

- Generate the Prisma Client
- Create the `Note` table in your Neon database
- Set up all indexes

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see your app!

## Project Structure

```
notes-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # Edge API routes
│   │   │   └── notes/         # CRUD endpoints
│   │   ├── notes/             # Note pages
│   │   │   ├── new/          # Create note page
│   │   │   └── [id]/         # View/Edit note pages
│   │   ├── sign-in/          # Clerk sign-in page
│   │   ├── sign-up/          # Clerk sign-up page
│   │   ├── layout.tsx        # Root layout with providers
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components
│   │   ├── NoteCard.tsx      # Note card component
│   │   ├── NoteForm.tsx      # Create/Edit form
│   │   ├── NotesList.tsx     # Notes grid with filters
│   │   ├── MarkdownRenderer.tsx # Markdown display
│   │   └── Providers.tsx     # Query Client + Toaster
│   ├── hooks/                 # Custom React hooks
│   │   └── useNotes.ts       # All CRUD hooks with optimistic updates
│   ├── lib/                   # Utilities and configs
│   │   ├── prisma.ts         # Prisma client (Neon adapter)
│   │   ├── queryClient.ts    # TanStack Query config
│   │   └── utils.ts          # Helper functions
│   ├── types/                 # TypeScript types
│   │   └── note.ts           # Note interfaces
│   └── middleware.ts          # Clerk auth middleware
├── prisma/
│   └── schema.prisma          # Database schema
├── .env                       # Environment variables (not in git)
├── .env.example               # Example env file
├── next.config.mjs            # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS config
└── package.json               # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push Prisma schema to database
- `npm run db:studio` - Open Prisma Studio (database GUI)

## Key Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Prisma** - Type-safe database ORM
- **Neon** - Serverless PostgreSQL
- **Clerk** - Authentication and user management
- **TanStack Query** - Data fetching and caching
- **React Markdown** - Markdown rendering
- **Highlight.js** - Syntax highlighting
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

## Performance Optimizations

1. **Optimistic Updates**: UI updates immediately before API confirms
2. **Aggressive Caching**: 5-minute stale time on notes queries
3. **Edge Runtime**: All API routes use Edge Runtime for faster cold starts
4. **Neon Serverless**: Connection pooling via `@neondatabase/serverless`
5. **Skeleton Loaders**: Smooth loading states, never blank screens

## Deployment to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com and import your repository
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - All other Clerk env vars
4. Deploy!

Vercel will automatically:

- Detect Next.js and configure build settings
- Run `prisma generate` via postinstall script
- Deploy with Edge Runtime support
- Enable automatic deployments on git push

## Troubleshooting

### Database Connection Issues

- Ensure your Neon connection string includes `?sslmode=require`
- Check that your Neon project is active (free tier may pause after inactivity)

### Clerk Authentication Not Working

- Verify all Clerk environment variables are set correctly
- Ensure URLs in Clerk dashboard match your deployment URL

### Prisma Client Errors

- Run `npm run db:push` to regenerate the client
- Delete `node_modules/.prisma` and run `npm install` again

### Build Errors

- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`
- Check that all environment variables are set in Vercel

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
