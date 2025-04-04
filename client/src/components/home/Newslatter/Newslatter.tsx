
// Make sure this path is correct

import CustomButton from "@/components/ui/CustomButton";

const Newsletter = () => {
  return (
    <section className=" py-12 px-4 md:px-8 lg:px-16 ">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold  mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-700 mb-6">
          Get the latest updates on new arrivals, discounts, and Bookory news. Stay connected!
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
          <CustomButton type="submit">Subscribe</CustomButton>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
