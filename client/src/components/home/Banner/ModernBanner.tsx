import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, BookOpen, Star } from 'lucide-react';

const ModernBanner = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // High-quality book/reading themed images
    const images = [
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'
    ];

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const floatingElements = [
        { icon: BookOpen, delay: '0s', x: '10%', y: '20%' },
        { icon: Star, delay: '1s', x: '85%', y: '15%' },
        { icon: Sparkles, delay: '2s', x: '15%', y: '80%' },
        { icon: BookOpen, delay: '3s', x: '90%', y: '75%' }
    ];

    return (
        <div className="mt-5 bg-white flex items-center justify-center p-4">
            <div className={`container mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 backdrop-blur-xl border border-gray-200 shadow-xl">
                    
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-300/10 to-purple-300/10 rounded-full animate-pulse"></div>
                        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-300/10 to-indigo-300/10 rounded-full animate-pulse delay-1000"></div>
                        
                        {/* Floating icons */}
                        {floatingElements.map((element, index) => {
                            const IconComponent = element.icon;
                            return (
                                <div
                                    key={index}
                                    className="absolute text-gray-400 animate-bounce"
                                    style={{
                                        left: element.x,
                                        top: element.y,
                                        animationDelay: element.delay,
                                        animationDuration: '3s'
                                    }}
                                >
                                    <IconComponent size={24} />
                                </div>
                            );
                        })}
                    </div>

                    <div className="relative grid lg:grid-cols-2 gap-8 p-8 lg:p-16 items-center">
                        {/* Content Section */}
                        <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-300/20 to-gray-400/20 border border-gray-500/30 text-gray-600 text-sm font-medium">
                                    <Sparkles size={16} />
                                    New Collection Available
                                </div>
                                
                                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                                    <span className="text-gray-800">Discover</span>
                                    <br />
                                    <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
                                        Amazing Stories
                                    </span>
                                </h1>
                                
                                <p className="text-lg lg:text-xl text-gray-600 max-w-md mx-auto lg:mx-0 leading-relaxed">
                                    Immerse yourself in captivating narratives that transport you to new worlds and perspectives.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="flex justify-center lg:justify-start gap-8 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-gray-800">10K+</div>
                                    <div className="text-sm text-gray-500">Books</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-800">50K+</div>
                                    <div className="text-sm text-gray-500">Readers</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-800">4.9★</div>
                                    <div className="text-sm text-gray-500">Rating</div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-pink-600 text-white font-semibold rounded-full overflow-hidden transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Explore Collection
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-pink-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                </button>
                                
                                <button className="px-8 py-4 border border-gray-200/20 text-gray-800 font-semibold rounded-full hover:bg-gray-200/10 transition-all duration-300">
                                    Learn More
                                </button>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="relative order-1 lg:order-2">
                            <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-opacity duration-1000 ${
                                            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`Book collection ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                                    </div>
                                ))}
                                
                                {/* Image overlay content */}
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="text-sm opacity-80">Featured Collection</div>
                                            <div className="font-semibold">Literary Classics</div>
                                        </div>
                                        <div className="flex gap-1">
                                            {images.map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                        index === currentImageIndex 
                                                            ? 'bg-white w-8' 
                                                            : 'bg-white/50'
                                                    }`}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative elements around image */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full animate-pulse"></div>
                            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-indigo-300 to-purple-300 rounded-full animate-pulse delay-500"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModernBanner;
