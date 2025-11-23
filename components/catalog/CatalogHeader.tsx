export function CatalogHeader({
    heading,
    subheading,
}: {
    heading: string;
    subheading: string;
}) {
    return (
        <div className="pb-4">
            <h1 className="font-display mb-2 text-5xl font-bold text-red-700 sm:text-7xl">
                {heading}
            </h1>
            <p className="text-sm text-gray-700">{subheading}</p>
        </div>
    );
}
