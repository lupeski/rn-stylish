export type ThemeStyles = Record<string, any>;
export type StaticStyles = Record<string, any>;

export interface Theme<
	TThemeStyles extends ThemeStyles = ThemeStyles,
	TStaticStyles extends StaticStyles = StaticStyles
> {
	themeStyles: TThemeStyles;
	staticStyles: TStaticStyles;
}

export type ThemeMode = 'light' | 'dark' | 'system';
