import logo from './logo.svg';
import './App.css';
import MyButton from './components/button';
import AuthScreen from './components/Authscreen'
import React, { useState,useEffect,setError } from 'react';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [productList, setproductList] = useState([]);
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  

  const setproduct = async (prodcuts)=>
    {
      setproductList(prodcuts)
    }

  const handleAuthenticate = () => {
    setIsAuthenticated(true);
    console.log(productList)
  };
  return (
    <div className="App">
        {isAuthenticated ? (
                  <div>
                      <h1>Welcome to the Main Content</h1>
                      {productList}
                      <MyButton message="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"></MyButton>
                      {/* Render other components or content here */}
                  </div>
              ) : (
                  <AuthScreen onAuthenticate ={handleAuthenticate} setproductList={setproduct} />
        )} 

       
      
    </div>
  );
}

export default App;
