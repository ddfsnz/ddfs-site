import { PortableText, PortableTextBlock } from "@portabletext/react";

export function ProductDescription({
    description,
}: {
    description: PortableTextBlock[];
}) {
    return (
        <div className="leading-relaxed">
            <PortableText value={description} />
        </div>
    );
}
