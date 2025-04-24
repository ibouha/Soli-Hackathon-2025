export type UserRole = 'tourist' | 'provider' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  language?: string;
  joinedDate: Date;
}

export interface Tourist extends User {
  role: 'tourist';
  marhabaPassId: string;
  bookings: Booking[];
  favorites: string[]; // IDs of favorited experiences
}

export interface ServiceProvider extends User {
  role: 'provider';
  bio?: string;
  languages: string[];
  location: string;
  verified: boolean;
  experiences: Experience[];
}

export type ExperienceType = 'workshop' | 'tour' | 'homestay';

export interface Experience {
  id: string;
  type: ExperienceType;
  title: string;
  description: string;
  providerId: string;
  providerName: string;
  location: string;
  images: string[];
  languages: string[];
  duration: number; // in hours
  price: number;
  capacity: number;
  availableDates: Date[];
  createdAt: Date;
  averageRating?: number;
  reviews: Review[];
  approved: boolean;
}

export interface Booking {
  id: string;
  experienceId: string;
  touristId: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  numberOfPeople: number;
  totalPrice: number;
  reviewId?: string;
  createdAt: Date;
}

export interface Review {
  id: string;
  experienceId: string;
  touristId: string;
  touristName: string;
  rating: number;
  comment: string;
  date: Date;
}