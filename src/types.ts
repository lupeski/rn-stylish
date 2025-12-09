export interface ThemeStyles {
	[key: string]: any;
}

export interface StaticStyles {
	[key: string]: any;
}

export interface Theme {
	themeStyles: ThemeStyles;
	staticStyles: StaticStyles;
}

export type ThemeMode = 'light' | 'dark' | 'system';
