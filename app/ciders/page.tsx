import { CatalogHeader } from "@/components/CatalogHeader";
import { FilterInput } from "@/components/FilterInput";
import { ProductCatalog } from "@/components/ProductCatalog";
import { CIDERS_CATEGORY_ID, sanity } from "@/lib/sanity";
import { Company, Style } from "@/types/metadata";
import { Cider } from "@/types/product";

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
        searchFilter += ` && ciderOptions.style._ref == "${filters.style}"`;
    }
    if (filters.size) {
        searchFilter += ` && ciderOptions.size.value == ${filters.size}`;
    }
    if (filters.container) {
        searchFilter += ` && ciderOptions.container == "${filters.container}"`;
    }

    const sortOrder = filters.sort || "name asc";

    const ciders = await sanity.fetch<Cider[]>(
        `*[_type == "product" && category._ref == "${CIDERS_CATEGORY_ID}" ${searchFilter}] | order(${sortOrder}) {
            ...,
            company->{
                ...,
                name
            },
            ciderOptions {
                ...,
                style->{
                    ...,
                    name
                }
            }
        }`,
    );

    const companies = await sanity.fetch<Company[]>(
        `*[_type == "company" && category._ref == "${CIDERS_CATEGORY_ID}"] | order(name asc)`,
    );

    const styles = await sanity.fetch<Style[]>(
        `*[_type == "tag" && type == "style" && category._ref == "${CIDERS_CATEGORY_ID}"] | order(name asc)`,
    );

    const allCiderSizes = await sanity.fetch<Cider[]>(
        `*[_type == "product" && category._ref == "${CIDERS_CATEGORY_ID}"] {
            ciderOptions
        }`,
    );
    const sizes = Array.from(
        new Map(
            allCiderSizes.map((c) => [
                String(c.ciderOptions.size.value),
                {
                    value: String(c.ciderOptions.size.value),
                    label: c.ciderOptions.size.value + c.ciderOptions.size.unit,
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
            <CatalogHeader heading="Ciders" />
            <ProductCatalog products={ciders} search={filters.search}>
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
