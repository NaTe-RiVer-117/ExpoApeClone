import gsap, { Power4 } from "gsap/all";

// Convert to a regular utility function without hooks
const Overflow = (elements, delay = 0) => {
  // Create the animation without using hooks
  if (typeof document !== 'undefined' && document.querySelector(elements)) {
    const animation = gsap.fromTo(
      elements, 
      {
        transformOrigin: "left",
        y: "100%",
        rotate: 30
      }, 
      {
        y: 0,
        rotate: 0,
        duration: 2,
        delay: delay,
        ease: Power4.easeOut,
        stagger: 0.1
      }
    );
    
    return animation; // Return the animation for potential cleanup
  }
  return null;
};

export default Overflow;