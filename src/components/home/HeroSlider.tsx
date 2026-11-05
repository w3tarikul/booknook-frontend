"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1800&q=80",
    title: "Your neighbourhood library, online",
    text: "Discover books shared by readers near you and borrow them in a few clicks.",
  },
  {
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1800&q=80",
    title: "Got books gathering dust?",
    text: "Add them to BookNook and let someone else enjoy their next favourite story.",
  },
  {
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1800&q=80",
    title: "Borrow today, return when you are done",
    text: "Pick a return date, track your borrows and keep every shelf stocked.",
  },
];

export default function HeroSlider() {
  return (
    <section aria-label="Featured" className="overflow-hidden rounded-3xl shadow-xl">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="h-[26rem] md:h-[34rem] [--swiper-theme-color:#fff] [--swiper-navigation-size:22px]"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.title}>
            <div className="relative size-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt="" className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
              <div className="relative flex size-full max-w-2xl flex-col justify-center gap-5 px-8 text-white md:px-16">
                <h2 className="text-3xl font-bold leading-tight md:text-5xl">{s.title}</h2>
                <p className="text-base text-white/85 md:text-lg">{s.text}</p>
                <div>
                  <Button size="lg" className="h-11 px-6 text-base" render={<Link href="/books" />} nativeButton={false}>
                    Browse Books
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
