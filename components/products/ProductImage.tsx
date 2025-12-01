import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { getImageSrc } from "@/lib/sanity-image";
import { ProductImage as ProductImageType } from "@/types/product";

export function ProductImage({
    image,
    name,
}: {
    image?: ProductImageType[][number];
    name: string;
}) {
    const imageSrc = image ? getImageSrc(image) : undefined;

    return (
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-sm bg-white">
            {/* TODO: support base 64 */}
            {imageSrc && !imageSrc.startsWith("data") ? (
                <div className="relative h-full max-h-10/12 w-full max-w-10/12">
                    <Image
                        src={imageSrc}
                        alt={name}
                        fill
                        className="object-contain"
                    />
                </div>
            ) : (
                <ImageIcon className="size-8 text-gray-300" />
            )}
        </div>
    );
}
