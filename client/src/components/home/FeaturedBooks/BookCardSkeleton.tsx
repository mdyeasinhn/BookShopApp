export const BookCardSkeleton = () => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="w-full aspect-[4/5.5] bg-gray-200 animate-pulse"></div>
            <div className="p-5">
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded mt-2 animate-pulse"></div>
                <div className="flex justify-between items-center mt-4">
                    <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 w-1/3 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};