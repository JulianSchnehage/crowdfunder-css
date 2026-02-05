export default function CSSOutput({ 
    CSSCode: {
        color,
        backgroundColor,
        headingFontSize,
        bodyFontSize,
        hideElements,
        progressBarHeight,
        progressBarBorderColor,
        progressBarBorderRadius, 
        progressBarHideBorder, 
        progressBarBackgroundColor, 
        progressBarInnerColor,
    } 
}){
    
    hideElements = hideElements.join(",\n")
    let hideElementCode = hideElements.length !== 0 
    ?`${hideElements} {
    display:none;
}`
    : "";
    let progressBarBorderBoolean = progressBarHideBorder? "0" : "inherit";
    let generatedCode = `
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
.crowdfunder-widget .cf-meter {
    height:${progressBarHeight}px;
    border-color:${progressBarBorderColor};
    border-radius:${progressBarBorderRadius}px;
    border: ${ progressBarBorderBoolean }!important;
    background-color: ${progressBarBackgroundColor};
    
}  
.crowdfunder-widget .cf-meter .cf-percent-bar {
    border-radius:${progressBarBorderRadius}px;
    /* Progress bar inner color*/
    background-color:${progressBarInnerColor} !important;
}
    
${hideElementCode}
`

    return (
        <section className="CSSOutput">
            <h4>Copy the code:</h4>
            <hr/>
            <pre>
                <code>{generatedCode}</code>
            </pre>
        </section>
    )
}