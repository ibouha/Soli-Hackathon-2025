import { Experience, Booking, Review } from '../types';
import chefchounImage from "../public/images/image_fx (1).jpg"
import HomeStayImage from "../public/images/image_fx (2).jpg";


export const mockExperiences: Experience[] = [
  {
    id: '1',
    type: 'workshop',
    title: 'Traditional Moroccan Cooking Class',
    description: 'Learn how to prepare authentic Moroccan tagine, couscous, and traditional pastries with a local chef in a traditional riad setting.',
    providerId: '2',
    providerName: 'Mohammed El Fassi',
    location: 'Marrakech',
    images: [
      'https://images.pexels.com/photos/7363671/pexels-photo-7363671.jpeg',
      'https://images.pexels.com/photos/6996168/pexels-photo-6996168.jpeg'
    ],
    languages: ['English', 'French', 'Arabic'],
    duration: 4,
    price: 350,
    capacity: 8,
    availableDates: [
      new Date('2030-07-15T10:00:00Z'),
      new Date('2030-07-16T10:00:00Z'),
      new Date('2030-07-18T10:00:00Z')
    ],
    createdAt: new Date('2023-01-15'),
    reviews: [],
    approved: true,
    averageRating: 4.7
  },
  {
    id: '2',
    type: 'tour',
    title: 'Medina Exploration Tour',
    description: 'Discover the hidden gems of Fes Medina with a knowledgeable local guide. Visit traditional craftsmen, historical monuments, and vibrant markets.',
    providerId: '3',
    providerName: 'Fatima Zahra',
    location: 'Fes',
    images: [
      'https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg'
    ],
    languages: ['English', 'French', 'Arabic', 'Spanish'],
    duration: 6,
    price: 200,
    capacity: 6,
    availableDates: [
      new Date('2030-07-10T09:00:00Z'),
      new Date('2030-07-12T09:00:00Z'),
      new Date('2030-07-14T09:00:00Z')
    ],
    createdAt: new Date('2023-02-01'),
    reviews: [],
    approved: true,
    averageRating: 4.9
  },
  {
    id: '3',
    type: 'homestay',
    title: 'Authentic Atlas Mountains Family Stay',
    description: 'Experience real Berber hospitality with a family in a traditional village in the Atlas Mountains. Includes home-cooked meals and cultural activities.',
    providerId: '4',
    providerName: 'Hassan Imazighen',
    location: 'Atlas Mountains',
    images: [
      HomeStayImage,
'https://images.pexels.com/photos/13580548/pexels-photo-13580548.jpeg'    ],
    languages: ['Berber', 'Arabic', 'English'],
    duration: 48,
    price: 800,
    capacity: 4,
    availableDates: [
      new Date('2030-07-15T14:00:00Z'),
      new Date('2030-07-20T14:00:00Z'),
      new Date('2030-07-25T14:00:00Z')
    ],
    createdAt: new Date('2023-03-10'),
    reviews: [],
    approved: true,
    averageRating: 4.8
  },
  {
    id: '4',
    type: 'workshop',
    title: 'Leather Crafting in Fes',
    description: 'Learn the ancient art of leather crafting from master artisans in the famous tanneries of Fes.',
    providerId: '5',
    providerName: 'Karim Benjelloun',
    location: 'Fes',
    images: [
      'https://images.pexels.com/photos/4502419/pexels-photo-4502419.jpeg',
      'https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg'
    ],
    languages: ['Arabic', 'French', 'English'],
    duration: 3,
    price: 300,
    capacity: 5,
    availableDates: [
      new Date('2030-07-18T11:00:00Z'),
      new Date('2030-07-19T11:00:00Z'),
      new Date('2030-07-21T11:00:00Z')
    ],
    createdAt: new Date('2023-01-20'),
    reviews: [],
    approved: true,
    averageRating: 4.6
  },
  {
    id: '5',
    type: 'tour',
    title: 'Chefchaouen Blue City Photo Tour',
    description: 'Capture the most Instagram-worthy spots in the famous blue city with a professional photographer as your guide.',
    providerId: '6',
    providerName: 'Yasmine Alaoui',
    location: 'Chefchaouen',
    images: [chefchounImage],
    languages: ['English', 'French', 'Spanish'],
    duration: 4,
    price: 250,
    capacity: 6,
    availableDates: [
      new Date('2030-07-14T10:00:00Z'),
      new Date('2030-07-15T10:00:00Z'),
      new Date('2030-07-16T10:00:00Z')
    ],
    createdAt: new Date('2023-02-15'),
    reviews: [],
    approved: true,
    averageRating: 4.7
  }
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    experienceId: '1',
    touristId: '1',
    date: new Date('2030-07-15T10:00:00Z'),
    status: 'confirmed',
    numberOfPeople: 2,
    totalPrice: 700,
    createdAt: new Date('2023-05-10'),
  },
  {
    id: '2',
    experienceId: '3',
    touristId: '1',
    date: new Date('2030-07-20T14:00:00Z'),
    status: 'pending',
    numberOfPeople: 2,
    totalPrice: 1600,
    createdAt: new Date('2023-05-12'),
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    experienceId: '1',
    touristId: '1',
    touristName: 'John Doe',
    rating: 5,
    comment: 'Amazing cooking class! Mohammed was a wonderful teacher and the food was delicious.',
    date: new Date('2023-07-20'),
  },
  {
    id: '2',
    experienceId: '2',
    touristId: '1',
    touristName: 'John Doe',
    rating: 4,
    comment: 'Fatima was knowledgeable and friendly. The medina is fascinating!',
    date: new Date('2023-07-25'),
  }
];