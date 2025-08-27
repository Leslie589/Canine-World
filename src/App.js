import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import SingleDog from './pages/SingleDog';
import About from './pages/About';
import BreedExplorer from './pages/BreedExplorer';
import LostDogs from './pages/LostDogs';
import Adoption from './pages/Adoption';



function App() {
  return (
   
   
      <BrowserRouter>
      <Routes>

  <Route path="/" element={<Home/>}></Route>
  <Route path="/breed" element={<BreedExplorer/>}></Route>
  <Route path="/:name" element={<SingleDog/>}></Route>
  <Route path="/about" element={<About/>}></Route>
  <Route path="/lost-dogs" element={<LostDogs/>}></Route>
  <Route path="/adoption" element={<Adoption/>}></Route>
      </Routes>

</BrowserRouter>
    
    
  );
}

export default App;
