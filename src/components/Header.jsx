import React from 'react'

const Header = () => {
  return (
  <header className="bg-black text-white py-2 px-4 md:px-8">
      <div className="container mx-auto flex justify-center md:justify-end items-center text-sm">
        {/* Sale announcement */}
        <p className="hidden md:block text-center flex-grow">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <a href="#" className="underline font-bold">ShopNow</a>
        </p>

        {/* Language selector */}
        <div className="relative inline-block ml-auto">
          <select className="bg-transparent border-none text-white focus:outline-none cursor-pointer pr-6">
            <option className="bg-black text-white" value="en">English</option>
            <option className="bg-black text-white" value="es">Spanish</option>
            <option className="bg-black text-white" value="fr">French</option>
          </select>
        </div>
      </div>
    </header>  )
}

export default Header


