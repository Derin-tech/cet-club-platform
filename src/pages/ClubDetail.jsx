import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Users, User, X, ImageIcon } from 'lucide-react';
import { clubs } from '../data/clubs';
import { motion } from 'framer-motion';

export default function ClubDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const club = clubs.find((c) => c.id === id);
  const [lightboxImage, setLightboxImage] = useState(null);

  if (!club) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-navy-secondary mb-4">Club Not Found</h1>
        <p className="text-text-muted mb-8">The club you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="px-6 py-3 bg-navy-primary text-white font-medium rounded-md hover:bg-navy-secondary transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  // Sort announcements newest first
  const sortedAnnouncements = [...club.announcements].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="min-h-screen bg-transparent">
      {/* Navbar Minimal Setup for Detail Page */}
      <nav className="bg-white/70 backdrop-blur-md sticky top-0 z-40 border-b border-border-light shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 text-text-muted hover:text-navy-primary font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12 pb-8 border-b border-border-light bg-white/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-card"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg bg-navy-primary/10 flex items-center justify-center text-navy-primary font-bold text-4xl sm:text-5xl shrink-0 shadow-card">
            {club.photo ? (
              <img src={club.photo} alt={club.name} className="w-full h-full object-cover rounded-lg" />
            ) : (
              club.name.substring(0, 1)
            )}
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-secondary mb-2">{club.name}</h1>
            <p className="text-navy-primary font-semibold text-lg">CET Club Platform</p>
          </div>
        </motion.div>

        <div className="space-y-16">
          {/* About */}
          <section>
            <h2 className="text-sm font-bold text-text-muted/70 uppercase tracking-wider mb-4">About the Club</h2>
            <p className="text-text-muted text-lg leading-relaxed whitespace-pre-line bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-border-light shadow-card">{club.description}</p>
          </section>

          {/* Leadership & Contact */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/70 backdrop-blur-md p-6 rounded-lg border border-border-light shadow-card hover:shadow-floating transition-all">
              <h3 className="text-sm font-bold text-text-muted/70 uppercase tracking-wider mb-5">Leadership</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-pill bg-navy-primary/10 flex items-center justify-center text-navy-primary">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-dark text-lg">{club.lead}</p>
                    <p className="text-text-muted text-sm">Student Lead</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-pill bg-navy-primary/10 flex items-center justify-center text-navy-primary">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-dark text-lg">{club.facultyAdvisor}</p>
                    <p className="text-text-muted text-sm">Faculty Advisor</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-md p-6 rounded-lg border border-border-light shadow-card hover:shadow-floating transition-all flex flex-col justify-between">
              <h3 className="text-sm font-bold text-text-muted/70 uppercase tracking-wider mb-5">Contact Info</h3>
              <div className="space-y-5">
                <a href={`mailto:${club.contact.email}`} className="flex items-center gap-4 hover:text-navy-primary transition-colors group">
                  <div className="w-10 h-10 rounded-pill bg-white border border-border-light flex items-center justify-center text-text-muted group-hover:bg-navy-primary/10 group-hover:text-navy-primary group-hover:border-navy-primary/20 transition-all shadow-card">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-text-dark font-medium group-hover:text-navy-primary">{club.contact.email}</span>
                </a>
                <a href={`tel:${club.contact.phone}`} className="flex items-center gap-4 hover:text-navy-primary transition-colors group">
                  <div className="w-10 h-10 rounded-pill bg-white border border-border-light flex items-center justify-center text-text-muted group-hover:bg-navy-primary/10 group-hover:text-navy-primary group-hover:border-navy-primary/20 transition-all shadow-card">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-text-dark font-medium group-hover:text-navy-primary">{club.contact.phone}</span>
                </a>
              </div>
            </div>
          </section>

          {/* Photo Gallery */}
          <section>
            <h2 className="text-sm font-bold text-text-muted/70 uppercase tracking-wider mb-6">Gallery</h2>
            
            {club.photos && club.photos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {club.photos.map((photoUrl, idx) => (
                  <div 
                    key={idx} 
                    className="aspect-square bg-border-light rounded-md overflow-hidden cursor-pointer group relative shadow-card"
                    onClick={() => setLightboxImage(photoUrl)}
                  >
                    <img 
                      src={photoUrl} 
                      alt={`Gallery image ${idx + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-bg-soft rounded-lg border border-border-light border-dashed p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-white rounded-pill flex items-center justify-center text-text-muted/50 mb-4 shadow-card">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-text-dark mb-1">No photos yet</h3>
                <p className="text-text-muted">Check back later for event highlights and memories!</p>
              </div>
            )}
          </section>

          {/* Announcements */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-text-muted/70 uppercase tracking-wider">All Announcements</h2>
              <span className="bg-navy-primary/10 text-navy-primary font-bold text-xs px-2.5 py-1 rounded-pill">
                {sortedAnnouncements.length} Update{sortedAnnouncements.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            {sortedAnnouncements.length > 0 ? (
              <div className="space-y-4">
                {sortedAnnouncements.map((announcement, idx) => (
                  <div key={idx} className="bg-white border border-border-light rounded-lg p-6 shadow-card hover:shadow-hover hover:border-accent/40 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <h3 className="text-xl font-bold text-navy-secondary">{announcement.title}</h3>
                      <span className="inline-block bg-accent/10 text-accent font-medium text-xs px-3 py-1 rounded-pill self-start sm:self-auto border border-accent/20">
                        {new Date(announcement.date).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-text-muted leading-relaxed">{announcement.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-muted italic">No announcements to show at this time.</p>
            )}
          </section>
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-navy-secondary/90 backdrop-blur-md animate-in fade-in duration-200">
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-pill text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <img 
            src={lightboxImage} 
            alt="Enlarged gallery view" 
            className="max-w-full max-h-[85vh] object-contain rounded-md shadow-floating"
          />
        </div>
      )}
    </div>
  );
}
