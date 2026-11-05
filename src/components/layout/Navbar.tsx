"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, User, LogOut } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/components/shared/Logo";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "@/lib/auth-client";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];
const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const user = session?.user;
  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  async function handleLogout() {
    await signOut();
    toast.success("You have been logged out. See you soon!");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 px-3 pt-3">
      <div className="glass mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition hover:bg-accent ${
                isActive(l.href) ? "bg-accent text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isPending ? (
            <div className="size-9 animate-pulse rounded-full bg-muted" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger aria-label="Open account menu" className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Avatar className="size-9">
                  <AvatarImage src={user.image || undefined} alt={user.name} />
                  <AvatarFallback>{user.name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-52">
                <div className="px-2 py-2">
                  <p className="truncate text-sm font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="size-4" /> My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="size-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost" size="lg" render={<Link href="/login" />} nativeButton={false}>
                Login
              </Button>
              <Button size="lg" render={<Link href="/register" />} nativeButton={false}>
                Register
              </Button>
            </div>
          )}
          <button
            className="grid size-9 place-items-center rounded-full border lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass mx-auto mt-2 max-w-7xl rounded-2xl p-3 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-2.5 text-sm font-medium ${isActive(l.href) ? "bg-accent text-primary" : ""}`}
              >
                {l.label}
              </Link>
            ))}
            {!user && !isPending && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button variant="outline" size="lg" render={<Link href="/login" onClick={() => setOpen(false)} />} nativeButton={false}>
                  Login
                </Button>
                <Button size="lg" render={<Link href="/register" onClick={() => setOpen(false)} />} nativeButton={false}>
                  Register
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
