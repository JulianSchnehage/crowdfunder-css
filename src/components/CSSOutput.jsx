export default function CSSOutput({ CSSCode: {color, backgroundColor, headingFontSize, bodyFontSize, hideElements} }){
    let hideElementCode = hideElements ? `${hideElements} {display:none;}`: "";
    let generatedCode = `
.crowdfunder-widget * {
    color:${color} !important;
}     
.crowdfunder-widget {
    background-color:${backgroundColor};
}
.crowdfunder-widget .cf-bignumber {
    font-size:${headingFontSize};
}
.crowdfunder-widget p {
    font-size:${bodyFontSize};    
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