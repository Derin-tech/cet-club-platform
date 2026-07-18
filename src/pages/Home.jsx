import { Link } from 'react-router-dom';
import { ChevronRight, Calendar } from 'lucide-react';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ClubGrid from '../components/ClubGrid';
import { clubs } from '../data/clubs';

export default function Home() {
  const allAnnouncements = clubs.flatMap(club => 
    club.announcements.map(a => ({ ...a, clubId: club.id, clubName: club.name, clubPhoto: club.photo }))
  );
  
  allAnnouncements.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Skip the first one as it's in the banner
  const latestUpdates = allAnnouncements.slice(1, 4);
  
  // Calculate stats
  const totalClubs = clubs.length;
  const totalAdvisors = new Set(clubs.map(c => c.facultyAdvisor)).size;
  const currentMonth = new Date().getMonth();
  const announcementsThisMonth = allAnnouncements.filter(a => new Date(a.date).getMonth() === currentMonth).length;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <AnnouncementBanner />
      <Navbar />
      
      <main className="flex-grow">
        <Hero 
          totalClubs={totalClubs} 
          totalAdvisors={totalAdvisors} 
          announcementsThisMonth={announcementsThisMonth} 
        />

        {/* Latest Updates Section */}
        <section className="py-20 bg-bg-soft border-b border-border-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-extrabold text-navy-secondary mb-3">Latest Updates</h2>
                <p className="text-text-muted text-lg">Catch up on the newest events and announcements.</p>
              </div>
              <Link to="/announcements" className="hidden md:flex items-center gap-1 text-navy-primary font-bold hover:text-navy-secondary transition-colors">
                View All Announcements
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestUpdates.map((item, idx) => (
                <Link to={`/clubs/${item.clubId}`} key={idx} className="block group">
                  <div className="bg-white rounded-lg p-6 border border-border-light shadow-card hover:shadow-hover hover:border-navy-primary/20 transition-all h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-md bg-navy-primary/10 flex items-center justify-center text-navy-primary font-bold text-sm shrink-0 overflow-hidden">
                        {item.clubPhoto ? (
                          <img src={item.clubPhoto} alt={item.clubName} className="w-full h-full object-cover" />
                        ) : (
                          item.clubName.substring(0, 1)
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-text-dark text-sm group-hover:text-navy-primary transition-colors">{item.clubName}</p>
                        <div className="flex items-center gap-1 text-xs text-text-muted">
                          <Calendar className="w-3 h-3" />
                          {new Date(item.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-navy-secondary mb-2">{item.title}</h3>
                    <p className="text-text-muted text-sm line-clamp-2">{item.content}</p>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-8 md:hidden text-center">
              <Link to="/announcements" className="inline-flex items-center gap-1 text-navy-primary font-bold hover:text-navy-secondary transition-colors">
                View All Announcements
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Club Grid with background alternate */}
        <div className="bg-white">
          <ClubGrid />
        </div>
      </main>
      
      <footer className="bg-navy-secondary text-white/80 py-8 border-t border-navy-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-navy-primary rounded-sm flex items-center justify-center text-white font-bold text-xs">
              C
            </div>
            <span className="font-bold">CET Club Platform</span>
          </div>
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} College of Engineering Trivandrum
          </p>
        </div>
      </footer>
    </div>
  );
}
