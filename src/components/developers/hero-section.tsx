import { Developer } from "@/types/developer";
import Container from "@/components/shared/container";
import Image from "next/image";

export default function HeroSection({ developer }: { developer: Developer }) {
  return (
    <section className="relative h-96">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${developer.coverImage})` }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <Container className="relative flex h-full flex-col items-center justify-center text-center text-white">
        <div className="flex items-center gap-4">
          <Image
            src={developer.logo}
            alt={`${developer.name} logo`}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <h1 className="text-4xl font-bold md:text-6xl">{developer.name}</h1>
            <p className="mt-2 text-lg">{developer.tagline}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
