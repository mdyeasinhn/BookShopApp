
import MainBanner from "@/components/home/Banner/MainBanner";
import FeaturedBooks from "@/components/home/FeaturedBooks/FeaturedBook";
import Newsletter from "@/components/home/Newslatter/Newslatter";
import About from "../AboutUs/About";


const Home = () => {
    return (
        <div>
            <MainBanner></MainBanner>
            <FeaturedBooks/>
            <About/>
            <Newsletter/>
        </div>
    );
};

export default Home;