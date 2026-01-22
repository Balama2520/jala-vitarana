import HeroSection from "@/components/hero/HeroSection";
import ImpactSustainability from "@/components/impact/ImpactSustainability";
import TechShowcase from "@/components/tech/TechShowcase";
import DistributionManager from "@/components/distribution/DistributionManager";
import LiveMonitoring from "@/components/monitoring/LiveMonitoring";
import LiveTicker from "@/components/layout/LiveTicker";
import SponsorSpotlight from "@/components/layout/SponsorSpotlight";
import SupportSection from "@/components/support/SupportSection";
import FinancialDashboard from "@/components/dashboard/FinancialDashboard";
import ImpactHeatmap from "@/components/impact/ImpactHeatmap";
import DailyUpdates from "@/components/dashboard/DailyUpdates";
import TeamSection from "@/components/team/TeamSection";
import FaqSection from "@/components/resources/FaqSection";
import ContactSection from "@/components/contact/ContactSection";
import DataDebugger from "@/components/debug/DataDebugger";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden selection:bg-teal-500/30 selection:text-teal-200">
      {/* Live Data Monitor */}
      <DataDebugger />
      <HeroSection />
      <LiveTicker />
      <SponsorSpotlight />

      {/* Section Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Live Monitoring Dashboard - Jala Agent */}
      <LiveMonitoring />

      {/* Section Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Water Voucher System - Full Screen */}
      <section id="distribution" className="py-32 bg-slate-900/30 relative">
        <DistributionManager />
      </section>

      {/* Section Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Financial Transparency */}
      <FinancialDashboard />

      {/* Section Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Visual Impact */}
      <section className="bg-slate-950 py-16">
        <ImpactHeatmap />
      </section>

      {/* Section Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Support & Community */}
      <SupportSection />

      {/* Section Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Operational Feed */}
      <DailyUpdates />

      {/* Section Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Trust & Proof */}
      <ImpactSustainability />

      {/* Section Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Founder Identity */}
      <TeamSection />

      {/* Section Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Technology Philosophy */}
      <TechShowcase />

      {/* Section Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* FAQ & Trust Building */}
      <FaqSection />

      {/* Section Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Contact & Partnership */}
      <ContactSection />
    </main>
  );
}
