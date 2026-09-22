// basePath provides correct absolute URLs when deploying under a sub-path
// (GitHub Pages project site). Set NEXT_PUBLIC_BASE_PATH at build time.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix an absolute app path with the deployment base path. */
export const pub = (path: string): string => `${basePath}${path}`;