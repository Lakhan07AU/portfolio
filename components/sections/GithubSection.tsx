"use client";

import { useEffect, useMemo, useState } from "react";
import { Star, GitFork, ArrowUpRight, Users, Database, ExternalLink } from "lucide-react";
import {
  fetchGithubProfile,
  fetchGithubRepos,
  summarizeLanguages,
  totalStars,
  formatNumber,
  HIDDEN_REPOS,
  type GithubUser,
  type GithubRepo,
} from "@/lib/github";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Magnetic } from "@/components/ui/Magnetic";
import { GitHubIcon } from "@/components/ui/BrandIcons";

type LoadState = "loading" | "ready" | "error";

function RepoSkeleton() {
  return (
    <div className="glass-panel h-[140px] animate-pulse rounded-2xl p-5">
      <div className="h-4 w-1/2 rounded bg-foreground/10" />
      <div className="mt-3 h-3 w-3/4 rounded bg-foreground/5" />
      <div className="mt-3 h-3 w-1/2 rounded bg-foreground/5" />
    </div>
  );
}

export function GithubSection() {
  const [state, setState] = useState<LoadState>("loading");
  const [profile, setProfile] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const [user, repoList] = await Promise.all([fetchGithubProfile(), fetchGithubRepos()]);
      if (cancelled) return;
      if (!user || !repoList) {
        setState("error");
        return;
      }
      setProfile(user);
      setRepos(repoList);
      setState("ready");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const owned = useMemo(
    () => (repos ?? []).filter((r) => !r.fork && !r.archived && !HIDDEN_REPOS.has(r.name)),
    [repos],
  );
  const languages = useMemo(() => summarizeLanguages(owned), [owned]);
  const stars = useMemo(() => totalStars(owned), [owned]);
  const topRepos = useMemo(
    () =>
      [...owned]
        .sort(
          (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        )
        .slice(0, 6),
    [owned],
  );
  const maxLang = Math.max(1, ...languages.map((l) => l.count));

  return (
    <section id="github" className="relative py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          label="Developer · Building in Public"
          title={
            <>
              Open by default, <em className="not-italic text-accent">building in public.</em>
            </>
          }
          sub="Live data pulled from my GitHub profile on every visit — no fabricated numbers."
        />

        <div className="grid gap-5 lg:grid-cols-[1fr_1.6fr]">
          {/* profile card */}
          <Reveal>
            <TiltCard className="h-full">
              <div className="glass-panel flex h-full flex-col rounded-3xl p-7">
                {state === "loading" ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-20 w-20 rounded-2xl bg-foreground/10" />
                    <div className="h-5 w-1/2 rounded bg-foreground/10" />
                    <div className="h-3 w-3/4 rounded bg-foreground/5" />
                  </div>
                ) : profile ? (
                  <>
                    <div className="flex items-center gap-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={profile.avatar_url}
                        alt={`${profile.login} GitHub avatar`}
                        width={72}
                        height={72}
                        className="h-[72px] w-[72px] rounded-2xl border border-edge"
                      />
                      <div>
                        <p className="font-display text-lg font-semibold text-foreground">
                          {profile.name ?? profile.login}
                        </p>
                        <p className="font-mono text-sm text-accent">@{profile.login}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {profile.bio ?? "AI/ML developer building practical intelligent systems."}
                    </p>

                    <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-edge pt-5">
                      <div>
                        <dt className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
                          <Database className="h-3.5 w-3.5" aria-hidden="true" /> Repos
                        </dt>
                        <dd className="mt-1 font-display text-xl font-semibold text-foreground">
                          {profile.public_repos}
                        </dd>
                      </div>
                      <div>
                        <dt className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
                          <Users className="h-3.5 w-3.5" aria-hidden="true" /> Followers
                        </dt>
                        <dd className="mt-1 font-display text-xl font-semibold text-foreground">
                          {formatNumber(profile.followers)}
                        </dd>
                      </div>
                      <div>
                        <dt className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
                          <Star className="h-3.5 w-3.5" aria-hidden="true" /> Stars
                        </dt>
                        <dd className="mt-1 font-display text-xl font-semibold text-foreground">
                          {formatNumber(stars)}
                        </dd>
                      </div>
                    </dl>

                    <Magnetic className="mt-auto pt-6">
                      <a
                        href={site.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full"
                      >
                        <GitHubIcon className="h-4 w-4" aria-hidden="true" /> Explore My GitHub
                      </a>
                    </Magnetic>
                  </>
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-center gap-4 py-10 text-center">
                    <p className="text-sm text-muted">Couldn&apos;t reach the GitHub API just now.</p>
                    <a
                      href={site.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-subtle px-4! py-2! text-[13px]!"
                    >
                      Open GitHub directly <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                )}

                {languages.length > 0 && (
                  <div className="mt-6 border-t border-edge pt-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                      Languages across repos
                    </p>
                    <div className="mt-3 flex flex-col gap-2">
                      {languages.map((lang) => (
                        <div key={lang.name} className="flex items-center gap-3">
                          <span className="w-16 shrink-0 font-mono text-[11px] text-foreground/70">
                            {lang.name}
                          </span>
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-accent/70 to-accent"
                              style={{ width: `${(lang.count / maxLang) * 100}%` }}
                            />
                          </div>
                          <span className="w-6 text-right font-mono text-[11px] text-muted">
                            {lang.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TiltCard>
          </Reveal>

          {/* recent repos */}
          <div className="grid gap-5 sm:grid-cols-2">
            {state === "loading"
              ? Array.from({ length: 6 }).map((_, i) => <RepoSkeleton key={i} />)
              : topRepos.map((repo, i) => (
                  <Reveal key={repo.id} delay={i * 0.05}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-panel group block h-full rounded-2xl p-5 transition-colors duration-300 hover:border-accent/40"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-mono text-sm font-semibold text-foreground transition-colors group-hover:text-accent-soft">
                          {repo.name}
                        </p>
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted">
                        {repo.description ?? "No description provided."}
                      </p>
                      <div className="mt-4 flex items-center gap-3 text-muted">
                        {repo.language && (
                          <span className="flex items-center gap-1.5 font-mono text-[11px]">
                            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1 font-mono text-[11px]">
                          <Star className="h-3 w-3" aria-hidden="true" /> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-[11px]">
                          <GitFork className="h-3 w-3" aria-hidden="true" /> {repo.forks_count}
                        </span>
                      </div>
                    </a>
                  </Reveal>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}