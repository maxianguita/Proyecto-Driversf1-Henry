import { Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import Detail from "./components/Detail/Detail";
import DriverCreate from "./components/FormCreate/DriverCreate";
import About from "./components/About/About";
import Escuderias from "./components/Conductores/Escuderias";
import Footer from './components/Footer/Footer';

function App() {
  return (    
    <div className="app">
      <Routes>
        
        <Route path="/" element={<Navigate to="/landingpage" />} />
        
        <Route path='/landingpage' element={<LandingPage/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path='/driver' element={<DriverCreate/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/teams' element={<Escuderias/>} />
        <Route path='/footer' element={<Footer/>} />
      </Routes>
    </div>
  )
}

export default App;
