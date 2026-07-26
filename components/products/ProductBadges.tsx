import { BeerBadges } from "@/components/products/badges/BeerBadges";
import { HoneyBadges } from "@/components/products/badges/HoneyBadges";
import { LiqueurBadges } from "@/components/products/badges/LiqueurBadges";
import { PortBadges } from "@/components/products/badges/PortBadges";
import { SpecialtyBadges } from "@/components/products/badges/SpecialtyBadges";
import { SpiritBadges } from "@/components/products/badges/SpiritBadges";
import { TobaccoBadges } from "@/components/products/badges/TobaccoBadges";
import { WineBadges } from "@/components/products/badges/WineBadges";
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

export function ProductBadges({ product }: { product: Product }) {
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

    if (productCategory === "beers" && "beerOptions" in product) {
        return <BeerBadges beerOptions={product.beerOptions} />;
    }
    if (productCategory === "honey" && "honeyOptions" in product) {
        return <HoneyBadges honeyOptions={product.honeyOptions} />;
    }
    if (productCategory === "liqueurs" && "liquerOptions" in product) {
        return <LiqueurBadges liquerOptions={product.liquerOptions} />;
    }
    if (productCategory === "ports" && "portOptions" in product) {
        return <PortBadges portOptions={product.portOptions} />;
    }
    if (productCategory === "specialty" && "specialtyOptions" in product) {
        return <SpecialtyBadges specialtyOptions={product.specialtyOptions} />;
    }
    if (productCategory === "spirits" && "spiritOptions" in product) {
        return <SpiritBadges spiritOptions={product.spiritOptions} />;
    }
    if (productCategory === "tobacco" && "tobaccoOptions" in product) {
        return <TobaccoBadges tobaccoOptions={product.tobaccoOptions} />;
    }
    if (productCategory === "wines" && "wineOptions" in product) {
        return <WineBadges wineOptions={product.wineOptions} />;
    }
    return null;
}
