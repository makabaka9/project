import numeral from 'numeral';
import StationlineChart from './StationlineChart';
import StackedColumn from './StackedColumn';
import StationRange from './StationRange';
import EnergyStatistics from './EnergyStatistics';
import Pie from './Pie';
import Gauge from './Gauge';

const yuan = (val: number | string) => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
  yuan,
  StackedColumn,
  StationlineChart,
  StationRange,
  EnergyStatistics,
  Pie,
  Gauge,
};

export {
  Charts as default,
  yuan,
  StackedColumn,
  StationlineChart,
  StationRange,
  EnergyStatistics,
  Pie,
  Gauge,
};
