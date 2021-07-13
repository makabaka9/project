import React from "react";
import {
	Chart,
	Tooltip,
	Interval,
} from "bizcharts";
import autoHeight from '@/components/autoHeight';

export interface HorizonBarProps {
    height?: number;
    forceFit?: boolean;
    borderWidth?: number;
    // data: any
  }


const IntervalChart: React.FC<HorizonBarProps> = (props) => {
    const { height=1 } = props;
    // const padding: [number, number, number, number] = [30, 30, 30, 30];
    const chartHeight = height;
    const data = [
        { name: '一级', 月份: '探测器1.', 月均降雨量: 18.9 },
        { name: '一级', 月份: '探测器2.', 月均降雨量: 28.8 },
        { name: '一级', 月份: '探测器3.', 月均降雨量: 39.3 },
        { name: '一级', 月份: '探测器4.', 月均降雨量: 81.4 },
        { name: '一级', 月份: '探测器5', 月均降雨量: 47 },
        { name: '一级', 月份: '探测器6.', 月均降雨量: 20.3 },
        { name: '一级', 月份: '探测器7.', 月均降雨量: 24 },
        { name: '一级', 月份: '探测器8.', 月均降雨量: 35.6 },
        { name: '二级', 月份: '探测器1.', 月均降雨量: 12.4 },
        { name: '二级', 月份: '探测器2.', 月均降雨量: 23.2 },
        { name: '二级', 月份: '探测器3.', 月均降雨量: 34.5 },
        { name: '二级', 月份: '探测器4.', 月均降雨量: 99.7 },
        { name: '二级', 月份: '探测器5', 月均降雨量: 52.6 },
        { name: '二级', 月份: '探测器6.', 月均降雨量: 35.5 },
        { name: '二级', 月份: '探测器7.', 月均降雨量: 37.4 },
        { name: '二级', 月份: '探测器8.', 月均降雨量: 42.4 },
        { name: '三级', 月份: '探测器1.', 月均降雨量: 12.4 },
        { name: '三级', 月份: '探测器2.', 月均降雨量: 23.2 },
        { name: '三级', 月份: '探测器3.', 月均降雨量: 34.5 },
        { name: '三级', 月份: '探测器4.', 月均降雨量: 99.7 },
        { name: '三级', 月份: '探测器5', 月均降雨量: 52.6 },
        { name: '三级', 月份: '探测器6.', 月均降雨量: 35.5 },
        { name: '三级', 月份: '探测器7.', 月均降雨量: 37.4 },
        { name: '三级', 月份: '探测器8.', 月均降雨量: 42.4 },
    ];
	return (
		<Chart height={chartHeight} padding="auto" data={data} autoFit>
			<Interval
				adjust={[
					{
						type: 'stack',
					},
				]}
				color="name"
				position="月份*月均降雨量"
			/>
			<Tooltip shared />
		</Chart>
	);
}

export default autoHeight()(IntervalChart);
