# rn-stylish

A flexible and type-safe theming system for React Native with automatic light/dark mode support powered by Jotai.

## Features

- 🎨 **Automatic theme switching** - Light, dark, and system modes
- 💪 **Type-safe** - Full TypeScript support with autocomplete
- 🎯 **Simple API** - Easy to use hooks and utilities
- ⚡ **Performance** - Memoized styles with efficient re-renders
- 🎭 **Fully customizable** - Define your own theme structure and styles
- 🔄 **Flexible styling** - Support for colors, font sizes, padding, margins, and any style values
- 📦 **Lightweight** - Minimal dependencies (just Jotai for state)

## Installation

```bash
npm install rn-stylish
```

## Quick Start

### 1. Configure Your Themes (Required!)

rn-stylish requires you to define your own theme styles. Set them up in your app's entry point before using any themed components.

#### TypeScript Setup (Recommended - with autocomplete!)

Create a `theme.ts` file to define your themes with full type safety:

```typescript
// theme.ts

// Define your light theme styles
const lightThemeStyles = {
	background: '#FFFFFF',
	text: '#000000',
	linkText: '#007AFF',
	cardBackground: '#F8F9FA',
	border: '#DEE2E6',
	placeholder: '#6C757D',
	fontSize: 16,
	padding: 16,
};

// Define your dark theme styles
const darkThemeStyles = {
	background: '#000000',
	text: '#FFFFFF',
	linkText: '#66B2FF',
	cardBackground: '#1C1C1C',
	border: '#343A40',
	placeholder: '#ADB5BD',
	fontSize: 16,
	padding: 16,
};

// Define your static styles (same in both themes)
const staticStyles = {
	brand: '#007AFF',
	success: '#28A745',
	error: '#DC3545',
	warning: '#FFC107',
	info: '#17A2B8',
	borderRadius: 8,
	maxWidth: 1200,
};

// Export types using typeof for autocomplete
export type AppThemeStyles = typeof lightThemeStyles;
export type AppStaticStyles = typeof staticStyles;

// Export the actual theme objects
export {lightThemeStyles, darkThemeStyles, staticStyles};
```

**Important for TypeScript autocomplete:** To get autocomplete for your theme properties (like `theme.themeStyles.background`), you need to augment the module types. Create a `theme.d.ts` file:

```typescript
// theme.d.ts
import {AppThemeStyles, AppStaticStyles} from './theme';

declare module 'rn-stylish' {
	interface ThemeStyles extends AppThemeStyles {}
	interface StaticStyles extends AppStaticStyles {}
}
```

Now you'll get full autocomplete everywhere you use `theme.themeStyles.` or `theme.staticStyles.`!

Then in your App:

```typescript
// App.tsx
import {useEffect} from 'react';
import {useThemeSelect} from 'rn-stylish';
import {lightThemeStyles, darkThemeStyles, staticStyles} from './theme';

function App() {
	const {setLightThemeStyles, setDarkThemeStyles, setStaticStyles} =
		useThemeSelect();

	useEffect(() => {
		setLightThemeStyles(lightThemeStyles);
		setDarkThemeStyles(darkThemeStyles);
		setStaticStyles(staticStyles);
	}, []);

	return <YourApp />;
}
```

Now when you use themes, you'll get autocomplete for all your custom properties!

#### JavaScript Setup

If you're not using TypeScript, create a `theme.js` file:

```javascript
// theme.js

// Light theme
export const lightThemeStyles = {
	background: '#FFFFFF',
	text: '#000000',
	linkText: '#007AFF',
	cardBackground: '#F8F9FA',
	border: '#DEE2E6',
	placeholder: '#6C757D',
	fontSize: 16,
	padding: 16,
};

// Dark theme
export const darkThemeStyles = {
	background: '#000000',
	text: '#FFFFFF',
	linkText: '#66B2FF',
	cardBackground: '#1C1C1C',
	border: '#343A40',
	placeholder: '#ADB5BD',
	fontSize: 16,
	padding: 16,
};

// Static styles
export const staticStyles = {
	brand: '#007AFF',
	success: '#28A745',
	error: '#DC3545',
	warning: '#FFC107',
	info: '#17A2B8',
	borderRadius: 8,
	maxWidth: 1200,
};
```

Then in your App:

```javascript
// App.js
import {useEffect} from 'react';
import {useThemeSelect} from 'rn-stylish';
import {lightThemeStyles, darkThemeStyles, staticStyles} from './theme';

function App() {
	const {setLightThemeStyles, setDarkThemeStyles, setStaticStyles} =
		useThemeSelect();

	useEffect(() => {
		setLightThemeStyles(lightThemeStyles);
		setDarkThemeStyles(darkThemeStyles);
		setStaticStyles(staticStyles);
	}, []);

	return <YourApp />;
}
```

### 2. Create Themed Styles

