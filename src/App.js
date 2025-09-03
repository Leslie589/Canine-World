import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SingleDog from './pages/SingleDog';
import About from './pages/About';
import BreedExplorer from './pages/BreedExplorer';
import LostDogs from './pages/LostDogs';
import Adoption from './pages/Adoption';
import ScrollToTopButton from "../src/components/ScrollToTopButton";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './styles.css'; 
import ScrollTotop from './components/ScrollTotop';

function App() {
  return (
    <> 
    <Navbar/>
    <ScrollTotop/>
     <ScrollToTopButton />
     
    <Routes>
         
      <Route path="/" element={<Home />} />
      <Route path="/breed" element={<BreedExplorer />} />
      <Route path="/:name" element={<SingleDog />} />
      <Route path="/about" element={<About />} />
      <Route path="/lost-dogs" element={<LostDogs />} />
      <Route path="/adoption" element={<Adoption />} />
   
    </Routes>
   <Footer/>
     </>
  );
}

export default App;
