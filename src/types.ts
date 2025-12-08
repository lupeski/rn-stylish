export interface ThemeColors {
	background: string;
	text: string;
	linkText: string;
	[key: string]: string;
}

export interface StaticColors {
	[key: string]: string;
}

export interface Theme {
	themeColors: ThemeColors;
	staticColors: StaticColors;
}

export type ThemeMode = 'light' | 'dark' | 'system';
