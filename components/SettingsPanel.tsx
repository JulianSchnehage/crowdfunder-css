
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff, ChevronDown, ChevronRight, Thermometer, Sparkles, Plus, Minus } from 'lucide-react';
import { WidgetSettings, SettingKey, ElementStyle } from '../types';

interface SettingsPanelProps {
  settings: WidgetSettings;
  updateSetting: (key: SettingKey, updates: Partial<ElementStyle>) => void;
  reorderableIds: SettingKey[];
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, updateSetting, reorderableIds }) => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <h3 className="text-sm font-bold text-gray-700 mb-4">Widget Container</h3>
        <StyleControls 
          isContainer={true}
          style={settings.container} 
          onChange={(updates) => updateSetting('container', updates)} 
        />
      </div>

      <div className="h-px bg-gray-200 my-4" />
      
      <h3 className="text-xs font-bold text-gray-500 uppercase px-1">Elements</h3>
      
      {reorderableIds.map((id) => (
        <SortableItem 
          key={id} 
          id={id} 
          style={settings[id]} 
          updateSetting={updateSetting}
        />
      ))}

      <div className="h-px bg-gray-200 my-4" />

      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <h3 className="text-sm font-bold text-gray-700 mb-4">Progress Bar (Fill)</h3>
        <StyleControls 
          isProgressBar={true}
          style={settings.meterBar} 
          onChange={(updates) => updateSetting('meterBar', updates)} 
        />
      </div>
    </div>
  );
};

interface SortableItemProps {
  id: SettingKey;
  style: ElementStyle;
  updateSetting: (key: SettingKey, updates: Partial<ElementStyle>) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, style, updateSetting }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={itemStyle}
      className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all ${isDragging ? 'shadow-lg border-indigo-400' : ''}`}
    >
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-1">
          <button 
            {...attributes}
            {...listeners}
            className="cursor-grab text-black hover:text-indigo-600 p-1 bg-gray-300 rounded"
            title="Drag to reorder"
          >
            <GripVertical size={18} strokeWidth={2.5} />
          </button>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 hover:text-indigo-600 p-1 group"
          >
            {isExpanded ? (
              <ChevronDown size={18} strokeWidth={3} className="text-black group-hover:text-indigo-600" />
            ) : (
              <ChevronRight size={18} strokeWidth={3} className="text-black group-hover:text-indigo-600" />
            )}
            <span className="text-xs font-bold text-gray-800 truncate max-w-[100px]">{style.label}</span>
          </button>
        </div>
        
        <button 
          onClick={() => updateSetting(id, { visible: !style.visible })}
          className={`p-1.5 rounded-md transition-colors ${style.visible ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100' : 'text-gray-400 bg-gray-100 hover:text-gray-600'}`}
          title={style.visible ? "Hide Element" : "Show Element"}
        >
          {style.visible ? <Eye size={14} /> : <EyeOff size={14} />}
        </button>
      </div>
      
      {isExpanded && (
        <div className="p-4 bg-white">
          <StyleControls 
            style={style} 
            onChange={(updates) => updateSetting(id, updates)} 
          />
        </div>
      )}
    </div>
  );
};

/**
 * A specialized input component for CSS values that allows 
 * incrementing/decrementing numbers via buttons and keyboard.
 */
