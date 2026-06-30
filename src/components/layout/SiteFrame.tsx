import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

type SiteFrameProps = {
  activeHref: string;
  children: React.ReactNode;
};

export function SiteFrame({ activeHref, children }: SiteFrameProps) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-sm focus:font-black focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <Navbar activeHref={activeHref} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
