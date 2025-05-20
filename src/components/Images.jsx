import gsap, { Expo, ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef, useState } from "react";

const Images = () => {
  const containerRef = useRef(null);
  const [mediaErrors, setMediaErrors] = useState({});
  
  // Define fallback images for each media item
  const generateFallback = (index, type) => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%23666'%3E${type} ${index + 1}%3C/text%3E%3C/svg%3E`;
  };
  
  const position = [
    {
      video:
        "https://a.storyblok.com/f/133769/x/9c433c7aac/home-news-diesel-be-a-follower.mp4",
      fallback: generateFallback(0, "Video"),
      right: "right-[80%]",
      top: "top-[30%]",
      height: "h-[30%]",
      width: "w-[100%]",
    },
    {
      image:
        "https://a.storyblok.com/f/133769/348x494/21becfd449/home-news-3.jpg/m/550x781/filters:format(webp):quality(70)",
      fallback: generateFallback(1, "Image"),
      right: "-right-[40%]",
      top: "top-[10%]",
      height: "h-[35%]",
      width: "w-[50%]",
    },
    {
      image:
        "https://a.storyblok.com/f/133769/758x508/8a1ff60d00/home-news-4.jpg/m/550x369/filters:format(webp):quality(70)",
      fallback: generateFallback(2, "Image"),
      right: "right-[90%]",
      top: "top-[90%]",
      height: "h-[40%]",
      width: "w-[120%]",
    },
    {
      video:
        "https://a.storyblok.com/f/133769/x/88b4bf7989/news-rino-pelle.mp4",
      fallback: generateFallback(3, "Video"),
      right: "-right-[90%]",
      top: "top-[86%]",
      height: "h-[50%]",
      width: "w-[100%]",
    },
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin if not already registered
    if (!ScrollTrigger.isRegistered) {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        scroller: "body",
        start: "top 30%",
        end: "top -200%",
        scrub: true,
      },
      defaults: {
        ease: Expo.inOut,
      },
    });

    // Add animations to timeline
    tl.to(".images:nth-child(1) video, .images:nth-child(1) img.fallback", {
      x: "-50%",
      y: "-100%"
    }, 'a')
    .to(".images:nth-child(2) img", {
      x: "90%",
      y: "-50%"
    }, 'a')
    .to(".images:nth-child(3) img", {
      x: "-50%",
      y: "-50%"
    }, 'a')
    .to(".images:nth-child(4) video, .images:nth-child(4) img.fallback", {
      x: "50%",
      y: "-50%"
    }, 'a');

    // Cleanup function
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);

  // Handle media errors
  const handleMediaError = (index) => {
    setMediaErrors(prev => ({
      ...prev,
      [index]: true
    }));
  };

  // Function to handle video elements with IntersectionObserver
  const handleVideoRef = (element, index) => {
    if (!element || mediaErrors[index]) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Play video when in viewport, pause when not
          if (entry.isIntersecting) {
            element.play().catch(err => {
              console.error("Video play error:", err);
              handleMediaError(index);
            });
          } else {
            element.pause();
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(element);
  };

  return (
    <div 
      ref={containerRef}
      className="images-section w-full h-[70vh] sm:h-[180vh] overflow-hidden flex items-center justify-center"
    >
      <div className="relative w-1/3 sm:w-1/4 h-1/2">
        {position.map((item, index) => {
          return (
            <div
              className={`images absolute ${item.height} ${item.width} ${item.top} ${item.right}`}
              id={index}
              key={index}
            >
              {item.image ? (
                <img
                  className="h-full w-full object-cover"
                  src={mediaErrors[index] ? item.fallback : item.image}
                  alt={`Gallery image ${index + 1}`}
                  loading="lazy"
                  onError={() => handleMediaError(index)}
                />
              ) : mediaErrors[index] ? (
                <img
                  className="h-full w-full object-cover fallback"
                  src={item.fallback}
                  alt={`Gallery video fallback ${index + 1}`}
                />
              ) : (
                <video
                  className="h-full w-full object-cover"
                  ref={(el) => handleVideoRef(el, index)}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={item.fallback}
                  src={item.video}
                  aria-label={`Gallery video ${index + 1}`}
                  onError={() => handleMediaError(index)}
                ></video>
              )}
            </div>
          );
        })}

        <img
          className="h-full w-full object-cover"
          src="https://a.storyblok.com/f/133769/748x1278/5784aa7150/home-news-1.jpg/m/550x940/filters:format(webp):quality(70)"
          alt="Main gallery image"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = generateFallback("Main", "Image");
          }}
        />
      </div>
    </div>
  );
};

export default Images;