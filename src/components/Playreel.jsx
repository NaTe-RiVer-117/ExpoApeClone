import gsap, { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef, useState } from "react";

const Playreel = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  useEffect(() => {

    if (!ScrollTrigger.isRegistered) {
      gsap.registerPlugin(ScrollTrigger);
    }
    
 
    if (!containerRef.current) return;
    
    // Create the scroll animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        scroller: "body",
        pin: true, 
        pinSpacing: true,
        start: "top top", 
        end: "+=200%", 
        scrub: 1,
        onEnter: () => console.log("Animation started"),
        onLeave: () => console.log("Animation completed"),
        markers: false // Set to true for debugging
      }
    });
    
    // Build the animation sequence
    tl.to(".text-play, .text-reel", {
      x: (i) => i === 0 ? "10%" : "-10%", 
      ease: "power1.inOut",
      duration: 0.5
    })
    .to(".video-div", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      ease: "power2.inOut",
      duration: 1
    }, "<+=0.2")
    .to(".play-icon, .star-icon", {
      opacity: 0,
      duration: 0.3
    }, "<")
    .to(".text-container", {
      y: "-30%",
      opacity: 0,
      duration: 0.5
    }, "<+=0.3")
    .to(".footer-text", {
      opacity: 0,
      duration: 0.3
    }, "<");
    
    // Clean up the animation when component unmounts
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [videoLoaded]);
  
  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };
  
  const handleVideoError = () => {
    setVideoError(true);
    console.error("Failed to load video");
  };

  // Fallback image in case video fails to load
  const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='64' fill='%23ddd'%3EExo Ape Showreel%3C/text%3E%3C/svg%3E";

  return (
    <div 
      ref={containerRef}
      className="play-reel relative w-full h-screen overflow-hidden bg-black"
      id="playreel"
    >
      {/* Video Container - Initially small, will scale up */}
      <div className="video-div w-48 sm:w-80 sm:h-44 h-28 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md z-10">
        {/* Loading indicator */}
        {!videoLoaded && !videoError && (
          <div className="absolute inset-0 bg-black/90 z-20 flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full h-8 w-8 bg-zinc-700 mb-2"></div>
              <div className="text-xs text-zinc-500">Loading...</div>
            </div>
          </div>
        )}
        
        {/* Video overlay with play icon */}
        <div className="absolute h-full w-full bg-black/50 scale-[1.01] z-10">
          <svg
            className="play-icon text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 opacity-75"
            viewBox="0 0 86 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="43" cy="43" r="41" stroke="currentColor" strokeWidth="2"></circle>
            <path d="M32 28L60 43L32 58V28Z" fill="currentColor"></path>
          </svg>
        </div>
        
        {/* Video Element */}
        {!videoError ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
            autoPlay
            loop
            playsInline
            poster={fallbackImage}
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            onCanPlay={handleVideoLoad}
            style={{ display: videoLoaded ? "block" : "none" }}
          >
            <source 
              src="https://player.vimeo.com/progressive_redirect/playback/914803778/rendition/1080p/file.mp4?loc=external&log_user=0&signature=5344c0e4fea63ca54bb433621ca0be7b9470b475583fa68b26de2b6e380a390a" 
              type="video/mp4" 
            />
          </video>
        ) : (
          // Fallback when video fails to load
          <img 
            src={fallbackImage} 
            alt="Video placeholder" 
            className="h-full w-full object-cover" 
            onLoad={() => setVideoLoaded(true)}
          />
        )}
      </div>

      {/* Text Overlay */}
      <div className="overlay absolute flex flex-col justify-between w-full h-full text-white py-20 z-20">
        {/* Top section with star icon */}
        <div className="flex items-center justify-center gap-2">
          <svg
            className="star-icon size-3"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.41908 4.56679L6.13722 0L4.85418 4.92566L0 6L4.85418 7.25435L6.13722 12L7.3276 7.25435L12 6L7.41908 4.56679Z"
              fill="currentColor"
            ></path>
          </svg>
          <h2 className="text-sm">Work in motion</h2>
        </div>

        {/* Center text container with Play/Reel text */}
        <div className="text-container w-full flex items-center justify-center">
          <h2 className="w-full flex items-center justify-center gap-32 sm:gap-[42%]">
            <div className="text-play text-6xl sm:text-9xl">Play</div>
            <div className="text-reel text-6xl sm:text-9xl">Reel</div>
          </h2>
        </div>

        {/* Bottom section with instruction text */}
        <p className="footer-text text-center text-sm">
          Our work is best experienced in motion. Don't <br /> forget to put on your
          headphones.
        </p>
      </div>
    </div>
  );
};

export default Playreel;