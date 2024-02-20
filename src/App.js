import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './components/Home/Home.index';
import About from './components/About/About.index';
import { GlobalStyle } from './components/globalstyles';
import Canvas from './components/dummy';
function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path='/' element={<Canvas />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
