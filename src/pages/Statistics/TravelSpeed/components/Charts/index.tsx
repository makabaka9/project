import numeral from 'numeral';
import StationlineChart from './StationlineChart';
import StackedColumn from './StackedColumn';
import StationRange from './StationRange';

const yuan = (val: number | string) => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
  yuan,
  StackedColumn,
  StationlineChart,
  StationRange,
};

export { Charts as default, yuan, StackedColumn, StationlineChart, StationRange };
