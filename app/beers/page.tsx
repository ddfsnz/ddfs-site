import { CatalogHeader } from "@/components/CatalogHeader";
import { FilterInput } from "@/components/FilterInput";
import { ProductGrid } from "@/components/ProductGrid";
import { SearchInput } from "@/components/SearchInput";
import { SortOrder } from "@/components/SortOrder";
import { BEERS_CATEGORY_ID, sanity } from "@/lib/sanity";
import { Beer } from "@/types/product";

export default async function Page({
    searchParams,
}: {
    searchParams: {
        sort?: string;
        search?: string;
        company?: string;
        style?: string;
        container?: string;
    };
}) {
    const sortOrder = (await searchParams).sort || "name asc";
    const search = (await searchParams).search || "";
    const company = (await searchParams).company || "";
    const style = (await searchParams).style || "";
    const container = (await searchParams).container || "";
    let searchFilter = search
        ? `&& (name match "${search}*" || company->name match "${search}*")`
        : "";
    if (company) {
        searchFilter += ` && company._ref == "${company}"`;
    }
    if (style) {
        searchFilter += ` && beerOptions.style._ref == "${style}"`;
    }
    if (container) {
        searchFilter += ` && beerOptions.container == "${container}"`;
    }
    const beers = await sanity.fetch<Beer[]>(
        `*[_type == "product" && category._ref == "${BEERS_CATEGORY_ID}" ${searchFilter}] | order(${sortOrder}) {
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
    const companies = await sanity.fetch(
        `*[_type == "company" && category._ref == "${BEERS_CATEGORY_ID}"] | order(name asc)`,
    );
    const styles = await sanity.fetch(
        `*[_type == "tag" && type == "style" && category._ref == "${BEERS_CATEGORY_ID}"] | order(name asc)`,
    );
    const containers = [
        { value: "Cans", label: "Cans" },
        { value: "Bottles", label: "Bottles" },
    ];

    return (
        <>
            <CatalogHeader heading="Beers" />
            <div className="grid grid-cols-1 md:grid-cols-[240px_auto]">
                <div className="hidden border-r p-3 pl-0 md:block">
                    <div className="sticky top-24 grid grid-cols-1 place-content-start gap-4">
                        <SearchInput label="Search" initialValue={search} />
                        <FilterInput
                            label="Producers"
                            filterName="company"
                            filterOptions={companies.map((c) => ({
                                value: c._id,
                                label: c.name,
                            }))}
                        />
                        <FilterInput
                            label="Style"
                            filterName="style"
                            filterOptions={styles.map((s) => ({
                                value: s._id,
                                label: s.name,
                            }))}
                        />
                        <FilterInput
                            label="Containers"
                            filterName="container"
                            filterOptions={containers}
                        />
                    </div>
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
