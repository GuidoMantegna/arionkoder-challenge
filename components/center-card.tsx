interface CenterCardProps {
  name: string;
  image: string;
  description: string;
}

const TRANSITIONS_STYLES = `transition-all duration-300 ease-in-out`;

export function CenterCard({ name, image, description }: CenterCardProps) {
  return (
    <div className="border rounded-xl transition-all duration-300 cursor-pointer h-full hover:border-primary/30 overflow-hidden">
      <img
        alt={name}
        className={`mb-3 h-[250px] w-full object-cover rounded-t-md group-hover:scale-102 ${TRANSITIONS_STYLES} grayscale group-hover:filter-none`}
        src={image}
      />
      <div className="p-4 text-primary">
        <h3 className="text-2xl font-semibold mb-3 group-hover:text-black transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground">{description}</p>
        <div className="mt-8 flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
          <span>Explore Services</span>
          <span className="text-lg">→</span>
        </div>
      </div>
    </div>
  );
}
