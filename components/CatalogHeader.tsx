export function CatalogHeader({ heading }: { heading: string }) {
    return (
        <div className="border-b pb-4">
            <h1 className="font-display text-5xl font-bold sm:text-7xl">
                {heading}
            </h1>
        </div>
    );
}
