import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Chart, Line, Point } from 'bizcharts';
import styles from './index.less';

export interface TrainChartProps {
    height?: number;
    forceFit?: boolean;
    data: {
        monthNum?: number;
        rate?: number;
    }[];
}

const MinLine: React.FC<TrainChartProps> = (props) => {
    const { height = 1, data } = props;
    const chartHeight = height + 54;

    return (
        <div className={styles.miniChart} style={{ height }}>
            <div className={styles.chartContent}>
                <Chart scale={{ value: { min: 0 } }} padding={[10, 20, 50, 40]} autoFit height={chartHeight} data={data} >
                    <Line
                        shape="smooth"
                        position="monthNum*rate"
                        color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                    />
                </Chart>
            </div>
        </div>
    )
};


export default autoHeight()(MinLine);


