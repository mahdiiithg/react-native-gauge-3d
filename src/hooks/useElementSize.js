import { useState, useCallback } from 'react';

/**
 * Hook to measure an element's size using onLayout in React Native
 * @returns {{ onLayout: Function, elementSize: { width: number, height: number } }}
 */
export const useElementSize = () => {
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 });

  const onLayout = useCallback((event) => {
    const { width, height } = event.nativeEvent.layout;
    setElementSize({ width, height });
  }, []);

  return { onLayout, elementSize };
};

export default useElementSize;
