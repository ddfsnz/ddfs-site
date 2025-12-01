import { Badge } from "@/components/_ui/badge";
import { Specialty } from "@/types/product";

export function SpecialtyBadges({
    specialtyOptions,
}: {
    specialtyOptions: Specialty["specialtyOptions"];
}) {
    return (
        <div className="flex flex-wrap gap-1">
            <Badge
                variant="outline"
                className="border-lime-200 bg-white text-lime-700"
            >
                {specialtyOptions.style.name}
            </Badge>
        </div>
    );
}
