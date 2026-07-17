import { clubs } from '../data/clubs';
import ClubCard from './ClubCard';

export default function ClubGrid() {
  return (
    <section id="clubs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-4">
            Explore Our Clubs
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find a community that matches your interests, develop new skills, and make lifelong connections.
          </p>
        </div>
        
        {/* Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </div>
    </section>
  );
}
