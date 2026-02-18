import React from 'react';
import { WidgetSettings } from '../types';
import { BASE_CSS } from '../constants';

interface PreviewAreaProps {
  settings: WidgetSettings;
  css: string;
  goalMode: 'Currency' | 'Units sold';
}

const PreviewArea: React.FC<PreviewAreaProps> = ({ settings, css, goalMode }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden group">
      <div className="absolute top-4 left-4 flex gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
      </div>
      
      <div className="mt-6">
        <style>
          {BASE_CSS}
          {css}
        </style>
        
        <section className="crowdfunder-widget">
          <p><span className="cf-bignumber cf-backertotal">5</span> supported</p>
          
          {goalMode === 'Currency' && (
            <p><span className="cf-bignumber cf-moneytotal">$200.00</span> raised</p>
          )}

          <div className="cf-meter">
            <span className="cf-percent-bar" style={{ width: '90%' }}></span>
          </div>

          <div className="cf-meter-label"><span className="cf-percent-text">90</span>% funded</div>

          <p className="cf-info-text">
            This product doesn't have a campaign running but we noticed that you're in the Shopify
            page designer, so we're showing you this widget to help you see where it would be if this
            product did have a campaign.
          </p>

          <p>
            <span className="cf-bignumber">
              28 days
            </span>
            remaining
          </p>
        </section>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">Live Preview</span>
      </div>
    </div>
  );
};

export default PreviewArea;