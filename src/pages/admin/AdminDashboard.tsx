import React, { useState } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
import { useExperiences } from '../../context/ExperienceContext';
import Button from '../../components/common/Button';

const AdminDashboard: React.FC = () => {
  const { experiences, updateExperience } = useExperiences();
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');



  const pendingExperiences = experiences.filter(exp => !exp.approved);
  const approvedExperiences = experiences.filter(exp => exp.approved);

  const handleApprove = (experienceId: string) => {
    updateExperience(experienceId, { approved: true });
  };

  const handleReject = (experienceId: string) => {
    // In a real application, you might want to add a reason for rejection
    updateExperience(experienceId, { approved: false });
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-primary-600 text-white p-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="opacity-90">Manage experiences and monitor platform activity</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Pending Reviews</h3>
                <p className="text-3xl font-bold text-blue-800">{pendingExperiences.length}</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-700 mb-2">Approved Experiences</h3>
                <p className="text-3xl font-bold text-green-800">{approvedExperiences.length}</p>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-700 mb-2">Total Providers</h3>
                <p className="text-3xl font-bold text-purple-800">
                  {new Set(experiences.map(exp => exp.providerId)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                className={`px-6 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'pending'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('pending')}
              >
                Pending Review ({pendingExperiences.length})
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'approved'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('approved')}
              >
                Approved ({approvedExperiences.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="divide-y divide-gray-200">
              {(activeTab === 'pending' ? pendingExperiences : approvedExperiences).map(experience => (
                <div key={experience.id} className="py-6 first:pt-0 last:pb-0">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4">
                      <div className="aspect-w-16 aspect-h-9 h-48 rounded-lg overflow-hidden">
                        <img
                          src={experience.images[0]}
                          alt={experience.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="md:w-2/4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          experience.type === 'workshop' ? 'bg-blue-100 text-blue-800' :
                          experience.type === 'tour' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {experience.type.charAt(0).toUpperCase() + experience.type.slice(1)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          experience.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {experience.approved ? 'Approved' : 'Pending'}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{experience.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{experience.description}</p>

                      <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>Provider:</strong> {experience.providerName}</p>
                        <p><strong>Location:</strong> {experience.location}</p>
                        <p><strong>Price:</strong> {experience.price} MAD</p>
                        <p><strong>Languages:</strong> {experience.languages.join(', ')}</p>
                      </div>
                    </div>

                    <div className="md:w-1/4 flex flex-col gap-3">
                      {!experience.approved && (
                        <>
                          <Button
                            variant="primary"
                            onClick={() => handleApprove(experience.id)}
                            leftIcon={<Check size={18} />}
                            fullWidth
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleReject(experience.id)}
                            leftIcon={<X size={18} />}
                            fullWidth
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      <Button
                        variant="text"
                        onClick={() => window.open(`/experience/${experience.id}`, '_blank')}
                        leftIcon={<AlertCircle size={18} />}
                        fullWidth
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {(activeTab === 'pending' ? pendingExperiences : approvedExperiences).length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📋</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    No {activeTab === 'pending' ? 'pending' : 'approved'} experiences
                  </h3>
                  <p className="text-gray-600">
                    {activeTab === 'pending'
                      ? 'All experiences have been reviewed'
                      : 'No experiences have been approved yet'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;