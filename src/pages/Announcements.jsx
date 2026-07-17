import { Link } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';
import { clubs } from '../data/clubs';
import Navbar from '../components/Navbar';

export default function Announcements() {
  // Aggregate all announcements and attach club info
  const allAnnouncements = clubs.flatMap(club => 
    club.announcements.map(announcement => ({
      ...announcement,
      clubId: club.id,
      clubName: club.name,
      clubPhoto: club.photo
    }))
  );

  // Sort descending by date (newest first)
  const sortedAnnouncements = allAnnouncements.sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-blue-950 mb-4">Platform Updates</h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-lg">Stay up to date with events, workshops, and news across all CET clubs.</p>
        </div>

        {sortedAnnouncements.length > 0 ? (
          <div className="relative border-l-2 border-blue-100 ml-4 md:ml-6 space-y-12 pb-12">
            {sortedAnnouncements.map((item, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 group">
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-blue-500 group-hover:scale-125 transition-transform shadow-sm"></div>
                
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    {/* Club Tag */}
                    <Link to={`/clubs/${item.clubId}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg shadow-sm shrink-0 overflow-hidden">
                        {item.clubPhoto ? (
                          <img src={item.clubPhoto} alt={item.clubName} className="w-full h-full object-cover" />
                        ) : (
                          item.clubName.substring(0, 1)
                        )}
                      </div>
                      <span className="font-semibold text-gray-900">{item.clubName}</span>
                    </Link>
                    
                    {/* Date Badge */}
                    <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-100 text-sm font-medium self-start sm:self-auto">
                      <Calendar className="w-4 h-4" />
                      {new Date(item.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-blue-950 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">{item.content}</p>
                  
                  <Link 
                    to={`/clubs/${item.clubId}`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group/link"
                  >
                    View Club Details
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-2">No updates yet</h3>
            <p className="text-gray-500">Check back later for announcements and events.</p>
          </div>
        )}
      </main>
    </div>
  );
}
