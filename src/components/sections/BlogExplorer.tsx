"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { BlogCard } from "@/components";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const categories = [
  "All Topics",
  "Kitchen Hygiene",
  "Exhaust Systems",
  "Fire Safety",
  "Compliance & Standards",
  "Maintenance Tips",
  "Case Studies",
];

type BlogPost = {
  id?: string;
  slug?: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  href: string;
};

export function BlogExplorer({ blogPosts }: { blogPosts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Topics");
  const featured = blogPosts[0];
  const posts = useMemo(
    () =>
      blogPosts.filter((post) => {
        const matchesCategory = category === "All Topics" || post.category === category;
        const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase());
        return matchesCategory && matchesQuery;
      }),
    [blogPosts, category, query],
  );

  if (!featured) {
    return null;
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="mx-auto flex w-full max-w-xl overflow-hidden rounded-lg border border-border bg-input">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search articles..."
          aria-label="Search articles"
          className="border-0 bg-transparent focus-visible:ring-0"
        />
        <Button type="button" size="icon" aria-label="Search articles">
          <Search aria-hidden />
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((item) => (
          <Button
            key={item}
            type="button"
            variant={category === item ? "default" : "ghost"}
            size="sm"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="text-2xl font-black">Featured Article</h2>
            <Card className="mt-5 grid overflow-hidden p-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-72 overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-5 p-8">
                <div className="flex flex-wrap gap-2">
                  <Badge>Featured</Badge>
                  <Badge variant="secondary">{featured.category}</Badge>
                </div>
                <h3 className="text-h3 font-black">{featured.title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">{featured.excerpt}</p>
                <Button asChild className="w-fit">
                  <Link href={featured.href}>Read Article</Link>
                </Button>
              </div>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-black">Latest Articles</h2>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <BlogCard
                  key={post.id ?? post.slug ?? post.href}
                  {...post}
                  image={{ src: post.image, alt: post.title }}
                  href={post.href}
                />
              ))}
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-black">Popular Posts</h2>
            <div className="mt-5 flex flex-col gap-4">
              {blogPosts.slice(1, 5).map((post) => (
                <article key={post.id ?? post.slug ?? post.href} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                  <h3 className="text-sm font-bold leading-6">{post.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{post.date}</p>
                </article>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-black">Categories</h2>
            <div className="mt-5 flex flex-col gap-3">
              {categories.slice(1).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className="flex min-h-11 items-center justify-between rounded-lg border border-border px-3 text-left text-sm text-muted-foreground transition hover:border-primary hover:text-primary"
                >
                  {item}
                  <span>{blogPosts.filter((post) => post.category === item).length}</span>
                </button>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <NewsletterForm />
          </Card>
        </aside>
      </div>
    </div>
  );
}
