import React, {useEffect,useState} from 'react';
import './App.css';
import './crowdfunder.css';
import CSSConfig from "./components/CSSConfig.jsx";
import CSSOutput from "./components/CSSOutput.jsx";
import Crowdfunder from "./components/Crowdfunder.jsx";


function App() {

  // Store shared data in the parent component to be changed in CSSConfig and displayed to the user for copying in the CSSOutput component
  const [CSSCode, setCSSCode] = useState({
    color: "rgba(0,0,0,1)", 
    backgroundColor:"rgba(255,255,255,1)",
    bodyFontSize: "16px" ,
    headingFontSize:"24px",
    hideElements:[]
  });


  return (
    <>
      <main className='crowdfunder-container'>
        <CSSConfig CSSCode={CSSCode} setCSSCode={setCSSCode}  />
        <CSSOutput CSSCode={CSSCode}/>
        <Crowdfunder CSSCode={CSSCode} /> 
      </main>
    </>
  )
}

export default App
