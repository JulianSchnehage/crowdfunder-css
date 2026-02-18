import React, { useState, useMemo } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Copy, Check, Palette, Layout, ExternalLink } from 'lucide-react';
import { WidgetSettings, ElementStyle, SettingKey } from './types';
import { INITIAL_SETTINGS } from './constants';
import SettingsPanel from './components/SettingsPanel';
import PreviewArea from './components/PreviewArea';
import CodeDisplay from './components/CodeDisplay';

const App: React.FC = () => {
  const [settings, setSettings] = useState<WidgetSettings>(INITIAL_SETTINGS);
  const [goalMode, setGoalMode] = useState<'Currency' | 'Units sold'>('Currency');
  const [copied, setCopied] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const elementIds = useMemo(() => {
    return (Object.keys(settings) as SettingKey[])
      .filter(k => k !== 'container' && k !== 'meterBar')
      .filter(k => goalMode === 'Currency' || k !== 'moneyTotal')
      .sort((a, b) => settings[a].order - settings[b].order);
  }, [settings, goalMode]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log('Drag ended:', { active: active.id, over: over?.id });
    if (over && active.id !== over.id) {
      const oldIndex = elementIds.indexOf(active.id as SettingKey);
      const newIndex = elementIds.indexOf(over.id as SettingKey);
      const newOrderIds = arrayMove(elementIds, oldIndex, newIndex);
      console.log('Moving from', oldIndex, 'to', newIndex, 'newOrder:', newOrderIds);
      const updatedSettings = { ...settings };
      newOrderIds.forEach((id, index) => { 
        updatedSettings[id as SettingKey] = { ...updatedSettings[id as SettingKey], order: index };
      });
      console.log('Updated settings:', updatedSettings);
      setSettings(updatedSettings);
    }
  };

  const updateSetting = (key: SettingKey, updates: Partial<ElementStyle>) => {
    setSettings(prev => ({ ...prev, [key]: { ...prev[key], ...updates } }));
  };

  const generatedCSS = useMemo(() => {
    const checkChange = (k: SettingKey) => {
      const s = settings[k], i = INITIAL_SETTINGS[k];
      return s.visible !== i.visible || s.color !== i.color || s.backgroundColor !== i.backgroundColor || 
             s.fontSize !== i.fontSize || s.height !== i.height || s.borderRadius !== i.borderRadius || 
             s.padding !== i.padding || s.margin !== i.margin || s.marginBottom !== i.marginBottom || s.gap !== i.gap || 
             s.order !== i.order || s.useGradient !== i.useGradient || s.isTemperatureThemed !== i.isTemperatureThemed ||
             s.borderColor !== i.borderColor || s.borderWidth !== i.borderWidth ||
             s.gradientFrom !== i.gradientFrom || s.gradientTo !== i.gradientTo;
    };
    
    const hasAnyChange = (Object.keys(settings) as SettingKey[]).some(checkChange);
    console.log('hasAnyChange:', hasAnyChange);
    if (!hasAnyChange) {
      console.log('No changes detected, returning empty CSS');
      return "";
    }

    let css = "";
    const shortHex = (h: string) => h && h.length === 7 && h[1] === h[2] && h[3] === h[4] && h[5] === h[6] ? `#${h[1]}${h[3]}${h[5]}` : h;
    const imp = " !important";

    // Detect if the order of ANY child has changed from its initial state
    const anyOrderChanged = (Object.keys(settings) as SettingKey[])
      .filter(k => k !== 'container' && k !== 'meterBar')
      .some(k => settings[k].order !== INITIAL_SETTINGS[k].order);
    console.log('anyOrderChanged:', anyOrderChanged);

    (Object.entries(settings) as [SettingKey, ElementStyle][]).forEach(([key, style]) => {
      const initial = INITIAL_SETTINGS[key];
      if (goalMode === 'Units sold' && key === 'moneyTotal') return;
      
      const rules: string[] = [];
      const changed = (prop: keyof ElementStyle) => style[prop] !== initial[prop];

      if (key === 'container') {
        // ALWAYS output flex properties if any change exists to support reordering & gap
        rules.push('display:flex', 'flex-direction:column', `gap:${style.gap}`);
        if (changed('padding')) rules.push(`padding:${style.padding}`);
        if (changed('backgroundColor')) rules.push(`background-color:${shortHex(style.backgroundColor!)}`);
        if (changed('margin')) rules.push(`margin:${style.margin}`);
        if (changed('visible') && !style.visible) rules.push('display:none');
        
        if (changed('color')) {
          css += `.crowdfunder-widget,.crowdfunder-widget p,.crowdfunder-widget span{color:${shortHex(style.color!)}${imp}}\n`;
        }
      } else {
        if (changed('visible')) rules.push(style.visible ? 'display:block' : 'display:none');
        
        if (style.visible) {
          if (changed('color')) rules.push(`color:${shortHex(style.color!)}${imp}`);
          if (changed('fontSize')) rules.push(`font-size:${style.fontSize}`);
          if (changed('height')) rules.push(`height:${style.height}`);
          if (changed('borderRadius')) rules.push(`border-radius:${style.borderRadius}`);
          if (changed('padding')) rules.push(`padding:${style.padding}`);
          if (changed('marginBottom')) rules.push(`margin-bottom:${style.marginBottom}`);
          if (changed('backgroundColor') && key !== 'meterBar') rules.push(`background-color:${shortHex(style.backgroundColor!)}`);
          if (changed('borderColor') || changed('borderWidth')) rules.push(`border:${style.borderWidth || '1px'} solid ${shortHex(style.borderColor || '#ccc')}`);
          
          // Reordering logic: if any reordering has happened, apply order to all visible flex items
          if (key !== 'meterBar' && anyOrderChanged) {
            rules.push(`order:${style.order}`);
          }

          if (key === 'meterBar') {
            if (style.isTemperatureThemed) {
              rules.push(`position:static${imp}`, `background:transparent${imp}`, `-webkit-mask:linear-gradient(#fff 0 0)`, `mask:linear-gradient(#fff 0 0)`);
            } else {
              const gChg = changed('useGradient') || changed('gradientFrom') || changed('gradientTo');
              if (style.useGradient) rules.push(`background:linear-gradient(to right,${shortHex(style.gradientFrom!)},${shortHex(style.gradientTo!)})${imp}`);
              else if (changed('backgroundColor') || gChg) rules.push(`background-color:${shortHex(style.backgroundColor!)}${imp}`);
            }
          }
        }
      }

      if (rules.length > 0) {
        css += `${style.selector}{${rules.join(';')}}\n`;
      }
      
      if (key === 'meterBar' && style.visible && style.isTemperatureThemed) {
        css += `${style.selector}::before{content:"";position:absolute;inset:0;background-image:linear-gradient(to right,#f9485a,#ff8b48,#fbd906,#65cd41) !important;z-index:-1}\n`;
      }
    });

    return css.trim();
  }, [settings, goalMode]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-600 rounded-lg"><Palette className="text-white w-5 h-5" /></div>
          <h1 className="text-xl font-bold text-gray-900">Stylist AI</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <a 
            href="https://help.shopify.com/en/manual/online-store/themes/customizing-themes/edit-code/add-css#custom-css" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1.5"
          >
            How do I add this to my theme?
            <ExternalLink size={14} />
          </a>
          <button 
            onClick={copyToClipboard} 
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm font-semibold"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            <span>{copied ? 'Copied!' : 'Copy CSS'}</span>
          </button>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-[calc(100vh-73px)]">
        {/* Settings Column */}
        <div className="lg:col-span-3 border-r bg-white overflow-y-auto custom-scrollbar">
          <div className="p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
              <Layout size={16} /> Configuration
            </h2>
            <div className="space-y-8">
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                <label className="block text-[10px] font-bold text-indigo-400 mb-2 uppercase tracking-wider">Goal Mode</label>
                <select 
                  value={goalMode} 
                  onChange={(e) => setGoalMode(e.target.value as any)} 
                  className="w-full bg-white border border-indigo-200 rounded-lg p-2 text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                >
                  <option value="Currency">Currency</option>
                  <option value="Units sold">Units sold</option>
                </select>
              </div>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={elementIds} strategy={verticalListSortingStrategy}>
                  <SettingsPanel settings={settings} updateSetting={updateSetting} reorderableIds={elementIds} />
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </div>

        {/* Code Output Column */}
        <div className="lg:col-span-4 border-r bg-gray-50 overflow-y-auto custom-scrollbar">
          <CodeDisplay css={generatedCSS} />
        </div>

        {/* Preview Column (Sticky wrapper) */}
        <div className="lg:col-span-5 bg-slate-100 overflow-y-auto custom-scrollbar relative">
          <div className="sticky top-0 p-8 flex justify-center w-full min-h-full">
            <div className="w-full max-w-md h-fit">
              <PreviewArea settings={settings} css={generatedCSS} goalMode={goalMode} />
            </div>
          </div>
        </div>
      </main>
      <style>{`.custom-scrollbar::-webkit-scrollbar{width:6px}.custom-scrollbar::-webkit-scrollbar-track{background:#f1f1f1}.custom-scrollbar::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}.custom-scrollbar::-webkit-scrollbar-thumb:hover{background:#94a3b8}`}</style>
    </div>
  );
};

export default App;