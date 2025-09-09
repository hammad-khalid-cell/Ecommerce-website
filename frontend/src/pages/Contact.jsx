import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center p-4 md:p-12 min-h-screen">
      {/* Breadcrumbs */}
      <div className="w-full max-w-7xl mx-auto text-sm text-gray-500 mb-8">
        <span className="font-semibold text-gray-700">Home</span> / <span className="font-semibold text-gray-700">Contact</span>
      </div>

      <div className="container mx-auto max-w-7xl bg-white rounded-lg shadow-lg p-8 md:p-12 flex flex-col md:flex-row gap-8">
        {/* Contact Information Section */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left p-6 rounded-lg bg-gray-50">
          <div className="mb-8">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.5 15.6l-3.2-3.2c-.4-.4-.9-.6-1.4-.6s-1 .2-1.4.6l-2 2c-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3l-2.9-2.9c-.2-.2-.3-.5-.3-.7 0-.3.1-.5.3-.7l2-2c.4-.4.6-.9.6-1.4s-.2-1-.6-1.4l-3.2-3.2c-.4-.4-.9-.6-1.4-.6s-1 .2-1.4.6l-3.2 3.2c-.4.4-.6.9-.6 1.4s.2 1 .6 1.4l2.9 2.9c.4.4.6.9.6 1.4 0 .5-.2 1-.6 1.4l-2 2c-.4.4-.6.9-.6 1.4s.2 1 .6 1.4l3.2 3.2c.4.4.9.6 1.4.6s1-.2 1.4-.6l2.9-2.9c.2-.2.5-.3.7-.3.3 0 .5.1.7.3l2 2c.4.4.9.6 1.4.6s1-.2 1.4-.6l3.2-3.2c.4-.4.6-.9.6-1.4s-.2-1-.6-1.4zM9 13.9l-2.9-2.9 3.2-3.2 2 2-2.9 2.9zm6.1 2.2l-3.2 3.2-2-2 2.9-2.9 2 2z"/>
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
              </svg>
              <h3 className="text-xl font-bold ml-2">Call To Us</h3>
            </div>
            <p className="text-gray-600 mb-2">We are available 24/7, 7 days a week.</p>
            <p className="font-semibold text-gray-800">Phone: +8801611112222</p>
          </div>
          <div className="w-full h-px bg-gray-300 my-4"></div>
          <div>
            <div className="flex items-center justify-center md:justify-start mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
              </svg>
              <h3 className="text-xl font-bold ml-2">Write To US</h3>
            </div>
            <p className="text-gray-600 mb-2">Fill out our form and we will contact you within 24 hours.</p>
            <p className="font-semibold text-gray-800">Emails: customer@exclusive.com</p>
            <p className="font-semibold text-gray-800">Emails: support@exclusive.com</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="flex-1 p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" placeholder="Your Name *" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              <input type="email" placeholder="Your Email *" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              <input type="tel" placeholder="Your Phone *" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <textarea placeholder="Your Message" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-40"></textarea>
            <div className="flex justify-end">
              <button type="submit" className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300 shadow-md">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
