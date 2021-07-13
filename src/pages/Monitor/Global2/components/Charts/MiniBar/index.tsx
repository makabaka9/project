import { ColumnChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  borderWidth?: number;
  data: {
    trainCode: string;
    faultNum: number;
  }[];
}

const MiniBar: React.FC<HorizonBarProps> = (props) => {
  const { height = 1, data } = props;
  const padding: [number, number, number, number] = [10, 20, 40, 30];
  const chartHeight = height + 54;
  // const cols = {};
  function compare(key: React.ReactText) {
    return function (value1: { [x: string]: any; }, value2: { [x: string]: any; }) {
      var val1 = value1[key];
      var val2 = value2[key];
      return val2 - val1;
    }
  }
  data.sort(compare('faultNum'));

  return (
    <div>
      {height > 0 && (
        <ColumnChart
          height={chartHeight}
          data={data}
          forceFit
          // description={{
          //   visible: true,
          //   text: '故障数/个',
          //   style:{fill:"#f1f1f1",opacity: 0.8}
          // }}
          padding={padding}
          xField='trainCode'
          yField='faultNum'
          
          columnStyle={{
            fill:
              'l(90) 0:rgb(55,121,253,1)  1:rgb(55,121,253,0.4) '
          }}
          meta={{
            trainCode: {
              alias: '车号',
            },
            faultNum: {
              alias: '故障数',
            },
          }}
          color={['count', '#e6f7ff-#002766']}
          legend={{
            visible: false
          }}
        />
      )}
    </div>
  );
};

export default autoHeight()(MiniBar);
