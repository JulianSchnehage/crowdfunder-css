import React, { useState } from "react";

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
    
    const [copied, setCopied] = useState(false);

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

    const copyToClipboard = async () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(generatedCode);
            } else {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = generatedCode;
                textarea.setAttribute('readonly', '');
                textarea.style.position = 'absolute';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    }

    return (
        <section className="CSSOutput">
            <div className="css-output-header">
                <h4>Copy the code:</h4>
                <button
                    className="copy-button"
                    onClick={copyToClipboard}
                    aria-label="Copy CSS to clipboard"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <hr/>
            <pre>
                <code>{generatedCode}</code>
            </pre>
        </section>
    )
}