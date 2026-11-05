import type { Metadata } from "next";
import ProfileCard from "@/components/auth/ProfileCard";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = { title: "My Profile" };

export default function ProfilePage() {
  return (
    <>
      <PageHeader title="My Profile" />
      <ProfileCard />
    </>
  );
}
