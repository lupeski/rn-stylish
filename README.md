# rn-stylish

A flexible and type-safe theming system for React Native with automatic light/dark mode support powered by Jotai.

## Features

- 🎨 **Automatic theme switching** - Light, dark, and system modes
- 💪 **Type-safe** - Full TypeScript support with autocomplete
- 🎯 **Simple API** - Easy to use hooks and utilities
- ⚡ **Performance** - Memoized styles with efficient re-renders
- 🎭 **Customizable** - Override default themes with your own colors
- 🎨 **Theme & Static Colors** - Colors that change with theme + colors that stay consistent
- 📦 **Lightweight** - Minimal dependencies (just Jotai for state)

## Installation

```bash
npm install rn-stylish
```

## Quick Start

### 1. Configure Your Themes (Required!)

rn-stylish requires you to define your own theme styles. Set them up in your app's entry point before using any themed components:

```typescript
// App.tsx or index.js
import {useThemeSelect} from 'rn-stylish';
import {useEffect} from 'react';

// Define your light theme styles
const lightThemeStyles = {
	background: '#FFFFFF',
	text: '#000000',
	linkText: '#007AFF',
	cardBackground: '#F8F9FA',
	border: '#DEE2E6',
	placeholder: '#6C757D',
};

// Define your dark theme styles
const darkThemeStyles = {
	background: '#000000',
	text: '#FFFFFF',
	linkText: '#66B2FF',
	cardBackground: '#1C1C1C',
	border: '#343A40',
	placeholder: '#ADB5BD',
};

// Define your static styles (same in both themes)
const staticStyles = {
	brand: '#007AFF',
	success: '#28A745',
	error: '#DC3545',
	warning: '#FFC107',
	info: '#17A2B8',
};

function App() {
	const {setLightThemeStyles, setDarkThemeStyles, setStaticStyles} =
		useThemeSelect();

	useEffect(() => {
		// REQUIRED: Set your theme styles at app startup
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

// Create themed styles
const useStyles = createThemedStyles(theme => ({
	container: {
		backgroundColor: theme.themeColors.background,
		flex: 1,
		padding: 20,
	},
	text: {
		color: theme.themeColors.text,
		fontSize: 16,
	},
	brandText: {
		color: theme.staticColors.brand,
		fontWeight: 'bold',
	},
	successButton: {
		backgroundColor: theme.staticColors.success,
		padding: 12,
		borderRadius: 8,
	},
}));

// Use in your component
function MyComponent() {
	const {styles} = useStyles();

	return (
		<View style={styles.container}>
			<Text style={styles.text}>This text color changes with theme</Text>
			<Text style={styles.brandText}>This stays your brand color</Text>
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

## Advanced Usage

### Custom Themes

Define your own color schemes. Remember:

- **`themeColors`** - Change when switching between light/dark mode
- **`staticColors`** - Stay the same regardless of theme mode (brand colors, success/error states, etc.)

```typescript
import {useThemeSelect, Theme} from 'rn-stylish';
import {useEffect} from 'react';

// Define theme-aware colors separately
const lightThemeColors = {
	background: '#F5F5F5', // Light background
	text: '#333333', // Dark text for light mode
	linkText: '#007AFF',
	primary: '#FF6B6B',
	secondary: '#4ECDC4',
};

const darkThemeColors = {
	background: '#1A1A1A', // Dark background
	text: '#FFFFFF', // Light text for dark mode
	linkText: '#66B2FF',
	primary: '#FF8787',
	secondary: '#63E6E1',
};

// Define static colors once - shared by both themes
const staticColors = {
	brand: '#FF6B6B', // Your brand color - same in both themes
	white: '#FFFFFF',
	black: '#000000',
	success: '#51CF66', // Success green - same in both themes
	error: '#FF6B6B', // Error red - same in both themes
	warning: '#FFD93D',
};

// Compose the theme objects
const myLightTheme: Theme = {
	themeColors: lightThemeColors,
	staticColors,
};

const myDarkTheme: Theme = {
	themeColors: darkThemeColors,
	staticColors, // Same static colors
};

