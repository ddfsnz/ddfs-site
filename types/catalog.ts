import { SanityAsset } from "@sanity/image-url/lib/types/types";

type CatalogFilter =
    | "company"
    | "style"
    | "size"
    | "container"
    | "region"
    | "year";

export type CatalogConfig = {
    _id: string;
    name: string;
    description: string;
    tileImage: {
        _type: "image";
        asset: SanityAsset;
    };
    heroImage: {
        _type: "image";
        asset: SanityAsset;
    };
    filters: CatalogFilter[];
    optionsKey: string;
};
