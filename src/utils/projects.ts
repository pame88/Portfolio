import { getCollection } from "astro:content";

export async function publishedProjects() {
  const projects = await getCollection(
    "projects",
    ({ data }) => data.published,
  );
  return projects.sort(
    (a, b) =>
      a.data.order - b.data.order || a.data.title.localeCompare(b.data.title),
  );
}
