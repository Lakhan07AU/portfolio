import { SiteShell } from "@/components/SiteShell";
import { Navbar } from "@/components/chrome/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { About } from "@/components/sections/About";
import { Expertise } from "@/components/sections/Expertise";
import { Projects } from "@/components/sections/Projects";
import { Journey } from "@/components/sections/Journey";
import { Achievements } from "@/components/sections/Achievements";
import { Hackathons } from "@/components/sections/Hackathons";
import { GithubSection } from "@/components/sections/GithubSection";
import { ResumeCta } from "@/components/sections/ResumeCta";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/chrome/Footer";

export default function Home() {
  return (
    <SiteShell>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Expertise />
        <Projects />
        <Journey />
        <Achievements />
        <Hackathons />
        <GithubSection />
        <ResumeCta />
        <Contact />
      </main>
      <Footer />
    </SiteShell>
  );
}