import Image from "next/image";
import { SearchForm } from "./search-form";

export function Hero() {
  return (
    <section className="relative flex h-[500px] items-center justify-center text-center md:h-[600px]">
      <Image
        src="/images/hero-bg.jpg"
        alt="Modern house exterior"
        fill
        priority
        className="z-0 object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full px-4 text-[--hero-foreground]">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
          Find Your Dream Home
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-neutral-200 md:text-xl">
          The best place to find your next property. Explore apartments,
          villas, and commercial spaces.
        </p>

        <div className="flex w-full justify-center">
          <SearchForm />
        </div>
      </div>
    </section>
  );
}
