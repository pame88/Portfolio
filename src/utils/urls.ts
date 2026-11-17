export function hostingConfig(
  site = "http://localhost:4321",
  base = "/",
): { site: string; base: string } {
  const origin = new URL(site);
  if (
    !["http:", "https:"].includes(origin.protocol) ||
    origin.pathname !== "/" ||
    origin.search ||
    origin.hash ||
    origin.username ||
    origin.password
  ) {
    throw new Error(
      "SITE_URL must be an HTTP(S) origin without a path or credentials.",
    );
  }
  if (!/^\/(?:[a-zA-Z0-9_-]+\/?)*$/.test(base)) {
    throw new Error("BASE_PATH must be / or a slash-prefixed repository path.");
  }
  return { site: origin.origin, base: `${base.replace(/\/+$/, "")}/` };
}

export function resolvePath(path: string, base: string): string {
  if (/^https?:\/\//.test(path) || path.startsWith("#")) return path;
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error(
      "Internal URLs must start with /; external URLs must use HTTP(S).",
    );
  }
  const prefix = base.replace(/\/+$/, "");
  return prefix && path.startsWith(`${prefix}/`) ? path : `${prefix}${path}`;
}
