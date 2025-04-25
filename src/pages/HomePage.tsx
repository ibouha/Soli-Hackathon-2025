import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Calendar,
  User,
  ChevronRight,
  Star,
} from "lucide-react";
import Button from "../components/common/Button";
import ExperienceCard from "../components/common/ExperienceCard";
import { useExperiences } from "../context/ExperienceContext";
import heroImage from "../public/images/heroImage.jpg";
import image1 from "../public/images/image1.jpg";
import tourImage from "../public/images/image_fx.jpg";
import HomeStayImage from "../public/images/maxresdefault.jpg";
import north from "../public/images/image_fx (3).jpg";
import sud from "../public/images/image_fx (5).jpg";
import mountains from "../public/images/image_fx (6).jpg";
import sahara from "../public/images/image_fx (4).jpg";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { experiences } = useExperiences();
  const featuredExperiences = experiences.slice(0, 3);

  const cities = [
    {
      name: "South of Morocco & Sahara Desert",
      image: sahara,
    },
    {
      name: "Argan Oil Experience in the South",
      image:
        sud,
    },
    {
      name: "North of Morocco",
      image:
      north,
    },
    {
      name: "Atlas Mountains",
      image:
      mountains,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col mt-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImage}
            alt="Morocco"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              Experience the Real Morocco
              <br />
              for FIFA 2030
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 animate-slide-up">
              Connect with local Moroccans to discover authentic cultural
              experiences during your World Cup journey.
            </p>

            <div className="bg-white/95 p-6 rounded-xl shadow-xl backdrop-blur-sm animate-slide-up">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Find your experience
              </h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <MapPin size={18} className="text-gray-500" />
                    </div>
                    <select
                      className="block w-full pl-10 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-lg"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Where are you going?
                      </option>
                      <option value="agadir">Agadir</option>
                      <option value="asilah">Asilah</option>
                      <option value="azilal">Azilal</option>
                      <option value="beni-mellal">Beni Mellal</option>
                      <option value="casablanca">Casablanca</option>
                      <option value="chefchaouen">Chefchaouen</option>
                      <option value="el-jadida">El Jadida</option>
                      <option value="essaouira">Essaouira</option>
                      <option value="fes">Fes</option>
                      <option value="ifrane">Ifrane</option>
                      <option value="kenitra">Kenitra</option>
                      <option value="khemisset">Khemisset</option>
                      <option value="khenifra">Khenifra</option>
                      <option value="larache">Larache</option>
                      <option value="marrakech">Marrakech</option>
                      <option value="meknes">Meknes</option>
                      <option value="merzouga">Merzouga</option>
                      <option value="nador">Nador</option>
                      <option value="ouarzazate">Ouarzazate</option>
                      <option value="oujda">Oujda</option>
                      <option value="rabat">Rabat</option>
                      <option value="safi">Safi</option>
                      <option value="sale">Salé</option>
                      <option value="sidi-ifni">Sidi Ifni</option>
                      <option value="tangier">Tangier</option>
                      <option value="taroudant">Taroudant</option>
                      <option value="taza">Taza</option>
                      <option value="tinghir">Tinghir</option>
                      <option value="tetouan">Tetouan</option>
                      <option value="zagora">Zagora</option>
                    </select>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Calendar size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="date"
                      className="block w-full pl-10 pr-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-lg"
                      placeholder="When?"
                    />
                  </div>
                </div>
                <div className="flex-1 md:flex-none">
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    fullWidth
                    leftIcon={<Search size={18} />}
                    onClick={() => navigate("/explore")}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Cultural Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover Morocco through immersive experiences led by locals who
              are passionate about sharing their culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
              <div className="aspect-w-16 aspect-h-9 h-48">
                <img
                  src={image1}
                  alt="Cooking Workshop"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Cultural Workshops
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn traditional Moroccan crafts, cooking, music, and more
                  with local artisans and experts.
                </p>
                <Button
                  variant="outline"
                  type="button"
                  rightIcon={<ChevronRight size={16} />}
                  onClick={() => navigate("/explore?type=workshop")}
                >
                  Explore Workshops
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
              <div className="aspect-w-16 aspect-h-9 h-48">
                <img
                  src={tourImage}
                  alt="Guided Tour"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Guided Tours
                </h3>
                <p className="text-gray-600 mb-4">
                  Explore hidden gems with local guides who know their cities
                  and villages like no one else.
                </p>
                <Button
                  variant="outline"
                  type="button"
                  rightIcon={<ChevronRight size={16} />}
                  onClick={() => navigate("/explore?type=tour")}
                >
                  Discover Tours
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
              <div className="aspect-w-16 aspect-h-9 h-48">
                <img
                  src={HomeStayImage}
                  alt="Homestay"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  HomeStays
                </h3>
                <p className="text-gray-600 mb-4">
                  Live with a Moroccan family for a truly immersive cultural
                  experience beyond typical accommodation.
                </p>
                <Button
                  variant="outline"
                  type="button"
                  rightIcon={<ChevronRight size={16} />}
                  onClick={() => navigate("/explore?type=homestay")}
                >
                  Find HomeStays
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Experiences
              </h2>
              <p className="text-gray-600">
                Handpicked cultural experiences for your visit to Morocco
              </p>
            </div>
            <Button
              variant="text"
              rightIcon={<ChevronRight size={16} />}
              onClick={() => navigate("/explore")}
            >
              View all experiences
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Top Destinations in Morocco
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore distinctive cultural experiences in Morocco's most
              beautiful cities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city) => (
              <div
                key={city.name}
                className="group relative rounded-lg overflow-hidden shadow-md cursor-pointer"
                onClick={() => navigate(`/explore?location=${city.name}`)}
              >
                <div className="aspect-w-1 aspect-h-1 h-64">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-white">{city.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Hear from tourists and service providers about their NIYA 2030
              experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-lg italic mb-6">
                "The cooking class with Mohammed was the highlight of my trip. I
                learned so much about Moroccan cuisine and culture!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                    alt="Sarah Johnson"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm opacity-80">Tourist from USA</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-lg italic mb-6">
                "Staying with Hassan's family in the Atlas Mountains gave me a
                deeper understanding of Berber culture than any hotel could."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
                    alt="David Rodriguez"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">David Rodriguez</h4>
                  <p className="text-sm opacity-80">Tourist from Spain</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-lg italic mb-6">
                "As a guide, NIYA 2030 has connected me with tourists eager to
                experience the real Fes. It's been amazing for my business."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg"
                    alt="Fatima Zahra"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Fatima Zahra</h4>
                  <p className="text-sm opacity-80">Tour Guide, Fes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Experience Morocco?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join NIYA 2030 and connect with authentic Moroccan cultural
            experiences for the 2030 FIFA World Cup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/register")}
            >
              Register Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/explore")}
            >
              Explore Experiences
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
