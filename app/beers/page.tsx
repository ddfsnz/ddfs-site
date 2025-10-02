import { CatalogHeader } from "@/components/CatalogHeader";
import { ProductGrid } from "@/components/ProductGrid";
import { SortOrder } from "@/components/SortOrder";
import { Input } from "@/components/ui/input";
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
            <div className="grid grid-cols-1 md:grid-cols-[240px_auto]">
                <div className="hidden gap-4 border-r p-3 md:grid">
                    <Input placeholder="Search..." />
                </div>
                <div>
                    <div className="flex items-center justify-between border-b bg-gray-50 p-1 pl-4">
                        <span className="text-sm font-medium text-gray-500">
                            {beers.length} Products
                        </span>
                        <SortOrder />
                    </div>
                    <div className="py-2 md:p-2 md:pr-0 lg:p-3 lg:pr-0">
                        <ProductGrid products={beers} />
                    </div>
                </div>
            </div>
        </>
    );
}
