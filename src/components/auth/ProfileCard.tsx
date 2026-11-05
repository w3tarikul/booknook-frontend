"use client";

import { Mail, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Spinner from "@/components/shared/Spinner";
import { useSession } from "@/lib/auth-client";
import { formatDate } from "@/lib/format";

export default function ProfileCard() {
  const { data: session, isPending } = useSession();
  if (isPending || !session) return <Spinner label="Loading your profile..." />;
  const { user } = session;
  return (
    <div className="glass mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl p-8 text-center">
      <Avatar className="size-24">
        <AvatarImage src={user.image || undefined} alt={user.name} />
        <AvatarFallback className="text-3xl">{user.name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="flex items-center justify-center gap-1.5 text-muted-foreground">
          <Mail className="size-4" /> {user.email}
        </p>
      </div>
      <p className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">
        <ShieldCheck className="size-3.5" /> Member since {formatDate(user.createdAt)}
      </p>
    </div>
  );
}
