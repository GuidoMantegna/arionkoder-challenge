import Link from "next/link";
// import { CENTERS } from "@/lib/constants";
import { CenterCard } from "@/components/center-card";
import api from "@/lib/api";
export default async function Home() {
  const CENTERS = await api.listCenters();

  return (
    <main className="min-h-screen bg-background">
      <div className="h-[65vh] md:h-[350px] bg-[url(/back-img-1.png)] bg-cover bg-no-repeat bg-center">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="pt-10 text-5xl md:text-6xl mb-4 tracking-tight">
            Beauty & Wellness Bookings
          </h1>
          <p className="text-md max-w-2xl mx-auto text-foreground">
            Discover premium beauty centers and book your perfect appointment in
            seconds
          </p>
        </div>
      </div>

      <h2 className="text-3xl p-16 mb-10 text-center bg-secondary text-white">
        FEATURED BEAUTY CENTERS
      </h2>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CENTERS.map((center) => (
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
