import { Plane } from "lucide-react";
import Link from "next/link";
import { BeerBadges } from "@/components/BeerBadges";
import { CiderBadges } from "@/components/CiderBadges";
import { DisplayPrice } from "@/components/DisplayPrice";
import { HoneyBadges } from "@/components/HoneyBadges";
import { ProductImage } from "@/components/ProductImage";
import { Badge } from "@/components/ui/badge";
import {
    BEERS_CATEGORY_ID,
    CIDERS_CATEGORY_ID,
    HONEY_CATEGORY_ID,
    LIQUERS_CATEGORY_ID,
    PORTS_CATEGORY_ID,
    SPIRITS_CATEGORY_ID,
    TOBACCO_CATEGORY_ID,
    WINES_CATEGORY_ID,
} from "@/lib/sanity";
import { cn } from "@/lib/utils";
import { Liquer, Port, Product, Spirit, Tobacco, Wine } from "@/types/product";

function LiquerBadges({
    liquerOptions,
}: {
    liquerOptions: Liquer["liquerOptions"];
}) {
    return (
        <div className="flex flex-wrap gap-1">
            <Badge
                variant="outline"
                className="border-green-200 bg-white text-green-500"
            >
                {liquerOptions.style.name}
            </Badge>
            <Badge variant="outline" className="text-gray-500">
                {liquerOptions.abv}% ABV
            </Badge>
            {liquerOptions.isTravelExclusive && (
                <Badge variant="outline" className="text-gray-500">
                    Travel Exclusive
                </Badge>
            )}
        </div>
    );
}

function PortBadges({ portOptions }: { portOptions: Port["portOptions"] }) {
    return (
        <div className="flex flex-wrap gap-1">
            <Badge
                variant="outline"
                className="border-red-200 bg-white text-red-700"
            >
                {portOptions.style.name}
            </Badge>
            <Badge variant="outline" className="text-gray-500">
                {portOptions.abv}% ABV
            </Badge>
        </div>
    );
}

function SpiritBadges({
    spiritOptions,
}: {
    spiritOptions: Spirit["spiritOptions"];
}) {
    return (
        <div className="flex flex-wrap gap-1">
            <Badge
                variant="outline"
                className="border-yellow-200 bg-white text-yellow-500"
            >
                {spiritOptions.style?.name}
            </Badge>
            <Badge variant="outline" className="text-gray-500">
                {spiritOptions.abv}% ABV
            </Badge>
            {spiritOptions.age && (
                <Badge variant="outline" className="text-gray-500">
                    {spiritOptions.age} YO
                </Badge>
            )}
            {spiritOptions.isExportExclusive && (
                <Badge variant="outline" className="text-gray-500">
                    <Plane />
                    Export Exclusive
                </Badge>
            )}
        </div>
    );
}

function TobaccoBadges({
    tobaccoOptions,
}: {
    tobaccoOptions: Tobacco["tobaccoOptions"];
}) {
    return (
        <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="bg-white">
                {tobaccoOptions.style.name}
            </Badge>
        </div>
    );
}

function WineBadges({ wineOptions }: { wineOptions: Wine["wineOptions"] }) {
    return (
        <div className="flex flex-wrap gap-1">
            <Badge
                variant="outline"
                className={cn(
                    "bg-white",
                    wineOptions.wineType === "Red"
                        ? "border-rose-200 text-rose-800"
                        : "border-yellow-200 text-yellow-500",
                )}
            >
                {wineOptions.style.name}
            </Badge>
            <Badge variant="outline" className="text-gray-500">
                {wineOptions.region}
            </Badge>
            {wineOptions.year && (
                <Badge variant="outline" className="text-gray-500">
                    {wineOptions.year}
                </Badge>
            )}
            <Badge variant="outline" className="text-gray-500">
                {wineOptions.abv}% ABV
            </Badge>
        </div>
    );
}

export function ProductGridTile({ product }: { product: Product }) {
    let productLink = "/";
    switch (product.category._ref) {
        case BEERS_CATEGORY_ID:
            productLink = `/beers/${product._id}`;
            break;
        case CIDERS_CATEGORY_ID:
            productLink = `/ciders/${product._id}`;
            break;
        case HONEY_CATEGORY_ID:
            productLink = `/honey/${product._id}`;
            break;
        case LIQUERS_CATEGORY_ID:
            productLink = `/liquers/${product._id}`;
            break;
        case PORTS_CATEGORY_ID:
            productLink = `/port/${product._id}`;
            break;
        case SPIRITS_CATEGORY_ID:
            productLink = `/spirits/${product._id}`;
            break;
        case TOBACCO_CATEGORY_ID:
            productLink = `/tobacco/${product._id}`;
            break;
        case WINES_CATEGORY_ID:
            productLink = `/wines/${product._id}`;
            break;
    }

    return (
        <Link
            href={productLink}
            className="flex flex-col gap-2 rounded-md border border-gray-100 bg-gray-50 p-2 hover:text-red-700"
        >
            <ProductImage product={product} />
            <h3 className="mt-2 line-clamp-2 min-h-[calc((0.875rem*1.25)*2)] text-sm leading-tight font-medium transition-colors">
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
            {"honeyOptions" in product && (
                <>
                    <HoneyBadges honeyOptions={product.honeyOptions} />
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
            {"liquerOptions" in product && (
                <>
                    <LiquerBadges liquerOptions={product.liquerOptions} />
                    <span className="text-xs text-gray-500">
                        {product.liquerOptions.size.value}
                        {product.liquerOptions.size.unit}
                    </span>
                </>
            )}
            {"portOptions" in product && (
                <>
                    <PortBadges portOptions={product.portOptions} />
                    <span className="text-xs text-gray-500">
                        {product.portOptions.size.value}
                        {product.portOptions.size.unit}
                    </span>
                </>
            )}
            {"spiritOptions" in product && (
                <>
                    <SpiritBadges spiritOptions={product.spiritOptions} />
                    <span className="text-xs text-gray-500">
                        {product.spiritOptions.size.value}
                        {product.spiritOptions.size.unit}
                    </span>
                </>
            )}
            {"tobaccoOptions" in product && (
                <>
                    <TobaccoBadges tobaccoOptions={product.tobaccoOptions} />
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
            {"wineOptions" in product && (
                <>
                    <WineBadges wineOptions={product.wineOptions} />
                    <span className="text-xs text-gray-500">
                        {product.wineOptions.size.value}
                        {product.wineOptions.size.unit}
                    </span>
                </>
            )}
            <span className="font-display mt-auto text-lg font-bold text-red-700">
                <DisplayPrice price={product.price} />{" "}
                <span className="text-xs font-semibold">+GST</span>
            </span>
        </Link>
    );
}
