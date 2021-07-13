// 计算两个经纬度距离 这是停车库：
// 长沙城际动车运用所 地址：湖南省长沙市雨花区人民中路
// 坐标：113.02116,28.189811
export default function GetDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = Rad(lat1);
  var radLat2 = Rad(lat2);
  var a = radLat1 - radLat2;
  var b = Rad(lng1) - Rad(lng2);
  var s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2),
      ),
    );
  s = s * 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000; //输出为公里
  //s=s.toFixed(4);
  return s;
}

function Rad(d) {
  return (d * Math.PI) / 180.0; //经纬度转换成三角函数中度分表形式。
}
