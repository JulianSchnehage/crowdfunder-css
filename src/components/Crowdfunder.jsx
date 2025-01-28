import React from 'react';


//export default function Crowdfunder({ color, backgroundColor, bodyFontSize, headingFontSize, hideElements }){
export default function Crowdfunder({ CSSCode: {color, backgroundColor, headingFontSize, bodyFontSize, hideElements} }){
    
    let hideElementCode = hideElements ? `${hideElements} {display:none;}`: "";
    let generatedCodePreview = `
.crowdfunder-widget {
    background-color:${backgroundColor};
}
.crowdfunder-widget * {
    color:${color} !important;
}     
.crowdfunder-widget .cf-bignumber {
    font-size:${headingFontSize}px !important;
}
.crowdfunder-widget p, 
.crowdfunder-widget .cf-meter-label {
    font-size:${bodyFontSize}px !important;    
}
${hideElementCode}
`
    return (
        <>
        <style>
            {generatedCodePreview}
        </style>
        <section className="crowdfunder">
        <h4>Preview:</h4>
        <hr/>
        <section className="crowdfunder-widget">
            <p>
            <span className="cf-bignumber cf-backertotal">7</span> sold of 20
            </p>

            <div className="cf-meter">
            <span
                className="cf-percent-bar"
                style={{ width: '35%', background: '#ff0000' }}
            ></span>
            </div>

            <div className="cf-meter-label">
            <span className="cf-percent-text">35</span>% funded
            </div>

            <p className="cf-info-text">
            This product will only be produced if at least 20 units are supported by
            August 31, 2024 09:33
            </p>

            <p>
            <span
                className="cf-bignumber cf-time-left"
                data-end-time="1725114834"
                data-expired-text="No more time"
                data-singular-year-text="year"
                data-plural-year-text="years"
                data-singular-month-text="month"
                data-plural-month-text="months"
                data-singular-day-text="day"
                data-plural-day-text="days"
                data-hour-abbreviation-text="h"
                data-minute-abbreviation-text="m"
                data-second-abbreviation-text="s"
                data-add-to-cart-button-selector="form[action^='/cart/add']"
                data-hide-atc-button-at-end="yes"
                data-hide-atc-button-when-funded="yes"
                data-replace-add-to-cart-text="no"
                data-add-to-cart-text-selector=""
                data-add-to-cart-replacement-text=""
                data-product-id="8572886286589"
                data-percent-pre-sold="35"
            >
                No more time
            </span>
            remaining
            </p>
        </section>
        </section>
        </>        
    )
}