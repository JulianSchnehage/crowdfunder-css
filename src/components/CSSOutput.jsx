let generatedCode = `.crowdfunder-container {
    display:flex;
    justify-content: space-between
}

.CSSConfig {
    border:1px solid #e7e7e7;
    max-width: 300px;
}

.CSSOutput {
    border:1px solid #e7e7e7;
}
`

export default function CSSOutput(){
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