import { Settings2 } from "lucide-react";
import { ProductGrid } from "@/components/ProductGrid";
import { SearchInput } from "@/components/SearchInput";
import { SortOrder } from "@/components/SortOrder";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Product } from "@/types/product";

export function ProductCatalog({
    children,
    search,
    products,
}: {
    children: React.ReactNode;
    search?: string;
    products: Product[];
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[240px_auto]">
            <div className="hidden border-r p-3 pt-6 pl-0 md:block">
                <div className="sticky top-24 grid grid-cols-1 place-content-start gap-4">
                    <SearchInput label="Search" initialValue={search} />
                    {children}
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between border-b bg-gray-50 p-1 md:pl-3">
                    <div className="flex items-center gap-3">
                        <Popover>
                            <PopoverTrigger className="block md:hidden" asChild>
                                <Button size="icon" variant="ghost">
                                    <Settings2 />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="sticky top-24 grid grid-cols-1 place-content-start gap-4">
                                    <SearchInput
                                        label="Search"
                                        initialValue={search}
                                    />
                                    {children}
                                </div>
                            </PopoverContent>
                        </Popover>
                        <span className="text-sm font-medium text-gray-500">
                            {products.length} Products
                        </span>
                    </div>
                    <SortOrder />
                </div>
                <div className="py-2 md:p-2 md:pr-0 lg:p-3 lg:pr-0">
                    <ProductGrid products={products} />
                </div>
            </div>
        </div>
    );
}
