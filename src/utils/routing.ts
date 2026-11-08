import { resolvePath } from "./urls";

export const sitePath = (path: string) =>
  resolvePath(path, import.meta.env.BASE_URL);
