// 平台全景第二部分-地图
import React, { useEffect } from 'react';
import Train from '@/assets/train1.png';
// import Train from '@/pages/Whole/Train';
export interface TrainMapProps {
  // height?: number;
  // forceFit?: boolean;
  // borderWidth?: number;
  // data: {
  //   time: string;
  //   type: string;
  //   humity: number;
  // }[];
}
const TrainMap: React.FC<TrainMapProps> = (props) => {
  // useEffect(() => {
  //   var c = document.getElementById('myCanvas');
  //   var ctx = c.getContext('2d');
  //   ctx.fillStyle = 'red';
  //   ctx.fillRect(8, 24, 4, 4);
  //   ctx.fillRect(85, 64, 4, 4); // fillRect(x,y,width,height) 方法定义了矩形当前的填充方式。
  // });

  return (


    <img
      // id="myCanvas"
      // width="1660"
      // height="80"

      style={{
        width: 1500,
        height: 40,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${Train})`,
      }}
    >
    </img>
  );
};
export default TrainMap;
