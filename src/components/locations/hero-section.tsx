import { Location } from "@/types/location";
import Container from "@/components/shared/container";

export default function HeroSection({ location }: { location: Location }) {
  return (
    <section className="relative h-96">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${location.heroImage})` }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <Container className="relative flex h-full flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl font-bold md:text-6xl">
          Properties in {location.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg">{location.description}</p>
      </Container>
    </section>
  );
}
