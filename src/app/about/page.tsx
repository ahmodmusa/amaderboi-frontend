export const metadata = {
  title: "About Us - Amader Boi",
  description: "Learn more about Amader Boi - Your premier destination for Bengali literature and books. Discover our story, mission, and the team behind our platform."
}

const TeamMember = ({ name, role, bio, image }: { name: string, role: string, bio: string, image: string }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
    <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
      <span className="text-4xl text-gray-400">{name.charAt(0)}</span>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h3>
      <p className="text-blue-600 dark:text-blue-400 mb-2">{role}</p>
      <p className="text-gray-600 dark:text-gray-300">{bio}</p>
    </div>
  </div>
);

export default function AboutPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Amader Boi
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Connecting readers with the rich world of Bengali literature since 2023
          </p>
        </div>

        {/* Our Story */}
        <section className="mb-20">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-8 md:p-12 flex items-center justify-center">
                <div className="text-white text-center">
                  <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                  <p className="text-blue-100 opacity-90">
                    From a simple idea to Bangladesh's leading online book platform
                  </p>
                </div>
              </div>
              <div className="p-8 md:p-12">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Founded in 2023, Amader Boi was born out of a passion for making Bengali literature more accessible to readers worldwide. 
                  What started as a small online bookstore has grown into a comprehensive platform that connects readers with thousands of 
                  Bengali books across various genres.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our journey began when our founder, a lifelong book lover, struggled to find quality Bengali books online. 
                  Determined to solve this problem, they created Amader Boi - a platform that not only makes it easy to discover 
                  and purchase Bengali books but also supports local authors and publishers.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Today, we're proud to serve thousands of readers across the globe, offering a carefully curated selection of 
                  books that celebrate Bengali language, culture, and storytelling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Promote Bengali Literature</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We're dedicated to preserving and promoting the rich heritage of Bengali literature by making it accessible to readers worldwide.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Support Local Talent</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We provide a platform for emerging and established Bengali authors to reach a wider audience and grow their readership.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Global Reach</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We connect the global Bengali diaspora with their literary roots, making it easy to access books from anywhere in the world.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate individuals working together to bring you the best of Bengali literature
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamMember
              name="Rahman Ahmed"
              role="Founder & CEO"
              bio="A lifelong bibliophile with a vision to make Bengali literature accessible to everyone."
              image="/team/rahman.jpg"
            />
            <TeamMember
              name="Nusrat Jahan"
              role="Head of Content"
              bio="Literature graduate with a passion for discovering and promoting new Bengali authors."
              image="/team/nusrat.jpg"
            />
            <TeamMember
              name="Arif Khan"
              role="Technology Lead"
              bio="Tech enthusiast building the platform that connects readers with their next favorite book."
              image="/team/arif.jpg"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Literary Community</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Become part of our growing community of book lovers and stay updated with the latest releases, author interviews, and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/signup" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Sign Up Free
            </a>
            <a 
              href="/books" 
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Browse Books
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
