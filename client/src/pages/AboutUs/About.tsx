import { useState, useEffect } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: "📘",
      title: "Our Passion for Books",
      description: "Books have the unique ability to inspire, educate, and entertain. Our mission is to bring those worlds to your fingertips. We offer a wide variety of genres including fiction, non-fiction, biographies, fantasy, self-help, and more — curated with love and care."
    },
    {
      icon: "📚",
      title: "What We Offer",
      items: [
        "New releases and timeless classics",
        "Books from local and international authors",
        "Children's books and educational materials",
        "Exclusive signed editions and collector's items"
      ]
    },
    {
      icon: "💖",
      title: "Why Bookory?",
      description: "We are not just a shop — we are a community of readers. Whether you're a casual reader or a passionate bibliophile, Bookory is the perfect place to discover your next great read."
    },
    {
      icon: "📍",
      title: "Visit Us",
      description: "Drop by our store to browse in person, join a book club, or attend one of our reading events. Let's keep the joy of reading alive — one book at a time."
    }
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative inline-block">
            <h1 className="text-7xl md:text-4xl font-bold text-gray-900 mb-6 relative">
              About Our Bookshop
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
            </h1>
          </div>
          
          <div className="mt-12 max-w-4xl mx-auto">
            <p className="text-2xl md:text-xl text-gray-700 leading-relaxed">
              Welcome to{' '}
              <span className="relative inline-block">
                <span className="font-bold text-gray-900 text-2xl">Bookory</span>
                <div className="absolute -bottom-1 left-0 w-full h-2 bg-gray-200 opacity-50 rounded"></div>
              </span>
              {' '}– a cozy haven for all book enthusiasts. At Bookory, we believe in the power of words and the magic that lies within pages.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className="text-5xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  {feature.title}
                </h2>
              </div>
              
              {feature.description && (
                <p className="text-gray-600 text-lg leading-relaxed">
                  {feature.description}
                </p>
              )}
              
              {feature.items && (
                <div className="space-y-3">
                  {feature.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                      <p className="text-gray-600 text-lg">{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className={`bg-gray-50 rounded-3xl p-12 mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '800ms' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                10+
              </div>
              <p className="text-gray-600 text-lg">Books Available</p>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                21+
              </div>
              <p className="text-gray-600 text-lg">Happy Readers</p>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                15+
              </div>
              <p className="text-gray-600 text-lg">Author Events</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '1000ms' }}>
          <div className="bg-gradient-to-r from-gray-800 to-gray-600 rounded-3xl p-12 text-white">
            <h3 className="text-4xl font-bold mb-6">Ready to Start Your Reading Journey?</h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our community of book lovers and discover stories that will change your perspective, spark your imagination, and touch your heart.
            </p>
            <button className="bg-white text-gray-800 px-12 py-4 rounded-full text-xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Explore Our Collection
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gray-100 rounded-full opacity-50 animate-pulse hidden lg:block"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gray-50 rounded-full opacity-30 animate-pulse hidden lg:block"></div>
      </div>
    </div>
  );
};

export default About;