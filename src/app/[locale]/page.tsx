import Hero from "@/components/sections/Hero";
import IntroTagline from "@/components/sections/IntroTagline";
import AboutBento from "@/components/sections/AboutBento";
import ActivitiesGrid from "@/components/sections/ActivitiesGrid";
import HistoryTimeline from "@/components/sections/HistoryTimeline";
import MerchSection from "@/components/sections/MerchSection";
import DonatePanel from "@/components/sections/DonatePanel";
import SocialLinks from "@/components/sections/SocialLinks";
import Footer from "@/components/sections/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <main>
      <Hero locale={locale} />
      <IntroTagline locale={locale} />
      <section id="about">
        <AboutBento locale={locale} />
        <ActivitiesGrid locale={locale} />
      </section>
      <section id="history">
        <HistoryTimeline locale={locale} />
      </section>
      <section id="merch">
        <MerchSection locale={locale} />
      </section>
      <section id="donate">
        <DonatePanel locale={locale} />
      </section>
      <section id="social">
        <SocialLinks locale={locale} />
        <Footer locale={locale} />
      </section>
    </main>
  );
}
