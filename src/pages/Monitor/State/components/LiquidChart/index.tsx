import React from 'react';
import autoHeight from '@/components/autoHeight';
import { LiquidChart } from 'bizcharts';

export interface LiquidCardProps {
    height?: number;
    forceFit?: boolean;
    data: number
}

const LiquidCard: React.FC<LiquidCardProps> = (props) => {
    const { height = 1, data } = props;
    const padding: [number, number, number, number] = [30, 90, 30, -90];
    const chartHeight = height + 20;
    return (
        <LiquidChart
            height={chartHeight}
            padding={padding}
            min={0}
            max={24}
            value={data}
            statistic={{
                visible: true,
                adjustColor: false,
                style:{
                    fill:'#eee',
                    fontSize:30,
                }
            }}
        />
    );
}

export default autoHeight()(LiquidCard);
