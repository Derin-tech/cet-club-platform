import { ArrowDown } from 'lucide-react';

export default function Hero({ totalClubs = 0, totalAdvisors = 0, announcementsThisMonth = 0 }) {
  const scrollToClubs = () => {
    const section = document.getElementById('clubs');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-bg-soft overflow-hidden min-h-[80vh] flex flex-col justify-center">
      {/* Background decoration: Soft Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-pill bg-navy-primary/10 mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-pill bg-accent/20 mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] rounded-pill bg-navy-primary/5 mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-pill border border-navy-primary/20 bg-navy-primary/5 backdrop-blur-sm text-navy-primary font-medium text-sm mb-8 shadow-card">
            <span className="flex h-2 w-2 rounded-pill bg-navy-primary mr-2"></span>
            College of Engineering Trivandrum
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold text-navy-secondary tracking-tight leading-tight mb-6">
            Every Club. <br className="hidden sm:block" />
            <span className="text-accent">
              One Platform.
            </span>
          </h1>
          
          <p className="mt-4 text-xl md:text-2xl text-text-muted mb-10 leading-relaxed max-w-2xl font-medium">
            Discover, explore, and stay updated with every student club at CET — all in one place.
          </p>
          
          <div className="flex justify-center mb-10 w-full sm:w-auto">
            <button
              onClick={scrollToClubs}
              className="group flex justify-center items-center gap-3 bg-navy-primary text-white px-10 py-5 rounded-md text-lg font-semibold hover:bg-navy-secondary hover:shadow-hover hover:scale-105 transition-all duration-300 active:scale-95 w-full sm:w-auto"
            >
              Browse Clubs
              <ArrowDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
          
          {totalClubs > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm text-text-muted font-medium mt-4 bg-white/50 backdrop-blur-sm py-3 px-6 rounded-pill border border-border-light shadow-card">
              <span>{totalClubs} Clubs</span>
              <span className="hidden sm:block w-1 h-1 rounded-pill bg-border-light"></span>
              <span>{totalAdvisors} Faculty Advisors</span>
              <span className="hidden sm:block w-1 h-1 rounded-pill bg-border-light"></span>
              <span>{announcementsThisMonth} Update{announcementsThisMonth !== 1 ? 's' : ''} This Month</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
