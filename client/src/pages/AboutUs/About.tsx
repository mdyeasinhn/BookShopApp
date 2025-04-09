// About.tsx

const About = () => {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-10 text-gray-800 dark:text-gray-200">
        <div className="max-w-6xl w-full">
          <h1 className="text-4xl font-bold mb-6 text-center">About Our Bookshop</h1>
  
          <p className="text-lg mb-10 text-center">
            Welcome to <span className="font-semibold text-blue-600 dark:text-blue-400">Bookory</span> – a cozy haven
            for all book enthusiasts. At Bookory, we believe in the power of words and the magic that lies within pages.
          </p>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-2xl font-semibold mb-2">📘 Our Passion for Books</h2>
              <p>
                Books have the unique ability to inspire, educate, and entertain. Our mission is to bring those worlds to
                your fingertips. We offer a wide variety of genres including fiction, non-fiction, biographies, fantasy,
                self-help, and more — curated with love and care.
              </p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-2">📚 What We Offer</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>New releases and timeless classics</li>
                <li>Books from local and international authors</li>
                <li>Children's books and educational materials</li>
                <li>Exclusive signed editions and collector’s items</li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-2">💖 Why Bookory?</h2>
              <p>
                We are not just a shop — we are a community of readers. Whether you're a casual reader or a passionate
                bibliophile, Bookory is the perfect place to discover your next great read.
              </p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold mb-2">📍 Visit Us</h2>
              <p>
                Drop by our store to browse in person, join a book club, or attend one of our reading events. Let’s keep the
                joy of reading alive — one book at a time.
              </p>
            </section>
          </div>
        </div>
      </div>
    );
  };
  
  export default About;
  