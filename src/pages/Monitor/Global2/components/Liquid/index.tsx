
import React, { useRef, useEffect } from "react";
import { Liquid } from '@antv/g2plot';

const WaterWave = ({ value }) => {
  // var value = 13
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) {
      return;
    }
    const liquidPlot = new Liquid(container.current, {
      min: 0,
      max: 24,
      percent: value,
      height: 100,
      weight: 100
    });
    liquidPlot.render();
  }, [container]);

  return (
    <div ref={container} />
  );
};
export default WaterWave;