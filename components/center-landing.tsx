import { CenterAction } from "./center-action";
import api from "@/lib/api";

export async function CenterLanding({
  params,
}: {
  params: Promise<{ center: string }>;
}) {
  const { center } = await params;
  const centerData = await api.fetch(center);
  const services = await api.listServices();

  return (
    <main className="min-h-screen bg-background">
      <header
        style={{
          backgroundImage: `url(${centerData.image})`,
        }}
        className={`relative bg-cover bg-no-repeat bg-center h-[400px] text-primary-foreground flex items-center`}
      >
        <div className="absolute w-full h-full top-0 bg-gradient-to-l from-primary/10 via-primary/80 to-secondary"></div>
        <div className="relative z-10 container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-8 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {centerData.name}
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                {centerData.description}
              </p>
            </div>
          </div>
          <a
            href="/"
            className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-medium flex items-center gap-1"
          >
            ← Back to Centers
          </a>
        </div>
      </header>

      {/* Services Section */}
      <CenterAction services={services} centerId={centerData.id} />
    </main>
  );
}
