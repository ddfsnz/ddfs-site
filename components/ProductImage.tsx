import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { getImageSrc } from "@/lib/sanity-image";
import { Product } from "@/types/product";

export function ProductImage({ product }: { product: Product }) {
    const imageSrc = product.images
        ? getImageSrc(product.images[0])
        : undefined;

    return (
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-sm bg-white">
            {/* TODO: support base 64 */}
            {imageSrc && !imageSrc.startsWith("data") ? (
                <div className="relative h-full max-h-10/12 w-full max-w-10/12">
                    <Image
                        src={imageSrc}
                        alt={product.name}
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
