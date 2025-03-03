import logo from '../../assets/images/logo.svg'
const Footer = () => {
    return (
        <footer className="bg-[#282828] text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <h2 className="text-white text-xl font-semibold flex items-center gap-2">
             <img src={logo} alt="" />
            </h2>
            <p className="mt-6  text-sm ">1418 River Drive, Suite <br/> 35 Cottomhall, CA 9622</p>
            
          </div>
          {/* Need Help */}
          <div>
            <h3 className="text-white font-semibold">Need Help</h3>
            <p className="text-red-500 text-3xl font-bold mt-2">+(84) - 1800 - 4635</p>
            <p className="text-sm mt-1">Monday - Friday: 9:00 - 20:00</p>
            <p className="text-sm">Saturday: 11:00 - 15:00</p>
            <a href="mailto:contact@example.com" className="mt-2 inline-block text-gray-400">contact@example.com</a>
          </div>
  
          {/* Explore */}
          <div>
            <h3 className="text-white font-semibold">Explore</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">About us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Sitemap</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Bookmarks</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Sign in/Join</a></li>
            </ul>
          </div>
  
          {/* Our Services */}
          <div>
            <h3 className="text-white font-semibold">Our Service</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Product Recalls</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Accessibility</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Store Pickup</a></li>
            </ul>
          </div>
        </div>
  
        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400">Copyright © 2025 <span className="text-red-500">Bookory</span>. All rights reserved.</p>
      
        </div>
      </footer>
    );
};

export default Footer;