import { useState } from 'react';
import { X, Megaphone } from 'lucide-react';
import { clubs } from '../data/clubs';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  // Get the latest 1-2 announcements across all clubs
  const allAnnouncements = clubs.flatMap(club => 
    club.announcements.map(a => ({ ...a, clubName: club.name }))
  );
  
  // Sort by date descending (assuming YYYY-MM-DD format for simple string comparison)
  allAnnouncements.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const recentAnnouncements = allAnnouncements.slice(0, 1); // Showing just the latest one for the banner

  if (!isVisible || recentAnnouncements.length === 0) {
    return null;
  }

  const announcement = recentAnnouncements[0];

  return (
    <div className="bg-accent/10 text-navy-secondary px-4 py-3 relative sm:flex sm:items-center sm:justify-between border-b border-accent/20">
      <div className="flex items-center gap-3 pr-8">
        <Megaphone className="h-5 w-5 text-accent shrink-0" />
        <p className="text-sm font-medium">
          <span className="font-bold">{announcement.clubName}:</span> {announcement.title} - {announcement.content}
        </p>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-1/2 -translate-y-1/2 right-4 sm:static sm:translate-y-0 p-1 hover:bg-accent/20 rounded-pill transition-colors text-navy-secondary/60 hover:text-navy-secondary"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
