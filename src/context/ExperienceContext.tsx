import React, { createContext, useContext, useState, useEffect } from 'react';
import { Experience, Booking, Review, ExperienceType } from '../types';
import { mockExperiences, mockBookings, mockReviews } from '../data/mockData';

interface ExperienceContextType {
  experiences: Experience[];
  bookings: Booking[];
  reviews: Review[];
  loading: boolean;
  addExperience: (experience: Omit<Experience, 'id' | 'createdAt' | 'reviews' | 'approved' | 'averageRating'>) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  bookExperience: (experienceId: string, touristId: string, date: Date, numberOfPeople: number) => void;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getExperienceById: (id: string) => Experience | undefined;
  getExperiencesByProviderId: (providerId: string) => Experience[];
  getBookingsByTouristId: (touristId: string) => Booking[];
  getBookingsByExperienceId: (experienceId: string) => Booking[];
  filterExperiences: (
    type?: ExperienceType | 'all',
    location?: string,
    minPrice?: number,
    maxPrice?: number,
    date?: Date
  ) => Experience[];
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export const ExperienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize with mock data
    setExperiences(mockExperiences);
    setBookings(mockBookings);
    setReviews(mockReviews);
    setLoading(false);
  }, []);

  const addExperience = (
    experience: Omit<Experience, 'id' | 'createdAt' | 'reviews' | 'approved' | 'averageRating'>
  ) => {
    const newExperience: Experience = {
      ...experience,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date(),
      reviews: [],
      approved: false, // Admin needs to approve
      averageRating: undefined,
    };

    setExperiences(prevExperiences => [...prevExperiences, newExperience]);
  };

  const updateExperience = (id: string, update: Partial<Experience>) => {
    setExperiences(prevExperiences =>
      prevExperiences.map(exp => (exp.id === id ? { ...exp, ...update } : exp))
    );
  };

  const deleteExperience = (id: string) => {
    setExperiences(prevExperiences => prevExperiences.filter(exp => exp.id !== id));
  };

  const bookExperience = (experienceId: string, touristId: string, date: Date, numberOfPeople: number) => {
    const experience = experiences.find(exp => exp.id === experienceId);
    
    if (!experience) return;
    
    const totalPrice = experience.price * numberOfPeople;
    
    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 11),
      experienceId,
      touristId,
      date,
      status: 'pending',
      numberOfPeople,
      totalPrice,
      createdAt: new Date(),
    };
    
    setBookings(prevBookings => [...prevBookings, newBooking]);
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Math.random().toString(36).substring(2, 11),
      date: new Date(),
    };
    
    setReviews(prevReviews => [...prevReviews, newReview]);
    
    // Update the experience with the new review and recalculate average rating
    const experienceReviews = [...reviews, newReview].filter(
      r => r.experienceId === reviewData.experienceId
    );
    
    const averageRating =
      experienceReviews.reduce((sum, r) => sum + r.rating, 0) / experienceReviews.length;
    
    updateExperience(reviewData.experienceId, {
      reviews: experienceReviews,
      averageRating,
    });
  };

  const getExperienceById = (id: string) => {
    return experiences.find(exp => exp.id === id);
  };

  const getExperiencesByProviderId = (providerId: string) => {
    return experiences.filter(exp => exp.providerId === providerId);
  };

  const getBookingsByTouristId = (touristId: string) => {
    return bookings.filter(booking => booking.touristId === touristId);
  };

  const getBookingsByExperienceId = (experienceId: string) => {
    return bookings.filter(booking => booking.experienceId === experienceId);
  };

  const filterExperiences = (
    type?: ExperienceType | 'all',
    location?: string,
    minPrice?: number,
    maxPrice?: number,
    date?: Date
  ) => {
    return experiences.filter(exp => {
      // Filter by type
      if (type && type !== 'all' && exp.type !== type) return false;
      
      // Filter by location
      if (location && !exp.location.toLowerCase().includes(location.toLowerCase())) return false;
      
      // Filter by price range
      if (minPrice !== undefined && exp.price < minPrice) return false;
      if (maxPrice !== undefined && exp.price > maxPrice) return false;
      
      // Filter by date availability
      if (date) {
        const formattedDate = date.toISOString().split('T')[0];
        const hasDate = exp.availableDates.some(
          d => d.toISOString().split('T')[0] === formattedDate
        );
        if (!hasDate) return false;
      }
      
      return true;
    });
  };

  return (
    <ExperienceContext.Provider
      value={{
        experiences,
        bookings,
        reviews,
        loading,
        addExperience,
        updateExperience,
        deleteExperience,
        bookExperience,
        addReview,
        getExperienceById,
        getExperiencesByProviderId,
        getBookingsByTouristId,
        getBookingsByExperienceId,
        filterExperiences,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperiences = () => {
  const context = useContext(ExperienceContext);
  if (context === undefined) {
    throw new Error('useExperiences must be used within an ExperienceProvider');
  }
  return context;
};