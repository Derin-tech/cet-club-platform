import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Users, User, X, ImageIcon } from 'lucide-react';
import { clubs } from '../data/clubs';

export default function ClubDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const club = clubs.find((c) => c.id === id);
  const [lightboxImage, setLightboxImage] = useState(null);

  if (!club) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-blue-950 mb-4">Club Not Found</h1>
        <p className="text-gray-600 mb-8">The club you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
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
    <div className="min-h-screen bg-white">
      {/* Navbar Minimal Setup for Detail Page */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12 pb-8 border-b border-gray-100">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-4xl sm:text-5xl shrink-0 shadow-sm">
            {club.photo ? (
              <img src={club.photo} alt={club.name} className="w-full h-full object-cover rounded-2xl" />
            ) : (
              club.name.substring(0, 1)
            )}
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-950 mb-2">{club.name}</h1>
            <p className="text-blue-600 font-semibold text-lg">CET Club Platform</p>
          </div>
        </div>

        <div className="space-y-16">
          {/* About */}
          <section>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">About the Club</h2>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">{club.description}</p>
          </section>

          {/* Leadership & Contact */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-5">Leadership</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{club.lead}</p>
                    <p className="text-gray-500 text-sm">Student Lead</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{club.facultyAdvisor}</p>
                    <p className="text-gray-500 text-sm">Faculty Advisor</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-5">Contact Info</h3>
              <div className="space-y-5">
                <a href={`mailto:${club.contact.email}`} className="flex items-center gap-4 hover:text-blue-600 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-all shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-gray-800 font-medium group-hover:text-blue-700">{club.contact.email}</span>
                </a>
                <a href={`tel:${club.contact.phone}`} className="flex items-center gap-4 hover:text-blue-600 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-all shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-gray-800 font-medium group-hover:text-blue-700">{club.contact.phone}</span>
                </a>
              </div>
            </div>
          </section>

          {/* Photo Gallery */}
          <section>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Gallery</h2>
            
            {club.photos && club.photos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {club.photos.map((photoUrl, idx) => (
                  <div 
                    key={idx} 
                    className="aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer group relative shadow-sm"
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
              <div className="bg-gray-50 rounded-2xl border border-gray-100 border-dashed p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-300 mb-4 shadow-sm">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No photos yet</h3>
                <p className="text-gray-500">Check back later for event highlights and memories!</p>
              </div>
            )}
          </section>

          {/* Announcements */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">All Announcements</h2>
              <span className="bg-blue-100 text-blue-700 font-bold text-xs px-2.5 py-1 rounded-full">
                {sortedAnnouncements.length} Update{sortedAnnouncements.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            {sortedAnnouncements.length > 0 ? (
              <div className="space-y-4">
                {sortedAnnouncements.map((announcement, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-amber-200 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <h3 className="text-xl font-bold text-blue-950">{announcement.title}</h3>
                      <span className="inline-block bg-amber-50 text-amber-700 font-medium text-xs px-3 py-1 rounded-full self-start sm:self-auto border border-amber-100">
                        {new Date(announcement.date).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{announcement.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No announcements to show at this time.</p>
            )}
          </section>
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-gray-900/90 backdrop-blur-md animate-in fade-in duration-200">
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <img 
            src={lightboxImage} 
            alt="Enlarged gallery view" 
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
