import { Quote, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

type TestimonialCardProps = {
  quote: string;
  name: string;
  business: string;
  city: string;
  rating?: number;
};

export function TestimonialCard({ quote, name, business, city, rating = 5 }: TestimonialCardProps) {
  return (
    <Card className="flex h-full flex-col gap-7 p-6">
      <Quote className="text-primary" aria-hidden />
      <p className="text-lg font-medium leading-8 text-foreground">{quote}</p>
      <div className="mt-auto flex flex-col gap-3">
        <div className="flex gap-1 text-primary" aria-label={`${rating} star rating`}>
          {Array.from({ length: rating }).map((_, index) => (
            <Star key={index} fill="currentColor" aria-hidden />
          ))}
        </div>
        <div>
          <h3 className="font-black">{name}</h3>
          <p className="text-sm text-muted-foreground">
            {business}, {city}
          </p>
        </div>
      </div>
    </Card>
  );
}
