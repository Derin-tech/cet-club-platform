import { ArrowDown } from 'lucide-react';

export default function Hero({ totalClubs = 0, totalAdvisors = 0, announcementsThisMonth = 0 }) {
  const scrollToClubs = () => {
    const section = document.getElementById('clubs');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-50 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-50 opacity-50 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-100 bg-blue-50 text-blue-700 font-medium text-sm mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
            College of Engineering Trivandrum
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-950 tracking-tight leading-tight mb-6">
            Discover every club at <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              CET in one place
            </span>
          </h1>
          
          <p className="mt-4 text-xl text-gray-600 mb-10 leading-relaxed">
            From technology and coding to arts and recreation, explore all the vibrant student communities shaping life at CET. Find your passion, connect with peers, and start building.
          </p>
          
          <div className="flex justify-center mb-6">
            <button
              onClick={scrollToClubs}
              className="group flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
            >
              Explore Clubs
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
          
          {totalClubs > 0 && (
            <div className="text-sm text-slate-500 font-normal mt-4">
              {totalClubs} Clubs &middot; {totalAdvisors} Faculty Advisors &middot; {announcementsThisMonth} Update{announcementsThisMonth !== 1 ? 's' : ''} This Month
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
