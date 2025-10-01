import { ImageOff } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { Product } from "@/types/product";

export function ProductImage({ product }: { product: Product }) {
    const imageSrc = product.images ? urlFor(product.images[0]) : undefined;

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
                <ImageOff className="text-gray-300" />
            )}
        </div>
    );
}
