import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Tourist, ServiceProvider } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: 'tourist' | 'provider') => Promise<void>;
  registerTourist: (marhabaPassId: string, name: string, email: string, password: string) => Promise<void>;
  registerProvider: (name: string, email: string, password: string, location: string, languages: string[]) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demonstration
const mockTourist: Tourist = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'tourist',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  marhabaPassId: 'MP123456',
  bookings: [],
  favorites: [],
  joinedDate: new Date(),
  language: 'en',
};

const mockProvider: ServiceProvider = {
  id: '2',
  name: 'Mohammed El Fassi',
  email: 'mohammed@example.com',
  role: 'provider',
  avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
  bio: 'I am a professional chef specializing in traditional Moroccan cuisine.',
  languages: ['Arabic', 'French', 'English'],
  location: 'Marrakech',
  verified: true,
  experiences: [],
  joinedDate: new Date(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('niyaUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'tourist' | 'provider') => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll use mock data
      const loggedInUser = role === 'tourist' ? mockTourist : mockProvider;
      setUser(loggedInUser);
      localStorage.setItem('niyaUser', JSON.stringify(loggedInUser));
    } finally {
      setLoading(false);
    }
  };

  const registerTourist = async (
    marhabaPassId: string,
    name: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: Tourist = {
        ...mockTourist,
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        marhabaPassId,
        joinedDate: new Date(),
      };
      
      setUser(newUser);
      localStorage.setItem('niyaUser', JSON.stringify(newUser));
    } finally {
      setLoading(false);
    }
  };

  const registerProvider = async (
    name: string,
    email: string,
    password: string,
    location: string,
    languages: string[]
  ) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: ServiceProvider = {
        ...mockProvider,
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        location,
        languages,
        joinedDate: new Date(),
      };
      
      setUser(newUser);
      localStorage.setItem('niyaUser', JSON.stringify(newUser));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('niyaUser');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        registerTourist,
        registerProvider,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};