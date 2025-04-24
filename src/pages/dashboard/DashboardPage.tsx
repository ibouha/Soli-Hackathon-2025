import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Calendar, MapPin, Award, Clock, Users, Star, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useExperiences } from '../../context/ExperienceContext';
import Button from '../../components/common/Button';

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { 
    getBookingsByTouristId, 
    getExperiencesByProviderId,
    getBookingsByExperienceId,
    experiences 
  } = useExperiences();
  
  const [activeTab, setActiveTab] = useState('upcoming');

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isTourist = user.role === 'tourist';
  
  let bookings = [];
  let providerExperiences = [];
  
  if (isTourist) {
    bookings = getBookingsByTouristId(user.id);
  } else {
    providerExperiences = getExperiencesByProviderId(user.id);
    
    // Get all bookings for this provider's experiences
    bookings = providerExperiences.flatMap(exp => 
      getBookingsByExperienceId(exp.id)
    );
  }
  
  const upcomingBookings = bookings.filter(b => 
    b.status === 'confirmed' || b.status === 'pending'
  );
  
  const pastBookings = bookings.filter(b => 
    b.status === 'completed' || b.status === 'cancelled'
  );

  const getExperienceDetails = (experienceId: string) => {
    return experiences.find(exp => exp.id === experienceId);
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-primary-600 text-white p-6">
            <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
            <p className="opacity-90">
              {isTourist 
                ? 'Manage your bookings and discover new experiences' 
                : 'Manage your experiences and view your bookings'}
            </p>
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl text-gray-400">{user.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              
              <div className="flex gap-4 ml-auto">
                {isTourist ? (
                  <Button
                    variant="primary"
                    onClick={() => window.location.href = '/explore'}
                  >
                    Explore Experiences
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => window.location.href = '/provider/create-experience'}
                  >
                    Create New Experience
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/profile'}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Provider Experiences (if provider) */}
        {!isTourist && providerExperiences.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Experiences</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providerExperiences.map(experience => (
                <div key={experience.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 h-40">
                    <img
                      src={experience.images[0]}
                      alt={experience.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{experience.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        experience.approved 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {experience.approved ? 'Approved' : 'Pending Approval'}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <MapPin size={14} className="mr-1" />
                      <span>{experience.location}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm mb-3">
                      <div className="flex items-center text-gray-600">
                        <Users size={14} className="mr-1" />
                        <span>{getBookingsByExperienceId(experience.id).length} bookings</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Star size={14} className="mr-1" />
                        <span>{experience.averageRating ? experience.averageRating.toFixed(1) : 'No ratings'}</span>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => window.location.href = `/provider/experiences/${experience.id}`}
                    >
                      Manage Experience
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {isTourist ? 'Your Bookings' : 'Bookings for Your Experiences'}
          </h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  className={`px-6 py-3 font-medium text-sm border-b-2 ${
                    activeTab === 'upcoming'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  Upcoming
                </button>
                <button
                  className={`px-6 py-3 font-medium text-sm border-b-2 ${
                    activeTab === 'past'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('past')}
                >
                  Past
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {(activeTab === 'upcoming' ? upcomingBookings : pastBookings).length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {(activeTab === 'upcoming' ? upcomingBookings : pastBookings).map(booking => {
                    const experience = getExperienceDetails(booking.experienceId);
                    if (!experience) return null;
                    
                    return (
                      <div key={booking.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="md:w-1/4">
                            <div className="aspect-w-16 aspect-h-9 h-24 rounded-lg overflow-hidden">
                              <img
                                src={experience.images[0]}
                                alt={experience.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          
                          <div className="md:w-2/4">
                            <h3 className="font-semibold text-gray-800">{experience.title}</h3>
                            <div className="text-gray-500 text-sm mt-1 flex flex-wrap gap-x-4 gap-y-1">
                              <div className="flex items-center">
                                <MapPin size={14} className="mr-1" />
                                <span>{experience.location}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar size={14} className="mr-1" />
                                <span>{formatDate(booking.date)}</span>
                              </div>
                              <div className="flex items-center">
                                <Users size={14} className="mr-1" />
                                <span>{booking.numberOfPeople} {booking.numberOfPeople === 1 ? 'person' : 'people'}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="md:w-1/4 flex flex-col items-end">
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </div>
                            <div className="text-gray-900 font-semibold mt-1">{booking.totalPrice} MAD</div>
                            <div className="mt-2">
                              <Button
                                variant="text"
                                size="sm"
                                rightIcon={<ArrowUpRight size={14} />}
                                onClick={() => window.location.href = `/experience/${experience.id}`}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📅</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    No {activeTab} bookings found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {isTourist 
                      ? 'Explore our experiences and book your adventure!' 
                      : activeTab === 'upcoming' 
                        ? 'You have no upcoming bookings yet.' 
                        : 'You have no past bookings.'
                    }
                  </p>
                  {isTourist && (
                    <Button
                      variant="primary"
                      onClick={() => window.location.href = '/explore'}
                    >
                      Explore Experiences
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;