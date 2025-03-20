

const MainBanner = () => {
    return (
        <div className="container mx-auto h-[500px] grid md:grid-cols-2 sm:grid-cols-1 bg-[#1313130D] rounded-xl mt-5">
            <div>
                <h2 className="text-6xl pt-32 pl-28 font-bold">Books to freshen up <br /> your bookshelf</h2>
                <div className="mt-14 ">
                <button className="btn text-white bg-green-500 ml-28 p-3 rounded-xl ">View The List</button>

                </div>
            </div>
            <div className="flex justify-center items-center pl-24">
                <img src="https://i.ibb.co.com/kX6tGR2/kindpng-4945926-1.png" alt="" />
            </div>
            
        </div>
    );
};

export default MainBanner;