# Baylat Properties Frontend

The Baylat Properties website is a Next.js 15 app for browsing Nigerian property listings and contacting the Baylat team. It uses React 19, TypeScript, and Tailwind CSS, with listing and account data supplied by the separate Express API.

## Features

- Home, About, Services, Contact, property search, and property detail pages.
- Listing filters, sorting, and pagination backed by the API.
- Admin dashboard for creating, editing, and removing listings.
- Per-property YouTube video links, embedded on the property detail page.
- Contact and property inquiry forms.
- Responsive layout and shared navigation, property cards, and other UI components.

Property photos are uploaded to Cloudinary through the backend. Property videos are hosted on YouTube; the frontend stores and displays the YouTube URL attached to each listing.

## Run locally

Use Node.js 20 or later. Start the backend separately before using pages that load API data.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The development server uses Next.js's default port unless `PORT` is set.

The frontend's Axios base URL is configured in `src/utils/api/api.js`. It currently points to `http://localhost:5000/api`; point it to the deployed backend API before deploying the frontend.

## Useful commands

```bash
npm run dev         # Start the development server
npm run type-check  # Run TypeScript without emitting files
npm run lint        # Run the configured Next.js lint command
npm run build       # Create a production build
npm run start       # Serve a production build
```

## Project layout

```text
src/app/          App Router pages and route-specific UI
src/components/   Shared layout, property, home, and UI components
src/utils/api/    Axios client and backend API helpers
src/types/        Shared TypeScript types
src/lib/          Formatting helpers and static content
public/           Static images and other public assets
```

## Deployment

Deploy this directory as a Next.js application (for example, on Vercel). Configure the API base URL in `src/utils/api/api.js` to point to the deployed backend, then build with `npm run build`. The backend must allow the deployed site origin in its CORS configuration and support credentialed requests for admin authentication.

The frontend and backend are separate Git repositories in this workspace. Deploy and maintain them independently.
