import numeral from 'numeral';
import Pie from './Pie';
import GroupedColumn from './GroupedColumn';
import TimelineChart from './TimelineChart';
import StackedColumn from './StackedColumn';

const yuan = (val: number | string) => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
  yuan,
  Pie,
  StackedColumn,
  GroupedColumn,
  TimelineChart,
};

export { Charts as default, yuan, Pie, StackedColumn, GroupedColumn, TimelineChart };
