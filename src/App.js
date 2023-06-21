import './App.css';
import './css/category.css';
import './css/panels.css';
import './css/product_grid.css';
import './css/saledisplay.css';
import './css/topmenu.css';

import { useState } from 'react';

import logo from './logo.png';

import TopBanner from './panels/TopBanner.js';
import LoginPanel from './panels/LoginPanel.js';
import Sales from './Sales.js';
import Footer from './panels/Footer.js';


function App() {

  const [products, setproducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [sessionLevel, setSessionLevel] = useState(0);

  switch(sessionLevel){
    default: {return( <p>Session Level mismatch Error!</p>);}
    case 0: {
      return (
        <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
          <LoginPanel sessionLevel = {setSessionLevel} categories = {setcategories} products = {setproducts}/>
          <Footer />
        </div>
      );
    }
    case 1: {
      return (
        <div className="App">
          <TopBanner />
          <Sales categories = {categories} products = {products} setProducts = {setproducts} />
          <Footer />
        </div>
      );
    }
    case 2: {
      return (
        <div className="App">
          <p> Management Page </p>
          <Footer />
        </div>
      );
    }
    case 3: {
      return (
        <div className="App">
          <p> Administration Page </p>
          <Footer />
        </div>
      );
    }
  }

}

export default App;
