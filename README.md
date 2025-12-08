````markdown
# rn-stylish

A flexible theming system for React Native with light/dark mode support using Jotai.

## Installation

```bash
npm install rn-stylish
```
````

## Basic Usage

```typescript
import { createThemedStyles, useThemeSelect } from 'rn-stylish';

// Create themed styles
const useStyles = createThemedStyles((theme) => ({
  container: {
    backgroundColor: theme.themeColors.background,
    flex: 1,
  },
  text: {
    color: theme.themeColors.text,
  },
}));

// Use in component
function MyComponent() {
  const { styles, theme } = useStyles();
  const { theme: themeMode, setTheme } = useThemeSelect();

  return (

      Hello World

  );
}
```

## Custom Themes

```typescript
import {useSetAtom} from 'jotai';
import {lightThemeAtom, darkThemeAtom, Theme} from 'rn-stylish';

// Define your custom theme
const myLightTheme: Theme = {
	themeColors: {
		background: '#F5F5F5',
		text: '#333333',
		linkText: '#007AFF',
	},
	staticColors: {
		brand: '#FF6B6B',
		white: '#FFFFFF',
	},
};

// Set it in your app
function App() {
	const setLightTheme = useSetAtom(lightThemeAtom);
	const setDarkTheme = useSetAtom(darkThemeAtom);

	useEffect(() => {
		setLightTheme(myLightTheme);
		setDarkTheme(myDarkTheme);
	}, []);

	return;
}
```

## License

MIT

```

```
