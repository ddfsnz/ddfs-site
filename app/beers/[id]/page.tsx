import { Home } from "lucide-react";
import { notFound } from "next/navigation";
import { BeerBadges } from "@/components/BeerBadges";
import { BeerOptions } from "@/components/BeerOptions";
import { ProductDescription } from "@/components/ProductDescription";
import { ProductDetails } from "@/components/ProductDetails";
import { ProductImage } from "@/components/ProductImage";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
    console.log(beer);

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
            <div className="mx-auto my-12 w-full max-w-3xl">
                <h2 className="font-display mb-2 text-2xl font-bold">
                    {beer.name}
                </h2>
                <ProductDescription description={beer.description} />
            </div>
        </div>
    );
}
