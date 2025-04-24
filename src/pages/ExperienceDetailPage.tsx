import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, Globe, ChevronLeft, Star, Heart, Share2 } from 'lucide-react';
import { useExperiences } from '../context/ExperienceContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const ExperienceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getExperienceById, bookExperience } = useExperiences();
  const { user, isAuthenticated } = useAuth();
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const experience = getExperienceById(id || '');

  if (!experience) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Experience not found</h2>
          <Button variant="primary" onClick={() => navigate('/explore')}>
            Back to Explore
          </Button>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    if (!isAuthenticated || !user || !selectedDate) return;
    
    setIsBookingLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      bookExperience(experience.id, user.id, selectedDate, numberOfPeople);
      setIsBookingLoading(false);
      setBookingSuccess(true);
    }, 1500);
  };

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const typeLabel = {
    workshop: 'Workshop',
    tour: 'Guided Tour',
    homestay: 'HomeStay'
  }[experience.type];

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button 
            className="flex items-center text-primary-600 hover:text-primary-700"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to search results
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="relative h-80 md:h-96">
                <img
                  src={experience.images[currentImageIndex]}
                  alt={experience.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-2 flex overflow-x-auto gap-2">
                {experience.images.map((image, index) => (
                  <button
                    key={index}
                    className={`w-24 h-16 flex-shrink-0 rounded overflow-hidden border-2 ${
                      currentImageIndex === index ? 'border-primary-600' : 'border-transparent'
                    }`}
                    onClick={() => handleImageChange(index)}
                  >
                    <img
                      src={image}
                      alt={`${experience.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-600 text-white">
                  {typeLabel}
                </span>
                {experience.averageRating && (
                  <div className="flex items-center">
                    <Star size={16} className="fill-amber-400 text-amber-400 mr-1" />
                    <span className="text-sm font-medium">{experience.averageRating.toFixed(1)}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin size={14} className="mr-1" />
                  <span>{experience.location}</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{experience.title}</h1>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center text-gray-700">
                  <Clock size={18} className="mr-2" />
                  <span>{experience.duration} {experience.duration === 1 ? 'hour' : 'hours'}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Users size={18} className="mr-2" />
                  <span>Up to {experience.capacity} people</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Globe size={18} className="mr-2" />
                  <span>{experience.languages.join(', ')}</span>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-3">About this experience</h2>
              <p className="text-gray-700 mb-6 whitespace-pre-line">
                {experience.description}
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mb-3">Host</h2>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-200 mr-4">
                  {/* Placeholder for host avatar */}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{experience.providerName}</h3>
                  <p className="text-gray-600 text-sm">Host since 2023</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Location</h2>
                <div className="flex items-start text-gray-700 mb-4">
                  <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                  <span>{experience.location}, Morocco</span>
                </div>
                <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-500">Map placeholder</span>
                </div>
                <p className="text-gray-700">
                  Exact location will be provided after booking.
                </p>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Reviews
                {experience.averageRating && (
                  <span className="text-gray-600 font-normal ml-2">
                    ({experience.reviews.length} reviews, {experience.averageRating.toFixed(1)} average)
                  </span>
                )}
              </h2>

              {experience.reviews.length > 0 ? (
                <div className="space-y-6">
                  {experience.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <div>
                          <h4 className="font-medium text-gray-800">{review.touristName}</h4>
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-2">
                              {formatDate(review.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No reviews yet.</p>
              )}
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <div className="text-xl font-bold text-gray-900 mb-2">
                  {experience.price} <span className="text-sm font-normal">MAD per person</span>
                </div>

                {bookingSuccess ? (
                  <div className="text-center py-6">
                    <div className="text-3xl mb-2">🎉</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Booking Successful!</h3>
                    <p className="text-gray-600 mb-4">
                      Your experience has been booked successfully. Check your dashboard for details.
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => navigate('/dashboard')}
                      fullWidth
                    >
                      Go to Dashboard
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Date
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        value={selectedDate ? selectedDate.toISOString() : ''}
                      >
                        <option value="">Select a date</option>
                        {experience.availableDates.map((date, index) => (
                          <option key={index} value={date.toISOString()}>
                            {formatDate(date)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of People
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        onChange={(e) => setNumberOfPeople(Number(e.target.value))}
                        value={numberOfPeople}
                      >
                        {[...Array(experience.capacity)].map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1} {i === 0 ? 'person' : 'people'}
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedDate && (
                      <div className="border-t border-b border-gray-200 py-4 mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">
                            {experience.price} MAD x {numberOfPeople} {numberOfPeople === 1 ? 'person' : 'people'}
                          </span>
                          <span className="text-gray-900">{experience.price * numberOfPeople} MAD</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>{experience.price * numberOfPeople} MAD</span>
                        </div>
                      </div>
                    )}

                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={!isAuthenticated || !selectedDate || isBookingLoading}
                      isLoading={isBookingLoading}
                      onClick={handleBooking}
                    >
                      {isAuthenticated ? 'Book Now' : 'Login to Book'}
                    </Button>

                    {!isAuthenticated && (
                      <p className="text-sm text-center text-gray-500 mt-2">
                        You need to{' '}
                        <button 
                          className="text-primary-600 hover:underline"
                          onClick={() => navigate('/login')}
                        >
                          login
                        </button>{' '}
                        to book this experience
                      </p>
                    )}
                  </>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  fullWidth
                  leftIcon={<Heart size={18} />}
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  leftIcon={<Share2 size={18} />}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailPage;