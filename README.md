# BookNook Client

Frontend for **BookNook**, a small online library where readers browse, add and borrow books.

Live site: _add the Vercel URL after deployment_

## Features

- Home page with a Swiper slider, a "New Arrivals" section (latest six books from MongoDB) and extra info sections
- Email/password registration and login with password rules, plus Google sign-in (Better Auth with the MongoDB adapter)
- Private routes that send guests to login and return them to the page they asked for
- Add, edit and delete your own books, with cover image upload and a custom delete confirmation
- Borrow books with a return date, track them in My Borrows and return them with one click
- Live available-copies tracking, "Not Available" state and duplicate-borrow protection
- Light, dark and system themes, glassmorphic responsive design and Framer Motion animations

## Tech stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Better Auth, MongoDB, Swiper, Framer Motion. The Express API lives in the BookNook server repo.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev                  # http://localhost:3000
```

Environment variables are listed in `.env.example`. `JWT_SECRET` must match the server's value, and `NEXT_PUBLIC_API_URL` must point to the running API.
