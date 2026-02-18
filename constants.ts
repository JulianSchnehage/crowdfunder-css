import { WidgetSettings } from './types';

export const INITIAL_SETTINGS: WidgetSettings = {
  container: {
    id: 'container',
    label: 'Main Container',
    selector: '.crowdfunder-widget',
    backgroundColor: '#f7f7f9',
    color: '#333333',
    padding: '4%',
    margin: '0 0 20px 0',
    gap: '15px',
    visible: true,
    order: 0,
  },
  backerCount: {
    id: 'backerCount',
    label: 'Backer Count Block',
    selector: '.crowdfunder-widget p:nth-child(1)',
    fontSize: '1rem',
    marginBottom: '10px',
    visible: true,
    order: 0,
  },
  moneyTotal: {
    id: 'moneyTotal',
    label: 'Money Total Block',
    selector: '.crowdfunder-widget p:nth-child(2)',
    fontSize: '1rem',
    marginBottom: '10px',
    visible: true,
    order: 1,
  },
  meter: {
    id: 'meter',
    label: 'Meter Container',
    selector: '.crowdfunder-widget .cf-meter',
    backgroundColor: '#ffffff',
    borderColor: '#e5e5e7',
    borderWidth: '1px',
    borderRadius: '4px',
    height: '24px',
    marginBottom: '10px',
    visible: true,
    order: 2,
  },
  meterBar: {
    id: 'meterBar',
    label: 'Progress Bar',
    selector: '.crowdfunder-widget .cf-percent-bar',
    backgroundColor: '#ff0000',
    useGradient: false,
    gradientFrom: '#ff0000',
    gradientTo: '#ff8b48',
    visible: true,
    order: 0,
  },
  meterLabel: {
    id: 'meterLabel',
    label: 'Meter Label',
    selector: '.crowdfunder-widget .cf-meter-label',
    color: '#333333',
    fontSize: '1rem',
    marginBottom: '30px',
    visible: true,
    order: 3,
  },
  infoText: {
    id: 'infoText',
    label: 'Information Text',
    selector: '.crowdfunder-widget .cf-info-text',
    color: '#666666',
    fontSize: '0.9rem',
    marginBottom: '15px',
    visible: true,
    order: 4,
  },
  daysRemaining: {
    id: 'daysRemaining',
    label: 'Days Remaining Block',
    selector: '.crowdfunder-widget p:last-child',
    fontSize: '1rem',
    marginBottom: '0px',
    visible: true,
    order: 5,
  },
};

export const BASE_CSS = `
.crowdfunder-widget { display: flex; flex-direction: column; gap: 15px; padding: 4%; background-color: #f7f7f9; color: #333; margin-bottom:20px; clear: both; }
.crowdfunder-widget span.cf-bignumber { font-size: 2.6rem; line-height: .9em; display: block; color: #353442; }
.crowdfunder-widget .cf-meter { height: 24px; width: 100%; position: relative; background-color: #fff; overflow: hidden; border: 1px solid #e5e5e7; border-radius: 4px; }
.crowdfunder-widget .cf-meter span { display: block; height: 100%; background-color: #ff0000; position: absolute; top: 0; left: 0; overflow: hidden; border-radius: 0 3px 3px 0; }
.crowdfunder-widget .cf-meter-label { font-weight:bold; margin-bottom:30px; }
`.trim();