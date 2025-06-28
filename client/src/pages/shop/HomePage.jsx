import React from 'react';
import { Link } from 'react-router-dom';
import image from "../../assets/image.png";
import image1 from "../../assets/banner-1.webp";




function HomePage() {
  return (
    <div className="w-full px-4 py-4">
      {/* Banner Section */}
      <img className="h-[50vh] w-full bg-blue-300 flex items-center justify-center text-3xl font-bold rounded-xl"
         src={image} alt="hi" />
      

      {/* Offers Section */}
      <div className="flex flex-col md:flex-row justify-between mt-6 gap-4">
        <Link
          to="/men">
         <img className="flex-1  bg-purple-200 h-40 flex items-center justify-center rounded-xl text-lg font-semibold hover:bg-purple-300 transition"
        src={image}/>
        </Link>

        <Link
          to="/women">
         <img className="flex-1 bg-purple-200 h-40 flex items-center justify-center rounded-xl text-lg font-semibold hover:bg-purple-300 transition"
        src={image1}
        />
          Women
        </Link>

        <Link
          to="/accessories">
         <img className="flex-1 bg-purple-200 h-40 flex items-center justify-center rounded-xl text-lg font-semibold hover:bg-purple-300 transition"
        src={image1}/>
          Accessories
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
