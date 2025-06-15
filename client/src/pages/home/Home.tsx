import FeaturedBooks from "@/components/home/FeaturedBooks/FeaturedBook";
import Newsletter from "@/components/home/Newslatter/Newslatter";
import About from "../AboutUs/About";
import ModernBanner from "@/components/home/Banner/ModernBanner";

const Home = () => {
  return (
    <div>
      <ModernBanner />
      <FeaturedBooks />
      <About />
      <Newsletter />
    </div>
  );
};

export default Home;
