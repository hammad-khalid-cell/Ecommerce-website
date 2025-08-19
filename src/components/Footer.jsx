import React from 'react'

const Footer = () => {
  return (
 <footer className="bg-black text-gray-300 py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Exclusive & Subscribe Column */}
          <div className="flex flex-col">
            <h4 className="text-xl font-bold text-white mb-4">Exclusive</h4>
            <p className="text-lg font-medium mb-4">Subscribe</p>
            <p className="text-sm mb-4">Get 10% off your first order</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent border border-gray-500 rounded-md py-2 px-4 text-sm text-gray-300 focus:outline-none focus:border-white"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m-7 7l7-7M7 12H3" />
              </svg>
            </div>
          </div>

          {/* Support Column */}
          <div className="flex flex-col">
            <h4 className="text-xl font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
              <li>exclusive@gmail.com</li>
              <li>+88015-8888-9999</li>
            </ul>
          </div>

          {/* Account Column */}
          <div className="flex flex-col">
            <h4 className="text-xl font-bold text-white mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors duration-200">My Account</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Login / Register</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Cart</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Wishlist</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Shop</a></li>
            </ul>
          </div>

          {/* Quick Link Column */}
          <div className="flex flex-col">
            <h4 className="text-xl font-bold text-white mb-4">Quick Link</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Terms Of Use</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          {/* Download App Column */}
          <div className="flex flex-col">
            <h4 className="text-xl font-bold text-white mb-4">Download App</h4>
            <p className="text-xs text-gray-500 mb-2">Save $3 with App New User Only</p>
            <div className="flex items-center space-x-2 mb-4">
              <img src="https://placehold.co/80x80/000000/FFFFFF?text=QR" alt="QR Code" className="w-20 h-20 rounded-md" />
              <div className="flex flex-col space-y-2">
                <img src="https://placehold.co/100x40/000000/FFFFFF?text=Google+Play" alt="Google Play" className="rounded-md cursor-pointer" />
                <img src="https://placehold.co/100x40/000000/FFFFFF?text=App+Store" alt="App Store" className="rounded-md cursor-pointer" />
              </div>
            </div>
            <div className="flex space-x-4 text-white">
              {/* Social Media Icons */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer hover:text-gray-400 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.996c0-.904.099-1.393 1.072-1.393h3.928v-3h-4.646c-4.116 0-5.354 3.203-5.354 5.996v2.004z"></path></svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer hover:text-gray-400 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.418.724-.661 1.547-.661 2.438 0 1.613.871 3.037 2.185 3.868-.807-.024-1.566-.248-2.228-.616v.081c0 3.218 2.29 5.894 5.315 6.516-.575.157-1.189.215-1.823.085.845 2.637 3.284 4.564 6.184 4.613-2.288 1.78-5.186 2.844-8.358 2.844-.545 0-1.091-.035-1.627-.093 3.03 1.855 6.643 2.924 10.457 2.924 12.59 0 19.48-10.375 19.48-19.48 0-.297-.006-.593-.014-.888.802-.562 1.499-1.29 2.053-2.102z"></path></svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer hover:text-gray-400 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.69 1.748 4.838 4.951.058 1.27.069 1.65.069 4.849 0 3.204-.012 3.584-.07 4.85-2.753 3.252-4.353 4.69-4.951 4.838-1.27.058-1.65.069-4.849.069-3.204 0-3.584-.012-4.85-.07-3.252-.148-4.69-1.748-4.838-4.951-.058-1.27-.069-1.65-.069-4.849 0-3.204.012-3.584.07-4.85 2.753-3.252 4.353-4.69 4.951-4.838 1.27-.058 1.65-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.434.204-6.494 2.302-6.702 6.702-.058 1.28-.072 1.688-.072 4.947 0 3.259.014 3.667.072 4.947.204 4.434 2.302 6.494 6.702 6.702 1.28.058 1.688.072 4.947.072 3.259 0 3.667-.014 4.947-.072 4.434-.204 6.494-2.302 6.702-6.702.058-1.28.072-1.688.072-4.947 0-3.259-.014-3.667-.072-4.947-.204-4.434-2.302-6.494-6.702-6.702-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.462 0-6.262 2.8-6.262 6.262s2.8 6.262 6.262 6.262 6.262-2.8 6.262-6.262-2.8-6.262-6.262-6.262zm0 10.362c-2.261 0-4.1-1.839-4.1-4.1s1.839-4.1 4.1-4.1 4.1 1.839 4.1 4.1-1.839 4.1-4.1 4.1zm6.236-11.458c-.853 0-1.543.69-1.543 1.543s.69 1.543 1.543 1.543 1.543-.69 1.543-1.543-.69-1.543-1.543-1.543z"></path></svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer hover:text-gray-400 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.763s.784-1.763 1.75-1.763 1.75.79 1.75 1.763-.783 1.763-1.75 1.763zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-xs text-gray-500">&copy; Copyright Rimel 2022. All right reserved</p>
        </div>
      </div>
    </footer>  )
}

export default Footer
