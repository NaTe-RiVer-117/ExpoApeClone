import React from "react";

const Story = () => {
  const contactInfo = [
    "Willem II Singel 8",
    "6041 HS, Roermond",
    "The Netherlands",
    "contact@exoape.com" 
  ];

  const menuItems = ["Work", "Studio", "News", "Contact"];
  const socialLinks = ["Behance", "Dribbble", "Twitter", "Instagram"]; 

  return (
    <div id="story" className="overflow-hidden h-[85vh] sm:h-screen">
      <div 
        data-scroll 
        data-scroll-speed="-0.5" 
        className="relative w-full flex items-center overflow-hidden h-[85vh] sm:h-screen bg-[#070707] text-[#e0ccbb]"
      >
        <div className="video-container absolute top-0 right-0 h-1/2 w-2/3 sm:w-3/5 flex items-center">
          <video
            className="w-full scale-125"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            src="https://www.exoape.com/video/video-6.mp4"
            aria-label="Studio background video"
          ></video>
        </div>
        <div id="contact" className="absolute w-full max-w-screen-2xl mx-auto px-7 sm:px-28">
          <div className="space-y-7 sm:space-y-10">
            <div>
              <h1 className="text-6xl sm:text-[9rem] sm:tracking-tighter">Our</h1>
              <h1 className="text-6xl sm:text-[9rem] sm:tracking-tighter">Story</h1>
            </div>
            <p className="text-lg sm:opacity-90 sm:text-2xl sm:w-1/2 leading-[1.5rem]">
              The story behind Exo Ape is one of exploration, creativity and
              curiosity.
            </p>
            <a 
              className="border-b-2 inline-block sm:hidden border-[#e0ccbb]" 
              href="#news"
              aria-label="Read our story"
            >
              Our Story
            </a>
            <span className="inline-block w-full h-[1px] opacity-50 bg-[#e0ccbb]"></span>
            <div className="flex justify-between items-end">
              <div className="flex gap-28 sm:gap-32">
                <ul className="space-y-2 max-sm:hidden">
                  {contactInfo.map(item => (
                    <a
                      key={item}
                      className="block text-sm opacity-85 hover:opacity-100 transition-opacity"
                      href={item.includes('@') ? `mailto:${item}` : '#contact'}
                      aria-label={item.includes('@') ? `Email us at ${item}` : item}
                    >
                      {item}
                    </a>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <a
                      key={item}
                      className="block text-sm opacity-85 capitalize hover:opacity-100 transition-opacity"
                      href={`#${item.toLowerCase()}`}
                      aria-label={`Go to ${item}`}
                    >
                      {item}
                    </a>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {socialLinks.map((item) => (
                    <a
                      key={item}
                      className="block text-sm opacity-85 capitalize hover:opacity-100 transition-opacity"
                      href={`https://${item.toLowerCase()}.com/exoape`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${item} profile`}
                    >
                      {item}
                    </a>
                  ))}
                </ul>
              </div>

              <a 
                className="border-b inline-block max-sm:hidden border-[#e0ccbb] hover:opacity-80 transition-opacity" 
                href="#news"
                aria-label="Read our story"
              >
                Our Story
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;