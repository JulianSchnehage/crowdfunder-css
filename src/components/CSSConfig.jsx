import React from 'react';


export default function CSSConfig({elements ,CSSCode, setCSSCode}){
    const setColor = function(){

    }
    const setBgColor = function(){

    }
    const setBodyFontSize = function(){

    }
    const setHeadingFontSize = function(){

    }
    const hideElements = function(){

    }


    return (
        <>
        <section className="CSSConfig">
            <h4>Adjust styles here:</h4>
            <hr/>
            <form >
                <label htmlFor="color"> Set Text Color</label>
                <input type="text" name="color" placeholder="#0f0f0f"/>

                <label htmlFor="background-color"> Set Background Color</label>
                <input type="text" name="bacgkround-color" placeholder="#0f0f0f"/>
                
                <label htmlFor="heading-font"> Set Heading Font Size</label>
                <input type="number" name="heading-font" placeholder="22" min="16"/>

                <label htmlFor="body-font"> Set Body Font Size </label>
                <input type="number" name="body-font" placeholder="16" min="10"/>

                <fieldset>
                    {elements.map((el,index) => (
                        
                        <label 
                        key={index} 
                        htmlFor={`${el.tag}:nth-child(${index + 1})`}> 
                        <input 
                            type="checkbox" 
                            name={`${el.tag}:nth-child(${index + 1})`} />
                            {`Hide "${el.text}" element`}
                            
                        </label>        
                    ))}
                </fieldset>
                </form>
            </section>
        </>
    )
}