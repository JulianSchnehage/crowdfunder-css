export interface ElementStyle {
  id: string;
  label: string;
  selector: string;
  color?: string;
  backgroundColor?: string;
  useGradient?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  isTemperatureThemed?: boolean;
  fontSize?: string;
  height?: string;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  padding?: string;
  margin?: string;
  marginBottom?: string;
  gap?: string;
  visible: boolean;
  order: number;
}

export interface WidgetSettings {
  container: ElementStyle;
  backerCount: ElementStyle;
  moneyTotal: ElementStyle;
  meter: ElementStyle;
  meterBar: ElementStyle;
  meterLabel: ElementStyle;
  infoText: ElementStyle;
  daysRemaining: ElementStyle;
}

export type SettingKey = keyof WidgetSettings;