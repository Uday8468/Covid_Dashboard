import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './components/Home/Home.index';
import About from './components/About/About.index';
import { GlobalStyle } from './components/globalstyles';
import Canvas from './components/dummy';
import NotFound from './components/NotFound';
function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path='/' element={<Canvas />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path="/*" element ={<NotFound />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
