import Link from "next/link";
import { DisplayPrice } from "@/components/DisplayPrice";
import { Badge } from "@/components/ui/badge";
import { Beer, Cider, Product } from "@/types/product";

function BeerBadges({ beerOptions }: { beerOptions: Beer["beerOptions"] }) {
    return (
        <div className="flex flex-wrap gap-1">
            <Badge
                variant="outline"
                className="border-amber-200 bg-white text-amber-500"
            >
                {beerOptions.style?.name}
            </Badge>
            <Badge variant="outline" className="text-gray-500">
                {beerOptions.size.value}
                {beerOptions.size.unit} {beerOptions.container}
            </Badge>
            {beerOptions.abv && (
                <Badge variant="outline" className="text-gray-500">
                    {beerOptions.abv}% ABV
                </Badge>
            )}
        </div>
    );
}

function CiderBadges({
    ciderOptions,
}: {
    ciderOptions: Cider["ciderOptions"];
}) {
    return (
        <div className="flex flex-wrap gap-1">
            <Badge
                variant="outline"
                className="border-amber-200 bg-white text-amber-500"
            >
                {ciderOptions.style?.name}
            </Badge>
            <Badge variant="outline" className="text-gray-500">
                {ciderOptions.size.value}
                {ciderOptions.size.unit} {ciderOptions.container}
            </Badge>
            {ciderOptions.abv && (
                <Badge variant="outline" className="text-gray-500">
                    {ciderOptions.abv}% ABV
                </Badge>
            )}
        </div>
    );
}

export function ProductTile({ product }: { product: Product }) {
    return (
        <Link
            href="/"
            className="flex flex-col gap-2 rounded-md border border-gray-100 bg-gray-50 p-2 transition-colors hover:text-gray-600"
        >
            <div className="aspect-square rounded-sm bg-white"></div>
            <h3 className="mt-2 line-clamp-2 min-h-10 text-sm leading-tight font-medium">
                {product.name}
            </h3>
            {"beerOptions" in product && (
                <>
                    <BeerBadges beerOptions={product.beerOptions} />
                    <div className="flex flex-wrap gap-1 text-xs text-gray-500">
                        {product.beerOptions.quantity.map((o, i) => (
                            <span key={o}>
                                {o} Pack
                                {i !==
                                    product.beerOptions.quantity.length - 1 &&
                                    ","}
                            </span>
                        ))}
                    </div>
                </>
            )}
            {"ciderOptions" in product && (
                <>
                    <CiderBadges ciderOptions={product.ciderOptions} />
                    <div className="flex flex-wrap gap-1 text-xs text-gray-500">
                        {product.ciderOptions.quantity.map((o, i) => (
                            <span key={o}>
                                {o} Pack
                                {i !==
                                    product.ciderOptions.quantity.length - 1 &&
                                    ","}
                            </span>
                        ))}
                    </div>
                </>
            )}
            <span className="font-display mt-auto text-lg font-bold text-red-700">
                <DisplayPrice price={product.price} />{" "}
                <span className="text-xs font-semibold">+GST</span>
            </span>
        </Link>
    );
}
