import { Badge } from "@/components/_ui/badge";
import { Cider } from "@/types/product";

export function CiderBadges({
    ciderOptions,
}: {
    ciderOptions: Cider["ciderOptions"];
}) {
    return (
        <div className="flex flex-wrap gap-1">
            <Badge
                variant="outline"
                className="border-amber-200 bg-white text-amber-500"
            >
                {ciderOptions.style.name}
            </Badge>
            <Badge variant="outline" className="text-gray-500">
                {ciderOptions.size.value}
                {ciderOptions.size.unit} {ciderOptions.container}
            </Badge>
            {ciderOptions.abv && (
                <Badge variant="outline" className="text-gray-500">
                    {ciderOptions.abv}% ABV
                </Badge>
            )}
        </div>
    );
}
