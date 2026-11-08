# Mandatory development behavior

- Read the README and relevant `docs/` guides before changing implementation; treat them as persistent requirements.
- Reuse existing components, layout patterns, and semantic CSS tokens before introducing new ones. Treat unintended visual inconsistency as a bug.
- Keep pages compositional, component APIs small, content typed, and the site static. Add React or dependencies only for a demonstrated need.
- Do not invent portfolio projects, accomplishments, personal details, or publish existing source media without approval. Label demonstration content clearly.
- Preserve accessibility, responsive behavior, reduced-motion support, image dimensions, and repository-base-path compatibility.
- Document intentional token/layout exceptions and meaningful architectural tradeoffs in the owning guide. Update documentation when decisions change; do not copy the kickoff prompt.
- Run `npm run validate` for implementation changes and verify affected routes at both `/` and a repository subpath. Do not redesign unrelated areas.
