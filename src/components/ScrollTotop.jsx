
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Assuming you are using react-router-dom

function ScrollTotop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  
  }, [pathname]); // Re-run effect when pathname changes

  return null; // This component doesn't render anything visually
}

export default ScrollTotop