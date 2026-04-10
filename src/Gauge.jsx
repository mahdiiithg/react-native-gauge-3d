import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Switch,
  Animated,
} from 'react-native';
import Svg, { Circle, Path, G, Text as SvgText, Defs, RadialGradient, Stop } from 'react-native-svg';
import { useElementSize } from './hooks/useElementSize';
import { getSpeedColor } from './utils/getSpeedColor';
import { SettingsIcon, AlarmOnIcon, AlarmOffIcon } from './icons';

const AnimatedG = Animated.createAnimatedComponent(G);

/**
 * Settings Panel Component - Built-in settings editor for React Native
 */
const SettingsPanel = ({
  settings,
  settingsConfig,
  onSave,
  onCancel,
  isDarkMode,
  size,
}) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (key, value) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(localSettings);
  };

  const panelWidth = Math.max(280, size * 1.4);
  const fontSize = Math.max(12, size * 0.05);
  const inputHeight = Math.max(28, size * 0.1);

  const styles = StyleSheet.create({
    panel: {
      backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
      borderRadius: 12,
      padding: size * 0.08,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 10,
      width: panelWidth,
      maxHeight: size * 1.6,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: size * 0.04,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#444' : '#ddd',
      paddingBottom: size * 0.03,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: fontSize * 1.1,
      color: isDarkMode ? '#fff' : '#333',
    },
    closeButton: {
      padding: 4,
    },
    closeButtonText: {
      fontSize: fontSize * 1.2,
      color: isDarkMode ? '#aaa' : '#666',
    },
    fieldContainer: {
      marginBottom: size * 0.045,
    },
    fieldLabel: {
      fontSize: fontSize * 0.95,
      color: isDarkMode ? '#ccc' : '#555',
      fontWeight: '500',
      marginBottom: 4,
    },
    input: {
      height: inputHeight,
      paddingHorizontal: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: isDarkMode ? '#555' : '#ccc',
      backgroundColor: isDarkMode ? '#3a3a3a' : '#fff',
      color: isDarkMode ? '#fff' : '#333',
      fontSize: fontSize,
    },
    toggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 12,
      marginTop: size * 0.06,
      paddingTop: size * 0.04,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#444' : '#ddd',
    },
    cancelButton: {
      flex: 1,
      padding: size * 0.04,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: isDarkMode ? '#555' : '#ccc',
      backgroundColor: isDarkMode ? '#3a3a3a' : '#f5f5f5',
      alignItems: 'center',
    },
    saveButton: {
      flex: 1,
      padding: size * 0.04,
      borderRadius: 8,
      backgroundColor: '#1890ff',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: fontSize,
      fontWeight: '500',
    },
  });

  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {Object.entries(settingsConfig).map(([key, config]) => (
          <View key={key} style={styles.fieldContainer}>
            {config.type === 'toggle' ? (
              <View style={styles.toggleRow}>
                <Text style={styles.fieldLabel}>{config.label || key}</Text>
                <Switch
                  value={localSettings[key] ?? false}
                  onValueChange={(value) => handleChange(key, value)}
                  trackColor={{ false: isDarkMode ? '#555' : '#ccc', true: '#1890ff' }}
                  thumbColor="#fff"
                />
              </View>
            ) : (
              <>
                <Text style={styles.fieldLabel}>{config.label || key}</Text>
                <TextInput
                  style={styles.input}
                  value={String(localSettings[key] ?? '')}
                  onChangeText={(text) =>
                    handleChange(key, config.type === 'number' ? Number(text) : text)
                  }
                  keyboardType={config.type === 'number' ? 'numeric' : 'default'}
                  placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
                />
              </>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={[styles.buttonText, { color: isDarkMode ? '#fff' : '#333' }]}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={[styles.buttonText, { color: '#fff' }]}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/**
 * A customizable SVG-based gauge component for React Native
 * 
 * @param {Object} props
 * @param {number} props.value - Current value to display on the gauge
 * @param {number} [props.minValue=0] - Minimum scale value
 * @param {number} [props.maxValue=100] - Maximum scale value
 * @param {string} [props.label=''] - Label text displayed on the gauge
 * @param {string} [props.unit=''] - Unit symbol displayed next to value
 * @param {number} [props.size=200] - Base size of the gauge in pixels
 * @param {boolean} [props.isDarkMode=false] - Enable dark mode styling
 * @param {number} [props.majorTicksCount=6] - Number of major ticks
 * @param {number} [props.minorTicksCount=4] - Number of minor ticks between major ticks
 * @param {boolean} [props.alertEnabled=false] - Enable alert zones
 * @param {number} [props.alertHigh] - High alert threshold
 * @param {number} [props.alertLow] - Low alert threshold  
 * @param {boolean} [props.alertSnoozed=false] - Whether alert is snoozed
 * @param {boolean} [props.showRange=false] - Show range indicator
 * @param {number} [props.rangeMin] - Range indicator minimum value
 * @param {number} [props.rangeMax] - Range indicator maximum value
 * @param {boolean} [props.showArc=false] - Show colored arc around gauge
 * @param {boolean} [props.animated=true] - Enable value animation
 * @param {number} [props.animationDuration=300] - Animation duration in ms
 * @param {Function} [props.convertValue] - Optional function to convert display value
 * @param {number} [props.decimalPlaces=2] - Decimal places for displayed value
 * @param {boolean} [props.canEdit=false] - Show edit button
 * @param {Function} [props.onEditClick] - Callback when edit button is clicked
 * @param {Function} [props.renderController] - Render prop for custom controller at bottom
 * @param {Function} [props.renderEditor] - Render prop for custom editor overlay
 * @param {Function} [props.renderAlarmIcon] - Render prop for custom alarm icon
 * @param {Object} [props.style] - Additional inline styles for container
 * @param {string} [props.digitalValue] - Secondary digital value to display
 * @param {string} [props.digitalUnit] - Unit for digital value
 * @param {string} [props.secondaryLabel] - Secondary label text
 * @param {Object} [props.settingsConfig] - Configuration for built-in settings panel fields
 * @param {Function} [props.onSettingsChange] - Callback when settings are saved (settings) => void
 */
const Gauge = ({
  // Core data
  value = 0,
  minValue = 0,
  maxValue = 100,
  label = '',
  unit = '',

  // Appearance
  size = 200,
  isDarkMode = false,
  majorTicksCount = 6,
  minorTicksCount = 4,

  // Alert configuration
  alertEnabled = false,
  alertHigh,
  alertLow,
  alertSnoozed = false,

  // Range indicator
  showRange = false,
  rangeMin,
  rangeMax,

  // Arc
  showArc = false,

  // Animation
  animated = true,
  animationDuration = 300,

  // Value conversion
  convertValue,
  decimalPlaces = 2,

  // Edit mode
  canEdit = false,
  onEditClick,

  // Render props for extensibility
  renderController,
  renderEditor,
  renderAlarmIcon,

  // Styling
  style = {},

  // Secondary display
  digitalValue,
  digitalUnit,
  secondaryLabel,

  // Settings panel
  settingsConfig,
  onSettingsChange,
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const animatedValue = React.useRef(new Animated.Value(value)).current;

  // Measure container size
  const { onLayout, elementSize } = useElementSize();
  const desiredSize = size || 200;
  const availableWidth = elementSize?.width || desiredSize;
  const availableHeight = elementSize?.height || desiredSize;
  const effectiveSize = Math.max(0, Math.min(desiredSize, availableWidth, availableHeight));

  const alarmIconSize = Math.max(14, Math.min(48, Math.round(effectiveSize * 0.06)));

  // Helper to convert values
  const convert = useCallback(
    (val) => {
      if (typeof convertValue === 'function') {
        return convertValue(val);
      }
      return val;
    },
    [convertValue]
  );

  // Format value for display
  const formatValue = useCallback(
    (val) => {
      if (typeof val !== 'number' || isNaN(val)) return '0';
      return val.toFixed(decimalPlaces);
    },
    [decimalPlaces]
  );

  // Animation effect
  useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: value,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
    } else {
      animatedValue.setValue(value);
    }
    setCurrentValue(value);
  }, [value, animated, animationDuration, animatedValue]);

  // Gauge geometry calculations
  const gaugeConfig = useMemo(() => {
    const centerX = effectiveSize / 2;
    const centerY = effectiveSize / 2;
    const radius = effectiveSize / 2 - 15;
    const startAngle = (Math.PI * 3) / 4; // 135 degrees
    const endAngle = (Math.PI * 9) / 4; // 405 degrees (same as 45 degrees + full rotation)
    const angleRange = endAngle - startAngle;

    return { centerX, centerY, radius, startAngle, endAngle, angleRange };
  }, [effectiveSize]);

  // Generate tick marks
  const ticks = useMemo(() => {
    const { centerX, centerY, radius, startAngle, angleRange } = gaugeConfig;
    const majorTicks = [];
    const minorTicks = [];
    const labels = [];
    const scaleFactor = effectiveSize / 300;

    for (let i = 0; i < majorTicksCount; i++) {
      const angle = startAngle + (i / (majorTicksCount - 1)) * angleRange;
      const tickValue = minValue + (i / (majorTicksCount - 1)) * (maxValue - minValue);

      // Major tick
      const outerX = centerX + radius * Math.cos(angle);
      const outerY = centerY + radius * Math.sin(angle);
      const innerX = centerX + (radius - 15 * scaleFactor) * Math.cos(angle);
      const innerY = centerY + (radius - 15 * scaleFactor) * Math.sin(angle);

      majorTicks.push({ x1: innerX, y1: innerY, x2: outerX, y2: outerY });

      // Label
      const labelX = centerX + (radius - 30 * scaleFactor) * Math.cos(angle);
      const labelY = centerY + (radius - 30 * scaleFactor) * Math.sin(angle);
      labels.push({
        x: labelX,
        y: labelY,
        text: Math.round(tickValue).toString(),
      });

      // Minor ticks between major ticks
      if (i < majorTicksCount - 1) {
        const nextAngle = startAngle + ((i + 1) / (majorTicksCount - 1)) * angleRange;
        const minorAngleStep = (nextAngle - angle) / (minorTicksCount + 1);

        for (let j = 1; j <= minorTicksCount; j++) {
          const minorAngle = angle + j * minorAngleStep;
          const minorOuterX = centerX + radius * Math.cos(minorAngle);
          const minorOuterY = centerY + radius * Math.sin(minorAngle);
          const minorInnerX = centerX + (radius - 5 * scaleFactor) * Math.cos(minorAngle);
          const minorInnerY = centerY + (radius - 5 * scaleFactor) * Math.sin(minorAngle);

          minorTicks.push({
            x1: minorInnerX,
            y1: minorInnerY,
            x2: minorOuterX,
            y2: minorOuterY,
          });
        }
      }
    }

    return { majorTicks, minorTicks, labels };
  }, [gaugeConfig, majorTicksCount, minorTicksCount, minValue, maxValue, effectiveSize]);

  // Calculate indicator path for current value
  const getIndicatorPath = useCallback(
    (val) => {
      const { centerX, centerY, radius, startAngle, angleRange } = gaugeConfig;
      const clampedValue = Math.max(minValue, Math.min(maxValue, val));
      const normalizedValue = (clampedValue - minValue) / (maxValue - minValue);
      const angle = startAngle + normalizedValue * angleRange;

      const triangleHeight = radius;
      const triangleBase = 20 * (effectiveSize / 300);

      const tipX = centerX + radius * Math.cos(angle);
      const tipY = centerY + radius * Math.sin(angle);
      const baseX = centerX + (radius - triangleHeight) * Math.cos(angle);
      const baseY = centerY + (radius - triangleHeight) * Math.sin(angle);
      const leftX = baseX + (triangleBase / 2) * Math.cos(angle - Math.PI / 2);
      const leftY = baseY + (triangleBase / 2) * Math.sin(angle - Math.PI / 2);
      const rightX = baseX + (triangleBase / 2) * Math.cos(angle + Math.PI / 2);
      const rightY = baseY + (triangleBase / 2) * Math.sin(angle + Math.PI / 2);

      return `M ${tipX} ${tipY} L ${leftX} ${leftY} L ${rightX} ${rightY} Z`;
    },
    [gaugeConfig, minValue, maxValue, effectiveSize]
  );

  // Generate arc path
  const getArcPath = useCallback(
    (startVal, endVal, arcRadius) => {
      const { centerX, centerY, startAngle, angleRange } = gaugeConfig;
      const startNorm = (Math.max(minValue, Math.min(maxValue, startVal)) - minValue) / (maxValue - minValue);
      const endNorm = (Math.max(minValue, Math.min(maxValue, endVal)) - minValue) / (maxValue - minValue);
      const arcStartAngle = startAngle + startNorm * angleRange;
      const arcEndAngle = startAngle + endNorm * angleRange;

      const x1 = centerX + arcRadius * Math.cos(arcStartAngle);
      const y1 = centerY + arcRadius * Math.sin(arcStartAngle);
      const x2 = centerX + arcRadius * Math.cos(arcEndAngle);
      const y2 = centerY + arcRadius * Math.sin(arcEndAngle);

      const largeArcFlag = arcEndAngle - arcStartAngle > Math.PI ? 1 : 0;

      return `M ${x1} ${y1} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
    },
    [gaugeConfig, minValue, maxValue]
  );

  // Generate alert zone path (pie slice)
  const getAlertZonePath = useCallback(
    (zoneStart, zoneEnd) => {
      const { centerX, centerY, radius, startAngle, angleRange } = gaugeConfig;
      const startNorm = (Math.max(minValue, Math.min(maxValue, zoneStart)) - minValue) / (maxValue - minValue);
      const endNorm = (Math.max(minValue, Math.min(maxValue, zoneEnd)) - minValue) / (maxValue - minValue);
      const startA = startAngle + startNorm * angleRange;
      const endA = startAngle + endNorm * angleRange;

      const x1 = centerX + radius * Math.cos(startA);
      const y1 = centerY + radius * Math.sin(startA);
      const x2 = centerX + radius * Math.cos(endA);
      const y2 = centerY + radius * Math.sin(endA);

      const largeArcFlag = endA - startA > Math.PI ? 1 : 0;

      return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    },
    [gaugeConfig, minValue, maxValue]
  );

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
    if (onEditClick) {
      onEditClick();
    }
  };

  const handleCloseEditor = () => {
    setIsEditMode(false);
  };

  const handleSettingsIconClick = () => {
    setShowSettingsPanel(true);
  };

  const handleSettingsSave = (newSettings) => {
    setShowSettingsPanel(false);
    if (onSettingsChange) {
      onSettingsChange(newSettings);
    }
  };

  const handleSettingsCancel = () => {
    setShowSettingsPanel(false);
  };

  const currentSettings = {
    minValue,
    maxValue,
    label,
    unit,
    alertEnabled,
    alertHigh,
    alertLow,
  };

  const tickColor = isDarkMode ? '#ffffff' : '#000000';
  const backgroundColor = isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)';
  const coreCircleColor = isDarkMode ? '#323030' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#000000';

  const { centerX, centerY, radius } = gaugeConfig;
  const centerCircleRadius = (effectiveSize <= 300 ? 27 : 35) * (effectiveSize / 300);
  const scaleFactor = effectiveSize / 300;
  const fontSize = Math.max(8, 14 * scaleFactor);

  const displayValue = digitalValue !== undefined ? digitalValue : value;
  const convertedValue = convert(displayValue);
  const formattedValue = formatValue(convertedValue);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      borderWidth: isEditMode ? 4 : 0,
      borderColor: '#faad14',
    },
    gaugeContainer: {
      position: 'relative',
      width: effectiveSize,
      height: effectiveSize,
    },
    alarmIconContainer: {
      position: 'absolute',
      top: '47%',
      left: '50%',
      transform: [{ translateX: -alarmIconSize / 2 }, { translateY: -alarmIconSize }],
    },
    settingsHitArea: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: centerCircleRadius * 2,
      height: centerCircleRadius * 2,
      marginLeft: -centerCircleRadius,
      marginTop: -centerCircleRadius,
      borderRadius: centerCircleRadius,
      alignItems: 'center',
      justifyContent: 'center',
    },
    settingsOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
    },
    controllerContainer: {
      position: 'absolute',
      bottom: isDarkMode ? 4 : -3,
      left: '20%',
      right: '20%',
      alignItems: 'center',
    },
    editorOverlay: {
      position: 'absolute',
      zIndex: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    editButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 20,
      padding: 8,
      zIndex: 5,
    },
  });

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      {/* Edit Button */}
      {canEdit && (
        <TouchableOpacity style={styles.editButton} onPress={handleEditClick}>
          <SettingsIcon size={effectiveSize * 0.1} color="#000" />
        </TouchableOpacity>
      )}

      <View style={styles.gaugeContainer}>
        <Svg width={effectiveSize} height={effectiveSize}>
          <Defs>
            <RadialGradient id="alertGradient" cx="50%" cy="50%" r="50%">
              <Stop offset="80%" stopColor="rgba(255, 0, 0, 0)" />
              <Stop offset="100%" stopColor="rgba(255, 0, 0, 1)" />
            </RadialGradient>
          </Defs>

          {/* Background Circle */}
          <Circle
            cx={centerX}
            cy={centerY}
            r={radius + 5}
            fill={backgroundColor}
          />

          {/* Inner Circle */}
          <Circle
            cx={centerX}
            cy={centerY}
            r={20 * scaleFactor}
            fill={backgroundColor}
          />

          {/* High Alert Zone */}
          {alertEnabled && alertHigh !== undefined && alertHigh <= maxValue && (
            <Path
              d={getAlertZonePath(alertHigh, maxValue)}
              fill="url(#alertGradient)"
            />
          )}

          {/* Low Alert Zone */}
          {alertEnabled && alertLow !== undefined && alertLow >= minValue && (
            <Path
              d={getAlertZonePath(minValue, alertLow)}
              fill="url(#alertGradient)"
            />
          )}

          {/* Range Indicator */}
          {showRange && rangeMin !== undefined && rangeMax !== undefined && (
            <Path
              d={getAlertZonePath(
                Math.max(minValue, Math.min(maxValue, convert(rangeMin))),
                Math.max(minValue, Math.min(maxValue, convert(rangeMax)))
              )}
              fill={isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.17)'}
            />
          )}

          {/* Major Ticks */}
          {ticks.majorTicks.map((tick, index) => (
            <Path
              key={`major-${index}`}
              d={`M ${tick.x1} ${tick.y1} L ${tick.x2} ${tick.y2}`}
              stroke={tickColor}
              strokeWidth={2 * scaleFactor}
            />
          ))}

          {/* Minor Ticks */}
          {ticks.minorTicks.map((tick, index) => (
            <Path
              key={`minor-${index}`}
              d={`M ${tick.x1} ${tick.y1} L ${tick.x2} ${tick.y2}`}
              stroke={tickColor}
              strokeWidth={1 * scaleFactor}
            />
          ))}

          {/* Tick Labels */}
          {ticks.labels.map((label, index) => (
            <SvgText
              key={`label-${index}`}
              x={label.x}
              y={label.y}
              fill={textColor}
              fontSize={fontSize}
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {label.text}
            </SvgText>
          ))}

          {/* Speed Arc */}
          {showArc && (
            <Path
              d={getArcPath(minValue, convert(value), radius + 7)}
              stroke={getSpeedColor(Number(value), Number(minValue), Number(maxValue)) || '#3C8CA3'}
              strokeWidth={5}
              fill="none"
            />
          )}

          {/* Indicator/Needle */}
          <Path
            d={getIndicatorPath(convert(value))}
            fill="red"
          />

          {/* Core Circle */}
          <Circle
            cx={centerX}
            cy={centerY}
            r={centerCircleRadius}
            fill={coreCircleColor}
          />

          {/* Value Display */}
          <SvgText
            x={centerX}
            y={centerY + 5}
            fill={textColor}
            fontSize={fontSize}
            textAnchor="middle"
            fontWeight="bold"
          >
            {formattedValue}
          </SvgText>

          {/* Unit */}
          {!digitalValue && unit && (
            <SvgText
              x={centerX + 30 * scaleFactor}
              y={centerY + 4}
              fill={textColor}
              fontSize={fontSize}
              textAnchor="start"
            >
              {unit}
            </SvgText>
          )}

          {/* Label */}
          {label && (
            <SvgText
              x={centerX}
              y={digitalValue !== undefined
                ? centerY + 55 * scaleFactor
                : centerY - 40 * scaleFactor
              }
              fill={textColor}
              fontSize={fontSize * 0.9}
              textAnchor="middle"
            >
              {label}
            </SvgText>
          )}

          {/* Digital Unit and Secondary Label */}
          {digitalUnit && (
            <SvgText
              x={centerX + 32 * scaleFactor}
              y={centerY + 5}
              fill={textColor}
              fontSize={fontSize}
              textAnchor="start"
            >
              {digitalUnit}
            </SvgText>
          )}

          {secondaryLabel && (
            <SvgText
              x={centerX - 57 * scaleFactor}
              y={centerY + 6}
              fill={textColor}
              fontSize={fontSize}
              textAnchor="end"
            >
              {secondaryLabel}
            </SvgText>
          )}
        </Svg>

        {/* Alarm Icon */}
        <View style={styles.alarmIconContainer}>
          {renderAlarmIcon ? (
            renderAlarmIcon({
              isOn: alertEnabled && !alertSnoozed,
              isSnoozed: alertSnoozed,
              size: alarmIconSize,
            })
          ) : (
            <>
              {alertEnabled && !alertSnoozed && (
                <AlarmOnIcon color={isDarkMode ? '#fff' : '#A11117'} size={alarmIconSize} />
              )}
              {alertEnabled && alertSnoozed && (
                <AlarmOffIcon color={isDarkMode ? '#fff' : '#A11117'} size={alarmIconSize} />
              )}
            </>
          )}
        </View>

        {/* Settings Touch Area */}
        {settingsConfig && onSettingsChange && (
          <TouchableOpacity
            style={styles.settingsHitArea}
            onPress={handleSettingsIconClick}
          />
        )}

        {/* Controller Slot */}
        {renderController && (
          <View style={styles.controllerContainer}>{renderController()}</View>
        )}
      </View>

      {/* Settings Panel Overlay */}
      {showSettingsPanel && settingsConfig && (
        <View style={styles.settingsOverlay}>
          <SettingsPanel
            settings={currentSettings}
            settingsConfig={settingsConfig}
            onSave={handleSettingsSave}
            onCancel={handleSettingsCancel}
            isDarkMode={isDarkMode}
            size={effectiveSize}
          />
        </View>
      )}

      {/* Editor Overlay */}
      {isEditMode && renderEditor && (
        <View style={styles.editorOverlay}>
          {renderEditor({ onClose: handleCloseEditor, size: effectiveSize })}
        </View>
      )}
    </View>
  );
};

export default Gauge;
