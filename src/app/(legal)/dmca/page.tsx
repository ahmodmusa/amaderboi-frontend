export default function DMCAPage() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">DMCA Policy</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      
      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Digital Millennium Copyright Act (DMCA) Notice</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Amader Boi respects the intellectual property rights of others and expects its users to do the same. In accordance with the 
            Digital Millennium Copyright Act of 1998, the text of which may be found on the U.S. Copyright Office website at 
            <a href="https://www.copyright.gov/legislation/dmca.pdf" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
              https://www.copyright.gov/legislation/dmca.pdf
            </a>, 
            Amader Boi will respond expeditiously to claims of copyright infringement committed using the Amader Boi website (the "Site") 
            that are reported to Amader Boi's Designated Copyright Agent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Copyright Infringement Notification</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you are a copyright owner, or are authorized to act on behalf of one, or authorized to act under any exclusive right under 
            copyright, please report alleged copyright infringements taking place on or through the Site by completing the following DMCA 
            Notice of Alleged Infringement and delivering it to Amader Boi's Designated Copyright Agent. Upon receipt of the Notice as 
            described below, Amader Boi will take whatever action, in its sole discretion, it deems appropriate, including removal of the 
            challenged material from the Site.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">DMCA Notice of Alleged Infringement ("Notice")</h3>
          <ol className="list-decimal pl-6 text-gray-600 dark:text-gray-300 space-y-3 mb-4">
            <li>Identify the copyrighted work that you claim has been infringed, or - if multiple copyrighted works are covered by this Notice - you may provide a representative list of the copyrighted works that you claim have been infringed.</li>
            <li>Identify (i) the material that you claim is infringing (or to be the subject of infringing activity) and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material, including at a minimum, if applicable, the URL of the link shown on the Site where such material may be found, and (ii) the reference or link to the material or activity that you claim to be infringing, that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate that reference or link, including at a minimum, if applicable, the URL of the link shown on the Site where such reference or link may be found.</li>
            <li>Provide your mailing address, telephone number, and, if available, email address.</li>
            <li>Include both of the following statements in the body of the Notice:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>"I hereby state that I have a good faith belief that the disputed use of the copyrighted material or reference or link to such material is not authorized by the copyright owner, its agent, or the law (e.g., as a fair use)."</li>
                <li>"I hereby state that the information in this Notice is accurate and, under penalty of perjury, that I am the owner, or authorized to act on behalf of the owner, of the copyright or of an exclusive right under the copyright that is allegedly infringed."</li>
              </ul>
            </li>
            <li>Provide your full legal name and your electronic or physical signature.</li>
          </ol>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Deliver this Notice, with all items completed, to Amader Boi's Designated Copyright Agent:
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="font-medium text-gray-800 dark:text-gray-200">Copyright Agent</p>
            <p className="text-gray-600 dark:text-gray-300">Amader Boi</p>
            <p className="text-gray-600 dark:text-gray-300">Email: <a href="mailto:dmca@amaderboi.com" className="text-blue-600 dark:text-blue-400 hover:underline">dmca@amaderboi.com</a></p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Counter-Notice</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you believe that your content that was removed (or to which access was disabled) is not infringing, or that you have 
            authorization from the copyright owner, the copyright owner's agent, or pursuant to the law, to post and use the material 
            in your content, you may send a written counter-notice containing the following information to the Copyright Agent:
          </p>
          <ol className="list-decimal pl-6 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
            <li>Your physical or electronic signature.</li>
            <li>Identification of the content that has been removed or to which access has been disabled and the location at which the content appeared before it was removed or disabled.</li>
            <li>A statement that you have a good faith belief that the content was removed or disabled as a result of mistake or a misidentification of the content.</li>
            <li>Your name, address, telephone number, and email address, and a statement that you will accept service of process from the person who provided notification of the alleged infringement.</li>
          </ol>
          <p className="text-gray-600 dark:text-gray-300">
            If a counter-notice is received by the Copyright Agent, Amader Boi may send a copy of the counter-notice to the original 
            complaining party informing that person that it may replace the removed content or cease disabling it in 10 business days. 
            Unless the copyright owner files an action seeking a court order against the content provider, member, or user, the 
            removed content may be replaced, or access to it restored, in 10 to 14 business days or more after receipt of the 
            counter-notice, at Amader Boi's sole discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Repeat Infringers</h2>
          <p className="text-gray-600 dark:text-gray-300">
            It is our policy in appropriate circumstances to disable and/or terminate the accounts of users who are repeat infringers.
          </p>
        </section>
      </div>
    </div>
  );
}
