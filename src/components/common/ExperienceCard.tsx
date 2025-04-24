import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Users, Star } from 'lucide-react';
import { Experience } from '../../types';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const {
    id,
    title,
    type,
    location,
    images,
    price,
    duration,
    capacity,
    averageRating,
  } = experience;

  const typeLabel = {
    workshop: 'Workshop',
    tour: 'Guided Tour',
    homestay: 'HomeStay'
  }[type];

  return (
    <Link 
      to={`/experience/${id}`}
      className="block group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9 h-48 overflow-hidden">
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-600 text-white">
            {typeLabel}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin size={14} className="mr-1" />
          <span>{location}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-gray-600 text-sm">
            <Clock size={14} className="mr-1" />
            <span>{duration} {duration === 1 ? 'hour' : 'hours'}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Users size={14} className="mr-1" />
            <span>Up to {capacity}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900">
            {price} <span className="text-sm font-normal">MAD</span>
          </div>
          
          {averageRating && (
            <div className="flex items-center">
              <Star size={16} className="fill-amber-400 text-amber-400 mr-1" />
              <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ExperienceCard;