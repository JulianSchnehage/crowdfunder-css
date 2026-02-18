
import React from 'react';
import { Terminal, AlertCircle } from 'lucide-react';

interface CodeDisplayProps {
  css: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ css }) => {
  const characterCount = css.length;
  const exceedsLimit = characterCount > 500;

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-gray-300">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#252526] border-b border-[#333]">
        <Terminal size={16} className="text-indigo-400" />
        <span className="text-xs font-medium tracking-tight">Generated CSS Output</span>
        <span className="ml-auto text-xs text-gray-500">{characterCount} chars</span>
      </div>
      {exceedsLimit && (
        <div className="bg-amber-900/30 border-b border-amber-700 px-4 py-3 flex gap-3">
          <AlertCircle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-amber-200 leading-relaxed">
            <p className="font-semibold mb-1">Character Limit Warning</p>
            <p>Your CSS exceeds Shopify's custom CSS character limit (500 chars). To use this CSS:</p>
            <ul className="list-disc list-inside mt-1 space-y-0.5">
              <li>Add it to a custom Liquid element on your page</li>
              <li>Add it directly to your theme's CSS file</li>
            </ul>
          </div>
        </div>
      )}
      <div className="flex-1 overflow-auto p-4 code-font text-sm leading-relaxed">
        <pre className="whitespace-pre-wrap">
          {css.split('\n').filter(line => line.trim() !== '').map((line, i) => {
            const trimmedLine = line.trim();
            if (trimmedLine.includes('{') || trimmedLine.includes('}')) {
              return <div key={i} className="text-yellow-400">{line}</div>;
            }
            if (trimmedLine.startsWith('.') || trimmedLine.startsWith('#') || trimmedLine.startsWith('/*')) {
              const color = trimmedLine.startsWith('/*') ? 'text-gray-500' : 'text-indigo-300';
              return <div key={i} className={color}>{line}</div>;
            }
            if (trimmedLine.includes(':')) {
              const [prop, ...valParts] = line.split(':');
              const val = valParts.join(':');
              return (
                <div key={i}>
                  <span className="text-blue-300">{prop}</span>: 
                  <span className="text-green-300">{val}</span>
                </div>
              );
            }
            return <div key={i} className="text-gray-400">{line}</div>;
          })}
        </pre>
      </div>
    </div>
  );
};

export default CodeDisplay;
