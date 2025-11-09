import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Honey } from "@/types/product";

export function HoneyBadges({
    honeyOptions,
}: {
    honeyOptions: Honey["honeyOptions"];
}) {
    return (
        <div className="flex flex-wrap gap-1">
            <Badge
                variant="outline"
                className="border-yellow-200 bg-white text-yellow-500"
            >
                {honeyOptions.style.name}
            </Badge>
            {"range" in honeyOptions && (
                <Badge
                    variant="outline"
                    className={cn(
                        honeyOptions.range === "Special"
                            ? "border-blue-200 text-blue-500"
                            : "text-gray-500",
                    )}
                >
                    {honeyOptions.range}
                </Badge>
            )}
            {"mgo" in honeyOptions && (
                <Badge variant="outline" className="text-gray-500">
                    {honeyOptions.mgo} MGO
                </Badge>
            )}
            {"umf" in honeyOptions && (
                <Badge variant="outline" className="text-gray-500">
                    {honeyOptions.umf}+ UMF
                </Badge>
            )}
        </div>
    );
}
