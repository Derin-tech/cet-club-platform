import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ totalClubs = 0, totalAdvisors = 0, announcementsThisMonth = 0 }) {
  const scrollToClubs = () => {
    const section = document.getElementById('clubs');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-transparent overflow-hidden min-h-[80vh] flex flex-col justify-center">
      {/* Background decoration: Soft Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-pill bg-navy-primary/10 dark:bg-navy-primary/30 mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-pill bg-accent/20 dark:bg-accent/30 mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] rounded-pill bg-navy-primary/5 dark:bg-navy-primary/20 mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="text-center max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="inline-flex items-center px-4 py-1.5 rounded-pill border border-navy-primary/20 bg-white/50 dark:bg-navy-secondary/50 backdrop-blur-sm text-navy-primary dark:text-accent font-medium text-sm mb-8 shadow-card"
          >
            <span className="flex h-2 w-2 rounded-pill bg-navy-primary dark:bg-accent mr-2"></span>
            College of Engineering Trivandrum
          </motion.div>
          
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-6xl md:text-7xl font-extrabold text-navy-secondary dark:text-white tracking-tight leading-tight mb-6"
          >
            Every Club. <br className="hidden sm:block" />
            <span className="text-accent">
              One Platform.
            </span>
          </motion.h1>
          
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="mt-4 text-xl md:text-2xl text-text-muted dark:text-text-muted/80 mb-10 leading-relaxed max-w-2xl font-medium"
          >
            Discover, explore, and stay updated with every student club at CET — all in one place.
          </motion.p>
          
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex justify-center mb-10 w-full sm:w-auto"
          >
            <button
              onClick={scrollToClubs}
              className="group flex justify-center items-center gap-3 bg-navy-primary dark:bg-accent text-white px-10 py-5 rounded-md text-lg font-semibold hover:bg-navy-secondary dark:hover:bg-accent/80 hover:shadow-hover hover:scale-105 transition-all duration-300 active:scale-95 w-full sm:w-auto"
            >
              Browse Clubs
              <ArrowDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>
          
          {totalClubs > 0 && (
            <motion.div 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm text-text-muted dark:text-text-muted/80 font-medium mt-4 bg-white/70 dark:bg-navy-secondary/70 backdrop-blur-md py-3 px-6 rounded-pill border border-border-light dark:border-border-light/20 shadow-card"
            >
              <span>{totalClubs} Clubs</span>
              <span className="hidden sm:block w-1 h-1 rounded-pill bg-border-light"></span>
              <span>{totalAdvisors} Faculty Advisors</span>
              <span className="hidden sm:block w-1 h-1 rounded-pill bg-border-light"></span>
              <span>{announcementsThisMonth} Update{announcementsThisMonth !== 1 ? 's' : ''} This Month</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
