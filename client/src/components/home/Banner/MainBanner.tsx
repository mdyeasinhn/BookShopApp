import { FiArrowRight } from 'react-icons/fi';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const MainBanner = () => {
    // Optimized Unsplash image URLs with performance parameters
    const optimizedImages = [
        'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?auto=format&fit=crop&q=75&w=600',
        'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=75&w=600',
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=75&w=600',
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=75&w=600'
    ];

    return (
        <div className="container mx-auto mt-5 px-4">
            <div className="relative grid md:grid-cols-2 items-center gap-8 rounded-3xl bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 p-8 md:p-12 overflow-hidden">
                {/* Decorative background shapes */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-purple-200 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-200 rounded-full opacity-30 translate-x-1/4 translate-y-1/4"></div>

                {/* Text Content */}
                <div className="relative z-10 text-center md:text-left order-last md:order-first">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
                        Refresh your shelf <br /> with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">great reads</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 max-w-md mx-auto md:mx-0">
                        Discover your next favorite book from our curated collection of bestsellers and hidden gems.
                    </p>
                    <div className="mt-12">
                        <button className="inline-flex items-center gap-3 btn text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-semibold py-3 px-8 rounded-full shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
                            View The List
                            <FiArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Image Slider Container with stable height */}
                <div className="relative w-full h-[300px] md:h-[450px]">
                    <Swiper
                        modules={[Autoplay, EffectFade, Pagination]}
                        effect={'fade'}
                        loop={true}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        className="w-full h-full rounded-2xl shadow-2xl"
                    >
                        {optimizedImages.map((imageUrl, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={imageUrl} // Use the OPTIMIZED URL
                                    alt={`Optimized Unsplash image of books ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    // Add loading="lazy" for even better performance
                                    loading="lazy" 
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default MainBanner;
