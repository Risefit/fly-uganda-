import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Shared shell for all internal pages: solid header + footer.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header solid />
      <main id="main" className="pt-16 lg:pt-[104px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
