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
  const [CSSCode, setCSSCode] = useState({});


  return (
    <>
      <main className='crowdfunder-container'>
        <CSSConfig elements={widgetElements} CSSCode={CSSCode} setCSSCode={setCSSCode}/>
        <CSSOutput CSSCode={CSSCode}/>
        <Crowdfunder /> 
      </main>
    </>
  )
}

export default App
