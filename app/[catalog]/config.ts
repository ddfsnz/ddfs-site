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

type CatalogConfig = {
    id: string;
    hero: string;
    heading: string;
    subheading: string;
    optionsKey: string;
    filters: string[];
};

export const CATALOG_CONFIG: Record<string, CatalogConfig> = {
    beers: {
        id: BEERS_CATEGORY_ID,
        hero: "/hero-beers.png",
        heading: "Beers",
        subheading:
            "Enjoy local craft brews and international favorites, perfect for every beer enthusiast.",
        optionsKey: "beerOptions",
        filters: ["company", "style", "size", "container"],
    },
    honey: {
        id: HONEY_CATEGORY_ID,
        hero: "/hero-honey.png",
        heading: "Manuka Honey",
        subheading:
            "Experience pure New Zealand Manuka honey, prized for its unique taste and health benefits.",
        optionsKey: "honeyOptions",
        filters: ["company", "style"],
    },
    liqueurs: {
        id: LIQUEURS_CATEGORY_ID,
        hero: "/hero-liqueurs.png",
        heading: "Liqueurs",
        subheading:
            "Indulge in smooth, flavorful liqueurs ideal for sipping or mixing in cocktails.",
        optionsKey: "liquerOptions",
        filters: ["company", "style", "size"],
    },
    ports: {
        id: PORTS_CATEGORY_ID,
        hero: "/hero-ports.png",
        heading: "Ports",
        subheading:
            "Savor rich, aged ports with deep flavors, perfect for after-dinner enjoyment.",
        optionsKey: "portOptions",
        filters: ["company", "style"],
    },
    specialty: {
        id: SPECIALTY_CATEGORY_ID,
        hero: "/hero-specialty.png",
        heading: "Specialty Products",
        subheading:
            "Discover specialty products like premium olive oils, crafted for exceptional flavor and quality.",
        optionsKey: "specialtyOptions",
        filters: ["company", "style"],
    },
    spirits: {
        id: SPIRITS_CATEGORY_ID,
        hero: "/hero-spirits.png",
        heading: "Spirits",
        subheading:
            "Explore top-shelf spirits, including whisky, gin, vodka, and more from renowned distilleries.",
        optionsKey: "spiritOptions",
        filters: ["company", "style", "size"],
    },
    tobacco: {
        id: TOBACCO_CATEGORY_ID,
        hero: "/hero-tobacco.png",
        heading: "Tobacco",
        subheading:
            "Choose from a range of premium tobacco products for discerning connoisseurs.",
        optionsKey: "tobaccoOptions",
        filters: ["company", "style"],
    },
    wines: {
        id: WINES_CATEGORY_ID,
        hero: "/hero-wines.png",
        heading: "Wines",
        subheading:
            "Discover a curated selection of premium wines from New Zealand and around the world.",
        optionsKey: "wineOptions",
        filters: ["company", "style", "region", "year"],
    },
};

export type CatalogSlug = keyof typeof CATALOG_CONFIG;
