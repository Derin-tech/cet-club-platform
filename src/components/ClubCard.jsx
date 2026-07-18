import { useState } from 'react';
import { Mail, Phone, Users, User, X, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ClubCard({ club }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasAnnouncements = club.announcements && club.announcements.length > 0;

  // Truncate description for the card
  const truncatedDescription = club.description.length > 120 
    ? club.description.substring(0, 120) + '...'
    : club.description;

  return (
    <>
      {/* Card */}
      <motion.div 
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white/70 dark:bg-navy-secondary/70 backdrop-blur-md rounded-lg border border-border-light dark:border-border-light/20 shadow-card hover:shadow-floating hover:border-accent/50 dark:hover:border-accent/50 transition-colors duration-300 flex flex-col overflow-hidden group"
      >
        {/* Card Header Image Placeholder */}
        <div className="h-32 bg-gradient-to-br from-navy-primary/5 to-bg-soft relative w-full overflow-hidden flex items-center justify-center">
          {club.photo ? (
            <img src={club.photo} alt={club.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="text-4xl font-bold text-border-light uppercase">{club.name.substring(0, 2)}</div>
          )}
          
          {hasAnnouncements && (
            <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-pill shadow-card flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-pill animate-pulse"></span>
              {club.announcements.length} Update{club.announcements.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-navy-secondary mb-2">{club.name}</h3>
          <p className="text-text-muted text-sm mb-6 flex-grow leading-relaxed">
            {truncatedDescription}
          </p>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-2.5 px-4 bg-bg-soft hover:bg-navy-primary/10 text-navy-primary font-medium text-sm rounded-md transition-colors flex items-center justify-center gap-2 group/btn"
          >
            View Details
            <ExternalLink className="w-4 h-4 text-navy-primary/70 group-hover/btn:text-navy-primary transition-colors" />
          </button>
        </div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-navy-secondary/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsModalOpen(false)}
            aria-hidden="true"
          />
          
          <div className="relative bg-white rounded-lg shadow-floating w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-border-light hover:bg-border-light/80 rounded-pill text-text-muted transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-md bg-navy-primary/10 flex items-center justify-center text-navy-primary font-bold text-2xl shrink-0">
                  {club.name.substring(0, 1)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-navy-secondary">{club.name}</h2>
                  <p className="text-navy-primary font-medium text-sm">CET Club Platform</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-text-muted/70 uppercase tracking-wider mb-2">About</h4>
                  <p className="text-text-muted leading-relaxed">{club.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-bg-soft p-5 rounded-md border border-border-light">
                  <div>
                    <h4 className="text-sm font-bold text-text-muted/70 uppercase tracking-wider mb-3">Leadership</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-pill bg-navy-primary/10 flex items-center justify-center text-navy-primary">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-text-dark">{club.lead}</p>
                          <p className="text-text-muted text-xs">Student Lead</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-pill bg-navy-primary/10 flex items-center justify-center text-navy-primary">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-text-dark">{club.facultyAdvisor}</p>
                          <p className="text-text-muted text-xs">Faculty Advisor</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-bold text-text-muted/70 uppercase tracking-wider mb-3">Contact</h4>
                    <div className="space-y-3">
                      <a href={`mailto:${club.contact.email}`} className="flex items-center gap-3 text-sm hover:text-navy-primary transition-colors group">
                        <div className="w-8 h-8 rounded-pill bg-border-light flex items-center justify-center text-text-muted group-hover:bg-navy-primary/10 group-hover:text-navy-primary transition-colors">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="text-text-muted group-hover:text-navy-primary">{club.contact.email}</span>
                      </a>
                      <a href={`tel:${club.contact.phone}`} className="flex items-center gap-3 text-sm hover:text-navy-primary transition-colors group">
                        <div className="w-8 h-8 rounded-pill bg-border-light flex items-center justify-center text-text-muted group-hover:bg-navy-primary/10 group-hover:text-navy-primary transition-colors">
                          <Phone className="w-4 h-4" />
                        </div>
                        <span className="text-text-muted group-hover:text-navy-primary">{club.contact.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {hasAnnouncements && (
                  <div>
                    <h4 className="text-sm font-bold text-text-muted/70 uppercase tracking-wider mb-3">Recent Announcements</h4>
                    <div className="space-y-3">
                      {club.announcements.map((announcement, idx) => (
                        <div key={idx} className="border-l-2 border-accent pl-4 py-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-semibold text-text-dark text-sm">{announcement.title}</h5>
                            <span className="text-xs text-text-muted bg-border-light px-2 py-0.5 rounded-pill">{announcement.date}</span>
                          </div>
                          <p className="text-sm text-text-muted">{announcement.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="pt-6 mt-6 border-t border-border-light flex justify-end">
                  <Link 
                    to={`/clubs/${club.id}`}
                    className="flex items-center gap-2 bg-navy-primary text-white px-5 py-2.5 rounded-md font-medium hover:bg-navy-secondary transition-colors shadow-card"
                  >
                    View Full Page
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
