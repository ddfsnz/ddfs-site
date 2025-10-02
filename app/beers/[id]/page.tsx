import { Home } from "lucide-react";
import { notFound } from "next/navigation";
import { BeerBadges } from "@/components/BeerBadges";
import { BeerOptions } from "@/components/BeerOptions";
import { ProductDetails } from "@/components/ProductDetails";
import { ProductImage } from "@/components/ProductImage";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { sanity } from "@/lib/sanity";
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

    return (
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
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-6">
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
            <div className="mx-auto w-full max-w-3xl">
                <Separator className="mb-6" />
                <h2 className="font-display text-2xl font-bold">
                    Product Details
                </h2>
                <p className="text-sm leading-normal">Product description...</p>
            </div>
        </div>
    );
}
