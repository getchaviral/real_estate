import { PropertyType } from "@/types/property-type";
import Container from "@/components/shared/container";

export default function HeroSection({
  propertyType,
}: {
  propertyType: PropertyType;
}) {
  return (
    <section className="relative h-96">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${propertyType.heroImage})` }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <Container className="relative flex h-full flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl font-bold md:text-6xl">{propertyType.name}</h1>
        <p className="mt-4 max-w-2xl text-lg">{propertyType.description}</p>
      </Container>
    </section>
  );
}
