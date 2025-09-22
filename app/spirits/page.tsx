import { CatalogHeader } from "@/components/CatalogHeader";
import { sanity, SPIRITS_CATEGORY_ID } from "@/lib/sanity";
import { Spirit } from "@/types/product";

export default async function Page() {
    const spirits = await sanity.fetch<Spirit[]>(
        `*[_type == "product" && category._ref == "${SPIRITS_CATEGORY_ID}"]`,
    );
    console.log(spirits);

    return <CatalogHeader heading="Spirits" />;
}
