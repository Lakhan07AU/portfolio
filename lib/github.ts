export type GithubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  followers: number;
  public_repos: number;
  created_at: string;
};

export type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
};

const API = "https://api.github.com";
const ACCEPT = { Accept: "application/vnd.github+json" };
const USERNAME = "Lakhan07AU";

// Repos to hide from the portfolio's GitHub section (e.g. unfinished/placeholder repos).
export const HIDDEN_REPOS = new Set(["Bussiness-Analytics-Projects"]);

async function guard<T>(request: Promise<Response>): Promise<T | null> {
  try {
    const res = await request;
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchGithubProfile(): Promise<GithubUser | null> {
  return guard<GithubUser>(fetch(`${API}/users/${USERNAME}`, { headers: ACCEPT }));
}

export async function fetchGithubRepos(): Promise<GithubRepo[] | null> {
  const repos = await guard<GithubRepo[]>(
    fetch(`${API}/users/${USERNAME}/repos?per_page=100&sort=pushed`, { headers: ACCEPT }),
  );
  return repos;
}

export function summarizeLanguages(repos: GithubRepo[]): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    if (!repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

export function totalStars(repos: GithubRepo[]): number {
  return repos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0);
}

export function formatNumber(value: number): string {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value);
}