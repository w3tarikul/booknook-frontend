# BookNook

A small online library where readers browse books, add their own, borrow them for a few days and return them.

- **Live site:** _added after deployment_
- Server repo: [booknook-backend](https://github.com/w3tarikul/booknook-backend)

## Features

- **Home page** with a Swiper slider (three slides with "Browse Books" buttons), a "New Arrivals" section showing the latest six books from MongoDB, and two extra sections
- **Authentication** with email and password (uppercase, lowercase and 6+ character rules) and Google sign-in, using Better Auth with the MongoDB adapter. No email verification
- **Private routes** that send guests to Login and bring them back to the page they asked for. Sessions persist across reloads
- **Add a book** with cover image upload (imgbb), description, total copies and read-only owner details
- **My Books**: edit with a pre-filled form and delete with a custom confirmation modal
- **Borrowing**: borrow modal with a return date, a My Borrows list and a Return button
- **Copy tracking**: available copies go down on borrow and up on return, a "Not Available" state at zero, and no duplicate active borrows
- **All Books** page with search and category filter, three cards per row on desktop
- **Light, dark and system themes**, glassmorphic responsive design, Framer Motion animations, loading spinners and skeletons, a custom 404 page and per-page titles like "BookNook | All Books"

## Tech stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Better Auth, MongoDB, Swiper, Framer Motion, next-themes. The Express API is in the server repo.

## Pages

| Route | Access | Page |
| --- | --- | --- |
| `/` | Public | Home |
| `/books` | Public | All Books |
| `/books/:id` | Private | Book details and borrow |
| `/add-book` | Private | Add a book |
| `/my-books` | Private | Your books, edit and delete |
| `/my-borrows` | Private | Your borrows and returns |
| `/profile` | Private | Your profile |
| `/login`, `/register` | Public | Authentication |

## How it works

- Better Auth stores users and sessions in MongoDB. Route protection is in `src/proxy.ts`.
- For API calls, `/api/token` checks the session and issues a JWT (3 days). The client sends it to the Express server, which verifies it with the shared `JWT_SECRET`.
- Cover images are uploaded from the browser to imgbb and the returned URL is saved with the book.

## Getting started

```bash
npm install
cp .env.example .env.local    # then fill in the values
npm run dev                   # http://localhost:3000
```

Run the [server](https://github.com/w3tarikul/booknook-backend) as well, on the port set in `NEXT_PUBLIC_API_URL`.

### Environment variables

| Name | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string (include the database name) |
| `BETTER_AUTH_SECRET` | Random secret for Better Auth |
| `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL` | The site's own URL |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth credentials. Redirect URI: `<site url>/api/auth/callback/google` |
| `JWT_SECRET` | Must match the server's `JWT_SECRET` |
| `NEXT_PUBLIC_API_URL` | URL of the Express server |
| `NEXT_PUBLIC_IMGBB_KEY` | imgbb API key for cover uploads |

## Scripts

- `npm run dev` start the dev server
- `npm run build` production build
- `npm start` run the production build
- `npm run lint` lint the code
