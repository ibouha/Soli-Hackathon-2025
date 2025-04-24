import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Users, Languages, Calendar, CreditCard, ChevronLeft, Upload, Plus, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useExperiences } from '../../context/ExperienceContext';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import SelectField from '../../components/common/SelectField';
import TextareaField from '../../components/common/TextareaField';
import { ExperienceType } from '../../types';

const CreateExperiencePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addExperience } = useExperiences();
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Experience form data
  const [type, setType] = useState<ExperienceType>('workshop');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState(2);
  const [capacity, setCapacity] = useState(5);
  const [price, setPrice] = useState(300);
  const [languages, setLanguages] = useState<string[]>(['English']);
  const [images, setImages] = useState<string[]>([
    'https://images.pexels.com/photos/7363671/pexels-photo-7363671.jpeg',
  ]);
  const [dates, setDates] = useState<Date[]>([
    new Date('2030-07-15T10:00:00Z'),
    new Date('2030-07-16T10:00:00Z'),
  ]);
  
  // For adding new dates
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('10:00');

  if (!isAuthenticated || !user || user.role !== 'provider') {
    return navigate('/login');
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedLanguages: string[] = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedLanguages.push(options[i].value);
      }
    }
    
    setLanguages(selectedLanguages);
  };

  const handleAddDate = () => {
    if (!newDate) return;
    
    const dateTime = new Date(`${newDate}T${newTime}`);
    setDates([...dates, dateTime]);
    setNewDate('');
  };

  const handleRemoveDate = (index: number) => {
    setDates(dates.filter((_, i) => i !== index));
  };

  const handleAddImage = () => {
    // For demo purposes, add a placeholder image
    const placeholderImages = [
      'https://images.pexels.com/photos/6996168/pexels-photo-6996168.jpeg',
      'https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg',
      'https://images.pexels.com/photos/4343735/pexels-photo-4343735.jpeg',
    ];
    
    if (images.length < 4) {
      setImages([...images, placeholderImages[images.length - 1 < 3 ? images.length - 1 : 0]]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const validateStep1 = () => {
    if (!type || !title || !description) {
      setError('Please fill in all required fields');
      return false;
    }
    
    if (description.length < 50) {
      setError('Description should be at least 50 characters');
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    if (!location || !languages.length || duration <= 0 || capacity <= 0 || price <= 0) {
      setError('Please fill in all required fields with valid values');
      return false;
    }
    
    return true;
  };

  const validateStep3 = () => {
    if (images.length === 0) {
      setError('Please add at least one image');
      return false;
    }
    
    if (dates.length === 0) {
      setError('Please add at least one available date');
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    setError('');
    
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateStep3()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create the experience
      addExperience({
        type,
        title,
        description,
        providerId: user.id,
        providerName: user.name,
        location,
        images,
        languages,
        duration,
        capacity,
        price,
        availableDates: dates,
      });
      
      setSuccess(true);
    } catch (err) {
      setError('Failed to create experience. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const cities = [
    { value: '', label: 'Select a city' },
    { value: 'Marrakech', label: 'Marrakech' },
    { value: 'Fes', label: 'Fes' },
    { value: 'Chefchaouen', label: 'Chefchaouen' },
    { value: 'Casablanca', label: 'Casablanca' },
    { value: 'Rabat', label: 'Rabat' },
    { value: 'Tangier', label: 'Tangier' },
    { value: 'Agadir', label: 'Agadir' },
    { value: 'Atlas Mountains', label: 'Atlas Mountains' },
  ];

  const experienceTypes = [
    { value: 'workshop', label: 'Workshop' },
    { value: 'tour', label: 'Guided Tour' },
    { value: 'homestay', label: 'HomeStay' },
  ];

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <button 
            className="flex items-center text-primary-600 hover:text-primary-700"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={16} className="mr-1" />
            Back
          </button>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Experience</h1>
            <p className="text-gray-600">
              Share your cultural expertise with tourists visiting Morocco for FIFA 2030
            </p>
          </div>

          {success ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Experience Created Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Your experience has been submitted for review. We'll notify you once it's approved and listed on the platform.
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  variant="primary"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSuccess(false);
                    setStep(1);
                    // Reset form
                    setType('workshop');
                    setTitle('');
                    setDescription('');
                    setLocation('');
                    setDuration(2);
                    setCapacity(5);
                    setPrice(300);
                    setLanguages(['English']);
                    setImages(['https://images.pexels.com/photos/7363671/pexels-photo-7363671.jpeg']);
                    setDates([
                      new Date('2030-07-15T10:00:00Z'),
                      new Date('2030-07-16T10:00:00Z'),
                    ]);
                  }}
                >
                  Create Another Experience
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Progress Indicator */}
              <div className="bg-gray-50 px-6 py-4 flex border-b">
                <div className="flex-1 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    1
                  </div>
                  <span className="text-sm mt-1">Basic Info</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    2
                  </div>
                  <span className="text-sm mt-1">Details</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    3
                  </div>
                  <span className="text-sm mt-1">Media & Dates</span>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="p-6">
                  {/* Step 1: Basic Information */}
                  {step === 1 && (
                    <>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Experience Type *
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {experienceTypes.map((expType) => (
                            <button
                              key={expType.value}
                              type="button"
                              className={`py-3 border rounded-lg flex flex-col items-center justify-center ${
                                type === expType.value
                                  ? 'bg-primary-50 border-primary-600 text-primary-700'
                                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                              onClick={() => setType(expType.value as ExperienceType)}
                            >
                              <span className="font-medium">{expType.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <InputField
                        label="Experience Title *"
                        placeholder="Give your experience a compelling title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />

                      <TextareaField
                        label="Description *"
                        placeholder="Provide a detailed description of your experience"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="h-32"
                        required
                      />
                    </>
                  )}

                  {/* Step 2: Experience Details */}
                  {step === 2 && (
                    <>
                      <SelectField
                        label="Location *"
                        options={cities}
                        value={location}
                        onChange={(value) => setLocation(value)}
                        required
                      />

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Languages Offered *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Languages size={18} className="text-gray-500" />
                          </div>
                          <select
                            multiple
                            className="pl-10 pr-4 py-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
                            onChange={handleLanguageChange}
                            value={languages}
                            size={4}
                            required
                          >
                            <option value="Arabic">Arabic</option>
                            <option value="Berber">Berber</option>
                            <option value="English">English</option>
                            <option value="French">French</option>
                            <option value="Spanish">Spanish</option>
                            <option value="German">German</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Japanese">Japanese</option>
                          </select>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Hold Ctrl/Cmd to select multiple languages
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <InputField
                          label="Duration (hours) *"
                          type="number"
                          leftIcon={<Clock size={18} />}
                          value={duration}
                          onChange={(e) => setDuration(Number(e.target.value))}
                          min="1"
                          required
                        />

                        <InputField
                          label="Capacity (people) *"
                          type="number"
                          leftIcon={<Users size={18} />}
                          value={capacity}
                          onChange={(e) => setCapacity(Number(e.target.value))}
                          min="1"
                          required
                        />

                        <InputField
                          label="Price (MAD) *"
                          type="number"
                          leftIcon={<CreditCard size={18} />}
                          value={price}
                          onChange={(e) => setPrice(Number(e.target.value))}
                          min="1"
                          required
                        />
                      </div>
                    </>
                  )}

                  {/* Step 3: Media and Dates */}
                  {step === 3 && (
                    <>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Experience Photos *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {images.map((image, index) => (
                            <div key={index} className="relative rounded-lg overflow-hidden h-24">
                              <img
                                src={image}
                                alt={`Experience ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                onClick={() => handleRemoveImage(index)}
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                          
                          {images.length < 4 && (
                            <button
                              type="button"
                              className="h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50"
                              onClick={handleAddImage}
                            >
                              <Upload size={20} className="mb-1" />
                              <span className="text-sm">Add Photo</span>
                            </button>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Upload photos that showcase your experience (max 4)
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Available Dates *
                        </label>
                        <div className="mb-4">
                          <div className="flex gap-2 mb-2">
                            <div className="flex-1">
                              <InputField
                                type="date"
                                placeholder="Select date"
                                leftIcon={<Calendar size={18} />}
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                              />
                            </div>
                            <div className="w-24">
                              <InputField
                                type="time"
                                placeholder="Time"
                                leftIcon={<Clock size={18} />}
                                value={newTime}
                                onChange={(e) => setNewTime(e.target.value)}
                              />
                            </div>
                            <div className="flex-none">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={handleAddDate}
                                leftIcon={<Plus size={18} />}
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>

                        {dates.length > 0 ? (
                          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              Selected Dates ({dates.length})
                            </h4>
                            <div className="space-y-2">
                              {dates.map((date, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center bg-white p-2 rounded border border-gray-200"
                                >
                                  <div className="flex items-center text-gray-700">
                                    <Calendar size={16} className="mr-2" />
                                    <span>{date.toLocaleString()}</span>
                                  </div>
                                  <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleRemoveDate(index)}
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm">No dates added yet</p>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="bg-gray-50 px-6 py-4 flex justify-between border-t">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      Back
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  
                  {step < 3 ? (
                    <Button
                      type="button"
                      variant="primary"
                      onClick={handleNextStep}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isLoading}
                    >
                      Create Experience
                    </Button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateExperiencePage;