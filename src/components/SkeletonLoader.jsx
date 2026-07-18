export default function SkeletonLoader() {
  return (
    <div className="bg-white/70 dark:bg-navy-secondary/70 backdrop-blur-md rounded-lg border border-border-light dark:border-border-light/20 shadow-card flex flex-col overflow-hidden animate-pulse">
      {/* Header Placeholder */}
      <div className="h-32 bg-gray-200 dark:bg-navy-primary/30 w-full"></div>
      
      {/* Body Placeholder */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="h-6 bg-gray-200 dark:bg-navy-primary/30 rounded w-3/4 mb-4"></div>
        <div className="space-y-2 mb-6 flex-grow">
          <div className="h-4 bg-gray-200 dark:bg-navy-primary/20 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-navy-primary/20 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-navy-primary/20 rounded w-4/6"></div>
        </div>
        
        {/* Button Placeholder */}
        <div className="mt-auto flex justify-between items-center border-t border-border-light dark:border-border-light/10 pt-4">
          <div className="h-4 bg-gray-200 dark:bg-navy-primary/30 rounded w-1/3"></div>
          <div className="w-6 h-6 bg-gray-200 dark:bg-navy-primary/30 rounded"></div>
        </div>
      </div>
    </div>
  );
}
