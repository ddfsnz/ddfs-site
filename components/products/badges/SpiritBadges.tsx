import { Plane } from "lucide-react";
import { Badge } from "@/components/_ui/badge";
import { Spirit } from "@/types/product";

export function SpiritBadges({
    spiritOptions,
}: {
    spiritOptions: Spirit["spiritOptions"];
}) {
    return (
        <div className="flex flex-wrap gap-1">
            <Badge
                variant="outline"
                className="border-yellow-200 bg-white text-yellow-500"
            >
                {spiritOptions.style?.name}
            </Badge>
            <Badge variant="outline" className="text-gray-500">
                {spiritOptions.abv}% ABV
            </Badge>
            {spiritOptions.age && (
                <Badge variant="outline" className="text-gray-500">
                    {spiritOptions.age} YO
                </Badge>
            )}
            {spiritOptions.isExportExclusive && (
                <Badge variant="outline" className="text-gray-500">
                    <Plane />
                    Export Exclusive
                </Badge>
            )}
        </div>
    );
}
