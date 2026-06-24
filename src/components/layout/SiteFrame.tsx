import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

type SiteFrameProps = {
  activeHref: string;
  children: React.ReactNode;
};

export function SiteFrame({ activeHref, children }: SiteFrameProps) {
  return (
    <>
      <Navbar activeHref={activeHref} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
