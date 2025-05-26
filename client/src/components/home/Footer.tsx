import logo from '../../assets/images/logo.svg'

const Footer = () => {
    return (
        <footer className="bg-[#1f1f1f] text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                
                {/* Company Info */}
                <div>
                    <h2 className="text-white text-xl font-semibold flex items-center gap-2">
                        <img src={logo} alt="Bookory Logo" className="w-8 h-8" />
                        Bookory
                    </h2>
                    <p className="mt-6 text-sm text-gray-400 leading-6">
                        1418 River Drive, Suite <br />
                        35 Cottomhall, CA 9622
                    </p>
                </div>

                {/* Need Help */}
                <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Need Help</h3>
                    <p className="text-red-500 text-2xl font-bold">+(84) - 1800 - 4635</p>
                    <p className="text-sm text-gray-400 mt-2">Mon - Fri: 9:00 - 20:00</p>
                    <p className="text-sm text-gray-400">Saturday: 11:00 - 15:00</p>
                    <a href="mailto:contact@example.com" className="block mt-3 text-gray-400 hover:text-white transition">bookory@example.com</a>
                </div>

                {/* Explore */}
                <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Explore</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="text-gray-400 hover:text-white transition">About us</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Sitemap</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Bookmarks</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Sign in/Join</a></li>
                    </ul>
                </div>

                {/* Our Services */}
                <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Our Service</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Help Center</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Returns</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Product Recalls</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Accessibility</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition">Store Pickup</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-12 border-t border-gray-700 pt-6 text-center">
                <p className="text-sm text-gray-500">
                    © 2025 <span className="text-red-500 font-medium">Bookory</span>. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
