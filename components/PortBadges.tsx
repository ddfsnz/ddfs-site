import { Badge } from "@/components/ui/badge";
import { Port } from "@/types/product";

export function PortBadges({
    portOptions,
}: {
    portOptions: Port["portOptions"];
}) {
    return (
        <div className="flex flex-wrap gap-1">
            <Badge
                variant="outline"
                className="border-red-200 bg-white text-red-700"
            >
                {portOptions.style.name}
            </Badge>
            <Badge variant="outline" className="text-gray-500">
                {portOptions.abv}% ABV
            </Badge>
        </div>
    );
}