function App() {
	const {setLightTheme, setDarkTheme} = useThemeSelect();

	useEffect(() => {
		setLightTheme(myLightTheme);
		setDarkTheme(myDarkTheme);
	}, []);

	return <YourApp />;
}
```

### Styles with Props

Pass dynamic values to your styles:

```typescript
import {useHeaderHeight} from '@react-navigation/elements';

const useStyles = createThemedStyles((theme, props) => ({
	container: {
		paddingTop: props.headerHeight + 15,
		paddingHorizontal: 40,
		gap: 15,
		backgroundColor: theme.themeColors.background,
	},
	title: {
		color: theme.themeColors.text,
		fontSize: 24,
	},
}));

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
const useStyles = createThemedStyles((theme, props) => ({
	container: {
		flex: 1,
		backgroundColor: theme.themeColors.background,
		justifyContent: 'center',
		gap: 12,
	},
	item: {
		padding: 16,
		borderRadius: 8,
		backgroundColor: props.isSelected
			? theme.staticColors.green
			: theme.staticColors.gray,
	},
	itemText: {
		color: props.isSelected ? theme.staticColors.white : theme.themeColors.text,
	},
}));

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
const useStyles = createThemedStyles(theme => ({
	container: {
		backgroundColor: theme.themeColors.background,
	},
}));

function MyComponent() {
	const {styles, theme} = useStyles();

	// Use theme values directly
	const statusBarStyle =
		theme.themeColors.background === '#FFFFFF'
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
- `setLightThemeStyles(styles: ThemeColors)` - Set light theme styles
- `setDarkThemeStyles(styles: ThemeColors)` - Set dark theme styles
- `setStaticStyles(styles: StaticColors)` - Set static styles (brand colors, etc.)

### Types

```typescript
interface Theme {
	themeColors: ThemeColors; // Colors that CHANGE with light/dark mode
	staticColors: StaticColors; // Colors that STAY THE SAME (brand, etc.)
}

interface ThemeColors {
	background: string; // Changes: light bg in light mode, dark bg in dark mode
	text: string; // Changes: dark text in light mode, light text in dark mode
	linkText: string;
	[key: string]: string; // Add your own theme-aware colors
}

interface StaticColors {
	[key: string]: string; // Brand colors, success/error colors - consistent across themes
}

type ThemeMode = 'light' | 'dark' | 'system';
```

## Default Themes

rn-stylish does not include default themes. You must define your own theme styles when setting up your app. This gives you complete control over your app's appearance.

See the "Configure Your Themes" section above for examples.

## Best Practices

1. **Use `themeColors` for UI styles that should adapt** to light/dark mode (backgrounds, text, borders)
2. **Use `staticColors` for brand identity and semantic styles** that should stay consistent (your logo color, success green, error red, warning yellow)
3. **Set custom themes at app startup** - Call `setLightThemeStyles`, `setDarkThemeStyles`, and `setStaticStyles` in your App component's useEffect
4. **Leverage TypeScript** - the package is fully typed for great autocomplete
5. **Think beyond colors** - Theme and static styles can include any style values (fontSize, spacing, borderRadius, etc.)

### Example: What goes where?

```typescript
// Theme styles - these CHANGE based on light/dark mode
lightThemeStyles: {
  background: '#FFFFFF',
  text: '#000000',
  cardBackground: '#F5F5F5',
  border: '#E0E0E0',
  fontSize: 16,  // Can be more than just colors!
}

darkThemeStyles: {
  background: '#000000',
  text: '#FFFFFF',
  cardBackground: '#1C1C1E',
  border: '#3A3A3C',
  fontSize: 16,
}

// Static styles - these STAY THE SAME in both themes
staticStyles: {
  brand: '#FF6B6B',      // Your brand color
  success: '#51CF66',    // Success state - always green
  error: '#FF3B30',      // Error state - always red
  warning: '#FFD93D',    // Warning state - always yellow
  white: '#FFFFFF',
  black: '#000000',
  borderRadius: 8,       // Can be more than just colors!
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

const useStyles = createThemedStyles(theme => ({
	container: {
		flex: 1,
		backgroundColor: theme.themeColors.background,
	},
}));

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
