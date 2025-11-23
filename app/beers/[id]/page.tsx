import { ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/_ui/breadcrumb";
import { BeerBadges } from "@/components/BeerBadges";
import { BeerOptions } from "@/components/BeerOptions";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { ProductDescription } from "@/components/products/ProductDescription";
import { ProductDetails } from "@/components/products/ProductDetails";
import { ProductImage } from "@/components/products/ProductImage";
import { BEERS_CATEGORY_ID, sanity } from "@/lib/sanity";
import { Beer } from "@/types/product";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;
    const beer = await sanity.fetch<Beer | undefined>(
        `*[_type == "product" && _id == $id][0]{
            ...,
            company->{
                ...,
                name
            },
            beerOptions {
                ...,
                style->{
                    ...,
                    name
                }
            }
        }`,
        { id: id },
    );

    if (!beer) {
        notFound();
    }

    const companyId = beer.company._id;
    const related = await sanity.fetch<Beer[]>(
        `*[_type == "product" && category._ref == "${BEERS_CATEGORY_ID}" && company._ref == "${companyId}" && _id != "${beer._id}"][0...4] {
            ...,
            company->{
                ...,
                name
            },
            beerOptions {
                ...,
                style->{
                    ...,
                    name
                }
            }
        }`,
    );

    return (
        <main className="mx-auto max-w-7xl px-4 py-32 pt-24">
            <div className="grid grid-cols-1 gap-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">
                                <Home className="size-4" />
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/beers">Beers</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-2 lg:gap-6">
                    <div className="overflow-hidden rounded-lg border">
                        <ProductImage product={beer} />
                    </div>
                    <div className="grid h-min gap-6 md:pt-3 lg:pt-6 lg:pr-3 lg:pb-6">
                        <ProductDetails product={beer}>
                            <BeerBadges beerOptions={beer.beerOptions} />
                        </ProductDetails>
                        <BeerOptions beer={beer} />
                    </div>
                </div>
                <div className="mx-auto my-12 w-full max-w-3xl">
                    <h2 className="font-display mb-2 text-2xl font-bold">
                        {beer.name}
                    </h2>
                    <ProductDescription description={beer.description} />
                </div>
                <div className="mx-auto my-12 w-full max-w-5xl">
                    <div className="flex items-baseline justify-between gap-3">
                        <h2 className="font-display mb-6 text-2xl font-bold">
                            More from {beer.company.name}
                        </h2>
                        <Link
                            href={`/beers?company=${companyId}`}
                            className="flex items-center gap-1 transition-colors hover:text-red-700"
                        >
                            See All <ArrowRight className="size-4" />
                        </Link>
                    </div>
                    <CatalogGrid products={related} threeCols={false} />
                </div>
            </div>
        </main>
    );
}
