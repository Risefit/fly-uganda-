import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhyFlyUs } from "@/components/WhyFlyUs";
import { RouteMapPreview } from "@/components/RouteMapPreview";
import { Fleet } from "@/components/Fleet";
import { Destinations } from "@/components/Destinations";
import { LoyaltyTeaser } from "@/components/LoyaltyTeaser";
import { Press } from "@/components/Press";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <WhyFlyUs />
        <RouteMapPreview />
        <Fleet />
        <Destinations />
        <LoyaltyTeaser />
        <Press />
      </main>
      <Footer />
    </>
  );
}
