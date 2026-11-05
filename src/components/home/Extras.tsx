import Link from "next/link";
import { BookPlus, CalendarCheck, Library, Search, Sparkles, Users } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";

const steps = [
  { icon: Search, title: "Find a book", text: "Search the shelves by title, author or category." },
  { icon: CalendarCheck, title: "Borrow it", text: "Choose a return date and the book is yours for a while." },
  { icon: BookPlus, title: "Share yours", text: "Add your own books so others can borrow them too." },
];

const perks = [
  { icon: Library, title: "Always growing", text: "New books land every day from readers like you." },
  { icon: Users, title: "Community first", text: "Every copy on the shelf comes from a fellow reader." },
  { icon: Sparkles, title: "Simple and free", text: "No fees, no clutter. Just books, borrowed with ease." },
];

export default function Extras() {
  return (
    <>
      <section className="space-y-8">
        <Reveal className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">How BookNook works</h2>
          <p className="text-muted-foreground">Three easy steps from curious to cosy.</p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="glass h-full space-y-3 rounded-2xl p-6 transition hover:-translate-y-1">
                <span className="grid size-12 place-items-center rounded-xl bg-accent text-primary">
                  <s.icon className="size-6" />
                </span>
                <h3 className="text-lg font-semibold">
                  {i + 1}. {s.title}
                </h3>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <section className="glass grid gap-8 rounded-3xl p-8 md:grid-cols-[1.1fr_1.4fr] md:p-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Why readers love BookNook</h2>
            <p className="text-muted-foreground">A tiny library with a big heart, built to keep stories moving from shelf to shelf.</p>
            <Button size="lg" className="h-10 px-5" render={<Link href="/register" />} nativeButton={false}>
              Join for free
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            {perks.map((p) => (
              <div key={p.title} className="space-y-2 rounded-2xl border bg-background/40 p-4">
                <p.icon className="size-5 text-primary" />
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </>
  );
}
