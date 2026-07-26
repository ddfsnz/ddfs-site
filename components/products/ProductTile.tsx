import Link from "next/link";
import { DisplayPrice } from "@/components/price/DisplayPrice";
import { usePrice } from "@/components/price/usePrice";
import { ProductBadges } from "@/components/products/ProductBadges";
import { ProductImage } from "@/components/products/ProductImage";
import {
    BEERS_CATEGORY_ID,
    CIDERS_CATEGORY_ID,
    HONEY_CATEGORY_ID,
    LIQUEURS_CATEGORY_ID,
    PORTS_CATEGORY_ID,
    SPECIALTY_CATEGORY_ID,
    SPIRITS_CATEGORY_ID,
    TOBACCO_CATEGORY_ID,
    WINES_CATEGORY_ID,
} from "@/lib/sanity";
import { Product } from "@/types/product";

export function ProductTile({ product }: { product: Product }) {
    let productCategory = "beers";
    switch (product.category._ref) {
        case BEERS_CATEGORY_ID:
            productCategory = "beers";
            break;
        case CIDERS_CATEGORY_ID:
            productCategory = "ciders";
            break;
        case HONEY_CATEGORY_ID:
            productCategory = "honey";
            break;
        case LIQUEURS_CATEGORY_ID:
            productCategory = "liqueurs";
            break;
        case PORTS_CATEGORY_ID:
            productCategory = "ports";
            break;
        case SPECIALTY_CATEGORY_ID:
            productCategory = "specialty";
            break;
        case SPIRITS_CATEGORY_ID:
            productCategory = "spirits";
            break;
        case TOBACCO_CATEGORY_ID:
            productCategory = "tobacco";
            break;
        case WINES_CATEGORY_ID:
            productCategory = "wines";
            break;
    }

    const { calculatePrice } = usePrice();

    return (
        <Link
            href={`/${productCategory}/${product._id}`}
            className="flex flex-col gap-2 rounded-md border border-gray-100 bg-gray-50 p-2 hover:text-red-700"
        >
            <ProductImage image={product.images?.[0]} name={product.name} />
            <h3 className="mt-2 line-clamp-2 min-h-8.75 text-sm leading-tight font-medium transition-colors">
                {product.name}
            </h3>
            <ProductBadges product={product} />
            {productCategory === "beers" && "beerOptions" in product && (
                <div className="flex flex-wrap gap-1 text-xs text-gray-500">
                    {product.beerOptions.quantity.map((o, i) => (
                        <span key={o}>
                            {o} Pack
                            {i !== product.beerOptions.quantity.length - 1 &&
                                ","}
                        </span>
                    ))}
                </div>
            )}
            {productCategory === "ciders" && "ciderOptions" in product && (
                <div className="flex flex-wrap gap-1 text-xs text-gray-500">
                    {product.ciderOptions.quantity.map((o, i) => (
                        <span key={o}>
                            {o} Pack
                            {i !== product.ciderOptions.quantity.length - 1 &&
                                ","}
                        </span>
                    ))}
                </div>
            )}
            {productCategory === "honey" && "honeyOptions" in product && (
                <>
                    {"quantity" in product.honeyOptions && (
                        <span className="text-xs text-gray-500">
                            {product.honeyOptions.quantity} capsules
                        </span>
                    )}
                    {"size" in product.honeyOptions && (
                        <span className="text-xs text-gray-500">
                            {product.honeyOptions.size.value}
                            {product.honeyOptions.size.unit}
                        </span>
                    )}
                </>
            )}
            {productCategory === "liqueurs" && "liquerOptions" in product && (
                <span className="text-xs text-gray-500">
                    {product.liquerOptions.size.value}
                    {product.liquerOptions.size.unit}
                </span>
            )}
            {productCategory === "ports" && "portOptions" in product && (
                <span className="text-xs text-gray-500">
                    {product.portOptions.size.value}
                    {product.portOptions.size.unit}
                </span>
            )}
            {productCategory === "specialty" &&
                "specialtyOptions" in product && (
                    <span className="text-xs text-gray-500">
                        {product.specialtyOptions.size.value}
                        {product.specialtyOptions.size.unit}
                    </span>
                )}
            {productCategory === "spirits" && "spiritOptions" in product && (
                <span className="text-xs text-gray-500">
                    {product.spiritOptions.size.value}
                    {product.spiritOptions.size.unit}
                </span>
            )}
            {productCategory === "tobacco" && "tobaccoOptions" in product && (
                <>
                    {"quantity" in product.tobaccoOptions && (
                        <span className="text-xs text-gray-500">
                            {product.tobaccoOptions.quantity} per pack
                        </span>
                    )}
                    {"size" in product.tobaccoOptions && (
                        <span className="text-xs text-gray-500">
                            {product.tobaccoOptions.size.value}
                            {product.tobaccoOptions.size.unit}
                        </span>
                    )}
                </>
            )}
            {productCategory === "wines" && "wineOptions" in product && (
                <span className="text-xs text-gray-500">
                    {product.wineOptions.size.value}
                    {product.wineOptions.size.unit}
                </span>
            )}
            <span className="font-display mt-auto text-lg font-bold text-red-700">
                <DisplayPrice
                    price={calculatePrice({
                        product,
                        packSize: null,
                        quantity: 1,
                    })}
                />
            </span>
        </Link>
    );
}
