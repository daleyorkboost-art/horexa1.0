import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ProjectCardProps = {
  title: string;
  location: string;
  duration: string;
  kitchenType: string;
  greaseLevel: "Light" | "Medium" | "Heavy";
  services: string[];
  image: {
    src: string;
    alt: string;
  };
  href: string;
};

export function ProjectCard({
  title,
  location,
  duration,
  kitchenType,
  greaseLevel,
  services,
  image,
  href,
}: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden p-0">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {services.map((service, index) => (
            <Badge key={`${service}-${index}`} variant="secondary" className="bg-background/80 text-foreground backdrop-blur">
              {service}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5 p-6">
        <div className="flex flex-wrap gap-2">
          <Badge variant={greaseLevel === "Heavy" ? "warning" : "default"}>{greaseLevel} Grease</Badge>
          <Badge variant="secondary">{kitchenType}</Badge>
        </div>
        <div>
          <h3 className="text-h3 font-black">{title}</h3>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <MapPin className="text-primary" aria-hidden />
              {location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="text-primary" aria-hidden />
              {duration}
            </span>
          </div>
        </div>
        <Button asChild variant="outline" className="w-fit">
          <Link href={href}>View Case Study</Link>
        </Button>
      </div>
    </Card>
  );
}
