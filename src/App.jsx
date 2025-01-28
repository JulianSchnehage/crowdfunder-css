import React, {useEffect,useState} from 'react';
import './App.css';
import './crowdfunder.css';
import CSSConfig from "./components/CSSConfig.jsx";
import CSSOutput from "./components/CSSOutput.jsx";
import Crowdfunder from "./components/Crowdfunder.jsx";


function App() {
  // The useEffect hook below grabs the number of elements from the crowdfunder widget in the event we dynamically set up the widget in future
  const [widgetElements, setWidgetElements] = useState([]);
  
  useEffect(()=> {
    const widgetContainer = document.querySelector('.crowdfunder-widget');
    if (widgetContainer) {
      const children = Array.from(widgetContainer.children).map((child) => {
        return {
          tag: child.tagName.toLowerCase(),
          text: child.textContent.trim()
        }
      })
      setWidgetElements(children);
    } 
  }, []);


  // Store shared data in the parent component to be changed in CSSConfig and displayed to the user for copying in the CSSOutput component
  const [CSSCode, setCSSCode] = useState({
    color: "rgba(0,0,255,1)", 
    backgroundColor:"rgba(0,247,249,1)",
    bodyFontSize:"1rem",
    headingFontSize:"1.4rem",
    hideElements:""
  });


  return (
    <>
      <main className='crowdfunder-container'>
        <CSSConfig CSSCode={CSSCode} setCSSCode={setCSSCode} elements={widgetElements} />
        <CSSOutput CSSCode={CSSCode}/>
        <Crowdfunder CSSCode={CSSCode} /> 
      </main>
    </>
  )
}

export default App
