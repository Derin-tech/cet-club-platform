import { useState } from 'react';
import { Mail, Phone, Users, User, X, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group">
        {/* Card Header Image Placeholder */}
        <div className="h-32 bg-gradient-to-br from-blue-50 to-gray-100 relative w-full overflow-hidden flex items-center justify-center">
          {club.photo ? (
            <img src={club.photo} alt={club.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="text-4xl font-bold text-gray-200 uppercase">{club.name.substring(0, 2)}</div>
          )}
          
          {hasAnnouncements && (
            <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              {club.announcements.length} Update{club.announcements.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-blue-950 mb-2">{club.name}</h3>
          <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
            {truncatedDescription}
          </p>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-2.5 px-4 bg-gray-50 hover:bg-blue-50 text-blue-600 font-medium text-sm rounded-xl transition-colors flex items-center justify-center gap-2 group/btn"
          >
            View Details
            <ExternalLink className="w-4 h-4 text-blue-400 group-hover/btn:text-blue-600 transition-colors" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsModalOpen(false)}
            aria-hidden="true"
          />
          
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl shrink-0">
                  {club.name.substring(0, 1)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-blue-950">{club.name}</h2>
                  <p className="text-blue-600 font-medium text-sm">CET Club Platform</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">About</h4>
                  <p className="text-gray-700 leading-relaxed">{club.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Leadership</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{club.lead}</p>
                          <p className="text-gray-500 text-xs">Student Lead</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{club.facultyAdvisor}</p>
                          <p className="text-gray-500 text-xs">Faculty Advisor</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Contact</h4>
                    <div className="space-y-3">
                      <a href={`mailto:${club.contact.email}`} className="flex items-center gap-3 text-sm hover:text-blue-600 transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="text-gray-700 group-hover:text-blue-600">{club.contact.email}</span>
                      </a>
                      <a href={`tel:${club.contact.phone}`} className="flex items-center gap-3 text-sm hover:text-blue-600 transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                          <Phone className="w-4 h-4" />
                        </div>
                        <span className="text-gray-700 group-hover:text-blue-600">{club.contact.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {hasAnnouncements && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Recent Announcements</h4>
                    <div className="space-y-3">
                      {club.announcements.map((announcement, idx) => (
                        <div key={idx} className="border-l-2 border-amber-400 pl-4 py-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-semibold text-gray-900 text-sm">{announcement.title}</h5>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{announcement.date}</span>
                          </div>
                          <p className="text-sm text-gray-600">{announcement.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
                  <Link 
                    to={`/clubs/${club.id}`}
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
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
