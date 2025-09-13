import React from 'react';
import myPic from '../images/purulia.jpeg';
import { Link, useLocation } from 'react-router-dom';
import myCv from "../components/utils/Biswarup_Ghosh_CV.pdf";
import { Typewriter } from 'react-simple-typewriter';

const Home = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [location.pathname]);

  return (
    <section className="bg-gray-900 text-white body-font min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 py-12 md:py-20 gap-10 md:gap-16">
        
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 space-y-6 animate-fadeIn">
          <h1 className="title-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-blue-500">I</span>’m <br />
            <span className="text-blue-500">B</span>iswarup <span className="text-blue-500">G</span>hosh
          </h1>

          <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl leading-relaxed">
            A passionate and aspiring{" "}
            <span className="text-blue-400 font-semibold">
              <Typewriter
                words={['Fullstack Dev', 'Programmer', 'Tech Enthusiast', 'Freelancer']}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={60}
                deleteSpeed={30}
                delaySpeed={2000}
              />
            </span>
             <br />
            Completed my{" "}
            <span className="text-blue-400 font-semibold">B.Tech in Computer Science & Engineering </span>  
            I have cultivated a strong foundation in{" "}
            <span className="text-blue-400 font-semibold">Programming</span> and{" "}
            <span className="text-blue-400 font-semibold">Web Development</span>, eager to apply my skills in real-world projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="px-8 py-3 rounded-lg text-lg font-medium text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 shadow-md transition transform hover:scale-105"
            >
              Hire Me
            </Link>
            <a href={myCv} download="Biswarup_Ghosh_CV.pdf">
              <button className="px-8 py-3 rounded-lg text-lg font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white shadow-md transition transform hover:scale-105">
                Download CV
              </button>
            </a>
          </div>
        </div>

        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src={myPic}
            alt="Biswarup Ghosh"
            className="rounded-2xl shadow-2xl w-64 sm:w-72 md:w-80 lg:w-[22rem] object-cover transform hover:scale-105 transition duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
