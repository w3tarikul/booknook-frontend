import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import NewArrivals from "@/components/home/NewArrivals";
import Extras from "@/components/home/Extras";

export const metadata: Metadata = { title: { absolute: "BookNook | Home" } };

export default function Home() {
  return (
    <div className="space-y-20">
      <HeroSlider />
      <NewArrivals />
      <Extras />
    </div>
  );
}