const NumericInput: React.FC<{
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  label?: string;
}> = ({ value, onChange, placeholder, label }) => {
  
  const parseValue = (val: string) => {
    const num = parseFloat(val);
    const unit = val.replace(/[0-9.-]/g, '');
    return { 
      num: isNaN(num) ? 0 : num, 
      unit: unit || 'px' 
    };
  };

  const updateValue = (direction: number) => {
    const { num, unit } = parseValue(value);
    const step = (unit === 'rem' || unit === 'em') ? 0.1 : 1;
    const nextNum = Math.max(0, parseFloat((num + direction * step).toFixed(2)));
    onChange(`${nextNum}${unit}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      updateValue(1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      updateValue(-1);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="block text-[10px] font-bold text-gray-500 uppercase">{label}</label>}
      <div className="flex items-center">
        <button 
          onClick={() => updateValue(-1)}
          className="p-1.5 bg-gray-100 border border-gray-300 rounded-l hover:bg-gray-200 transition-colors"
          title="Decrease"
        >
          <Minus size={12} className="text-gray-600" />
        </button>
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full text-xs border-y border-gray-300 px-2 py-1.5 focus:ring-1 focus:ring-indigo-500 outline-none text-center"
          placeholder={placeholder}
        />
        <button 
          onClick={() => updateValue(1)}
          className="p-1.5 bg-gray-100 border border-gray-300 rounded-r hover:bg-gray-200 transition-colors"
          title="Increase"
        >
          <Plus size={12} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

const StyleControls: React.FC<{
  style: ElementStyle;
  onChange: (updates: Partial<ElementStyle>) => void;
  isProgressBar?: boolean;
  isContainer?: boolean;
}> = ({ style, onChange, isProgressBar, isContainer }) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      {isProgressBar && (
        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 mb-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer size={16} className="text-orange-600" />
              <span className="text-xs font-bold text-orange-800">Temperature Theme</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={!!style.isTemperatureThemed} 
                onChange={(e) => onChange({ isTemperatureThemed: e.target.checked })} 
                className="sr-only peer" 
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
          
          {!style.isTemperatureThemed && (
            <>
              <div className="flex items-center justify-between border-t border-orange-100 pt-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-600" />
                  <span className="text-xs font-bold text-indigo-800">Use Gradient</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={!!style.useGradient} 
                    onChange={(e) => onChange({ useGradient: e.target.checked })} 
                    className="sr-only peer" 
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {style.useGradient && (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Gradient From</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={style.gradientFrom || '#ffffff'} 
                        onChange={(e) => onChange({ gradientFrom: e.target.value })}
                        className="w-8 h-8 rounded border-none cursor-pointer p-0"
                      />
                      <span className="text-[10px] font-mono text-gray-600 uppercase">{style.gradientFrom}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Gradient To</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={style.gradientTo || '#ffffff'} 
                        onChange={(e) => onChange({ gradientTo: e.target.value })}
                        className="w-8 h-8 rounded border-none cursor-pointer p-0"
                      />
                      <span className="text-[10px] font-mono text-gray-600 uppercase">{style.gradientTo}</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <div className="flex gap-2">
        {style.color !== undefined && (
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Text Color</label>
            <div className="flex items-center gap-2">
              <input 
                type="color" 
                value={style.color} 
                onChange={(e) => onChange({ color: e.target.value })}
                className="w-8 h-8 rounded border-none cursor-pointer p-0"
              />
              <span className="text-[10px] font-mono text-gray-600 uppercase">{style.color}</span>
            </div>
          </div>
        )}
        {style.backgroundColor !== undefined && !style.isTemperatureThemed && (!isProgressBar || !style.useGradient) && (
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Background Color</label>
            <div className="flex items-center gap-2">
              <input 
                type="color" 
                value={style.backgroundColor} 
                onChange={(e) => onChange({ backgroundColor: e.target.value })}
                className="w-8 h-8 rounded border-none cursor-pointer p-0"
              />
              <span className="text-[10px] font-mono text-gray-600 uppercase">{style.backgroundColor}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {style.fontSize !== undefined && (
          <div className="flex-1">
            <NumericInput 
              label="Font Size"
              value={style.fontSize}
              onChange={(v) => onChange({ fontSize: v })}
              placeholder="e.g. 1.2rem"
            />
          </div>
        )}
        {style.height !== undefined && (
          <div className="flex-1">
            <NumericInput 
              label="Height"
              value={style.height}
              onChange={(v) => onChange({ height: v })}
              placeholder="e.g. 24px"
            />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {style.borderRadius !== undefined && (
          <div className="flex-1">
            <NumericInput 
              label="Border Radius"
              value={style.borderRadius}
              onChange={(v) => onChange({ borderRadius: v })}
              placeholder="e.g. 8px"
            />
          </div>
        )}
        {style.padding !== undefined && (
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Padding</label>
            <input 
              type="text" 
              value={style.padding} 
              onChange={(e) => onChange({ padding: e.target.value })}
              className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-indigo-500 outline-none"
              placeholder="e.g. 10px 20px"
            />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {isContainer && style.margin !== undefined && (
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Container Margin</label>
            <input 
              type="text" 
              value={style.margin} 
              onChange={(e) => onChange({ margin: e.target.value })}
              className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 focus:ring-1 focus:ring-indigo-500 outline-none"
              placeholder="e.g. 0 0 10px 0"
            />
          </div>
        )}
        {!isContainer && style.marginBottom !== undefined && (
          <div className="flex-1">
            <NumericInput 
              label="Bottom Spacing"
              value={style.marginBottom}
              onChange={(v) => onChange({ marginBottom: v })}
              placeholder="e.g. 20px"
            />
          </div>
        )}
      </div>

      {style.gap !== undefined && isContainer && (
        <div className="flex-1">
          <NumericInput 
            label="Item Spacing (Gap)"
            value={style.gap}
            onChange={(v) => onChange({ gap: v })}
            placeholder="e.g. 20px"
          />
        </div>
      )}

      {style.borderColor !== undefined && (
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Border Style</label>
            <div className="flex items-center gap-2">
              <input 
                type="color" 
                value={style.borderColor} 
                onChange={(e) => onChange({ borderColor: e.target.value })}
                className="w-8 h-8 rounded border-none cursor-pointer p-0"
              />
              <NumericInput 
                value={style.borderWidth || '1px'}
                onChange={(v) => onChange({ borderWidth: v })}
                placeholder="Width"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
