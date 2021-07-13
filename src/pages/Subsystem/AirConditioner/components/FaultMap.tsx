// 平台全景第二部分-地图
import React, { useEffect } from 'react';
import AirConditioningUnits from '@/assets/airConditioningUnits.png';
export interface FaultMapProps {
  // height?: number;
  // forceFit?: boolean;
  // borderWidth?: number;
  // data: {
  //   time: string;
  //   type: string;
  //   humity: number;
  // }[];
}
const FaultMap: React.FC<FaultMapProps> = (props) => {
  useEffect(() => {
    var c = document.getElementById('myCanvas');
    var ctx = c.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.fillRect(8, 24, 4, 4);
    ctx.fillRect(85, 64, 4, 4); // fillRect(x,y,width,height) 方法定义了矩形当前的填充方式。
  });

  return (
    <div
      style={{
        textAlign: 'center',
        width: '100%',
        height: '100%',
        opacity: 0.7, //透明度设置
      }}
    >
      <canvas
        id="myCanvas"
        width="100"
        height="130"
        style={{
          width: '87%',
          height: '100%',
          position: 'relative',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${AirConditioningUnits})`,
        }}
      ></canvas>
    </div>
  );
};
export default FaultMap;
