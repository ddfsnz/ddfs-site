import { BeerBadges } from "@/components/products/badges/BeerBadges";
import { HoneyBadges } from "@/components/products/badges/HoneyBadges";
import { LiqueurBadges } from "@/components/products/badges/LiqueurBadges";
import { PortBadges } from "@/components/products/badges/PortBadges";
import { SpecialtyBadges } from "@/components/products/badges/SpecialtyBadges";
import { SpiritBadges } from "@/components/products/badges/SpiritBadges";
import { TobaccoBadges } from "@/components/products/badges/TobaccoBadges";
import { WineBadges } from "@/components/products/badges/WineBadges";
import { Product } from "@/types/product";

export function ProductBadges({ product }: { product: Product }) {
    if ("beerOptions" in product) {
        return <BeerBadges beerOptions={product.beerOptions} />;
    }
    if ("honeyOptions" in product) {
        return <HoneyBadges honeyOptions={product.honeyOptions} />;
    }
    if ("liquerOptions" in product) {
        return <LiqueurBadges liquerOptions={product.liquerOptions} />;
    }
    if ("portOptions" in product) {
        return <PortBadges portOptions={product.portOptions} />;
    }
    if ("specialtyOptions" in product) {
        return <SpecialtyBadges specialtyOptions={product.specialtyOptions} />;
    }
    if ("spiritOptions" in product) {
        return <SpiritBadges spiritOptions={product.spiritOptions} />;
    }
    if ("tobaccoOptions" in product) {
        return <TobaccoBadges tobaccoOptions={product.tobaccoOptions} />;
    }
    if ("wineOptions" in product) {
        return <WineBadges wineOptions={product.wineOptions} />;
    }
    return null;
}
