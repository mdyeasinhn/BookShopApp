import { useState } from 'react';

// Updated Custom Button Component
const CustomButton = ({ type = "button", className = "", ...props }) => {
  return (
    <button
      type={type}
      className={`px-8 py-4 rounded-xl font-semibold text-white shadow-md bg-gradient-to-r from-rose-500 to-rose-600 hover:scale-105 hover:shadow-lg hover:shadow-rose-500/50 transition-all duration-300 ${className}`}
      {...props}
    />
  );
};

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-12 shadow-xl">
            <div className="text-6xl mb-6 animate-bounce">📧</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-xl text-gray-700 mb-8">
              Welcome to the Bookory family! Check your inbox for a special welcome offer.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 rounded-xl font-semibold text-white shadow-md bg-gradient-to-r from-rose-500 to-rose-600 hover:scale-105 hover:shadow-lg hover:shadow-rose-500/50 transition-all"
            >
              Subscribe another email
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-rose-100 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-rose-50 rounded-full opacity-40 animate-pulse"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Icon and Header */}
        <div className="mb-8">
          <div className="inline-block p-4 bg-rose-100 rounded-full mb-6 hover:bg-rose-200 transition-colors duration-300">
            <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Subscribe to Our 
            <span className="block bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Newsletter
            </span>
          </h2>
        </div>

        {/* Description */}
        <div className="mb-12">
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get the latest updates on new arrivals, exclusive discounts, author spotlights, and Bookory news. 
            Join our community of book lovers!
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-rose-50 rounded-2xl p-6 hover:bg-rose-100 transition-colors duration-300">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-semibold text-gray-900 mb-2">New Arrivals</h3>
              <p className="text-gray-600 text-sm">Be the first to know about the latest books</p>
            </div>
            <div className="bg-rose-50 rounded-2xl p-6 hover:bg-rose-100 transition-colors duration-300">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold text-gray-900 mb-2">Exclusive Deals</h3>
              <p className="text-gray-600 text-sm">Get subscriber-only discounts and offers</p>
            </div>
            <div className="bg-rose-50 rounded-2xl p-6 hover:bg-rose-100 transition-colors duration-300">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold text-gray-900 mb-2">Book Recommendations</h3>
              <p className="text-gray-600 text-sm">Curated picks from our expert team</p>
            </div>
          </div>
        </div>

        {/* Newsletter Form */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <div className="relative w-full sm:flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200 focus:border-gray-400 text-gray-900 placeholder-gray-500 transition-all duration-300 text-lg"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>
            
            <CustomButton 
              onClick={handleSubmit}
              type="button" 
              className={`whitespace-nowrap min-w-32 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Subscribing...
                </div>
              ) : (
                'Subscribe Now'
              )}
            </CustomButton>
          </div>
          
          <p className="text-sm text-gray-500 mt-6 max-w-md mx-auto">
            📧 We respect your privacy. Unsubscribe at any time. No spam, just great book content!
          </p>
        </div>

        {/* Social Proof */}
        <div className="mt-12 flex items-center justify-center space-x-8 text-gray-500">
          <div className="flex items-center">
            <div className="flex -space-x-2 mr-2">
              <div className="w-8 h-8 bg-rose-300 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-rose-400 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-rose-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-sm">Join 12+ subscribers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;