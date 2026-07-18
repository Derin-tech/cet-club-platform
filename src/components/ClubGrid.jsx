import { useState, useEffect } from 'react';
import { clubs } from '../data/clubs';
import ClubCard from './ClubCard';
import SkeletonLoader from './SkeletonLoader';
import { motion } from 'framer-motion';

export default function ClubGrid() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief network fetch to show off the skeleton loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="clubs" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-secondary dark:text-white mb-4">
            Explore Our Clubs
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-pill mb-6 shadow-card"></div>
          <p className="text-lg text-text-muted dark:text-text-muted/80 max-w-2xl mx-auto">
            Find a community that matches your interests, develop new skills, and make lifelong connections.
          </p>
        </motion.div>
        
        {/* Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Show 6 skeletons while loading
            Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonLoader key={idx} />
            ))
          ) : (
            clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
