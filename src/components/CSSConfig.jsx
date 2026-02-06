import React, { useState, useEffect } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful"; 

export default function CSSConfig({ elements, CSSCode, setCSSCode }) {

  const [color, setColor] = useState("#000000"); 
  const handleColor = (newColor) => {
    setColor(newColor)
    setCSSCode((prevData) => {
      return {
        ...prevData,
        color: `${newColor}`
      };
    });
  }
  
    
  const [backgroundColor, setBackgroundColor] = useState("#e7e7e7");
  const handleBackgroundColor = (newColor) => {
    setBackgroundColor(newColor);
    setCSSCode((prevData) => {
      return {
        ...prevData,
        backgroundColor: `${newColor}`
      };
    });
  }
  
  const [headingFontSize, setHeadingFontSize] = useState(24);
  const handleHeadingFontSize = (e) => {
    setHeadingFontSize(e.target.value);
    setCSSCode((prevData) => {
      return {
        ...prevData,
        headingFontSize: e.target.value
      }
    });
  }

  const [bodyFontSize, setBodyFontSize] = useState(16);
  const handleBodyFontSize = (e) => {
    setBodyFontSize(e.target.value);
    setCSSCode((prevData) => {
      return {
        ...prevData,
        bodyFontSize: e.target.value
      }
    });
  }

  // Progress bar controls
  const [progressBarHeight, setProgressBarHeight] = useState(24);
  const handleProgressBarHeight = (e) => {
    setProgressBarHeight(e.target.value);
    setCSSCode((prevData) => ({ ...prevData, progressBarHeight: e.target.value }));
  };

  const [progressBarBorderRadius, setProgressBarBorderRadius] = useState(4);
  const handleProgressBarBorderRadius = (e) => {
    setProgressBarBorderRadius(e.target.value);
    setCSSCode((prevData) => ({ ...prevData, progressBarBorderRadius: e.target.value }));
  };

  const [progressBarHideBorder, setProgressBarHideBorder] = useState(false);
  const handleProgressBarHideBorder = (e) => {
    const checked = e.target.checked;
    setProgressBarHideBorder(checked);
    setCSSCode((prevData) => ({ ...prevData, progressBarHideBorder: checked }));
  };

  const [progressBarBorderColor, setProgressBarBorderColor] = useState("#cccccc");
  const handleProgressBarBorderColor = (newColor) => {
    setProgressBarBorderColor(newColor);
    setCSSCode((prevData) => ({ ...prevData, progressBarBorderColor: newColor }));
  };

  const [progressBarBackgroundColor, setProgressBarBackgroundColor] = useState("#e7e7e7");
  const handleProgressBarBackgroundColor = (newColor) => {
    setProgressBarBackgroundColor(newColor);
    setCSSCode((prevData) => ({ ...prevData, progressBarBackgroundColor: newColor }));
  };

  const [progressBarInnerColor, setProgressBarInnerColor] = useState("#ff0000");
  const handleProgressBarInnerColor = (newColor) => {
    setProgressBarInnerColor(newColor);
    setCSSCode((prevData) => ({ ...prevData, progressBarInnerColor: newColor }));
  };

  // Hiding elements
  const [widgetElements, setWidgetElements] = useState([]);

  // The useEffect hook below grabs the number of elements from the crowdfunder widget in the event we dynamically set up the widget in future
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
  
  const handleHiddenElements = (e) => {
    
    const value = e.target.value;
    const checked = e.target.checked;
    
    setCSSCode((prevData) => {
      
      const updatedHideElements = checked 
      ? [...(prevData.hideElements || []), value]
      : (prevData.hideElements || []).filter((el) => el !== value)
      console.log(CSSCode.hideElements);
      return {
        ...prevData,
        hideElements: updatedHideElements,
      }
    });
  }

  
  return ( 
    <>
      <section className="CSSConfig">
        <h4>Adjust styles here:</h4>
        <hr />
        <form className="css-config-form">
          <fieldset className="font-color-picker">
            <label htmlFor="color">Text color</label>
            <HexColorPicker color={color} onChange={handleColor} />
            <HexColorInput color={color} onChange={handleColor} />
          </fieldset>

          <fieldset className="background-color-picker">
            <label htmlFor="background-color">Background color</label>
            <HexColorPicker color={backgroundColor} onChange={handleBackgroundColor} />
            <HexColorInput color={backgroundColor} onChange={handleBackgroundColor} />
          </fieldset>

          <fieldset className="heading-font">
            <label htmlFor="heading-font">Set large text size</label>
            <input
              onChange={handleHeadingFontSize}
              type="number"
              name="headingFont"
              placeholder="22"
              min="16"
              value={`${headingFontSize}`}
            />
          </fieldset>

          <fieldset className="body-font">
            <label htmlFor="body-font">Set small text size</label>
            <input
              onChange={handleBodyFontSize }
              type="number"
              name="bodyFont"
              placeholder="16"
              min="10"
              value={`${bodyFontSize}`}
            />
          </fieldset>

          <fieldset>
            <legend>Hide Elements:</legend>
            {widgetElements.map((el, index) => (
              <label
                key={index}
                htmlFor={`${el.tag}:nth-child(${index + 1})`}
              >
                <input
                  id={`${el.tag}:nth-child(${index + 1})`}
                  value={`.crowdfunder-widget ${el.tag}:nth-child(${index + 1})`}
                  type="checkbox"
                  name="hiddenElements"
                  onChange={handleHiddenElements}
                />
                {`Hide "${el.text}" element`}
              </label>
            ))}
          </fieldset>

          <fieldset className="progress-bar-settings">
            <legend>Progress Bar</legend>
            <label htmlFor="progress-bar-height">Height</label>
            <input
              id="progress-bar-height"
              type="number"
              min="0"
              value={progressBarHeight}
              onChange={handleProgressBarHeight}
            />

            <label htmlFor="progress-bar-radius">Border radius</label>
            <input
              id="progress-bar-radius"
              type="number"
              min="0"
              value={progressBarBorderRadius}
              onChange={handleProgressBarBorderRadius}
            />

            <label htmlFor="progress-bar-border">
              <input
                id="progress-bar-border"
                type="checkbox"
                checked={progressBarHideBorder}
                onChange={handleProgressBarHideBorder}
              />
              Hide progress bar border?
            </label>

            <label>Border color</label>
            <HexColorPicker color={progressBarBorderColor} onChange={handleProgressBarBorderColor} />
            <HexColorInput color={progressBarBorderColor} onChange={handleProgressBarBorderColor} />

            <label>Background color</label>
            <HexColorPicker color={progressBarBackgroundColor} onChange={handleProgressBarBackgroundColor} />
            <HexColorInput color={progressBarBackgroundColor} onChange={handleProgressBarBackgroundColor} />

            <label>Inner color</label>
            <HexColorPicker color={progressBarInnerColor} onChange={handleProgressBarInnerColor} />
            <HexColorInput color={progressBarInnerColor} onChange={handleProgressBarInnerColor} />
          </fieldset>
          
        </form>
      </section>
    </>
  );
}
