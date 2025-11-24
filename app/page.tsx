import Link from "next/link";
import Image from "next/image";
import { CenterCard } from "@/components/center-card";

const centers = [
  {
    id: "center1",
    name: "Glow Beauty Studio",
    description: "Premium beauty and wellness center",
    image: "/glow-bg.jpg",
  },
  {
    id: "center2",
    name: "Radiance Spa & Salon",
    description: "Luxury spa and salon services",
    image: "/radiance-bg.png",
  },
  {
    id: "center3",
    name: "Zen Beauty Lounge",
    description: "Holistic beauty and relaxation",
    image: "/zen-bg.jpg",
  },
];
export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="h-[300px] bg-[url(/back-img-1.png)] bg-cover bg-no-repeat bg-center">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="pt-10 text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            Beauty & Wellness Bookings
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-foreground">
            Discover premium beauty centers and book your perfect appointment in
            seconds
          </p>
        </div>
      </div>

      <h2 className="text-3xl p-10 mb-10 text-center bg-secondary text-white">
        FEATURED BEAUTY CENTERS
      </h2>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {centers.map((center) => (
            <Link key={center.id} href={`/${center.id}`} className="group">
              <CenterCard {...center} />
            </Link>
          ))}
        </div>
      </div>

      <footer className="bg-foreground/5 mt-20 py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-5xl text-center text-muted-foreground text-sm">
          <p>
            © 2025 Beauty Booking System. Crafted with care for your beauty
            journey by Guido Mantegna.
          </p>
        </div>
      </footer>
    </main>
  );
}
