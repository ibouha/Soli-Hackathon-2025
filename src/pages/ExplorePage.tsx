import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, MapPin, Calendar, RefreshCw } from 'lucide-react';
import { useExperiences } from '../context/ExperienceContext';
import { Experience, ExperienceType } from '../types';
import ExperienceCard from '../components/common/ExperienceCard';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import SelectField from '../components/common/SelectField';

const ExplorePage: React.FC = () => {
  const { experiences, filterExperiences } = useExperiences();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
  const [filters, setFilters] = useState({
    type: (searchParams.get('type') as ExperienceType | 'all') || 'all',
    location: searchParams.get('location') || '',
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 0,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 2000,
    date: searchParams.get('date') ? new Date(searchParams.get('date')!) : undefined,
  });
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    applyFilters();
    // Update the URL based on filters
    const params: Record<string, string> = {};
    if (filters.type && filters.type !== 'all') params.type = filters.type;
    if (filters.location) params.location = filters.location;
    if (filters.minPrice > 0) params.minPrice = filters.minPrice.toString();
    if (filters.maxPrice < 2000) params.maxPrice = filters.maxPrice.toString();
    if (filters.date) params.date = filters.date.toISOString().split('T')[0];
    
    setSearchParams(params);
  }, [filters]);

  const applyFilters = () => {
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      const filtered = filterExperiences(
        filters.type,
        filters.location,
        filters.minPrice,
        filters.maxPrice,
        filters.date
      );
      setFilteredExperiences(filtered);
      setIsLoading(false);
    }, 500);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      type: 'all',
      location: '',
      minPrice: 0,
      maxPrice: 2000,
      date: undefined,
    });
  };

  const locations = [
    { value: '', label: 'All Locations' },
    { value: 'Marrakech', label: 'Marrakech' },
    { value: 'Fes', label: 'Fes' },
    { value: 'Chefchaouen', label: 'Chefchaouen' },
    { value: 'Casablanca', label: 'Casablanca' },
    { value: 'Atlas Mountains', label: 'Atlas Mountains' },
  ];

  const experienceTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'tour', label: 'Guided Tours' },
    { value: 'homestay', label: 'HomeStays' },
  ];

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden md:block w-64 bg-white p-6 rounded-lg shadow-md sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-800">Filters</h3>
              <button
                onClick={resetFilters}
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
              >
                <RefreshCw size={14} className="mr-1" /> Reset
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Type</label>
                <SelectField
                  options={experienceTypes}
                  value={filters.type}
                  onChange={(value) => handleFilterChange('type', value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <SelectField
                  options={locations}
                  value={filters.location}
                  onChange={(value) => handleFilterChange('location', value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (MAD)</label>
                <div className="flex gap-2 items-center">
                  <InputField
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                    min={0}
                    max={filters.maxPrice}
                  />
                  <span className="text-gray-500">-</span>
                  <InputField
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                    min={filters.minPrice}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <InputField
                  type="date"
                  value={filters.date ? filters.date.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleFilterChange('date', e.target.value ? new Date(e.target.value) : undefined)}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Experiences</h1>
              <p className="text-gray-600">
                Discover authentic Moroccan cultural experiences for your 2030 FIFA World Cup visit
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <InputField
                    placeholder="Search by keyword"
                    leftIcon={<Search size={18} />}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <Button
                    variant="primary"
                    leftIcon={<Search size={18} />}
                    onClick={applyFilters}
                  >
                    Search
                  </Button>
                  <Button
                    variant="outline"
                    className="md:hidden"
                    leftIcon={<Filter size={18} />}
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    Filters
                  </Button>
                </div>
              </div>

              {/* Mobile Filters */}
              {isFilterOpen && (
                <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800">Filters</h3>
                    <button
                      onClick={resetFilters}
                      className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
                    >
                      <RefreshCw size={14} className="mr-1" /> Reset
                    </button>
                  </div>

                  <div className="space-y-4">
                    <SelectField
                      label="Experience Type"
                      options={experienceTypes}
                      value={filters.type}
                      onChange={(value) => handleFilterChange('type', value)}
                    />

                    <SelectField
                      label="Location"
                      options={locations}
                      value={filters.location}
                      onChange={(value) => handleFilterChange('location', value)}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (MAD)</label>
                      <div className="flex gap-2 items-center">
                        <InputField
                          type="number"
                          placeholder="Min"
                          value={filters.minPrice}
                          onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                          min={0}
                          max={filters.maxPrice}
                        />
                        <span className="text-gray-500">-</span>
                        <InputField
                          type="number"
                          placeholder="Max"
                          value={filters.maxPrice}
                          onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                          min={filters.minPrice}
                        />
                      </div>
                    </div>

                    <InputField
                      label="Date"
                      type="date"
                      value={filters.date ? filters.date.toISOString().split('T')[0] : ''}
                      onChange={(e) => handleFilterChange('date', e.target.value ? new Date(e.target.value) : undefined)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-gray-600">
                    {filteredExperiences.length} experiences found
                  </p>
                  <SelectField
                    options={[
                      { value: 'recommended', label: 'Recommended' },
                      { value: 'price-low', label: 'Price: Low to High' },
                      { value: 'price-high', label: 'Price: High to Low' },
                      { value: 'rating', label: 'Highest Rated' },
                    ]}
                    className="w-48"
                  />
                </div>

                {filteredExperiences.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExperiences.map((experience) => (
                      <ExperienceCard key={experience.id} experience={experience} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No experiences found</h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your filters or check back later for new experiences.
                    </p>
                    <Button variant="outline" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;