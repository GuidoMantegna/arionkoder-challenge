import Link from "next/link";

const centers = [
  {
    id: "center1",
    name: "Glow Beauty Studio",
    description: "Premium beauty and wellness center",
  },
  {
    id: "center2",
    name: "Radiance Spa & Salon",
    description: "Luxury spa and salon services",
  },
  {
    id: "center3",
    name: "Zen Beauty Lounge",
    description: "Holistic beauty and relaxation",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-primary/8 via-secondary/5 to-background py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
            Beauty & Wellness Bookings
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover premium beauty centers and book your perfect appointment in
            seconds
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h2 className="text-2xl font-semibold text-foreground mb-10 text-center">
          Featured Beauty Centers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {centers.map((center) => (
            <Link key={center.id} href={`/${center.id}`} className="group">
              <div className="bg-card border border-border rounded-xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col justify-between hover:border-primary/30">
                <div>
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/15 to-secondary/15 rounded-lg mb-6 flex items-center justify-center">
                    <span className="text-4xl">✨</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {center.name}
                  </h3>
                  <p className="text-muted-foreground">{center.description}</p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Explore Services</span>
                  <span className="text-lg">→</span>
                </div>
              </div>
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
