# react-native-gauge-3d

A customizable 3D-style gauge component for React Native applications using SVG rendering.

## Installation

```bash
npm install react-native-gauge-3d react-native-svg
# or
yarn add react-native-gauge-3d react-native-svg
```

### iOS Setup

For iOS, run:
```bash
cd ios && pod install
```

## Usage

```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Gauge } from 'react-native-gauge-3d';

const App = () => {
  return (
    <View style={styles.container}>
      <Gauge
        speed={65}
        minSpeed={0}
        maxSpeed={100}
        unit="km/h"
        size="large"
        showAlarm
        showSettings
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `speed` | number | `0` | Current value to display on the gauge |
| `minSpeed` | number | `0` | Minimum value on the scale |
| `maxSpeed` | number | `100` | Maximum value on the scale |
| `unit` | string | `''` | Unit label displayed below the value |
| `size` | string | `'medium'` | Size preset: `'small'`, `'medium'`, or `'large'` |
| `showAlarm` | boolean | `false` | Show alarm icon |
| `showSettings` | boolean | `false` | Show settings icon |
| `alarmOn` | boolean | `false` | Alarm state (on/off) |
| `onAlarmPress` | function | - | Callback when alarm icon is pressed |
| `onSettingsPress` | function | - | Callback when settings icon is pressed |
| `backgroundColor` | string | `'#1C1C1C'` | Background color of the gauge |
| `needleColor` | string | `'#FF6B6B'` | Color of the needle |
| `textColor` | string | `'#FFFFFF'` | Color of text elements |
| `scaleColor` | string | `'#FFFFFF'` | Color of scale markings |

## Exports

```jsx
import { Gauge, useElementSize, getSpeedColor, SettingsIcon, AlarmOnIcon, AlarmOffIcon } from 'react-native-gauge-3d';
```

## Peer Dependencies

- `react-native` >= 0.60
- `react-native-svg` >= 12.0

## License

MIT
