import { PortableText, PortableTextBlock } from "@portabletext/react";

export function ProductDescription({
    description,
}: {
    description: PortableTextBlock[];
}) {
    return <PortableText value={description} />;
}
