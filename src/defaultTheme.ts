import {Theme} from './types';

const lightThemeColors = {
	background: '#FFFFFF',
	text: '#000000',
	linkText: '#0000EE',
};

const darkThemeColors = {
	background: '#1C1C1E',
	text: '#FFFFFF',
	linkText: '#ADD8E6',
};

const staticColors = {
	brand: 'dodgerblue',
	white: 'white',
	green: '#008521',
	red: '#FF3B30',
	gray: '#808080',
};

export const defaultLightTheme: Theme = {
	themeColors: lightThemeColors,
	staticColors,
};

export const defaultDarkTheme: Theme = {
	themeColors: darkThemeColors,
	staticColors,
};
