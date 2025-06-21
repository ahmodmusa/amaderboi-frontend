export default function TermsOfService() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Terms of Service</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      
      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">1. Introduction</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Welcome to Amader Boi. These Terms of Service ("Terms") govern your access to and use of the Amader Boi website 
            and services (collectively, the "Service"). Please read these Terms carefully before using the Service.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, 
            then you may not access the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">2. Accounts</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. 
            Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions 
            under your password, whether your password is with our Service or a third-party service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">3. Intellectual Property</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The Service and its original content, features, and functionality are and will remain the exclusive property of Amader Boi 
            and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the 
            prior written consent of Amader Boi.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            All books and other materials available on our platform are protected by copyright and other intellectual property laws. 
            You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service without our express 
            written permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">4. User Content</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our Service allows you to post, link, store, share, and otherwise make available certain information, text, graphics, 
            or other material ("Content"). You are responsible for the Content that you post on or through the Service, including 
            its legality, reliability, and appropriateness.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            By posting Content on or through the Service, you represent and warrant that: (i) the Content is yours (you own it) 
            and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and 
            (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, 
            copyrights, contract rights, or any other rights of any person or entity.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">5. Termination</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, 
            under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of 
            the Terms.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            If you wish to terminate your account, you may simply discontinue using the Service. All provisions of the Terms which 
            by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, 
            warranty disclaimers, indemnity, and limitations of liability.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">6. Limitation of Liability</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            In no event shall Amader Boi, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for 
            any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, 
            data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or 
            use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the 
            Service; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, 
            contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility 
            of such damage.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">7. Governing Law</h2>
          <p className="text-gray-600 dark:text-gray-300">
            These Terms shall be governed and construed in accordance with the laws of Bangladesh, without regard to its conflict of 
            law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. 
            If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms 
            will remain in effect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">8. Changes to Terms</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, 
            we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will 
            be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, 
            you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
          </p>
        </section>
      </div>
    </div>
  );
}
