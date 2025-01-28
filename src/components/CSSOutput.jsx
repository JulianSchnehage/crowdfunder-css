export default function CSSOutput({ CSSCode: {color, backgroundColor, headingFontSize, bodyFontSize, hideElements} }){
    console.log("hideElements in css",hideElements)
    hideElements = hideElements.join(",\n")
    let hideElementCode = hideElements.length !== 0 
    ?`${hideElements} {
    display:none;
}`
    : "";
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