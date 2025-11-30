import { createClient } from "@sanity/client";

export const sanity = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    token: process.env.SANITY_API_TOKEN,
    dataset: "production",
    apiVersion: "v2025-02-19",
    useCdn: false, // TODO: CDN in production
    perspective: "drafts", // TODO: drafts in dev/stage
});

export const BEERS_CATEGORY_ID = "1ba1526c-f516-4c61-bea8-dda1e2c5fcc0";
export const CIDERS_CATEGORY_ID = "fa4fcd60-f6b2-46fc-b93f-38c714a74d7d";
export const HONEY_CATEGORY_ID = "a9fb46bc-cd9e-4f80-b517-a431d5ce457c";
export const LIQUEURS_CATEGORY_ID = "73d69b11-ea27-4760-98da-d15894846031";
export const PORTS_CATEGORY_ID = "8770527f-e336-43cb-a2b2-3f8dc39baa76";
export const SPIRITS_CATEGORY_ID = "ec175758-a8ad-4ace-a2ba-d1b176cefe15";
export const TOBACCO_CATEGORY_ID = "0fa5237f-94fa-4e1b-ae62-2b47e8e7a6b3";
export const WINES_CATEGORY_ID = "6e00044c-9bd3-4714-83d8-0ef3dfb3f445";
