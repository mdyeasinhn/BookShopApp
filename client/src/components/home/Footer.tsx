import { useState } from 'react';



const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);



  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-gray-800 rounded-full opacity-10"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-gray-700 rounded-full opacity-20"></div>

      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            
            {/* Company Info - Enhanced */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-white text-2xl font-bold flex items-center gap-3 mb-4">
                 
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Bookory
                  </span>
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Your premier destination for books, stories, and literary adventures. 
                  Discover worlds beyond imagination at Bookory.
                </p>
              </div>

              {/* Address */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span className="text-lg">📍</span>
                  Visit Our Store
                </h4>
                <p className="text-sm text-gray-400 leading-6">
                  1418 River Drive, Suite 35<br />
                  Cottomhall, CA 9622<br />
                  United States
                </p>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-white font-semibold mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12"
                      title={social.name}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Need Help - Enhanced */}
            <div>
              <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="text-2xl">📞</span>
                Need Help?
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-red-400 text-2xl font-bold hover:text-red-300 transition-colors cursor-pointer">
                    +(84) - 1800 - 4635
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Toll-free customer support</p>
                </div>
                
                <div className="border-l-2 border-gray-700 pl-4">
                  <p className="text-sm text-gray-400 font-medium">Business Hours:</p>
                  <p className="text-sm text-gray-400">Mon - Fri: 9:00 - 20:00</p>
                  <p className="text-sm text-gray-400">Saturday: 11:00 - 15:00</p>
                  <p className="text-sm text-gray-500">Sunday: Closed</p>
                </div>

                <a 
                  href="mailto:bookory@example.com" 
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">📧</span>
                  bookory@example.com
                </a>
              </div>
            </div>

            {/* Explore - Enhanced */}
            <div>
              <h3 className="text-white text-xl font-semibold mb-6">Explore</h3>
              <ul className="space-y-3">
                {['About us', 'Sitemap', 'Bookmarks', 'Sign in/Join', 'New Releases', 'Best Sellers'].map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                     
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <span className={`w-1 h-1 bg-gray-600 rounded-full transition-all duration-300 ${hoveredLink === item ? 'w-2 bg-white' : ''}`}></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Services - Enhanced */}
            <div>
              <h3 className="text-white text-xl font-semibold mb-6">Our Service</h3>
              <ul className="space-y-3">
                {['Help Center', 'Returns', 'Product Recalls', 'Accessibility', 'Contact Us', 'Store Pickup', 'Gift Cards'].map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                     
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <span className={`w-1 h-1 bg-gray-600 rounded-full transition-all duration-300 ${hoveredLink === item ? 'w-2 bg-white' : ''}`}></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          
          {/* Bottom Section - Enhanced */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-gray-500">
                <p>
                  © 2025 <span className="text-red-400 font-semibold">Bookory</span>. All rights reserved.
                </p>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Made with</span>
                <span className="text-red-400 animate-pulse">❤️</span>
                <span>for book lovers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;