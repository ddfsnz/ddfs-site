import { CatalogHeader } from "@/components/CatalogHeader";
import { ProductGrid } from "@/components/ProductGrid";
import { SortOrder } from "@/components/SortOrder";
import { BEERS_CATEGORY_ID, sanity } from "@/lib/sanity";
import { Beer } from "@/types/product";

export default async function Page({
    searchParams,
}: {
    searchParams: { sort?: string };
}) {
    const sortOrder = searchParams.sort || "name asc";
    const beers = await sanity.fetch<Beer[]>(
        `*[_type == "product" && category._ref == "${BEERS_CATEGORY_ID}"] | order(${sortOrder}) {
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
        <>
            <CatalogHeader heading="Beers" />
            <div className="flex items-center justify-between border-b bg-gray-50 p-1">
                <span className="text-sm font-medium text-gray-500">
                    {beers.length} Products
                </span>
                <SortOrder />
            </div>
            <ProductGrid products={beers} />
        </>
    );
}
