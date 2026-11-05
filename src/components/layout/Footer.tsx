import Link from "next/link";
import { Mail } from "lucide-react";
import Logo from "@/components/shared/Logo";

const social = [
  {
    label: "X",
    href: "https://x.com",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.026 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z",
  },
  {
    label: "GitHub",
    href: "https://github.com/w3tarikul",
    path: "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z",
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 px-3 pb-3">
      <div className="glass mx-auto max-w-7xl rounded-3xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">
              A cosy little online library. Browse, share and borrow books from readers in your community.
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <h3 className="font-semibold">Explore</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link className="hover:text-primary" href="/books">All Books</Link></li>
              <li><Link className="hover:text-primary" href="/add-book">Add a Book</Link></li>
              <li><Link className="hover:text-primary" href="/my-borrows">My Borrows</Link></li>
            </ul>
          </div>
          <div className="space-y-3 text-sm">
            <h3 className="font-semibold">Contact</h3>
            <a href="mailto:hello@booknook.app" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
              <Mail className="size-4" /> hello@booknook.app
            </a>
            <div className="flex gap-2 pt-1">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-full border transition hover:-translate-y-0.5 hover:bg-accent hover:text-primary"
                >
                  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-8 border-t pt-5 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} BookNook. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
