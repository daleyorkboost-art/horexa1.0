import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type BlogCardProps = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: {
    src: string;
    alt: string;
  };
  href: string;
};

export function BlogCard({ title, excerpt, category, date, readTime, image, href }: BlogCardProps) {
  return (
    <Card className="group overflow-hidden p-0">
      <Link href={href} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-80 transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col gap-4 p-6">
          <Badge className="w-fit">{category}</Badge>
          <h3 className="text-2xl font-black leading-tight transition group-hover:text-primary">{title}</h3>
          <p className="text-sm leading-7 text-muted-foreground">{excerpt}</p>
          <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Calendar className="text-primary" aria-hidden />
              {date}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="text-primary" aria-hidden />
              {readTime}
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
}
