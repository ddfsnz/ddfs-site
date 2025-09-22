import { CatalogHeader } from "@/components/CatalogHeader";
import { sanity, WINES_CATEGORY_ID } from "@/lib/sanity";
import { Wine } from "@/types/product";

export default async function Page() {
    const wines = await sanity.fetch<Wine[]>(
        `*[_type == "product" && category._ref == "${WINES_CATEGORY_ID}"]`,
    );
    console.log(wines);

    return <CatalogHeader heading="Wines" />;
}