```typescript
import {createThemedStyles} from 'rn-stylish';
import {View, Text} from 'react-native';

// TypeScript users get full autocomplete for theme.themeStyles and theme.staticStyles!
const useStyles = createThemedStyles((theme, props) => {
	return {
		container: {
			backgroundColor: theme.themeStyles.background,
			flex: 1,
			padding: theme.themeStyles.padding,
		},
		text: {
			color: theme.themeStyles.text,
			fontSize: theme.themeStyles.fontSize,
		},
		card: {
			backgroundColor: theme.themeStyles.cardBackground,
			borderColor: theme.themeStyles.border,
			borderWidth: 1,
			borderRadius: theme.staticStyles.borderRadius,
			padding: 16,
		},
		brandText: {
			color: theme.staticStyles.brand,
			fontWeight: 'bold',
		},
		successButton: {
			backgroundColor: theme.staticStyles.success,
			padding: 12,
			borderRadius: theme.staticStyles.borderRadius,
		},
	};
});

// Use in your component
function MyComponent() {
	const {styles} = useStyles();

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Text style={styles.text}>This text color changes with theme</Text>
				<Text style={styles.brandText}>This stays your brand color</Text>
			</View>
		</View>
	);
}
```

### 3. Theme Switching

```typescript
import {useThemeSelect} from 'rn-stylish';

function ThemeToggle() {
	const {themeMode, setThemeMode} = useThemeSelect();

	return (
		<View>
			<Button title="Light" onPress={() => setThemeMode('light')} />
			<Button title="Dark" onPress={() => setThemeMode('dark')} />
			<Button title="System" onPress={() => setThemeMode('system')} />
			<Text>Current: {themeMode}</Text>
		</View>
	);
}
```

### 4. Single Theme Mode (No Light/Dark Switching)

If your app doesn't need theme switching, you can use a single theme:

**Option 1: Set both themes to the same values**

```typescript
const myTheme = {
	background: '#FFFFFF',
	text: '#000000',
	linkText: '#007AFF',
};

function App() {
	const {setLightThemeStyles, setDarkThemeStyles, setStaticStyles} =
		useThemeSelect();

	useEffect(() => {
		// Use the same theme for both light and dark
		setLightThemeStyles(myTheme);
		setDarkThemeStyles(myTheme);
		setStaticStyles(staticStyles);
		// Theme mode will default to 'system', but it won't matter since both themes are the same
	}, []);

	return <YourApp />;
}
```

**Option 2: Lock to one mode**

```typescript
function App() {
	const {setThemeMode, setLightThemeStyles, setStaticStyles} = useThemeSelect();

	useEffect(() => {
		setLightThemeStyles(myTheme);
		setStaticStyles(staticStyles);
		setThemeMode('light'); // Always use light mode, ignore dark theme
	}, []);

	return <YourApp />;
}
```

## Advanced Usage

### Styles with Props

Pass dynamic values to your styles:

```typescript
import {useHeaderHeight} from '@react-navigation/elements';

const useStyles = createThemedStyles((theme, props) => {
	return {
		container: {
			paddingTop: props.headerHeight + 15,
			paddingHorizontal: theme.themeStyles.padding,
			gap: 15,
			backgroundColor: theme.themeStyles.background,
		},
		title: {
			color: theme.themeStyles.text,
			fontSize: theme.themeStyles.fontSize,
		},
	};
});

function EmailValidation() {
	const headerHeight = useHeaderHeight();
	const {styles} = useStyles({headerHeight});

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Enter Email</Text>
		</View>
	);
}
```

### Dynamic Styles with `getDynamicStyles`

Use `getDynamicStyles` when you need to compute styles multiple times with different values (like in lists):

```typescript
const useStyles = createThemedStyles((theme, props) => {
	return {
		container: {
			flex: 1,
			backgroundColor: theme.themeStyles.background,
			justifyContent: 'center',
			gap: 12,
		},
		item: {
			padding: 16,
			borderRadius: theme.staticStyles.borderRadius,
			backgroundColor: props.isSelected
				? theme.staticStyles.success
				: theme.themeStyles.cardBackground,
		},
		itemText: {
			color: props.isSelected ? '#FFFFFF' : theme.themeStyles.text,
		},
	};
});

function ItemList({items}) {
	const {styles, getDynamicStyles} = useStyles();
	const [selectedIndex, setSelectedIndex] = useState(0);

	return (
		<SafeAreaView style={styles.container}>
			{items.map((item, index) => {
				// Generate styles dynamically for each item
				const dynamicStyle = getDynamicStyles({
					isSelected: index === selectedIndex,
				});

				return (
					<TouchableOpacity
						key={index}
						style={dynamicStyle.item}
						onPress={() => setSelectedIndex(index)}
					>
						<Text style={dynamicStyle.itemText}>{item.name}</Text>
					</TouchableOpacity>
				);
			})}
		</SafeAreaView>
	);
}
```

### Accessing Theme Directly

Sometimes you need theme values outside of styles:

