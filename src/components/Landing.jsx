import React, { useEffect } from 'react';

const Landing = () => {
  // Handle scroll indicator
  useEffect(() => {
    const scrollIndicator = document.querySelector('.scroll-down');
    
    if (scrollIndicator) {
      // Initially show the scroll indicator
      setTimeout(() => {
        scrollIndicator.classList.add('animate-pulse');
      }, 2000);
      
      // Hide scroll indicator when user has scrolled a bit
      const handleScroll = () => {
        if (window.scrollY > window.innerHeight * 0.3) {
          scrollIndicator.classList.add('opacity-0');
        } else {
          scrollIndicator.classList.remove('opacity-0');
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  return (
    <div id="landing" className="main relative w-full h-[210vh] sm:h-[270vh] bg-black">
      <span className="absolute scroll-down hidden sm:block z-[2] right-[7vh] top-[88vh] opacity-50 text-white text-sm font-semibold transition-opacity duration-500">
        Scroll to explore
      </span>
      
      <div className='pic w-full h-full'>
        {/* Add lazy loading and handling for image load failure */}
        <img
          className="w-full h-full lg:object-cover md:object-top lg:object-top md:object-cover object-contain"
          src="https://a.storyblok.com/f/133769/1920x2716/5c24d6b467/exo-ape-hero-1.jpg/m/1920x2716/filters:format(webp):quality(70)"
          alt="Exo Ape hero background"
          loading="eager" // Load this one eagerly as it's above the fold
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none"%3E%3Crect width="1" height="1" fill="%23242424"/%3E%3C/svg%3E';
            console.error('Error loading hero image');
          }}
        />      
      </div>
      
      <div id="work" className="absolute w-full top-0 left-0 text text-white max-w-screen-2xl mx-auto h-full px-5 sm:px-0">
        <div className='absolute w-full mt-[30vh] md:mt-[40vh] p-2 lg:mt-[55vh] sm:ml-[8vw]'>
          <div className='w-full p-5'>
            <p className='text-[1.2rem] md:text-[1rem] lg:text-[1.5rem] font-normal leading-7 md:leading-7'>
              Global digital design studio partnering with<br />
              brands and businesses that create exceptional<br />
              experiences where people live, work, and unwind.
            </p>
          </div>
          <div className='w-full mt-10'>
            <h1 className="text-6xl md:text-[40vh] lg:text-[42vh]">Digital</h1>
            <h1 className="text-6xl md:text-[40vh] lg:text-[42vh]">Design</h1>
            <h1 className="text-6xl md:text-[40vh] lg:text-[42vh]">Experience</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;