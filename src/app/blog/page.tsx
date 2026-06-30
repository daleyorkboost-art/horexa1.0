import type { Metadata } from "next";
import { BlogExplorer } from "@/components/sections/BlogExplorer";
import { JsonLd } from "@/components/seo/JsonLd";
import { DatabaseEmptyState, PageHero, SectionHeading, SiteFrame } from "@/components";
import { absoluteUrl } from "@/lib/seo";
import { dynamicPublicImages as images, getPublicBlogPosts } from "@/lib/public-data";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Kitchen Hygiene & Compliance Blog",
  description:
    "Read Horexa guidance on kitchen exhaust cleaning frequency, NFPA 96 checklists, commercial kitchen fire risks, AMC planning and ventilation hygiene.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Horexa Kitchen Hygiene & Compliance Blog",
    description: "Practical maintenance guidance for commercial kitchen operators and facility teams.",
    images: [images.blog],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horexa Kitchen Hygiene & Compliance Blog",
    description: "Practical maintenance guidance for commercial kitchen operators and facility teams.",
    images: [images.blog],
  },
};

export default async function BlogPage() {
  const blogPosts = await getPublicBlogPosts();

  return (
    <SiteFrame activeHref="/blog">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Horexa Blog",
          description: "Kitchen hygiene, exhaust systems, fire safety, compliance and maintenance insights.",
          blogPost: blogPosts.slice(0, 10).map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: absoluteUrl(post.image),
            datePublished: post.publishedAt ?? post.createdAt,
          })),
        }}
      />
      <PageHero
        activeLabel="Blog"
        eyebrow="Knowledge Hub"
        title="Kitchen safety and"
        highlight="compliance notes"
        description="Practical guidance for facility managers, chefs, owners and safety teams responsible for commercial kitchen hygiene."
        imageSrc={images.blog}
      />

      <section className="py-20">
        <div className="industrial-container">
          <SectionHeading
            eyebrow="Articles"
            title="Maintenance guidance written for operators"
            description="Clear checklists and field notes covering exhaust cleaning frequency, fire-risk causes, AMC planning and report readiness."
          />
          <div className="mt-12">
            {blogPosts.length ? (
              <BlogExplorer blogPosts={blogPosts} />
            ) : (
              <DatabaseEmptyState title="No blog posts published yet" description="Publish blog posts in the database to populate the blog." />
            )}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
