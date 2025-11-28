import { createDirectus, rest } from "@directus/sdk";

export const directus_url = process.env.NEXT_PUBLIC_DIRECTUS_URL;

const directus = createDirectus(directus_url || "").with(rest());

export const mobileDim = { query: "(max-width: 768px)" };
export const tabletDim = { query: "(min-width: 768px)" };
export const desktopDim = {
  query: "(min-width: 1024px)",
};

export default directus;
