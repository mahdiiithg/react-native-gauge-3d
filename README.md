# react-native-gauge-3d

[![npm version](https://img.shields.io/npm/v/react-native-gauge-3d.svg)](https://www.npmjs.com/package/react-native-gauge-3d)
[![npm downloads](https://img.shields.io/npm/dm/react-native-gauge-3d.svg)](https://www.npmjs.com/package/react-native-gauge-3d)
[![license](https://img.shields.io/npm/l/react-native-gauge-3d.svg)](https://github.com/mahdiiithg/react-native-gauge-3d/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/mahdiiithg/react-native-gauge-3d.svg)](https://github.com/mahdiiithg/react-native-gauge-3d)

A customizable, SVG-based gauge component for React Native. Features include dark mode support, alert zones, range indicators, smooth animations, and render prop extensibility. Perfect for dashboards, monitoring panels, and data visualization applications on iOS and Android.

<p align="center">
  <img src="https://raw.githubusercontent.com/mahdiiithg/react-native-gauge-3d/main/docs/assets/demo.gif" alt="react-native-gauge demo" width="400" />
</p>

## Features

- **High Performance** - SVG-based rendering for smooth, efficient visualization
- **Dark Mode** - Built-in light/dark theme switching
- **Alert Zones** - Visual high/low alert indicators with gradient zones
- **Range Indicators** - Show target ranges on the gauge
- **Smooth Animations** - Animated needle movement with configurable duration
- **Fully Customizable** - Colors, ticks, labels, and more
- **Render Props** - Extensible via render props for controller, editor, and alarm icons
- **Cross-Platform** - Works on iOS and Android (Expo compatible)
- **Unit Conversion** - Optional value conversion function support

## Installation

```bash
# npm
npm install react-native-gauge-3d react-native-svg

# yarn
yarn add react-native-gauge-3d react-native-svg

# pnpm
pnpm add react-native-gauge-3d react-native-svg
```

### iOS Setup

For bare React Native projects, install iOS dependencies:

```bash
cd ios && pod install
```

### Peer Dependencies

- `react` >= 16.8.0
- `react-native` >= 0.60.0
- `react-native-svg` >= 12.0.0

## Quick Start

```jsx
import React from 'react';
import { View } from 'react-native';
import { Gauge } from 'react-native-gauge-3d';

function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Gauge
        value={75}
        minValue={0}
        maxValue={100}
        label="Speed"
        unit="km/h"
      />
    </View>
  );
}
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current value displayed on the gauge |
| `minValue` | `number` | `0` | Minimum scale value |
| `maxValue` | `number` | `100` | Maximum scale value |
| `label` | `string` | `''` | Label text displayed on the gauge |
| `unit` | `string` | `''` | Unit symbol displayed next to value |

### Appearance Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `200` | Base size of the gauge in pixels |
| `isDarkMode` | `boolean` | `false` | Enable dark mode styling |
| `majorTicksCount` | `number` | `6` | Number of major tick marks |
| `minorTicksCount` | `number` | `4` | Number of minor ticks between major ticks |

### Alert Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `alertEnabled` | `boolean` | `false` | Enable alert zone visualization |
| `alertHigh` | `number` | - | High alert threshold value |
| `alertLow` | `number` | - | Low alert threshold value |
| `alertSnoozed` | `boolean` | `false` | Whether alert is currently snoozed |

### Range Indicator Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showRange` | `boolean` | `false` | Show range indicator arc |
| `rangeMin` | `number` | - | Range indicator minimum value |
| `rangeMax` | `number` | - | Range indicator maximum value |

### Animation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animated` | `boolean` | `true` | Enable smooth value animation |
| `animationDuration` | `number` | `300` | Animation duration in milliseconds |

### Arc Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showArc` | `boolean` | `false` | Show colored arc around gauge edge |

### Value Conversion Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `convertValue` | `function` | - | Function to convert display value `(value) => convertedValue` |
| `decimalPlaces` | `number` | `2` | Decimal places for displayed value |

### Edit Mode Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `canEdit` | `boolean` | `false` | Allow tap-to-edit value |
| `disableEditButton` | `boolean` | `false` | Hide the edit button while keeping editor support |
| `onEditClick` | `function` | - | Callback when value is edited |

### Built-in Settings Panel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `settingsConfig` | `object` | - | Configuration for editable fields (see below) |
| `onSettingsChange` | `function` | - | Callback when settings are saved `(settings) => void` |

#### settingsConfig Format

```javascript
{
  fieldName: {
    type: 'number' | 'text' | 'toggle' | 'select',
    label: 'Display Label',
    min: 0,           // for number type
    max: 100,         // for number type
    step: 1,          // for number type
    options: [        // for select type
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' }
    ]
  }
}
```

### Render Props (Extensibility)

| Prop | Type | Description |
|------|------|-------------|
| `renderController` | `function` | Render custom controller at bottom of gauge |
| `renderEditor` | `function` | Render custom editor overlay `({ onClose, size }) => ReactNode` |
| `renderAlarmIcon` | `function` | Render custom alarm icon `({ isOn, isSnoozed, size }) => ReactNode` |

### Secondary Display Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `digitalValue` | `number \| string` | - | Secondary digital value to display |
| `digitalUnit` | `string` | - | Unit for digital value |
| `secondaryLabel` | `string` | - | Secondary label (e.g., pump size) |

### Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `style` | `object` | `{}` | Additional inline styles for container |

## Examples

### Basic Gauge

```jsx
import { Gauge } from 'react-native-gauge-3d';

<Gauge
  value={50}
  minValue={0}
  maxValue={100}
  label="Temperature"
  unit="°C"
/>
```

### Dark Mode with Alerts

```jsx
<Gauge
  value={85}
  minValue={0}
  maxValue={100}
  label="CPU Usage"
  unit="%"
  isDarkMode={true}
  alertEnabled={true}
  alertHigh={80}
  alertLow={20}
/>
```

### With Range Indicator

```jsx
<Gauge
  value={65}
  minValue={0}
  maxValue={100}
  label="Target Zone"
  showRange={true}
  rangeMin={40}
  rangeMax={70}
/>
```

### With Custom Controller

```jsx
<Gauge
  value={42}
  minValue={0}
  maxValue={100}
  label="Speed"
  renderController={() => (
    <TouchableOpacity onPress={() => console.log('Reset clicked')}>
      <Text>Reset</Text>
    </TouchableOpacity>
  )}
/>
```

### With Custom Editor

```jsx
<Gauge
  value={50}
  canEdit={true}
  renderEditor={({ onClose, size }) => (
    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 8 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Edit Gauge Settings</Text>
      <TouchableOpacity onPress={onClose}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  )}
/>
```

### With Built-in Settings Panel

Tap on the center circle and press the settings icon to open the panel:

```jsx
import { useState } from 'react';
import { Gauge } from 'react-native-gauge-3d';

const [settings, setSettings] = useState({
  minValue: 0,
  maxValue: 100,
  alertHigh: 80,
  alertLow: 20,
  rangeMin: 40,
  rangeMax: 70,
  unit: '°C',
  alertEnabled: true,
  showRange: true,
});

<Gauge
  value={75}
  {...settings}
  label="Temperature"
  
  // Configure which fields are editable
  settingsConfig={{
    minValue: { type: 'number', label: 'Min Value', min: 0, max: 1000 },
    maxValue: { type: 'number', label: 'Max Value', min: 0, max: 1000 },
    alertHigh: { type: 'number', label: 'High Alert', min: 0, max: 1000 },
    alertLow: { type: 'number', label: 'Low Alert', min: 0, max: 1000 },
    rangeMin: { type: 'number', label: 'Range Min', min: 0, max: 1000 },
    rangeMax: { type: 'number', label: 'Range Max', min: 0, max: 1000 },
    unit: { type: 'text', label: 'Unit' },
    alertEnabled: { type: 'toggle', label: 'Enable Alerts' },
    showRange: { type: 'toggle', label: 'Show Range' },
  }}
  
  // Callback when user saves settings
  onSettingsChange={(newSettings) => {
    console.log('New settings:', newSettings);
    setSettings(newSettings);
    // Update your state or call API
    // updateGaugeSettings(gaugeId, newSettings);
  }}
/>
```

### Unit Conversion

```jsx
// Convert Celsius to Fahrenheit
<Gauge
  value={25}
  minValue={0}
  maxValue={100}
  label="Temperature"
  unit="°F"
  convertValue={(celsius) => (celsius * 9/5) + 32}
/>
```

### Animated Value Updates

```jsx
import { useState, useEffect } from 'react';

const [rpm, setRpm] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setRpm(prev => (prev + 100) % 8000);
  }, 100);
  return () => clearInterval(interval);
}, []);

<Gauge
  value={rpm}
  minValue={0}
  maxValue={8000}
  label="Engine"
  unit="RPM"
  animated={true}
  animationDuration={50}
  isDarkMode={true}
/>
```

## Exported Utilities

The package also exports some utilities you can use:

```jsx
import { 
  Gauge,
  useElementSize,  // Hook for measuring element dimensions
  getSpeedColor,   // Utility to get color based on value position
  SettingsIcon,    // Settings gear SVG icon
  AlarmOnIcon,     // Alarm on SVG icon
  AlarmOffIcon,    // Alarm off SVG icon
} from 'react-native-gauge-3d';

// useElementSize example
const Component = () => {
  const { onLayout, elementSize } = useElementSize();
  console.log(elementSize.width, elementSize.height);
  
  return <View onLayout={onLayout}>...</View>;
};

// getSpeedColor example
const color = getSpeedColor(75, 0, 100); // Returns color based on position
```

## Platform Support

- ✅ iOS (11.0+)
- ✅ Android (API 21+)
- ✅ Expo (SDK 40+)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[MIT](LICENSE) © [Mahdi Tahavorgar](https://github.com/mahdiiithg)

## Links

- [GitHub Repository](https://github.com/mahdiiithg/react-native-gauge-3d)
- [npm Package](https://www.npmjs.com/package/react-native-gauge-3d)
- [Issue Tracker](https://github.com/mahdiiithg/react-native-gauge-3d/issues)
- [Changelog](CHANGELOG.md)

## Author

**Mahdi Tahavorgar**

- GitHub: [@mahdiiithg](https://github.com/mahdiiithg)
- LinkedIn: [Mahdi Tahavorgar](https://www.linkedin.com/in/mahdi-thg/)

---

If you find this package useful, please consider giving it a ⭐ on [GitHub](https://github.com/mahdiiithg/react-native-gauge-3d)!
