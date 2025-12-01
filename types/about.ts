import { PortableTextBlock } from "@portabletext/react";
import { SanityAsset } from "@sanity/image-url/lib/types/types";

export type AboutDDFS = {
    _id: "about-ddfs";
    content: PortableTextBlock[];
    image: {
        _type: "image";
        asset: SanityAsset;
    };
};
