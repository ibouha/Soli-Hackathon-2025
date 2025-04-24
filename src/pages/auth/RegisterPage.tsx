import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building, Users, MapPin, Languages } from 'lucide-react';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import SelectField from '../../components/common/SelectField';
import TextareaField from '../../components/common/TextareaField';
import { useAuth } from '../../context/AuthContext';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerTourist, registerProvider } = useAuth();
  
  const [role, setRole] = useState<'tourist' | 'provider'>('tourist');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Common fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Tourist specific fields
  const [marhabaPassId, setMarhabaPassId] = useState('');
  
  // Provider specific fields
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const validateStep1 = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    if (role === 'tourist' && !marhabaPassId) {
      setError('Please enter your Marhaba Pass ID');
      return false;
    }
    
    if (role === 'provider' && (!location || selectedLanguages.length === 0)) {
      setError('Please fill in all required fields');
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    setError('');
    
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateStep2()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (role === 'tourist') {
        await registerTourist(marhabaPassId, name, email, password);
      } else {
        await registerProvider(name, email, password, location, selectedLanguages);
      }
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const languages: string[] = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        languages.push(options[i].value);
      }
    }
    
    setSelectedLanguages(languages);
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
  ];

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-600">Join NIYA 2030 and connect with authentic Moroccan experiences</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          {/* Role Selection */}
          <div className="flex mb-6">
            <button
              type="button"
              className={`flex-1 py-2 text-center rounded-l-lg ${
                role === 'tourist'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setRole('tourist')}
            >
              <div className="flex items-center justify-center">
                <User size={18} className="mr-2" />
                Tourist
              </div>
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-center rounded-r-lg ${
                role === 'provider'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setRole('provider')}
            >
              <div className="flex items-center justify-center">
                <Building size={18} className="mr-2" />
                Provider
              </div>
            </button>
          </div>

          {/* Step Indicator */}
          <div className="flex mb-6">
            <div className={`flex-1 h-1 ${step >= 1 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
            <div className={`flex-1 h-1 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              /* Step 1: Basic Information */
              <>
                <InputField
                  label="Full Name"
                  type="text"
                  placeholder="Your full name"
                  leftIcon={<User size={18} />}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <InputField
                  label="Email Address"
                  type="email"
                  placeholder="youremail@example.com"
                  leftIcon={<Mail size={18} />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <InputField
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  leftIcon={<Lock size={18} />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <InputField
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  leftIcon={<Lock size={18} />}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleNextStep}
                >
                  Continue
                </Button>
              </>
            ) : (
              /* Step 2: Role-specific Information */
              <>
                {role === 'tourist' ? (
                  <InputField
                    label="Marhaba Pass ID"
                    type="text"
                    placeholder="Enter your Marhaba Pass ID"
                    leftIcon={<Users size={18} />}
                    value={marhabaPassId}
                    onChange={(e) => setMarhabaPassId(e.target.value)}
                    required
                  />
                ) : (
                  <>
                    <SelectField
                      label="Location"
                      options={cities}
                      value={location}
                      onChange={(value) => setLocation(value)}
                      required
                    />

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Languages You Speak
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                          <Languages size={18} className="text-gray-500" />
                        </div>
                        <select
                          multiple
                          className="pl-10 pr-4 py-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20"
                          onChange={handleLanguageChange}
                          size={4}
                          required
                        >
                          <option value="Arabic">Arabic</option>
                          <option value="Berber">Berber</option>
                          <option value="English">English</option>
                          <option value="French">French</option>
                          <option value="Spanish">Spanish</option>
                          <option value="German">German</option>
                        </select>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Hold Ctrl/Cmd to select multiple languages
                      </p>
                    </div>

                    <TextareaField
                      label="Bio (Optional)"
                      placeholder="Tell tourists about yourself and your expertise"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </>
                )}

                <div className="flex gap-4 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    fullWidth
                    onClick={handlePrevStep}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isLoading}
                  >
                    Create Account
                  </Button>
                </div>
              </>
            )}
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
              Sign in
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              For demo purposes, you can use any values.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;