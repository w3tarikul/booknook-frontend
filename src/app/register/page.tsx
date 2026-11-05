import type { Metadata } from "next";
import { Suspense } from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import Spinner from "@/components/shared/Spinner";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <RegisterForm />
    </Suspense>
  );
}
