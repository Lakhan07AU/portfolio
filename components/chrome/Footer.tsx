import { site } from "@/lib/site";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

export function Footer() {
  return (
    <footer className="border-t border-edge pb-10 pt-14">
      <div className="container-site flex flex-col items-center gap-5 text-center">
        <a href="#home" className="font-display text-2xl font-bold text-foreground">
          Lakhan<span className="text-accent">.</span> Singh
        </a>
        <p className="text-sm font-medium text-muted">AI/ML Developer</p>
        <p className="font-mono text-[12px] uppercase tracking-[0.25em] text-accent/80">
          Machine Learning • Generative AI • Computer Vision
        </p>

        <div className="mt-2 flex items-center gap-6 text-sm text-muted">
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-accent"
          >
            <GitHubIcon className="h-4 w-4" /> GitHub
          </a>
          <a
            href={site.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-accent"
          >
            <LinkedInIcon className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-accent"
          >
            Email
          </a>
        </div>

        <p className="mt-6 text-xs text-muted">
          © {new Date().getFullYear()} Lakhan Singh. Built with Next.js, React Three Fiber
          &amp; a lot of caffeine.
        </p>
      </div>
    </footer>
  );
}