import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Clock } from "lucide-react";
import { CTASection, PageHero, SiteFrame } from "@/components";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { absoluteUrl } from "@/lib/seo";
import { dynamicPublicImages as images, getPublicBlogPost } from "@/lib/public-data";

export const revalidate = 300;

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublicBlogPost(slug);

  return {
    title: post ? post.title : "Blog Article",
    description: post?.excerpt,
    alternates: { canonical: post ? `/blog/${post.slug}` : "/blog" },
    openGraph: post
      ? {
          title: post.title,
          description: post.excerpt,
          images: [post.image],
        }
      : undefined,
    twitter: post
      ? {
          card: "summary_large_image",
          title: post.title,
          description: post.excerpt,
          images: [post.image],
        }
      : undefined,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPublicBlogPost(slug);

  if (!post) {
    notFound();
  }
  const content = String(post.content ?? post.excerpt);

  return (
    <SiteFrame activeHref="/blog">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: absoluteUrl(post.image),
          datePublished: post.publishedAt ?? post.createdAt,
          dateModified: post.updatedAt ?? post.createdAt,
          publisher: {
            "@type": "Organization",
            name: "Horexa Solutions",
          },
        }}
      />
      <PageHero
        activeLabel="Blog"
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        imageSrc={post.image ?? images.blog}
        centered
      />
      <section className="py-20">
        <div className="industrial-container max-w-4xl">
          <Card className="p-6 md:p-10">
            <div className="mb-8 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
              <Badge>{post.category}</Badge>
              <span className="inline-flex items-center gap-2">
                <Calendar className="text-primary" aria-hidden />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="text-primary" aria-hidden />
                {post.readTime}
              </span>
            </div>
            <article className="prose prose-invert max-w-none prose-p:leading-8 prose-p:text-muted-foreground">
              {content
                .split(/\n{2,}/)
                .filter(Boolean)
                .map((paragraph: string, index: number) => (
                  <p key={`${paragraph.slice(0, 48)}-${paragraph.length}-${index}`}>{paragraph}</p>
                ))}
            </article>
          </Card>
        </div>
      </section>
      <CTASection title="Need help applying this guidance?" description="Book a site inspection and Horexa will map your kitchen hygiene and compliance priorities." />
    </SiteFrame>
  );
}
