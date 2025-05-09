import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import LanguageSelector from '../common/LanguageSelector';
import logo from "../../public/images/logo.png" ;


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md py-1"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <NavLink to="/" className="">
            <img src={logo} alt="niya" className='w-20 h-20' />
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `font-medium ${
                isActive
                  ? 'text-primary-600'
                  : scrolled
                  ? 'text-gray-800 hover:text-primary-600'
                  : 'text-gray-800 hover:text-primary-600'
              }`
            }
          >
            {t('common.explore')}
          </NavLink>

          {isAuthenticated && user?.role === 'provider' && (
            <NavLink
              to="/provider/experiences"
              className={({ isActive }) =>
                `font-medium ${
                  isActive
                    ? 'text-primary-600'
                    : scrolled
                    ? 'text-gray-800 hover:text-primary-600'
                    : 'text-gray-800 hover:text-primary-600'
                }`
              }
            >
              {t('common.myExperiences')}
            </NavLink>
          )}

          {isAuthenticated && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `font-medium ${
                  isActive
                    ? 'text-primary-600'
                    : scrolled
                    ? 'text-gray-800 hover:text-primary-600'
                    : 'text-gray-800 hover:text-primary-600'
                }`
              }
            >
              {t('common.dashboard')}
            </NavLink>
          )}

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <NavLink to="/dashboard" className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User size={16} className="text-gray-600" />
                    )}
                  </div>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors"
                >
                  {t('common.logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink
                  to="/login"
                  className="px-4 py-2 rounded-md text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  {t('common.login')}
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  {t('common.register')}
                </NavLink>
              </div>
            )}
            <LanguageSelector />
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `block py-2 px-4 rounded-lg ${
                  isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-800'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.explore')}
            </NavLink>

            {isAuthenticated && user?.role === 'provider' && (
              <NavLink
                to="/provider/experiences"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded-lg ${
                    isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-800'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.myExperiences')}
              </NavLink>
            )}

            {isAuthenticated && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded-lg ${
                    isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-800'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.dashboard')}
              </NavLink>
            )}

            {isAuthenticated ? (
              <>
                <NavLink
                  to="/dashboard"
                  className="flex items-center py-2 px-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-2">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User size={16} className="text-gray-600" />
                    )}
                  </div>
                  <span>{user?.name}</span>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 px-4 rounded-lg bg-primary-50 text-primary-600 text-left"
                >
                  {t('common.logout')}
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="block py-2 px-4 rounded-lg text-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('common.login')}
                </NavLink>
                <NavLink
                  to="/register"
                  className="block py-2 px-4 rounded-lg bg-primary-600 text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('common.register')}
                </NavLink>
              </>
            )}
            <div className="py-2 px-4">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;