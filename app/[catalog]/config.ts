import {
    BEERS_CATEGORY_ID,
    HONEY_CATEGORY_ID,
    LIQUEURS_CATEGORY_ID,
    PORTS_CATEGORY_ID,
    SPECIALTY_CATEGORY_ID,
    SPIRITS_CATEGORY_ID,
    TOBACCO_CATEGORY_ID,
    WINES_CATEGORY_ID,
} from "@/lib/sanity";

export const CATALOG_IDS = {
    beers: BEERS_CATEGORY_ID,
    honey: HONEY_CATEGORY_ID,
    liqueurs: LIQUEURS_CATEGORY_ID,
    ports: PORTS_CATEGORY_ID,
    specialty: SPECIALTY_CATEGORY_ID,
    spirits: SPIRITS_CATEGORY_ID,
    tobacco: TOBACCO_CATEGORY_ID,
    wines: WINES_CATEGORY_ID,
};

export type CatalogSlug = keyof typeof CATALOG_IDS;