```typescript
const useStyles = createThemedStyles((theme, props) => {
	return {
		container: {
			backgroundColor: theme.themeStyles.background,
		},
	};
});

function MyComponent() {
	const {styles, theme} = useStyles();

	// Use theme values directly
	const statusBarStyle =
		theme.themeStyles.background === '#FFFFFF'
			? 'dark-content'
			: 'light-content';

	return (
		<>
			<StatusBar barStyle={statusBarStyle} />
			<View style={styles.container}>
				<Text>Content</Text>
			</View>
		</>
	);
}
```

## API Reference

### `createThemedStyles(stylesFn)`

Creates a hook that returns themed styles.

**Parameters:**

- `stylesFn: (theme: Theme, props: Props) => StyleSheet` - Function that receives theme and props, returns style object

**Returns:** A hook that accepts optional props and returns:

- `styles` - StyleSheet object with all your styles
- `getDynamicStyles(props)` - Function to generate styles with different props at runtime
- `theme` - Current active theme object

### `useThemeSelect()`

Hook for managing theme mode and custom themes.

**Returns:**

- `themeMode: 'light' | 'dark' | 'system'` - Current theme mode
- `setThemeMode(mode: ThemeMode)` - Change theme mode
- `setLightThemeStyles(styles: ThemeStyles)` - Set light theme styles
- `setDarkThemeStyles(styles: ThemeStyles)` - Set dark theme styles
- `setStaticStyles(styles: StaticStyles)` - Set static styles (brand colors, etc.)

### Types

```typescript
interface Theme {
	themeStyles: ThemeStyles; // Styles that CHANGE with light/dark mode
	staticStyles: StaticStyles; // Styles that STAY THE SAME (brand, etc.)
}

interface ThemeStyles {
	[key: string]: any; // Define your own theme-aware styles by extending this interface
}

interface StaticStyles {
	[key: string]: any; // Define your own static styles by extending this interface
}

type ThemeMode = 'light' | 'dark' | 'system';
```

**TypeScript users:** Extend `ThemeStyles` and `StaticStyles` to define your own structure and get full autocomplete (see examples above).

## Default Themes

rn-stylish does not include default themes. You must define your own theme styles when setting up your app. This gives you complete control over your app's appearance.

See the "Configure Your Themes" section above for examples.

## Best Practices

1. **Use `themeStyles` for values that should adapt** to light/dark mode (backgrounds, text colors, borders, padding/margins that change with theme)
2. **Use `staticStyles` for brand identity and constants** that should stay consistent (your logo color, success green, error red, border radius, max widths)
3. **Set custom themes at app startup** - Call `setLightThemeStyles`, `setDarkThemeStyles`, and `setStaticStyles` in your App component's useEffect
4. **Leverage TypeScript** - Extend `ThemeStyles` and `StaticStyles` interfaces for full autocomplete
5. **Think beyond colors** - Include fontSize, padding, margin, borderRadius, shadows, etc.

### Example: What goes where?

```typescript
// Theme styles - these CHANGE based on light/dark mode
lightThemeStyles: {
  background: '#FFFFFF',
  text: '#000000',
  cardBackground: '#F5F5F5',
  border: '#E0E0E0',
  padding: 16,
  fontSize: 16,
}

darkThemeStyles: {
  background: '#000000',
  text: '#FFFFFF',
  cardBackground: '#1C1C1E',
  border: '#3A3A3C',
  padding: 16,
  fontSize: 16,
}

// Static styles - these STAY THE SAME in both themes
staticStyles: {
  brand: '#FF6B6B',
  success: '#51CF66',
  error: '#FF3B30',
  warning: '#FFD93D',
  borderRadius: 8,
  maxWidth: 1200,
  headerHeight: 60,
}
```

## Example: Complete App Setup

```typescript
// App.tsx
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {useThemeSelect, createThemedStyles} from 'rn-stylish';

// Define your theme styles
const lightThemeStyles = {
	background: '#FFFFFF',
	text: '#000000',
	linkText: '#007AFF',
};

const darkThemeStyles = {
	background: '#000000',
	text: '#FFFFFF',
	linkText: '#66B2FF',
};

const staticStyles = {
	brand: '#007AFF',
	success: '#28A745',
	error: '#DC3545',
};

const useStyles = createThemedStyles((theme, props) => {
	return {
		container: {
			flex: 1,
			backgroundColor: theme.themeStyles.background,
		},
	};
});

function App() {
	const {setLightThemeStyles, setDarkThemeStyles, setStaticStyles} =
		useThemeSelect();
	const {styles} = useStyles();

	useEffect(() => {
		// Set your custom themes once at app start
		setLightThemeStyles(lightThemeStyles);
		setDarkThemeStyles(darkThemeStyles);
		setStaticStyles(staticStyles);
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			{/* Your app content */}
		</SafeAreaView>
	);
}

export default App;
```

## Contributing

Issues and pull requests are welcome! Visit our [GitHub repository](https://github.com/lupeski/rn-stylish).

## License

MIT

## Credits

Using [Jotai](https://jotai.org/) for state management.
