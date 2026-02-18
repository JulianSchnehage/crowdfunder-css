
import React from 'react';
import { Terminal } from 'lucide-react';

interface CodeDisplayProps {
  css: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ css }) => {
  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-gray-300">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#252526] border-b border-[#333]">
        <Terminal size={16} className="text-indigo-400" />
        <span className="text-xs font-medium tracking-tight">Generated CSS Output</span>
      </div>
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
