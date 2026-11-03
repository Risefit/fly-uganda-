import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Kicker } from "@/components/brand";
import { CONTACT } from "@/lib/data";
import { OFFICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with Fly Uganda — head office at Gate 1, Kajjansi Airfield, stations across the network, and reservations.",
};

const EMAILS = [
  { label: "Customer care", value: CONTACT.care },
  { label: "Bookings", value: CONTACT.bookings },
  { label: "Cargo", value: CONTACT.cargo },
  { label: "Careers", value: CONTACT.careers },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="We&rsquo;re here to help"
        subtitle="Reach our team by email or phone, visit a ticket office, or send us a message."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-cream py-16">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Left: details */}
          <div>
            <Kicker>Get in touch</Kicker>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink">Customer service</h2>

            <div className="mt-6 space-y-4">
              <a href={`tel:+256`} className="flex items-center gap-3 rounded-2xl border border-aviation/10 bg-white p-5 hover:border-aviation/30">
                <Phone className="h-5 w-5 text-aviation" aria-hidden />
                <span>
                  <span className="block text-xs uppercase tracking-wide text-muted">Phone</span>
                  <span className="font-semibold text-ink">{CONTACT.phone}</span>
                </span>
              </a>
              <div className="grid gap-3 sm:grid-cols-2">
                {EMAILS.map((e) => (
                  <a key={e.label} href={`mailto:${e.value}`} className="flex items-center gap-3 rounded-2xl border border-aviation/10 bg-white p-4 hover:border-aviation/30">
                    <Mail className="h-4 w-4 shrink-0 text-aviation" aria-hidden />
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wide text-muted">{e.label}</span>
                      <span className="block truncate text-sm font-medium text-ink">{e.value}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <h3 className="mt-10 font-display text-xl font-semibold text-ink">Offices & ticket offices</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {OFFICES.map((o) => (
                <div key={o.city} className="rounded-2xl border border-aviation/10 bg-white p-5">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-opportunity-700" aria-hidden />
                    <h4 className="font-semibold text-ink">{o.city}</h4>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    {o.lines.map((l) => (
                      <span key={l} className="block">{l}</span>
                    ))}
                  </p>
                  <span className="mt-2 inline-block text-xs font-medium text-aviation">{o.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div>
            <Kicker>Send a message</Kicker>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink">Write to us</h2>
            <p className="mt-3 text-muted">We aim to respond within two business days.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
