import { CatalogHeader } from "@/components/CatalogHeader";
import { FilterInput } from "@/components/FilterInput";
import { ProductCatalog } from "@/components/ProductCatalog";
import { BEERS_CATEGORY_ID, sanity } from "@/lib/sanity";
import { Company, Style } from "@/types/metadata";
import { Beer } from "@/types/product";

export default async function Page({
    searchParams,
}: {
    searchParams: {
        sort?: string;
        search?: string;
        company?: string;
        style?: string;
        size?: string;
        container?: string;
    };
}) {
    const filters = await searchParams;
    let searchFilter = filters.search
        ? `&& (name match "${filters.search}*" || company->name match "${filters.search}*")`
        : "";
    if (filters.company) {
        searchFilter += ` && company._ref == "${filters.company}"`;
    }
    if (filters.style) {
        searchFilter += ` && beerOptions.style._ref == "${filters.style}"`;
    }
    if (filters.size) {
        searchFilter += ` && beerOptions.size.value == ${filters.size}`;
    }
    if (filters.container) {
        searchFilter += ` && beerOptions.container == "${filters.container}"`;
    }

    const sortOrder = (await searchParams).sort || "name asc";

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

    const companies = await sanity.fetch<Company[]>(
        `*[_type == "company" && category._ref == "${BEERS_CATEGORY_ID}"] | order(name asc)`,
    );

    const styles = await sanity.fetch<Style[]>(
        `*[_type == "tag" && type == "style" && category._ref == "${BEERS_CATEGORY_ID}"] | order(name asc)`,
    );

    const allBeerSizes = await sanity.fetch<Beer[]>(
        `*[_type == "product" && category._ref == "${BEERS_CATEGORY_ID}"] {
            beerOptions
        }`,
    );
    const sizes = Array.from(
        new Map(
            allBeerSizes.map((b) => [
                String(b.beerOptions.size.value),
                {
                    value: String(b.beerOptions.size.value),
                    label: b.beerOptions.size.value + b.beerOptions.size.unit,
                },
            ]),
        ).values(),
    );

    const containers = [
        { value: "Cans", label: "Cans" },
        { value: "Bottles", label: "Bottles" },
    ];

    return (
        <>
            <CatalogHeader heading="Beers" />
            <ProductCatalog products={beers} search={filters.search}>
                <FilterInput
                    label="Producer"
                    filterName="company"
                    filterOptions={companies.map((c) => ({
                        value: c._id,
                        label: c.name,
                    }))}
                    defaultValue={filters.company}
                />
                <FilterInput
                    label="Style"
                    filterName="style"
                    filterOptions={styles.map((s) => ({
                        value: s._id,
                        label: s.name,
                    }))}
                    defaultValue={filters.style}
                />
                <FilterInput
                    label="Size"
                    filterName="size"
                    filterOptions={sizes}
                    defaultValue={filters.size}
                />
                <FilterInput
                    label="Container"
                    filterName="container"
                    filterOptions={containers}
                    defaultValue={filters.container}
                />
            </ProductCatalog>
        </>
    );
}
