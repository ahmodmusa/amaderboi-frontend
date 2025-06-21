export default function PrivacyPolicy() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Privacy Policy</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      
      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">1. Introduction</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Welcome to Amader Boi. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you about how we look after your personal data when you visit our website 
            and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">2. Information We Collect</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
            <li>Identity Data (name, username, date of birth, gender)</li>
            <li>Contact Data (email address, phone number)</li>
            <li>Technical Data (IP address, browser type, location)</li>
            <li>Usage Data (how you use our website, products, and services)</li>
            <li>Marketing and Communications Data (your preferences in receiving marketing from us)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">3. How We Use Your Data</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
            <li>To register you as a new customer</li>
            <li>To process and deliver your orders</li>
            <li>To manage our relationship with you</li>
            <li>To improve our website, products/services, and customer relationships</li>
            <li>To recommend content we think may interest you</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">4. Data Security</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
            used, or accessed in an unauthorized way, altered, or disclosed. We limit access to your personal data to those 
            employees, agents, contractors, and other third parties who have a business need to know.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">5. Your Legal Rights</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, 
            including the right to request access, correction, erasure, restriction, transfer, or to withdraw consent.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            If you wish to exercise any of these rights, please contact us at <a href="mailto:privacy@amaderboi.com" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@amaderboi.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">6. Changes to This Policy</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
            Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
          </p>
        </section>
      </div>
    </div>
  );
}
