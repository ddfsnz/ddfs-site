import { CatalogHeader } from "@/components/CatalogHeader";
import { FilterInput } from "@/components/FilterInput";
import { ProductCatalog } from "@/components/ProductCatalog";
import { sanity, SPIRITS_CATEGORY_ID } from "@/lib/sanity";
import { Company, Style } from "@/types/metadata";
import { Spirit } from "@/types/product";

export default async function Page({
    searchParams,
}: {
    searchParams: {
        sort?: string;
        search?: string;
        company?: string;
        style?: string;
        size?: string;
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
        searchFilter += ` && spiritOptions.style._ref == "${filters.style}"`;
    }
    if (filters.size) {
        searchFilter += ` && spiritOptions.size.value == ${filters.size}`;
    }

    const sortOrder = filters.sort || "name asc";

    const spirits = await sanity.fetch<Spirit[]>(
        `*[_type == "product" && category._ref == "${SPIRITS_CATEGORY_ID}" ${searchFilter}] | order(${sortOrder}) {
            ...,
            company->{
                ...,
                name
            },
            spiritOptions {
                ...,
                style->{
                    ...,
                    name
                }
            }
        }`,
    );

    const companies = await sanity.fetch<Company[]>(
        `*[_type == "company" && category._ref == "${SPIRITS_CATEGORY_ID}"] | order(name asc)`,
    );

    const styles = await sanity.fetch<Style[]>(
        `*[_type == "tag" && type == "style" && category._ref == "${SPIRITS_CATEGORY_ID}"] | order(name asc)`,
    );

    const allSpiritSizes = await sanity.fetch<Spirit[]>(
        `*[_type == "product" && category._ref == "${SPIRITS_CATEGORY_ID}"] {
            spiritOptions
        }`,
    );
    const sizes = Array.from(
        new Map(
            allSpiritSizes.map((s) => [
                String(s.spiritOptions.size.value),
                {
                    value: String(s.spiritOptions.size.value),
                    label:
                        s.spiritOptions.size.value + s.spiritOptions.size.unit,
                },
            ]),
        ).values(),
    );

    return (
        <>
            <CatalogHeader heading="Spirits" />
            <ProductCatalog products={spirits} search={filters.search}>
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
            </ProductCatalog>
        </>
    );
}
