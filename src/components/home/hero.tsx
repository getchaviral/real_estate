import Image from 'next/image';
import { SearchForm } from './search-form';

export function Hero() {
  return (
    <section className="relative h-[500px] md:h-[600px] flex items-center justify-center text-center">
      <Image
        src="/images/hero-bg.jpg"
        alt="Modern house exterior"
        layout="fill"
        objectFit="cover"
        priority
        className="z-0"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 p-4 text-[--hero-foreground]">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Find Your Dream Home</h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8 text-neutral-200">The best place to find your next property. Explore apartments, villas, and commercial spaces.</p>
        <SearchForm />
      </div>
    </section>
  );
}