
import MainBanner from "@/components/home/Banner/MainBanner";
import FeaturedBooks from "@/components/home/FeaturedBooks/FeaturedBook";
import Newsletter from "@/components/home/Newslatter/Newslatter";


const Home = () => {
    return (
        <div>
            <MainBanner></MainBanner>
            <FeaturedBooks/>
            <Newsletter/>
        </div>
    );
};

export default Home;