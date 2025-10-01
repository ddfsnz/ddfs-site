import { notFound } from "next/navigation";
import { BeerBadges } from "@/components/BeerBadges";
import { ProductImage } from "@/components/ProductImage";
import { sanity } from "@/lib/sanity";
import { Beer } from "@/types/product";

export default async function Page({
    params,
}: {
    params: {
        id: string;
    };
}) {
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
        { id: params.id },
    );

    if (!beer) {
        notFound();
    }

    return (
        <>
            <div className="mt-24 grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-6">
                <div className="overflow-hidden rounded-lg border">
                    <ProductImage product={beer} />
                </div>
                <div className="grid h-min gap-3 md:mt-3 lg:mt-6">
                    <h1 className="font-display text-3xl font-bold md:mt-6">
                        {beer.name}
                    </h1>
                    <BeerBadges beerOptions={beer.beerOptions} />
                </div>
            </div>
        </>
    );
}
