import { Phone } from "lucide-react";
import { GrLocation } from "react-icons/gr";

const Contact: React.FC = () => {
    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-12 mx-auto">
                    <div>
                        <p className="font-medium text-rose-500 dark:text-rose-400">Contact us</p>

                        <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">
                            Chat to our friendly team
                        </h1>

                        <p className="mt-3 text-gray-500 dark:text-gray-400">
                            We’d love to hear from you. Please fill out this form or shoot us an email.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2">
                        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                            <div>
                                <span className="inline-block p-3 text-rose-500 rounded-full bg-rose-100/80 dark:bg-gray-800">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                        />
                                    </svg>
                                </span>

                                <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Email</h2>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Our friendly team is here to help.
                                </p>
                                <p className="mt-2 text-sm text-rose-500 dark:text-rose-400">bookory@mail.com</p>
                            </div>
                            <div>
                                <span className="inline-block p-3 text-rose-500 rounded-full bg-rose-100/80 dark:bg-gray-800">
                                 <GrLocation/>
                                </span>

                                <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Office</h2>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Our friendly team is here to help.
                                </p>
                                <p className="mt-2 text-sm text-rose-500 dark:text-rose-400">Dhaka,Bangladesh</p>
                            </div>
                            <div>
                                <span className="inline-block p-3 text-rose-500 rounded-full bg-rose-100/80 dark:bg-gray-800">
                                <GrLocation/>
                                </span>

                                <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Location</h2>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Our friendly team is here to help.
                                </p>
                                <p className="mt-2 text-sm text-rose-500 dark:text-rose-400">Dhaka,Bangladesh</p>
                            </div>
                            <div>
                                <span className="inline-block p-3 text-rose-500 rounded-full bg-rose-100/80 dark:bg-gray-800">
                                 <Phone/>
                                </span>

                                <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Phone</h2>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Our friendly team is here to help.
                                </p>
                                <p className="mt-2 text-sm text-rose-500 dark:text-rose-400">+1 (555) 123-4567</p>
                            </div>
                        </div>

                        <div className="p-4 py-6 rounded-lg bg-rose-50 dark:bg-rose-800 md:p-8">
    <form>
        <div className="-mx-2 md:items-center md:flex">
            <div className="flex-1 px-2">
                <label className="block mb-2 text-sm text-rose-600 dark:text-rose-200">
                    First Name
                </label>
                <input
                    type="text"
                    placeholder="John"
                    className="block w-full px-5 py-2.5 mt-2 text-rose-700 placeholder-rose-400 bg-white border border-rose-200 rounded-lg dark:placeholder-rose-600 dark:bg-rose-900 dark:text-rose-300 dark:border-rose-700 focus:border-rose-400 dark:focus:border-rose-400 focus:ring-rose-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>

            <div className="flex-1 px-2 mt-4 md:mt-0">
                <label className="block mb-2 text-sm text-rose-600 dark:text-rose-200">
                    Last Name
                </label>
                <input
                    type="text"
                    placeholder="Doe"
                    className="block w-full px-5 py-2.5 mt-2 text-rose-700 placeholder-rose-400 bg-white border border-rose-200 rounded-lg dark:placeholder-rose-600 dark:bg-rose-900 dark:text-rose-300 dark:border-rose-700 focus:border-rose-400 dark:focus:border-rose-400 focus:ring-rose-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
        </div>

        <div className="mt-4">
            <label className="block mb-2 text-sm text-rose-600 dark:text-rose-200">
                Email address
            </label>
            <input
                type="email"
                placeholder="johndoe@example.com"
                className="block w-full px-5 py-2.5 mt-2 text-rose-700 placeholder-rose-400 bg-white border border-rose-200 rounded-lg dark:placeholder-rose-600 dark:bg-rose-900 dark:text-rose-300 dark:border-rose-700 focus:border-rose-400 dark:focus:border-rose-400 focus:ring-rose-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
        </div>

        <div className="w-full mt-4">
            <label className="block mb-2 text-sm text-rose-600 dark:text-rose-200">Message</label>
            <textarea
                className="block w-full h-32 px-5 py-2.5 mt-2 text-rose-700 placeholder-rose-400 bg-white border border-rose-200 rounded-lg md:h-56 dark:placeholder-rose-600 dark:bg-rose-900 dark:text-rose-300 dark:border-rose-700 focus:border-rose-400 dark:focus:border-rose-400 focus:ring-rose-400 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Message"
            ></textarea>
        </div>

        <button
            type="submit"
            className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-rose-500 rounded-lg hover:bg-rose-400 focus:outline-none focus:ring focus:ring-rose-300 focus:ring-opacity-50"
        >
            Send message
        </button>
    </form>
</div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
