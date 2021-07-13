import React from 'react';
import { TreemapChart } from 'bizcharts';
import autoHeight from '@/components/autoHeight';


export interface PolygonProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data?: {
    name: string,
    children: Array<{
      name: string,
      value: number
    }>
  };
}

const PolygonChart: React.FC<PolygonProps> = (props) => {
  const { height = 1, data } = props;
  // console.log("data", data)
  const chartHeight = '18vh';
  const colors = ['#e6f7ff', '#bae7ff', '#91d5ff', '#69c0ff', '#40a9ff', '#1890ff', '#096dd9', '#0050b3', '#003a8c', '#002766', '#407fff']
  // const colors = ['#e6f7ff', '#bae7ff', '#91d5ff', '#69c0ff', '#40a9ff', '#1890ff', '#096dd9']
  return (
    <TreemapChart
      height={chartHeight}
      forceFit
      // data={processData(data)}
      data={data}
      meta={{
        name: {
          alias:'列车号'
        },
        value: {
          alias: '故障数',
          formatter:(v)=>{return `${v}个`}
        }
      }}
      colorField='name'
      color={colors}
      tooltip={{
        visible: true
      }}
      label={{
        visible: true,
      }}
    />
  )

};

export default autoHeight()(PolygonChart);