import { CatalogHeader } from "@/components/CatalogHeader";
import { CIDERS_CATEGORY_ID, sanity } from "@/lib/sanity";
import { Cider } from "@/types/product";

export default async function Page() {
    const ciders = await sanity.fetch<Cider[]>(
        `*[_type == "product" && category._ref == "${CIDERS_CATEGORY_ID}"]`,
    );
    console.log(ciders);

    return <CatalogHeader heading="Ciders" />;
}
