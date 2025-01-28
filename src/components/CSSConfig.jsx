import React, { useState } from "react";
import { RgbaColorPicker } from "react-colorful"; 

export default function CSSConfig({ elements, CSSCode, setCSSCode }) {
  // const [values, setValues] = useState({
  //   color: "", 
  //   backgroundColor:"",
  //   bodyFontSize:"",
  //   headingFontSize:"",
  //   hideElements:""
  // })
    


  const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 1 }); 
  const handleColor = (newColor) => {
    setColor(newColor)
    setCSSCode((prevData) => {
      return {
        ...prevData,
        color: `rgba(${newColor.r},${newColor.g},${newColor.b},${newColor.a})`
      };
    });
  }

  
    
  const [backgroundColor, setBackgroundColor] = useState({ r: 233, g: 233, b: 233, a: 1 });
  const handleBackgroundColor = (newColor) => {
    setColor(newColor);
    setCSSCode((prevData) => {
      return {
        ...prevData,
        backgroundColor: `rgba(${newColor.r},${newColor.g},${newColor.b},${newColor.a})`
      };
    });
  }

  const [bodyFontSize, setBodyFontSize] = useState(16);
  const handleBodyFontSize = (newSize) => {
    setBodyFontSize(newSize);
    setCSSCode((prevData) => {
      return {
        ...prevData,
        bodyFontSize: newSize
      }
    });
  }

  const [headingFontSize, setHeadingFontSize] = useState(22);
  const [hideElements, setHideElements] = useState("");

  
  return ( 
    <>
      <section className="CSSConfig">
        <h4>Adjust styles here:</h4>
        <hr />
        <form>
          <label htmlFor="color">Set Text Color</label>
          <RgbaColorPicker color={color} onChange={handleColor} />

          <label htmlFor="background-color">Set Background Color</label>
          <RgbaColorPicker color={backgroundColor} onChange={handleBackgroundColor} />
    
          <label htmlFor="heading-font">Set Heading Font Size</label>
          <input
            onChange={handleBodyFontSize}
            type="number"
            name="headingFont"
            placeholder="22"
            min="16"
            value={CSSCode.headingFont}
          />

          <label htmlFor="body-font">Set Body Font Size</label>
          <input
            //onChange={handleChange}
            type="number"
            name="bodyFont"
            placeholder="16"
            min="10"
            value={CSSCode.bodyFont}
          />

          <fieldset>
            <legend>Hide Elements:</legend>
            {elements.map((el, index) => (
              <label
                key={index}
                htmlFor={`${el.tag}:nth-child(${index + 1})`}
              >
                <input
                  value={`${el.tag}:nth-child(${index + 1})`}
                  type="checkbox"
                  name="hiddenElements"
                  //onChange={handleChange}
                />
                {`Hide "${el.text}" element`}
              </label>
            ))}
          </fieldset>
        </form>
      </section>
    </>
  );
}
