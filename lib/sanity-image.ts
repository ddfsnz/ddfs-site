import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Create builder with public env vars for client-side use
const builder = imageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
});

export function getImageSrc(source: SanityImageSource) {
    try {
        return builder.image(source).url();
    } catch {
        return undefined;
    }
}
